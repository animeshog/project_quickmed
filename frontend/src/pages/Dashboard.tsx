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
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  Home,
  LogOut,
  UsersRound,
  FileText,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CategorizedSymptoms from "@/components/CategorizedSymptoms";
import Logo from "@/components/Logo";

const symptomCategories = {
  "General Symptoms": [
    "Fever",
    "Fatigue",
    "Chills",
    "Sweating",
    "Night sweats",
    "Unexplained weight loss",
    "Unexplained weight gain",
  ],
  "Head and Face": [
    "Headache",
    "Sore throat",
    "Runny nose",
    "Sneezing",
    "Blocked nose",
    "Toothache",
    "Gum pain",
    "Swollen glands",
    "Hoarseness",
    "Blurred vision",
    "Double vision",
    "Eye pain",
    "Earache",
    "Tinnitus (ringing in the ears)",
    "Hearing loss",
    "Changes in taste",
    "Changes in smell",
    "Dry mouth",
  ],
  "Respiratory Symptoms": [
    "Cough",
    "Shortness of breath",
    "Wheezing",
    "Tightness in chest",
    "Coughing up blood",
  ],
  "Digestive Symptoms": [
    "Nausea",
    "Diarrhea",
    "Vomiting",
    "Abdominal pain",
    "Heartburn",
    "Indigestion",
    "Loss of appetite",
    "Changes in bowel habits",
    "Constipation",
    "Bloating",
    "Gas",
    "Feeling full quickly",
    "Black, tarry stools",
  ],
  "Musculoskeletal Symptoms": [
    "Muscle pain",
    "Joint pain",
    "Back pain",
    "Leg cramps",
  ],
  "Cardiovascular Symptoms": [
    "Chest pain",
    "Palpitations",
    "Increased heart rate",
    "Increased breathing rate",
    "Swollen ankles",
  ],
  "Skin Symptoms": [
    "Skin rash",
    "Itching",
    "Hives",
    "Swelling",
    "Redness",
    "Warmth to touch",
    "Dry skin",
    "Brittle nails",
  ],
  "Neurological Symptoms": [
    "Dizziness",
    "Lightheadedness",
    "Weakness",
    "Feeling faint",
    "Tremors",
    "Numbness",
    "Tingling",
    "Feeling off-balance",
    "Clumsiness",
    "Speech difficulties",
    "Difficulty swallowing",
    "Severe headache with stiff neck",
    "Sudden weakness or numbness on one side of the body",
    "Sudden difficulty speaking or understanding speech",
    "Sudden difficulty seeing in one or both eyes",
    "Sudden dizziness or loss of balance",
  ],
  "Sleep and Mental Health": [
    "Difficulty sleeping",
    "Excessive sleepiness",
    "Feeling anxious",
    "Feeling stressed",
    "Feeling irritable",
    "Difficulty concentrating",
    "Memory problems",
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
  ],
  "Urinary Symptoms": [
    "Frequent urination",
    "Painful urination",
    "Blood in urine",
  ],
  Other: [
    "Feeling hot",
    "Feeling cold",
    "Dry eyes",
    "Watery eyes",
    "Sensitivity to light",
    "Sensitivity to sound",
    "Restless legs",
    "Heartburn that wakes you up",
    "Severe abdominal pain that comes on suddenly",
    "Yellowing of the skin or eyes (jaundice)",
  ],
};

