
import React, { useState } from 'react';
import { FileText, Shield, Zap, Lock } from 'lucide-react';
import { toast } from "@/components/ui/sonner";

import FileDropzone from '@/components/FileDropzone';
import ConversionButton from '@/components/ConversionButton';
import DocumentPreview from '@/components/DocumentPreview';
import FeatureHighlight from '@/components/FeatureHighlight';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { convertWordToPdf, downloadPdf } from '@/lib/conversion-service';

const Index = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [convertedPdf, setConvertedPdf] = useState<Blob | null>(null);
  const [isConverting, setIsConverting] = useState(false);

  // Accepted file types
  const acceptedFileTypes = ['.doc', '.docx', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

  const handleFileSelected = (file: File) => {
    setSelectedFile(file);
    setConvertedPdf(null);
    
    toast.info('File Selected', {
      description: `"${file.name}" has been selected.`,
    });
  };

  const handleConversion = async () => {
    if (!selectedFile) {
      toast.error('No File Selected', {
        description: 'Please select a Word document to convert.',
      });
      return;
    }

    try {
      setIsConverting(true);
      
      toast.info('Conversion Started', {
        description: 'Converting your document. Please wait...',
      });

      const pdfBlob = await convertWordToPdf(selectedFile);
      setConvertedPdf(pdfBlob);
      
      toast.success('Conversion Complete', {
        description: 'Your PDF is ready to download!',
      });
      
      // Auto download
      downloadPdf(pdfBlob, selectedFile.name);
    } catch (error) {
      console.error('Conversion error:', error);
      toast.error('Conversion Failed', {
        description: 'There was an error converting your document.',
      });
    } finally {
      setIsConverting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center text-center animate-slide-down">
            <div className="inline-block text-xs font-medium bg-primary/10 text-primary px-3 py-1 rounded-full mb-4">
              Simple & Fast
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 max-w-3xl">
              Convert Word Documents to PDF in <span className="text-primary">Seconds</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mb-10">
              Free, fast, and secure online tool to convert .doc and .docx files to PDF format 
              without losing formatting. No registration required.
            </p>
          </div>
        </div>
      </section>
      
      {/* Converter Section */}
      <section className="pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-border/50 animate-fade-in">
            <h2 className="text-2xl font-bold text-center mb-6">Convert Your Document</h2>
            
            <div className="space-y-8">
              <FileDropzone 
                onFileSelected={handleFileSelected}
                acceptedFileTypes={acceptedFileTypes}
              />
              
              {selectedFile && (
                <div className="animate-slide-up">
                  <h3 className="text-sm font-medium text-muted-foreground mb-3">Document Preview</h3>
                  <DocumentPreview 
                    fileName={selectedFile.name}
                    fileSize={selectedFile.size}
                  />
                </div>
              )}
              
              <ConversionButton 
                onClick={handleConversion} 
                isLoading={isConverting}
                isDisabled={!selectedFile}
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section id="features" className="py-20 px-6 bg-secondary/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Choose Word2PDF</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our simple tool provides the best experience for converting your Word documents to PDF format.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureHighlight 
              icon={Zap}
              title="Fast Conversion"
              description="Convert your documents in seconds with our optimized processing engine."
            />
            <FeatureHighlight 
              icon={Shield}
              title="100% Secure"
              description="Your files are processed in your browser and never uploaded to our servers."
            />
            <FeatureHighlight 
              icon={FileText}
              title="Preserve Formatting"
              description="All your document formatting, fonts, and images are preserved in the PDF output."
            />
            <FeatureHighlight 
              icon={Lock}
              title="Free Forever"
              description="Our tool is completely free to use with no hidden costs or registration required."
            />
          </div>
        </div>
      </section>
      
      {/* About Section */}
      <section id="about" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">About Word2PDF</h2>
            <p className="text-muted-foreground mb-6">
              Word2PDF is a simple, fast, and secure online tool for converting Microsoft Word documents to PDF format.
              We built this tool to make document conversion accessible to everyone without complicated software or subscriptions.
            </p>
            <p className="text-muted-foreground">
              Our conversion happens entirely in your browser, ensuring your sensitive documents never leave your computer.
              This provides both security and speed, as there's no need to upload large files to remote servers.
            </p>
          </div>
        </div>
      </section>
      
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default Index;
