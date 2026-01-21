import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
          muted: "hsl(var(--sidebar-muted))",
        },
        // Purple palette
        purple: {
          50: "hsl(270 30% 97%)",
          100: "hsl(270 25% 92%)",
          200: "hsl(270 25% 84%)",
          300: "hsl(270 30% 72%)",
          400: "hsl(270 40% 60%)",
          500: "hsl(270 45% 55%)",
          600: "hsl(270 50% 48%)",
          700: "hsl(270 55% 40%)",
          800: "hsl(270 50% 32%)",
          900: "hsl(270 45% 22%)",
        },
        // Pink palette
        pink: {
          50: "hsl(330 40% 97%)",
          100: "hsl(330 35% 92%)",
          200: "hsl(330 35% 84%)",
          300: "hsl(330 40% 72%)",
          400: "hsl(330 45% 62%)",
          500: "hsl(330 50% 58%)",
          600: "hsl(330 55% 50%)",
          700: "hsl(330 50% 42%)",
          800: "hsl(330 45% 34%)",
          900: "hsl(330 40% 24%)",
        },
        // Neutral warm grays
        warm: {
          50: "hsl(270 15% 98%)",
          100: "hsl(270 12% 95%)",
          200: "hsl(270 10% 90%)",
          300: "hsl(270 8% 82%)",
          400: "hsl(270 6% 65%)",
          500: "hsl(270 5% 50%)",
          600: "hsl(270 6% 38%)",
          700: "hsl(270 8% 28%)",
          800: "hsl(270 12% 18%)",
          900: "hsl(270 15% 10%)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xl: "calc(var(--radius) + 4px)",
        "2xl": "calc(var(--radius) + 8px)",
        "3xl": "calc(var(--radius) + 12px)",
      },
      boxShadow: {
        'soft': '0 2px 8px -2px hsl(270 25% 15% / 0.06)',
        'medium': '0 4px 16px -4px hsl(270 25% 15% / 0.10)',
        'elevated': '0 8px 30px -8px hsl(270 25% 15% / 0.12)',
        'glass': '0 4px 24px -4px hsl(270 30% 20% / 0.08), 0 0 0 1px hsl(0 0% 100% / 0.5) inset',
        'glass-hover': '0 8px 32px -8px hsl(270 30% 30% / 0.12), 0 0 0 1px hsl(0 0% 100% / 0.6) inset',
        'glow-primary': '0 0 40px hsl(270 45% 55% / 0.15)',
        'glow-accent': '0 0 30px hsl(330 50% 58% / 0.2)',
        'glow-soft': '0 0 50px hsl(280 40% 50% / 0.12)',
        'inner-glow': 'inset 0 1px 0 hsl(0 0% 100% / 0.15)',
        'button': '0 1px 2px hsl(270 25% 15% / 0.05), 0 0 0 1px hsl(270 20% 90% / 0.5)',
        'button-hover': '0 4px 12px hsl(270 25% 15% / 0.1), 0 0 0 1px hsl(270 25% 85% / 0.5)',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-down": {
          from: { opacity: "0", transform: "translateY(-8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in-right": {
          from: { opacity: "0", transform: "translateX(-10px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        "scale-in": {
          from: { opacity: "0", transform: "scale(0.96)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        "shimmer": {
          from: { backgroundPosition: "-200% 0" },
          to: { backgroundPosition: "200% 0" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
        "gradient-shift": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.3s ease-out",
        "fade-up": "fade-up 0.4s ease-out",
        "fade-down": "fade-down 0.4s ease-out",
        "slide-in-right": "slide-in-right 0.3s ease-out",
        "scale-in": "scale-in 0.2s ease-out",
        "shimmer": "shimmer 2s linear infinite",
        "float": "float 5s ease-in-out infinite",
        "pulse-soft": "pulse-soft 2.5s ease-in-out infinite",
        "gradient-shift": "gradient-shift 3s ease infinite",
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'shimmer': 'linear-gradient(90deg, transparent 0%, hsl(270 30% 80% / 0.15) 50%, transparent 100%)',
        'gradient-premium': 'linear-gradient(135deg, hsl(270 45% 55%) 0%, hsl(310 45% 55%) 50%, hsl(330 50% 58%) 100%)',
        'gradient-subtle': 'linear-gradient(135deg, hsl(270 40% 55% / 0.1) 0%, hsl(330 45% 58% / 0.1) 100%)',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'bounce-soft': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
