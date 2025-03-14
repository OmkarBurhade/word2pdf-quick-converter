
import { toast } from "sonner";
import { saveAs } from 'file-saver';
import { jsPDF } from "jspdf";
import mammoth from 'mammoth';

export async function convertWordToPdf(file: File): Promise<Blob> {
  return new Promise((resolve, reject) => {
    try {
      // Log the conversion process
      console.log(`Converting file: ${file.name}, size: ${file.size} bytes`);
      
      const reader = new FileReader();
      
      reader.onload = async function() {
        try {
          // Extract text from Word document using mammoth
          const arrayBuffer = reader.result as ArrayBuffer;
          const result = await mammoth.extractRawText({ arrayBuffer });
          const extractedText = result.value;
          
          console.log("Extracted content length:", extractedText.length);
          
          // Create a new PDF document
          const pdf = new jsPDF();
          
          // Add a title to the PDF
          pdf.setFontSize(16);
          pdf.text('Converted Document', 20, 20);
          
          // Add file information
          pdf.setFontSize(12);
          pdf.text(`Original filename: ${file.name}`, 20, 30);
          pdf.text(`Converted on: ${new Date().toLocaleString()}`, 20, 40);
          
          // Add the extracted content
          pdf.setFontSize(10);
          
          // Split text into lines to fit the PDF page width
          const maxWidth = 180; // max width in points
          const fontSize = 10;
          const lineHeight = fontSize * 0.5;
          
          // Function to add text with proper wrapping
          const addWrappedText = (text: string, x: number, y: number) => {
            const lines = pdf.splitTextToSize(text, maxWidth);
            pdf.text(lines, x, y);
            return y + (lines.length * lineHeight);
          };
          
          // Add the content with a margin
          let yPosition = 50;
          
          if (extractedText.length > 0) {
            yPosition = addWrappedText(extractedText, 20, yPosition);
          } else {
            yPosition = addWrappedText("No text content could be extracted from this document.", 20, yPosition);
          }
          
          // Get the PDF as a blob
          const pdfBlob = pdf.output('blob');
          resolve(pdfBlob);
        } catch (error) {
          console.error('Error in PDF generation:', error);
          reject(error);
        }
      };
      
      reader.onerror = function() {
        reject(new Error('Error reading file'));
      };
      
      // For Word documents, we need to use readAsArrayBuffer
      reader.readAsArrayBuffer(file);
      
    } catch (error) {
      console.error('Error starting conversion process:', error);
      reject(error);
    }
  });
}

export function downloadPdf(pdfBlob: Blob, originalFileName: string) {
  try {
    // Replace the .docx or .doc extension with .pdf
    const pdfFileName = originalFileName.replace(/\.(docx|doc)$/i, '.pdf');
    
    // Use FileSaver.js to save the file
    saveAs(pdfBlob, pdfFileName);
    
    // Show success message
    toast.success('PDF Downloaded Successfully', {
      description: `Your file "${pdfFileName}" has been downloaded.`,
      duration: 4000,
    });
  } catch (error) {
    console.error('Error downloading PDF:', error);
    toast.error('Download Failed', {
      description: 'There was an error downloading your PDF.',
    });
  }
}
