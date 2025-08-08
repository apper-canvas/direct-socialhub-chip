/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#25D366",
        "primary-dark": "#128C7E",
        accent: "#1877F2",
        surface: "#FFFFFF",
        background: "#F0F2F5",
        success: "#4CAF50",
        warning: "#FF9800",
        error: "#F44336",
        info: "#2196F3"
      },
      fontFamily: {
        display: ["Plus Jakarta Sans", "sans-serif"],
        body: ["Inter", "sans-serif"]
      },
      animation: {
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "scale-in": "scaleIn 200ms ease-out",
        "slide-up": "slideUp 300ms ease-out"
      },
      keyframes: {
        scaleIn: {
          "0%": { transform: "scale(0.9)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" }
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" }
        }
      }
    }
  },
  plugins: []
}