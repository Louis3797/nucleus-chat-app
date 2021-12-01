module.exports = {
  purge: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/modules/**/*.{js,ts,jsx,tsx}",
    "./src/ui/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      comfortaa: ["Comfortaa", "cursive"],
      sans: [
        "Inter",
        "-apple-system",
        "BlinkMacSystemFont",
        "Segoe UI",
        "Roboto",
        "Helvetica",
        "Arial",
        "sans-serif",
      ],
    },
    colors: {
      button: "#fff",
      transparent: "transparent",
      primary: {
        100: "#F1F5F9",
        DEFAULT: "#E2E8F0",
        600: "#CBD5E1",
        700: "#94A3B8",
      },
      secondary: {
        DEFAULT: "#A5B4FC",
        600: "#818CF8",
      },
      accent: {
        DEFAULT: "#1E293B",
      },
      black: "#000",
    },

    extend: {},
  },
  variants: {
    backgroundColor: ["hover", "disabled"],
    textColor: ["hover", "disabled"],
    extend: {
      opacity: ["active", "disabled", "hover"],
      backgroundOpacity: ["active", "hover"],
      textOpacity: ["active", "hover"],
    },
  },
  plugins: [],
};
