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
      <radialGradient id="sunsetGradient" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#FDB813" />
        <stop offset="100%" stopColor="#F65B36" />
      </radialGradient>
    </defs>
    
    {/* Guitar Body */}
    <g transform="translate(68, 67.5) scale(0.35) translate(-150, -235)">
      <path
        d="M 150 305 C 80 320, 70 260, 105 220 C 120 195, 180 195, 195 220 C 230 260, 220 320, 150 305 Z"
        fill="url(#sunsetGradient)"
      />
    </g>

    {/* Guitar Headstock */}
    <g transform="translate(37, 15)">
        {/* Vertical neck/headstock */}
        <path d="M -5 0 L 5 0 L 5 40 C 15 50, -15 50, -5 40 Z" fill="#000" />
        <rect x="-5" y="40" width="10" height="50" fill="#000" />
        
        {/* Pegs */}
        <circle cx="-10" cy="10" r="3" fill="#000"/>
        <circle cx="-10" cy="10" r="1" fill="hsl(var(--background))"/>
        <circle cx="-10" cy="25" r="3" fill="#000"/>
        <circle cx="-10" cy="25" r="1" fill="hsl(var(--background))"/>
        
        <circle cx="10" cy="10" r="3" fill="#000"/>
        <circle cx="10" cy="10" r="1" fill="hsl(var(--background))"/>
        <circle cx="10" cy="25" r="3" fill="#000"/>
        <circle cx="10" cy="25" r="1" fill="hsl(var(--background))"/>
    </g>

    {/* Pentagram and F-Clef */}
    <g transform="translate(47.5, 54) scale(1.1)">
        <g stroke="hsl(var(--muted-foreground))" strokeWidth="1.5">
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
            stroke="#48D1CC"
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
          />
          <circle cx="12" cy="24" r="5" fill="#48D1CC" />
          {/* Two dots for the F-clef */}
          <circle cx="30" cy="20" r="3" fill="#48D1CC" />
          <circle cx="30" cy="28" r="3" fill="#48D1CC" />
        </g>
    </g>
  </svg>
);

export default Logo;
