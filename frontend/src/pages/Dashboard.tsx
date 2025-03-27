import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Activity, ArrowRight, Home, LogOut, UsersRound } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ReactMarkdown from 'react-markdown';

const commonSymptoms = [
  "Headache",
  "Fever",
  "Cough",
  "Fatigue",
  "Nausea",
  "Sore throat",
  "Shortness of breath",
  "Muscle pain",
  "Chills",
  "Runny nose",
  "Sneezing",
  "Blocked nose",
  "Loss of appetite",
  "Diarrhea",
  "Vomiting",
  "Abdominal pain",
  "Heartburn",
  "Indigestion",
  "Dizziness",
  "Lightheadedness",
  "Weakness",
  "Joint pain",
  "Back pain",
  "Chest pain",
  "Palpitations",
  "Skin rash",
  "Itching",
  "Hives",
  "Swelling",
  "Redness",
  "Warmth to touch",
  "Feeling hot",
  "Feeling cold",
  "Sweating",
  "Night sweats",
  "Difficulty sleeping",
  "Excessive sleepiness",
  "Feeling anxious",
  "Feeling stressed",
  "Feeling irritable",
  "Difficulty concentrating",
  "Memory problems",
  "Blurred vision",
  "Double vision",
  "Eye pain",
  "Earache",
  "Tinnitus (ringing in the ears)",
  "Hearing loss",
  "Toothache",
  "Gum pain",
  "Swollen glands",
  "Hoarseness",
  "Wheezing",
  "Tightness in chest",
  "Feeling faint",
  "Tremors",
  "Numbness",
  "Tingling",
  "Changes in taste",
  "Changes in smell",
  "Dry mouth",
  "Excessive thirst",
  "Frequent urination",
  "Painful urination",
  "Blood in urine",
  "Changes in bowel habits",
  "Constipation",
  "Bloating",
  "Gas",
  "Feeling full quickly",
  "Unexplained weight loss",
  "Unexplained weight gain",
  "Hair loss",
  "Dry skin",
  "Brittle nails",
  "Feeling restless",
  "Feeling down",
  "Loss of interest in activities",
  "Increased appetite",
  "Decreased appetite",
  "Feeling agitated",
  "Feeling panicky",
  "Feeling overwhelmed",
  "Feeling lonely",
  "Feeling hopeless",
  "Feeling guilty",
  "Feeling worthless",
  "Thoughts of death or suicide",
  "Increased heart rate",
  "Increased breathing rate",
  "Dry eyes",
  "Watery eyes",
  "Sensitivity to light",
  "Sensitivity to sound",
  "Swollen ankles",
  "Leg cramps",
  "Restless legs",
  "Feeling off-balance",
  "Clumsiness",
  "Speech difficulties",
  "Difficulty swallowing",
  "Heartburn that wakes you up",
  "Coughing up blood",
  "Black, tarry stools",
  "Severe headache with stiff neck",
  "Sudden weakness or numbness on one side of the body",
  "Sudden difficulty speaking or understanding speech",
  "Sudden difficulty seeing in one or both eyes",
  "Sudden dizziness or loss of balance",
  "Severe abdominal pain that comes on suddenly",
  "Yellowing of the skin or eyes (jaundice)",
];

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [symptoms, setSymptoms] = useState("");
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [analysisResults, setAnalysisResults] = useState({
    cause: "",
    treatment: "",
    medication: "",
    homeRemedies: "",
  });
  const [file, setFile] = useState<File | null>(null);

  const handleSymptomToggle = (symptom: string) => {
    setSelectedSymptoms((prev) => {
      if (prev.includes(symptom)) {
        return prev.filter((s) => s !== symptom);
      } else {
        return [...prev, symptom];
      }
    });
  };

  const handleAnalyzeSymptoms = async () => {
    if (!symptoms && selectedSymptoms.length === 0) {
      toast({
        title: "Error",
        description: "Please enter or select at least one symptom",
      });
      return;
    }

    setLoading(true);

    try {
      const allSymptoms = [
        ...selectedSymptoms,
        ...(symptoms ? [symptoms] : []),
      ].filter(Boolean);

      const [causeResponse, treatmentResponse, medicationResponse, homeRemediesResponse] = await Promise.all([
        axios.post("http://localhost:5000/api/gemini/cause", { symptoms: allSymptoms }),
        axios.post("http://localhost:5000/api/gemini/treatment", { symptoms: allSymptoms }),
        axios.post("http://localhost:5000/api/gemini/medication", { symptoms: allSymptoms }),
        axios.post("http://localhost:5000/api/gemini/home-remedies", { symptoms: allSymptoms }),
      ]);

      setAnalysisResults({
        cause: causeResponse.data.responseText,
        treatment: treatmentResponse.data.responseText,
        medication: medicationResponse.data.responseText,
        homeRemedies: homeRemediesResponse.data.responseText,
      });

      setStep(2);
    } catch (error) {
      console.error("Error analyzing symptoms:", error);
      toast({
        title: "Error",
        description: "Failed to analyze symptoms. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white relative overflow-hidden w-full">
      <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Activity className="h-6 w-6 text-blue-600" />
            <h1 className="text-xl font-semibold text-gray-800">QuickMed</h1>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" onClick={() => navigate("/")}>
              <Home size={18} className="mr-2" />
              Home
            </Button>
            <Button variant="ghost" size="sm">
              <UsersRound size={18} className="mr-2" />
              Profile
            </Button>
            <Button variant="ghost" size="sm">
              <LogOut size={18} className="mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Health Assessment
          </h2>

          {step === 1 ? (
            <Card className="bg-white/70 backdrop-blur-md shadow-xl border-t-4 border-blue-600">
              <CardHeader className="bg-blue-50/50 border-b border-blue-100">
                <CardTitle className="text-gray-800">
                  Symptom Analysis
                </CardTitle>
                <CardDescription>
                  Describe your symptoms or select from common options below
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <Textarea
                      placeholder="Describe your symptoms in detail... (e.g., I have a headache and sore throat for 2 days)"
                      className="min-h-[120px] bg-white/80 border-gray-200"
                      value={symptoms}
                      onChange={(e) => setSymptoms(e.target.value)}
                    />
                    <div className="mt-2">
                      <input
                        type="file"
                        onChange={(e) =>
                          setFile(e.target.files ? e.target.files[0] : null)
                        }
                        className="mt-4 text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                      />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-3">
                      Common Symptoms
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {commonSymptoms.map((symptom) => (
                        <div
                          key={symptom}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={`symptom-${symptom}`}
                            checked={selectedSymptoms.includes(symptom)}
                            onCheckedChange={() => handleSymptomToggle(symptom)}
                          />
                          <Label htmlFor={`symptom-${symptom}`}>
                            {symptom}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button
                    onClick={handleAnalyzeSymptoms}
                    disabled={loading}
                    className="w-full md:w-auto"
                  >
                    {loading ? "Analyzing..." : "Analyze Symptoms"}
                    {!loading && <ArrowRight className="ml-2 h-4 w-4" />}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="min-h-screen p-6 w-screen">
  <div className="max-w-4xl mx-auto bg-white text-black rounded-xl shadow-2xl overflow-hidden w-full">
    <div className="bg-black text-white px-8 py-6 border-b border-gray-500 w-full">
      <h2 className="text-3xl font-bold font-mono tracking-tight">⚫ Analysis Results</h2>
    </div>

    <div className="p-8 space-y-10">
      {[
        { title: "Possible Cause", content: analysisResults.cause },
        { title: "Treatment Options", content: analysisResults.treatment },
        { title: "Medication Suggestions", content: analysisResults.medication },
        { title: "Home Remedies", content: analysisResults.homeRemedies },
      ].map((section, index) => (
        <div key={index} className="group">
          <div className="flex items-center mb-4 w-full">
            <div className="h-[2px] w-8 bg-black mr-3" />
            <h3 className="text-xl font-semibold bg-black text-white px-4 py-2 rounded-md border border-black">
              {section.title}
            </h3>
          </div>
          <div className="ml-12 pl-4 border-l-2 border-black prose prose-lg max-w-none">
            <ReactMarkdown
              components={{
                a: ({ node, ...props }) => (
                  <a className="text-black underline hover:text-gray-700" {...props} />
                ),
                ul: ({ node, ...props }) => <ul className="space-y-2 pl-5" {...props} />, 
                li: ({ node, ...props }) => (
                  <li className="relative before:content-['•'] before:absolute before:-left-4 before:text-black" {...props} />
                ),
              }}
            >
              {section.content || "*No data available*"}
            </ReactMarkdown>
          </div>
        </div>
      ))}

      <div className="flex flex-wrap gap-4 mt-12 pt-8 border-t border-black">
        <Button
          variant="outline"
          onClick={() => setStep(1)}
          className="px-8 py-3 bg-transparent border-2 border-black text-black hover:bg-black hover:text-white transition-all duration-200"
        >
          ← Back to Symptoms
        </Button>
        <Button
          onClick={() => navigate("/")}
          disabled={loading}
          className={`px-8 py-3 bg-black text-white hover:bg-gray-700 transition-all duration-200 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Processing..." : "Return to Home →"}
        </Button>
      </div>
    </div>
  </div>
</div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;