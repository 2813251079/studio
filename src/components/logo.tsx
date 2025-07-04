import * as React from "react";
import { cn } from "@/lib/utils";

const Logo = ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 120 120"
    xmlns="http://www.w3.org/2000/svg"
    className={cn("h-auto", className)}
    {...props}
  >
    <defs>
      <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: "hsl(var(--primary))" }} />
        <stop offset="100%" style={{ stopColor: "hsl(var(--accent))" }} />
      </linearGradient>
    </defs>
    <circle cx="60" cy="60" r="60" fill="url(#logoGradient)" />
    <g transform="translate(0, 2)">
      <circle cx="60" cy="60" r="28" stroke="white" strokeWidth="6" fill="none" />
      <path
        d="M 42 68 Q 51 52 60 63 T 78 68"
        stroke="white"
        strokeWidth="6"
        fill="none"
        strokeLinecap="round"
      />
    </g>
  </svg>
);

export default Logo;
