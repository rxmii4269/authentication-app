module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: "media", // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        black: {
          300: "#333333",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
