import AnimatedBackground from "@/components/AnimatedBackground";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, Lock, Mail, User } from "lucide-react";
import { motion } from "motion/react";
import * as React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
	const [fullName, setFullName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();
	const { toast } = useToast();

	const handleSignup = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!fullName || !email || !password || !confirmPassword) {
			toast({
				title: "Error",
				description: "Please fill in all fields",
			});
			return;
		}

		if (password !== confirmPassword) {
			toast({
				title: "Error",
				description: "Passwords do not match",
			});
			return;
		}

		setIsLoading(true);

		try {
			// In a real app, this would be an API call to create account
			// This is just a mock for demonstration
			await new Promise((resolve) => setTimeout(resolve, 1500));

			toast({
				title: "Account Created",
				description: "Your account has been created successfully!",
			});

			navigate("/login");
		} catch (error) {
			toast({
				title: "Error",
				description: "Failed to create account. Please try again.",
			});
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="min-h-screen bg-gradient-to-b from-blue-50 to-white relative overflow-hidden flex items-center justify-center p-4">
			<AnimatedBackground intensity="low" />

			<motion.div
				className="w-full max-w-md relative z-10"
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
			>
				<Card className="border-none shadow-lg">
					<CardHeader className="space-y-1">
						<div className="text-center">
							<h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-500 to-indigo-700 mb-1">
								QuickMed
							</h1>
						</div>
						<CardTitle className="text-2xl font-bold text-center">
							Create an Account
						</CardTitle>
						<CardDescription className="text-center">
							Enter your information to create your account
						</CardDescription>
					</CardHeader>
					<CardContent>
						<form onSubmit={handleSignup} className="space-y-4">
							<div className="space-y-2">
								<Label htmlFor="name">Full Name</Label>
								<div className="relative">
									<User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
									<Input
										id="name"
										placeholder="John Doe"
										value={fullName}
										onChange={(e) => setFullName(e.target.value)}
										className="pl-10"
										required
									/>
								</div>
							</div>
							<div className="space-y-2">
								<Label htmlFor="email">Email</Label>
								<div className="relative">
									<Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
									<Input
										id="email"
										type="email"
										placeholder="you@example.com"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										className="pl-10"
										required
									/>
								</div>
							</div>
							<div className="space-y-2">
								<Label htmlFor="password">Password</Label>
								<div className="relative">
									<Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
									<Input
										id="password"
										type="password"
										placeholder="••••••••"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										className="pl-10"
										required
									/>
								</div>
							</div>
							<div className="space-y-2">
								<Label htmlFor="confirmPassword">Confirm Password</Label>
								<div className="relative">
									<Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
									<Input
										id="confirmPassword"
										type="password"
										placeholder="••••••••"
										value={confirmPassword}
										onChange={(e) => setConfirmPassword(e.target.value)}
										className="pl-10"
										required
									/>
								</div>
							</div>
							<Button
								type="submit"
								className="w-full bg-blue-700 hover:bg-blue-800"
								disabled={isLoading}
							>
								{isLoading ? (
									<>
										<div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
										Creating Account...
									</>
								) : (
									<>
										Create Account <ArrowRight className="ml-2 h-4 w-4" />
									</>
								)}
							</Button>
						</form>
					</CardContent>
					<CardFooter className="flex flex-col space-y-4 border-t pt-4">
						<div className="text-sm text-center text-gray-700">
							Already have an account?{" "}
							<Link
								to="/login"
								className="text-blue-700 hover:text-blue-900 font-medium"
							>
								Sign in
							</Link>
						</div>
						<Button
							variant="outline"
							className="w-full"
							onClick={() => navigate("/")}
						>
							Back to Home
						</Button>
					</CardFooter>
				</Card>
			</motion.div>
		</div>
	);
};

export default Signup;
