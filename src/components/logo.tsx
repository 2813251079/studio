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

    {/* Guitar Headstock & Neck */}
    <g transform="translate(37, 15)">
        {/* Headstock */}
        <path d="M 5 0 L -5 0 L -5 40 C -15 50, 5 55, 5 40 Z" fill="hsl(var(--primary))" />
        {/* Neck */}
        <rect x="-5" y="40" width="10" height="50" fill="hsl(var(--primary))" />
        
        {/* Frets */}
        <g fill="hsl(var(--border))">
            <rect x="-5" y="48" width="10" height="1" />
            <rect x="-5" y="55" width="10" height="1" />
            <rect x="-5" y="62" width="10" height="1" />
            <rect x="-5" y="69" width="10" height="1" />
            <rect x="-5" y="76" width="10" height="1" />
            <rect x="-5" y="83" width="10" height="1" />
        </g>

        {/* Pegs */}
        <g fill="#000">
            <circle cx="-10" cy="10" r="3"/>
            <circle cx="-10" cy="25" r="3"/>
            <circle cx="10" cy="20" r="3"/>
            <circle cx="10" cy="35" r="3"/>
        </g>
        <g fill="hsl(var(--background))">
            <circle cx="-10" cy="10" r="1"/>
            <circle cx="-10" cy="25" r="1"/>
            <circle cx="10" cy="20" r="1"/>
            <circle cx="10" cy="35" r="1"/>
        </g>
    </g>

    {/* Pentagram and F-Clef */}
    <g transform="translate(44, 54) scale(1.1)">
        <g stroke="hsl(var(--muted-foreground))" strokeWidth="1.5">
          <path d="M 0 0 H 55" />
          <path d="M 0 8 H 55" />
          <path d="M 0 16 H 55" />
          <path d="M 0 24 H 55" />
          <path d="M 0 32 H 55" />
        </g>

        <g transform="translate(10, 0)">
          {/* F-Clef shape, moved up to center on the top line */}
          <path
            d="M12,0 C 25,-14 25,21 12,21"
            stroke="hsl(var(--accent))"
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
          />
          <circle cx="12" cy="0" r="5" fill="hsl(var(--accent))" />
          {/* Two dots for the F-clef, straddling the top line */}
          <circle cx="28" cy="-4" r="3" fill="hsl(var(--accent))" />
          <circle cx="28" cy="4" r="3" fill="hsl(var(--accent))" />
        </g>
    </g>
  </svg>
);

export default Logo;
