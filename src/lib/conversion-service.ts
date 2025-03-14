
import { toast } from "sonner";
import { saveAs } from 'file-saver';
import { jsPDF } from "jspdf";

// We will be using a simple PDF generation approach for this demo
export async function convertWordToPdf(file: File): Promise<Blob> {
  return new Promise((resolve, reject) => {
    try {
      // Log the conversion process
      console.log(`Converting file: ${file.name}, size: ${file.size} bytes`);
      
      // For demonstration purposes, we're using a timeout to simulate processing
      setTimeout(async () => {
        try {
          // Create a new PDF document
          const pdf = new jsPDF();
          
          // Read the file content (in a real app, we would parse the DOCX content)
          const reader = new FileReader();
          
          reader.onload = function() {
            try {
              // Add a title to the PDF
              pdf.setFontSize(16);
              pdf.text('Converted Document', 20, 20);
              
              // Add file information
              pdf.setFontSize(12);
              pdf.text(`Original filename: ${file.name}`, 20, 30);
              pdf.text(`File size: ${(file.size / 1024).toFixed(2)} KB`, 20, 40);
              pdf.text(`Converted on: ${new Date().toLocaleString()}`, 20, 50);
              
              // Add a note about the demo
              pdf.setFontSize(10);
              pdf.text('Note: This is a demonstration of PDF conversion. In a production environment,', 20, 70);
              pdf.text('the actual content of your Word document would be parsed and converted properly.', 20, 80);
              
              // Get the PDF as a blob
              const pdfBlob = pdf.output('blob');
              resolve(pdfBlob);
            } catch (error) {
              console.error('Error generating PDF:', error);
              reject(error);
            }
          };
          
          reader.onerror = function() {
            reject(new Error('Error reading file'));
          };
          
          // Start reading the file
          reader.readAsArrayBuffer(file);
        } catch (error) {
          console.error('Error in conversion process:', error);
          reject(error);
        }
      }, 2000); // Simulate 2 second processing time
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
