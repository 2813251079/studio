import * as React from 'react';

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    {...props}
  >
    <defs>
      <radialGradient
        id="instagram-gradient"
        gradientUnits="objectBoundingBox"
        cx="0.3"
        cy="1.07"
        r="1.5"
      >
        <stop offset="0" stopColor="#fdf497" />
        <stop offset="0.1" stopColor="#fdf497" />
        <stop offset="0.45" stopColor="#fd5949" />
        <stop offset="0.6" stopColor="#d6249f" />
        <stop offset="0.9" stopColor="#285AEB" />
      </radialGradient>
    </defs>
    <g>
      <rect
        width="24"
        height="24"
        rx="6"
        ry="6"
        fill="url(#instagram-gradient)"
      />
      <path
        fill="none"
        stroke="#fff"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.5 4.5h-9A3 3 0 004.5 7.5v9a3 3 0 003 3h9a3 3 0 003-3v-9a3 3 0 00-3-3z"
      />
      <path
        fill="none"
        stroke="#fff"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 15.5a3.5 3.5 0 100-7 3.5 3.5 0 000 7z"
      />
      <circle fill="#fff" cx="16.75" cy="7.25" r="1.25" />
    </g>
  </svg>
);

export default InstagramIcon;
