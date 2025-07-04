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
    <g transform="translate(20, 22) scale(0.9)" fill="hsl(var(--primary))" stroke="white" strokeWidth="2.5">
      <path
        d="M45.5,20.5C57.6,20.5,65,29.3,65,40.5c0,11.1-7.4,20-19.5,20c-12.1,0-19.5-8.9-19.5-20 C26,29.3,33.4,20.5,45.5,20.5z"
      />
      <circle cx="74" cy="33" r="6" />
      <circle cx="74" cy="50" r="6" />
    </g>
  </svg>
);

export default Logo;