interface AnalysisResults {
  cause: string;
  treatment: string;
  medication: string;
  homeRemedies: string;
  fileAnalysis: string;
}

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
    fileAnalysis: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [activeTab, setActiveTab] = useState("cause");

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
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const allSymptoms = [
        ...selectedSymptoms,
        ...(symptoms ? [symptoms] : []),
      ].filter(Boolean);

      // Handle basic symptom analysis first
      const [causeRes, treatmentRes, medicationRes, homeRemediesRes] =
        await Promise.all([
          axios.post("http://localhost:5000/api/gemini/cause", {
            symptoms: allSymptoms,
          }),
          axios.post("http://localhost:5000/api/gemini/treatment", {
            symptoms: allSymptoms,
          }),
          axios.post("http://localhost:5000/api/gemini/medication", {
            symptoms: allSymptoms,
          }),
          axios.post("http://localhost:5000/api/gemini/home-remedies", {
            symptoms: allSymptoms,
          }),
        ]);

      const results: AnalysisResults = {
        cause: causeRes.data.responseText,
        treatment: treatmentRes.data.responseText,
        medication: medicationRes.data.responseText,
        homeRemedies: homeRemediesRes.data.responseText,
        fileAnalysis: "",
      };

      // Handle file upload if present
      if (file) {
        const formData = new FormData();
        formData.append("file", file);

        const fileRes = await axios.post(
          "http://localhost:5000/api/gemini/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (fileRes.data.success) {
          results.fileAnalysis = fileRes.data.responseText;
        }
      }

      setAnalysisResults(results);
      setStep(2);
    } catch (error: any) {
      console.error("Error analyzing symptoms:", error);
      toast({
        title: "Error",
        description:
          error.response?.data?.message || "Failed to analyze symptoms",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadReport = () => {
    toast({
      title: "Coming Soon!",
      description: "The download report feature will be available soon.",
      variant: "default",
    });
  };

  const handleProfileClick = () => {
    navigate("/profile");
  };

  const handleHomeClick = () => {
    navigate("/"); // Changed from dashboard to index
  };

  const resultTabs = [
    {
      id: "cause",
      title: "Possible Cause",
      icon: "🔍",
      color: "from-amber-500 to-orange-600",
      bgColor: "bg-amber-50",
      content: analysisResults.cause,
    },
    {
      id: "treatment",
      title: "Treatment",
      icon: "💊",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      content: analysisResults.treatment,
    },
    {
      id: "medication",
      title: "Medication",
      icon: "💉",
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      content: analysisResults.medication,
    },
    {
      id: "remedies",
      title: "Home Remedies",
      icon: "🏠",
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      content: analysisResults.homeRemedies,
    },
  ].concat(
    analysisResults.fileAnalysis
      ? [
          {
            id: "fileAnalysis",
            title: "Report Analysis",
            icon: "📄",
            color: "from-teal-500 to-teal-600",
            bgColor: "bg-teal-50",
            content: analysisResults.fileAnalysis,
          },
        ]
      : []
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <header className="bg-white/95 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-blue-100">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Logo />
          <nav className="flex gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleHomeClick}
              className="hover:bg-blue-50"
            >
              <Home size={18} className="mr-2" />
              Home
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleProfileClick}
              className="hover:bg-blue-50"
            >
              <UsersRound size={18} className="mr-2" />
              Profile
            </Button>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto"
        >
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-3xl font-bold text-gray-800">
              Health Assessment
            </h2>
            {step === 2 && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setStep(1)}
                className="ml-auto"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            )}
          </div>

          {step === 1 ? (
            <Card className="bg-white/80 backdrop-blur-lg shadow-xl border-t-4 border-blue-500 transition-all duration-300">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100/50 border-b border-blue-100">
                <CardTitle className="text-xl text-gray-800">
                  Describe Your Symptoms
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Please enter your symptoms or select from the common options
                  below
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-8">
                  <div className="space-y-4">
                    <Label htmlFor="symptoms" className="text-gray-700">
                      Symptom Description
                    </Label>
                    <Textarea
                      id="symptoms"
                      placeholder="Describe your symptoms in detail... (e.g., I have been experiencing..."
                      className="min-h-[120px] bg-white/90 border-gray-200 focus:border-blue-300 focus:ring-blue-200"
                      value={symptoms}
                      onChange={(e) => setSymptoms(e.target.value)}
                    />
                    <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                      <Label className="text-blue-700 mb-2 block">
                        Upload Medical Reports (Optional)
                      </Label>
                      <input
                        type="file"
                        onChange={(e) =>
                          setFile(e.target.files ? e.target.files[0] : null)
                        }
                        className="text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-blue-500 file:text-white hover:file:bg-blue-600"
                      />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                      Common Symptoms
                    </h3>
                    <CategorizedSymptoms
                      symptoms={symptomCategories}
                      selectedSymptoms={selectedSymptoms}
                      onSymptomToggle={handleSymptomToggle}
                    />
                  </div>

                  <Button
                    onClick={handleAnalyzeSymptoms}
                    disabled={loading}
                    className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-md"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                        Analyzing...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        Analyze Symptoms
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="min-h-0 p-6">
              {" "}
              {/* Changed min-h-screen to min-h-0 */}
              <div className="max-w-4xl mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
                  {" "}
                  {/* Changed to md:grid-cols-5 */}
                  {resultTabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`p-4 rounded-xl border transition-all duration-200 ${
                        activeTab === tab.id
                          ? `bg-gradient-to-r ${tab.color} text-white shadow-lg scale-[1.02]`
                          : "bg-white hover:scale-[1.02]"
                      }`}
                    >
                      <div className="flex flex-col items-center gap-2 text-center">
                        <span className="text-2xl">{tab.icon}</span>
                        <span className="font-semibold">{tab.title}</span>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                  {resultTabs.map(
                    (tab) =>
                      activeTab === tab.id && (
                        <div key={tab.id} className="animate-fadeIn">
                          <div
                            className={`bg-gradient-to-r ${tab.color} text-white px-8 py-6`}
                          >
                            <h2 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                              <span>{tab.icon}</span>
                              {tab.title}
                            </h2>
                          </div>
                          <div className={`p-8 ${tab.bgColor}`}>
                            <div className="prose prose-lg max-w-none">
                              <ReactMarkdown
                                components={{
                                  a: ({ ...props }) => (
                                    <a
                                      className="text-blue-600 hover:text-blue-800 underline"
                                      {...props}
                                    />
                                  ),
                                  ul: ({ ...props }) => (
                                    <ul
                                      className="space-y-3 list-disc pl-5"
                                      {...props}
                                    />
                                  ),
                                  li: ({ ...props }) => (
                                    <li className="text-gray-700" {...props} />
                                  ),
                                  p: ({ ...props }) => (
                                    <p
                                      className="mb-4 text-gray-700 leading-relaxed"
                                      {...props}
                                    />
                                  ),
                                }}
                              >
                                {tab.content || "*No data available*"}
                              </ReactMarkdown>
                            </div>
                          </div>
                        </div>
                      )
                  )}

                  <div className="flex flex-wrap items-center justify-between p-8 bg-gray-50 border-t">
                    <div className="flex gap-4 flex-wrap">
                      <Button
                        variant="outline"
                        onClick={() => setStep(1)}
                        className="flex items-center gap-2 hover:bg-gray-100"
                      >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Symptoms
                      </Button>
                      <Button
                        onClick={handleDownloadReport}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        Download Report
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
};

export default Dashboard;