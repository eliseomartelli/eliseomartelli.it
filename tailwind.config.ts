import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./data/**/*.{mdx,md}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./tagletClassNames.ts",
  ],
  theme: {
    extend: {
      aspectRatio: { vertical: "2/3", horizontal: "3/2" },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        reveal: "reveal 0.5s ease-in-out",
      },
      keyframes: {
        reveal: {
          "0%": {
            transform: "translateX(1rem) translateY(2rem)",
            opacity: "0",
          },
          "50%": { transform: "translateX(0.25rem)", opacity: "20%" },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
} satisfies Config;
