import { Button } from "@/components/ui/button";
import { motion, useMotionValue } from "motion/react";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const shapes = ["circle", "square", "triangle", "donut"];
const colors = ["blue", "purple", "teal", "cyan", "indigo"];

const Index = () => {
	const navigate = useNavigate();
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

	// Mouse parallax effect
	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			setMousePosition({ x: e.clientX, y: e.clientY });
		};

		window.addEventListener("mousemove", handleMouseMove);
		return () => {
			window.removeEventListener("mousemove", handleMouseMove);
		};
	}, []);

	return (
		<div className="min-h-screen bg-gradient-to-b from-blue-50 to-white relative overflow-hidden">
			{/* Enhanced animated background elements */}
			<div className="absolute inset-0 w-full h-full overflow-hidden z-0">
				{/* Larger, slower background shapes */}
				{[...Array(8)].map((_, i) => {
					const shape = shapes[Math.floor(Math.random() * shapes.length)];
					const color = colors[Math.floor(Math.random() * colors.length)];
					const baseSize = Math.random() * 300 + 150; // Larger elements

					return (
						<motion.div
							key={`bg-${i}`}
							className={`absolute opacity-10 ${
								shape === "circle"
									? "rounded-full"
									: shape === "square"
									? ""
									: shape === "triangle"
									? "triangle"
									: "donut"
							}`}
							style={{
								background:
									shape === "donut"
										? `transparent`
										: `radial-gradient(circle, ${color}-300, ${color}-600)`,
								boxShadow:
									shape === "donut" ? `0 0 0 20px ${color}-400` : "none",
								width: `${baseSize}px`,
								height: `${baseSize}px`,
							}}
							initial={{
								x: `${Math.random() * 100}%`,
								y: `${Math.random() * 100}%`,
								rotate: Math.random() * 360,
								scale: 0.2,
							}}
							animate={{
								x: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
								y: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
								rotate: [0, 360],
								scale: [0.2, 0.8, 0.2],
							}}
							transition={{
								duration: Math.random() * 60 + 40, // Very slow movement
								repeat: Infinity,
								ease: "easeInOut",
							}}
						/>
					);
				})}

				{/* Medium sized, medium speed shapes */}
				{[...Array(15)].map((_, i) => {
					const shape = shapes[Math.floor(Math.random() * shapes.length)];
					const color = colors[Math.floor(Math.random() * colors.length)];
					const baseSize = Math.random() * 150 + 50;

					// Dynamic movement influenced by mouse position
					const x = useMotionValue(Math.random() * 100);
					const y = useMotionValue(Math.random() * 100);

					useEffect(() => {
						const mouseXInfluence =
							(mousePosition.x / window.innerWidth - 0.5) * 10;
						const mouseYInfluence =
							(mousePosition.y / window.innerHeight - 0.5) * 10;

						x.set(x.get() + mouseXInfluence);
						y.set(y.get() + mouseYInfluence);
					}, [mousePosition]);

					return (
						<motion.div
							key={`md-${i}`}
							className={`absolute ${
								shape === "circle"
									? "rounded-full"
									: shape === "square"
									? "rounded-lg"
									: shape === "triangle"
									? "triangle"
									: "donut"
							}`}
							style={{
								background:
									shape === "donut"
										? "transparent"
										: `linear-gradient(135deg, ${color}-400, ${color}-600)`,
								border: shape === "donut" ? `15px solid ${color}-500` : "none",
								width: `${baseSize}px`,
								height: `${baseSize}px`,
								backdropFilter: "blur(8px)",
							}}
							initial={{
								x: `${Math.random() * 100}%`,
								y: `${Math.random() * 100}%`,
								opacity: 0,
							}}
							animate={{
								x: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
								y: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
								rotate: [0, Math.random() * 360],
								scale: [0, 1, 0.5],
								opacity: [0, 0.3, 0],
							}}
							transition={{
								duration: Math.random() * 30 + 20,
								repeat: Infinity,
								repeatType: "reverse",
								ease: "easeInOut",
							}}
						/>
					);
				})}

				{/* Smaller, faster moving foreground elements */}
				{[...Array(25)].map((_, i) => {
					const shape = shapes[Math.floor(Math.random() * shapes.length)];
					const color = colors[Math.floor(Math.random() * colors.length)];
					const size = Math.random() * 50 + 20;
					const xStart = Math.random() * 100;
					const yStart = Math.random() * 100;
					const duration = Math.random() * 15 + 5;

					return (
						<motion.div
							key={`fg-${i}`}
							className={`absolute ${
								shape === "circle"
									? "rounded-full"
									: shape === "square"
									? "rounded-md"
									: shape === "triangle"
									? "triangle"
									: "donut"
							}`}
							style={{
								background:
									shape === "donut"
										? "transparent"
										: `radial-gradient(circle, ${color}-200 0%, ${color}-500 100%)`,
								border: shape === "donut" ? `5px solid ${color}-400` : "none",
								width: `${size}px`,
								height: `${size}px`,
								filter: "blur(1px)",
							}}
							initial={{
								x: `${xStart}%`,
								y: `${yStart}%`,
								opacity: 0,
								scale: 0,
							}}
							animate={{
								x: [`${xStart}%`, `${(xStart + 30) % 100}%`],
								y: [`${yStart}%`, `${(yStart + 40) % 100}%`],
								rotate: [0, 360],
								scale: [0, 1, 0],
								opacity: [0, 0.7, 0],
							}}
							transition={{
								duration: duration,
								repeat: Infinity,
								ease: "easeInOut",
								delay: Math.random() * 2,
							}}
						/>
					);
				})}

				{/* Floating particles */}
				{[...Array(40)].map((_, i) => (
					<motion.div
						key={`particle-${i}`}
						className="absolute rounded-full bg-white"
						style={{
							width: `${Math.random() * 8 + 2}px`,
							height: `${Math.random() * 8 + 2}px`,
							boxShadow: `0 0 ${Math.random() * 10 + 5}px ${
								colors[Math.floor(Math.random() * colors.length)]
							}-300`,
						}}
						initial={{
							x: `${Math.random() * 100}%`,
							y: `${Math.random() * 100}%`,
							opacity: 0,
						}}
						animate={{
							y: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
							opacity: [0, 0.8, 0],
						}}
						transition={{
							duration: Math.random() * 10 + 10,
							repeat: Infinity,
							ease: "easeInOut",
						}}
					/>
				))}

				{/* Gradient overlay */}
				<div className="absolute inset-0 bg-gradient-radial from-transparent to-white opacity-70"></div>
			</div>

			{/* Content */}
			<div className="container mx-auto px-4 py-16 relative z-10">
				<div className="max-w-3xl mx-auto text-center">
					<motion.div
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
					>
						<h1 className="text-5xl font-bold mb-6 text-blue-900">
							AI Health Advisor
						</h1>
						<p className="text-xl mb-8 text-gray-700">
							Analyze your symptoms, get personalized health recommendations,
							and discover potential remedies powered by advanced AI.
						</p>
					</motion.div>

					<motion.div
						className="flex flex-col sm:flex-row gap-4 justify-center"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.3 }}
					>
						<Button
							size="lg"
							className="bg-blue-700 hover:bg-blue-800"
							onClick={() => navigate("/login")}
						>
							Login to Start
						</Button>
						<Button
							variant="outline"
							size="lg"
							className="border-blue-700 text-blue-700 hover:bg-blue-50"
							onClick={() => navigate("/signup")}
						>
							Sign Up Now
						</Button>
					</motion.div>

					<motion.div
						className="mt-16"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.8, delay: 0.6 }}
					>
						<h2 className="text-2xl font-semibold mb-6 text-blue-900">
							How It Works
						</h2>
						<div className="grid md:grid-cols-3 gap-8">
							<div className="bg-white bg-opacity-80 backdrop-blur-sm p-6 rounded-lg shadow-md">
								<div className="text-3xl mb-4 text-blue-700">1</div>
								<h3 className="font-medium mb-2">Enter Your Symptoms</h3>
								<p className="text-gray-600">
									Describe what you're experiencing in detail
								</p>
							</div>
							<div className="bg-white bg-opacity-80 backdrop-blur-sm p-6 rounded-lg shadow-md">
								<div className="text-3xl mb-4 text-blue-700">2</div>
								<h3 className="font-medium mb-2">AI Analysis</h3>
								<p className="text-gray-600">
									Our AI processes your symptoms and medical data
								</p>
							</div>
							<div className="bg-white bg-opacity-80 backdrop-blur-sm p-6 rounded-lg shadow-md">
								<div className="text-3xl mb-4 text-blue-700">3</div>
								<h3 className="font-medium mb-2">Get Recommendations</h3>
								<p className="text-gray-600">
									Receive personalized remedies and advice
								</p>
							</div>
						</div>
					</motion.div>

					<motion.div
						className="mt-12"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.8, delay: 0.9 }}
					>
						<Button
							size="lg"
							className="bg-blue-700 hover:bg-blue-800"
							onClick={() => navigate("/dashboard")}
						>
							Try Now <ArrowRight className="ml-2" />
						</Button>
					</motion.div>
				</div>
			</div>
		</div>
	);
};

export default Index;
