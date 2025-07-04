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

    {/* Guitar Headstock */}
    <g transform="translate(34, 20)">
        {/* Vertical black neck/headstock */}
        <path d="M -5 0 L 5 0 L 5 40 C 15 50, -15 50, -5 40 Z" fill="#1C1C1C" />
        <rect x="-5" y="40" width="10" height="50" fill="#1C1C1C" />
        
        {/* Pegs */}
        <circle cx="-10" cy="10" r="3" fill="#B0B0B0"/>
        <circle cx="-10" cy="10" r="1" fill="black"/>
        <circle cx="-10" cy="25" r="3" fill="#B0B0B0"/>
        <circle cx="-10" cy="25" r="1" fill="black"/>
        
        <circle cx="10" cy="10" r="3" fill="#B0B0B0"/>
        <circle cx="10" cy="10" r="1" fill="black"/>
        <circle cx="10" cy="25" r="3" fill="#B0B0B0"/>
        <circle cx="10" cy="25" r="1" fill="black"/>
    </g>

    {/* Pentagram and F-Clef */}
    <g transform="translate(46, 50)">
        <g stroke="hsl(195, 30%, 70%)" strokeWidth="1.5">
          <path d="M 0 0 H 55" />
          <path d="M 0 8 H 55" />
          <path d="M 0 16 H 55" />
          <path d="M 0 24 H 55" />
          <path d="M 0 32 H 55" />
        </g>

        <g transform="translate(10, 0)">
          {/* F-Clef shape */}
          <path
            d="M12,24 C 25,10 25,45 12,45"
            stroke="hsl(var(--primary))"
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
          />
          <circle cx="12" cy="24" r="5" fill="hsl(var(--primary))" />
          {/* Two dots for the F-clef */}
          <circle cx="30" cy="20" r="3" fill="hsl(var(--primary))" />
          <circle cx="30" cy="28" r="3" fill="hsl(var(--primary))" />
        </g>
    </g>
  </svg>
);

export default Logo;
