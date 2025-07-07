import * as React from 'react';

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    {...props}
  >
    <defs>
      <radialGradient id="insta-gradient-logo-fix" cx="30%" cy="107%" r="150%">
        <stop offset="0%" stopColor="#fdf497" />
        <stop offset="5%" stopColor="#fdf497" />
        <stop offset="45%" stopColor="#fd5949" />
        <stop offset="60%" stopColor="#d6249f" />
        <stop offset="90%" stopColor="#285AEB" />
      </radialGradient>
    </defs>
    <rect width="24" height="24" rx="6" ry="6" fill="url(#insta-gradient-logo-fix)" />
    <g fill="none" stroke="white" strokeWidth="1.5">
        <rect x="4" y="4" width="16" height="16" rx="4" ry="4" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="16.5" cy="7.5" r="1" fill="white" stroke="none"/>
    </g>
  </svg>
);

export default InstagramIcon;
