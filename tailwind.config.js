module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        xiketic: "#07020D",
        cyanprocess: "#5DB7DE",
        alabaster: "#F1E9DB",
        grullo: "#A39B8B",
      },
      borderColor: {
        main: "rgba(255, 255, 255, 0.24)",
      },
      gridTemplateColumns: {
        "auto-fill": "repeat(auto-fill, minmax(300px, 1fr))",
      },
    },
  },
  plugins: [],
};
