import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/layouts/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        rubik: ["var(--font-rubik)", ...fontFamily.sans],
        bagnard: ["var(--font-bagnard)", ...fontFamily.serif],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        neutral: {
          "50": "#FEFEFE",
          "100": "#CECECE",
          "200": "#B6B6B6",
          "300": "#949495",
          "400": "#808081",
          "500": "#606061",
          "600": "#575758",
          "700": "#444445",
          "800": "#353535",
          "900": "#0F0F0F",
        },
        purple: {
          "50": "#F3EBF7",
          "100": "#D8C1E7",
          "200": "#C6A3DC",
          "300": "#AB7ACC",
          "400": "#9B60C2",
          "500": "#8238B3",
          "600": "#7633A3",
          "700": "#5C287F",
          "800": "#481F62",
          "900": "#37184B",
        },
        blue: {
          "50": "#EAF0F3",
          "100": "#BCCFDA",
          "200": "#9CB8C9",
          "300": "#6F98B0",
          "400": "#5384A1",
          "500": "#286589",
          "600": "#245C7D",
          "700": "#1C4861",
          "800": "#16384B",
          "900": "#112A3A",
        },
        yellow: {
          "50": "#FEFDED",
          "100": "#FDF9C7",
          "200": "#FBF7AB",
          "300": "#FAF385",
          "400": "#F9F16D",
          "500": "#F7ED49",
          "600": "#E1D842",
          "700": "#AFA834",
          "800": "#888228",
          "900": "#68641F",
        },
        cream: {
          "50": "#FBF7EA",
          "100": "#F3E5BC",
          "200": "#EDD99C",
          "300": "#E4C76F",
          "400": "#DFBD53",
          "500": "#D7AC28",
          "600": "#C49D24",
          "700": "#997A1C",
          "800": "#765F16",
          "900": "#5A4811",
        },
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
