module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        "auto-fill": "repeat(auto-fill, minmax(300px, 1fr))",
      },
    },
  },
  plugins: [],
};
