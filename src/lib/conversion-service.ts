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
          // Extract HTML content from Word document with all formatting preserved
          const arrayBuffer = reader.result as ArrayBuffer;
          const result = await mammoth.convertToHtml({ arrayBuffer });
          const htmlContent = result.value;
          
          console.log("Extracted HTML content length:", htmlContent.length);
          
          // Create a new PDF document with proper dimensions
          const pdf = new jsPDF({
            orientation: "portrait",
            unit: "pt",
            format: "a4"
          });
          
          // Create a temporary container to render the HTML
          const container = document.createElement('div');
          container.innerHTML = htmlContent;
          
          // Apply basic styling to make tables and other elements appear correctly
          container.querySelectorAll('table').forEach(table => {
            table.style.width = '100%';
            table.style.borderCollapse = 'collapse';
            table.querySelectorAll('td, th').forEach(cell => {
              (cell as HTMLElement).style.border = '1px solid #ddd';
              (cell as HTMLElement).style.padding = '8px';
            });
          });
          
          // Process images if any
          const images = container.querySelectorAll('img');
          const imagePromises = Array.from(images).map((img) => {
            return new Promise<void>((imgResolve) => {
              // If image has a data URI, it's already embedded
              if (img.src.startsWith('data:')) {
                imgResolve();
                return;
              }
              
              // Otherwise, make sure images are properly sized
              img.style.maxWidth = '100%';
              imgResolve();
            });
          });
          
          // Wait for all images to be processed
          await Promise.all(imagePromises);
          
          // Use html2canvas or other solutions for complex documents
          // For this implementation, we'll use jsPDF's HTML rendering capability
          pdf.html(container, {
            callback: function(pdf) {
              // Get the PDF as a blob
              const pdfBlob = pdf.output('blob');
              resolve(pdfBlob);
            },
            x: 15,
            y: 15,
            width: 565, // A4 width minus margins
            windowWidth: 675 // Width reference for element rendering
          });
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
