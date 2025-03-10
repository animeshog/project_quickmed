import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, ArrowLeft } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Results = () => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadPrescription = () => {
    setIsDownloading(true);
    
    // Simulate PDF download (would be replaced with actual PDF generation)
    setTimeout(() => {
      setIsDownloading(false);
      toast({
        title: "Prescription downloaded",
        description: "Your prescription has been saved to your device.",
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 py-4 px-6">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/chat" className="flex items-center text-gray-600 hover:text-blue-600 mr-4">
              <ArrowLeft className="h-5 w-5 mr-1" />
              Back to Chat
            </Link>
            <h1 className="text-xl font-bold text-blue-600">QuickMED Results</h1>
          </div>
          <Button
            onClick={handleDownloadPrescription}
            className="bg-blue-600 hover:bg-blue-700"
            disabled={isDownloading}
          >
            <Download className="h-4 w-4 mr-2" />
            {isDownloading ? "Downloading..." : "Download Prescription"}
          </Button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-6">
        <Card className="mb-8">
          <CardHeader className="bg-blue-50 border-b border-blue-100">
            <CardTitle className="text-blue-800">Diagnosis Summary</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-gray-700">
              Based on the symptoms you've described, you appear to be experiencing a <span className="font-semibold">migraine headache</span> with 
              accompanying symptoms of mild fever. This assessment is based on the pattern, duration, and intensity of your symptoms.
            </p>
          </CardContent>
        </Card>

        <Tabs defaultValue="treatment" className="mb-8">
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="cause">Cause</TabsTrigger>
            <TabsTrigger value="treatment">Treatment</TabsTrigger>
            <TabsTrigger value="medication">Medication</TabsTrigger>
            <TabsTrigger value="remedies">Home Remedies</TabsTrigger>
          </TabsList>
          
          <TabsContent value="cause" className="rounded-md border p-6">
            <h3 className="text-lg font-medium mb-3">Possible Causes</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>Stress or anxiety</li>
              <li>Hormonal changes</li>
              <li>Dehydration</li>
              <li>Eye strain</li>
              <li>Changes in sleep patterns</li>
              <li>Specific food triggers</li>
            </ul>
          </TabsContent>
          
          <TabsContent value="treatment" className="rounded-md border p-6">
            <h3 className="text-lg font-medium mb-3">Recommended Treatment</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>Rest in a dark, quiet room</li>
              <li>Apply cold compress to forehead</li>
              <li>Stay hydrated</li>
              <li>Take recommended medication</li>
              <li>Maintain regular sleep schedule</li>
              <li>Consider stress management techniques</li>
            </ul>
          </TabsContent>
          
          <TabsContent value="medication" className="rounded-md border p-6">
            <h3 className="text-lg font-medium mb-3">Recommended Medication</h3>
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-md">
                <h4 className="font-medium text-blue-800">Primary Recommendation</h4>
                <div className="mt-2">
                  <p className="font-semibold">Ibuprofen 400mg</p>
                  <p className="text-sm text-gray-600 mt-1">Take 1 tablet every 6-8 hours as needed for pain, not exceeding 3 tablets in 24 hours.</p>
                  <div className="mt-2 text-sm bg-green-50 text-green-700 px-2 py-1 rounded inline-flex items-center">
                    <span className="font-medium">Available nearby</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium">Alternative Options</h4>
                <div className="mt-2 space-y-3">
                  <div className="border-b pb-2">
                    <p className="font-semibold">Acetaminophen 500mg</p>
                    <p className="text-sm text-gray-600 mt-1">Take 2 tablets every 6 hours as needed, not exceeding 8 tablets in 24 hours.</p>
                  </div>
                  <div>
                    <p className="font-semibold">Aspirin 325mg</p>
                    <p className="text-sm text-gray-600 mt-1">Take 1-2 tablets every 4-6 hours as needed, not exceeding 12 tablets in 24 hours.</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="remedies" className="rounded-md border p-6">
            <h3 className="text-lg font-medium mb-3">Home Remedies</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>Ginger tea can help reduce inflammation and pain</li>
              <li>Peppermint oil applied to temples may provide relief</li>
              <li>Lavender essential oil inhalation may help with migraine symptoms</li>
              <li>Stay in a dark room and avoid screen time</li>
              <li>Try gentle yoga or stretching to relieve tension</li>
              <li>Consider massage therapy for recurring migraines</li>
            </ul>
          </TabsContent>
        </Tabs>

        <Card>
          <CardHeader className="bg-amber-50 border-b border-amber-100">
            <CardTitle className="text-amber-800">Important Note</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-gray-700">
              This assessment is based on the symptoms you've shared and should not replace professional medical advice. 
              If your symptoms worsen, persist for more than 72 hours, or if you experience severe pain, dizziness, confusion, 
              or high fever, please consult a healthcare professional immediately.
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Results;