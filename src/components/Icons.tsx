import React, { SVGProps } from "react";

export const Menu = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
      />
    </svg>
  );
};

export const LinkIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-4 h-4"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
    />
  </svg>
);

export const ArrowUpHighIcon = ({ className }: { className: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className={className}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
    />
  </svg>
);

export const Loading = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    {...props}
  >
    <circle cx="4" cy="12" r="3">
      <animate
        id="spinner_qFRN"
        attributeName="cy"
        begin="0;spinner_OcgL.end+0.25s"
        calcMode="spline"
        dur="0.6s"
        keySplines=".33,.66,.66,1;.33,0,.66,.33"
        values="12;6;12"
      ></animate>
    </circle>
    <circle cx="12" cy="12" r="3">
      <animate
        attributeName="cy"
        begin="spinner_qFRN.begin+0.1s"
        calcMode="spline"
        dur="0.6s"
        keySplines=".33,.66,.66,1;.33,0,.66,.33"
        values="12;6;12"
      ></animate>
    </circle>
    <circle cx="20" cy="12" r="3">
      <animate
        id="spinner_OcgL"
        attributeName="cy"
        begin="spinner_qFRN.begin+0.2s"
        calcMode="spline"
        dur="0.6s"
        keySplines=".33,.66,.66,1;.33,0,.66,.33"
        values="12;6;12"
      ></animate>
    </circle>
  </svg>
);
