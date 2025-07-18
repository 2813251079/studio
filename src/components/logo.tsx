import * as React from "react";
import { cn } from "@/lib/utils";

const Logo = ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 150 120"
    xmlns="http://www.w3.org/2000/svg"
    className={cn("h-auto", className)}
    {...props}
  >
    <defs>
      <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#2ca064" />
          <stop offset="50%" stopColor="#F65B36" />
          <stop offset="100%" stopColor="#FDB813" />
      </linearGradient>
      <radialGradient id="sunsetGradient" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#FDB813" />
        <stop offset="100%" stopColor="#F65B36" />
      </radialGradient>
    </defs>
    <g transform="translate(21, 14.5) scale(0.9)">
      {/* Guitar Body */}
      <circle cx="68" cy="78" r="25" fill="url(#sunsetGradient)" />

      {/* Guitar Headstock & Neck */}
      <g transform="translate(42, 17)">
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
              <circle cx="-10" cy="15" r="3"/>
              <circle cx="10" cy="15" r="3"/>
              <circle cx="-10" cy="30" r="3"/>
              <circle cx="10" cy="30" r="3"/>
          </g>
          <g fill="hsl(var(--background))">
              <circle cx="-10" cy="15" r="1"/>
              <circle cx="10" cy="15" r="1"/>
              <circle cx="-10" cy="30" r="1"/>
              <circle cx="10" cy="30" r="1"/>
          </g>
      </g>

      {/* Pentagram and F-Clef */}
      <g transform="translate(44, 68) scale(1.1)">
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
      
      <text
        x="55"
        y="30"
        fontFamily="PT Sans, sans-serif"
        fontSize="8"
        fontWeight="bold"
        fill="url(#textGradient)"
      >
        <tspan x="55" dy="0">Open</tspan>
        <tspan x="55" dy="10">Music</tspan>
        <tspan x="55" dy="10">Academy</tspan>
      </text>
    </g>
  </svg>
);

export default Logo;
