module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        main: "#ECECEC",
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
