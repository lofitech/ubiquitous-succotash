import { cn } from "../../lib/utils";
interface CardProps {
  className?: string;
  children: React.ReactNode;
}

export function Card({ className = "", children }: CardProps) {
  return <div className={cn("rounded-2xl shadow p-2", className)}>{children}</div>;
}

export function CardContent({ className = "", children }: CardProps) {
  return <div className={className}>{children}</div>;
}
