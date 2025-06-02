import { cn } from "../../lib/utils";
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "solid" | "ghost";
}

export function Button({ children, className = "", variant = "solid", ...props }: ButtonProps) {
  const base =
    variant === "ghost"
      ? "bg-transparent border border-white hover:bg-white hover:text-black"
      : "bg-indigo-600 hover:bg-indigo-500";

  return (
    <button
      className={cn("px-4 py-2 rounded-xl font-medium", base, className)}
      {...props}
    >
      {children}
    </button>
  );
}
