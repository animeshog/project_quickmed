import { HeartPulse } from "lucide-react";

interface LogoProps {
  className?: string;
}

const Logo = ({ className }: LogoProps) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <HeartPulse className="h-8 w-8 text-rose-500" />
      <span className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-indigo-600 bg-clip-text text-transparent">
        QuickMed
      </span>
    </div>
  );
};

export default Logo;
