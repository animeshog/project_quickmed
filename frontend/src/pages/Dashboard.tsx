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
];

const Dashboard = () => {
	const navigate = useNavigate();
	const { toast } = useToast();
	const [symptoms, setSymptoms] = useState("");
	const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
	const [questions, setQuestions] = useState<string[]>([]);
	const [answers, setAnswers] = useState<Record<string, string>>({});
	const [loading, setLoading] = useState(false);
	const [step, setStep] = useState(1);

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
			// Combine manually entered symptoms with selected ones
			const allSymptoms = [
				...selectedSymptoms,
				...(symptoms ? [symptoms] : []),
			].filter(Boolean);

			// API call to analyze symptoms
			const response = await fetch("/api/gpt/analyze-symptoms", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ symptoms: allSymptoms }),
			});

			if (!response.ok) throw new Error("Failed to analyze symptoms");

			const data = await response.json();
			setQuestions(data.questions || []);
			setStep(2);

			toast({
				title: "Analysis Complete",
				description: "Please answer the follow-up questions",
			});
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

	const handleAnswerChange = (question: string, answer: string) => {
		setAnswers((prev) => ({
			...prev,
			[question]: answer,
		}));
	};

	const handleSubmitAnswers = async () => {
		if (Object.keys(answers).length < questions.length) {
			toast({
				title: "Incomplete",
				description: "Please answer all questions for a better diagnosis",
			});
			return;
		}

		setLoading(true);

		try {
			// API call to generate diagnosis
			const response = await fetch("/api/gpt/generate-diagnosis", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					symptoms: [...selectedSymptoms, symptoms].filter(Boolean),
					answers: Object.values(answers),
				}),
			});

			if (!response.ok) throw new Error("Failed to generate diagnosis");

			const diagnosisData = await response.json();

			// Store diagnosis in session storage to retrieve on results page
			sessionStorage.setItem("diagnosisData", JSON.stringify(diagnosisData));

			// Navigate to results page
			navigate("/results");
		} catch (error) {
			console.error("Error generating diagnosis:", error);
			toast({
				title: "Error",
				description: "Failed to generate diagnosis. Please try again.",
			});
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen bg-gray-50">
			{/* Header/Nav */}
			<header className="bg-white shadow-sm">
				<div className="container mx-auto px-4 py-4 flex justify-between items-center">
					<div className="flex items-center">
						<Activity className="h-6 w-6 text-blue-600 mr-2" />
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
						<Card>
							<CardHeader>
								<CardTitle>Symptom Analysis</CardTitle>
								<CardDescription>
									Describe your symptoms or select from common options below
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="space-y-6">
									<div>
										<Textarea
											placeholder="Describe your symptoms in detail... (e.g., I have a headache and sore throat for 2 days)"
											className="min-h-[120px]"
											value={symptoms}
											onChange={(e) => setSymptoms(e.target.value)}
										/>
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
						<Card>
							<CardHeader>
								<CardTitle>Follow-up Questions</CardTitle>
								<CardDescription>
									Please answer these questions to get a more accurate
									assessment
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="space-y-6">
									{questions.map((question, index) => (
										<div key={index} className="space-y-2">
											<Label htmlFor={`question-${index}`}>{question}</Label>
											<Textarea
												id={`question-${index}`}
												placeholder="Your answer..."
												value={answers[question] || ""}
												onChange={(e) =>
													handleAnswerChange(question, e.target.value)
												}
											/>
										</div>
									))}

									<div className="flex gap-4">
										<Button variant="outline" onClick={() => setStep(1)}>
											Back to Symptoms
										</Button>
										<Button onClick={handleSubmitAnswers} disabled={loading}>
											{loading ? "Generating..." : "Generate Assessment"}
											{!loading && <ArrowRight className="ml-2 h-4 w-4" />}
										</Button>
									</div>
								</div>
							</CardContent>
						</Card>
					)}
				</motion.div>
			</div>
		</div>
	);
};

export default Dashboard;
