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
import { motion } from "motion/react";
import { ArrowRight, Lock, Mail } from "lucide-react";
import * as React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();
	const { toast } = useToast();

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!email || !password) {
			toast({
				title: "Error",
				description: "Please fill in all fields",
			});
			return;
		}

		setIsLoading(true);

		try {
			// In a real app, this would be an API call to authenticate
			// This is just a mock for demonstration
			await new Promise((resolve) => setTimeout(resolve, 1500));

			// Mock successful login
			toast({
				title: "Success",
				description: "You have successfully logged in",
			});

			// Navigate to dashboard
			navigate("/dashboard");
		} catch (error) {
			toast({
				title: "Authentication Error",
				description: "Invalid email or password",
			});
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center p-4">
			<motion.div
				className="w-full max-w-md"
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
			>
				<Card className="border-none shadow-lg">
					<CardHeader className="space-y-1">
						<CardTitle className="text-2xl font-bold text-center">
							Login
						</CardTitle>
						<CardDescription className="text-center">
							Enter your credentials to access your account
						</CardDescription>
					</CardHeader>
					<CardContent>
						<form onSubmit={handleLogin} className="space-y-4">
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
								<div className="flex justify-between items-center">
									<Label htmlFor="password">Password</Label>
									<Link
										to="/forgot-password"
										className="text-sm text-blue-600 hover:text-blue-800"
									>
										Forgot password?
									</Link>
								</div>
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
							<Button
								type="submit"
								className="w-full bg-blue-700 hover:bg-blue-800"
								disabled={isLoading}
							>
								{isLoading ? (
									<>
										<div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
										Logging in...
									</>
								) : (
									<>
										Sign In <ArrowRight className="ml-2 h-4 w-4" />
									</>
								)}
							</Button>
						</form>
					</CardContent>
					<CardFooter className="flex flex-col space-y-4 border-t pt-4">
						<div className="text-sm text-center text-gray-700">
							Don't have an account?{" "}
							<Link
								to="/signup"
								className="text-blue-700 hover:text-blue-900 font-medium"
							>
								Sign up
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

export default Login;
