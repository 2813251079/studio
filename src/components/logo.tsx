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
      <radialGradient id="darkTurquoiseGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
        <stop offset="0%" style={{ stopColor: "hsl(195, 83%, 25%)" }} />
        <stop offset="100%" style={{ stopColor: "hsl(195, 83%, 15%)" }} />
      </radialGradient>
    </defs>
    
    <circle cx="60" cy="60" r="60" fill="url(#darkTurquoiseGradient)" />

    <g stroke="hsl(195, 30%, 70%)" strokeWidth="1.5">
      <path d="M 25 48 H 95" />
      <path d="M 25 56 H 95" />
      <path d="M 25 64 H 95" />
      <path d="M 25 72 H 95" />
      <path d="M 25 80 H 95" />
    </g>

    <g transform="translate(5, -2)">
      <path
        d="M 50 45 C 35 50, 35 80, 50 95"
        stroke="hsl(var(--primary))"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="50" cy="45" r="7" fill="hsl(var(--primary))" />
      <circle cx="70" cy="68" r="4" fill="hsl(var(--primary))" />
      <circle cx="70" cy="76" r="4" fill="hsl(var(--primary))" />
    </g>
  </svg>
);

export default Logo;
