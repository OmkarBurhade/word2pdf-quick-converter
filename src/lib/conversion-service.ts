
import { toast } from "sonner";
import { saveAs } from 'file-saver';

// We will be using the docx2pdf library for the actual conversion,
// but for this demo, we're simulating the conversion process
export async function convertWordToPdf(file: File): Promise<Blob> {
  return new Promise((resolve, reject) => {
    try {
      // Normally we would use a proper conversion library here
      console.log(`Converting file: ${file.name}, size: ${file.size} bytes`);
      
      // For demonstration purposes, we're using a timeout to simulate processing
      // In a real application, we'd use a proper conversion library
      setTimeout(async () => {
        try {
          // For now, we simply rename the file extension from .docx to .pdf
          // without actually converting the content
          // In a real application, we'd convert the actual content
          
          // Simulate success
          const reader = new FileReader();
          reader.onload = function() {
            // Create a new blob with the same content but different type
            const blob = new Blob([reader.result as ArrayBuffer], { type: 'application/pdf' });
            resolve(blob);
          };
          reader.onerror = function() {
            reject(new Error('Error reading file'));
          };
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
