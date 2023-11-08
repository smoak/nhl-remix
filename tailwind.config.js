module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "nhl-black": "#231E1F",
        "nhl-silver": "#CED1D3",
        "nhl-gray": {
          50: "#ECECEC",
          100: "#E3E4E6",
          200: "#E5E5E5",
        },
        blue: {
          1000: "#5963b3",
        },
        red: {
          750: "#AF1E2D",
        },
      },
      gridTemplateColumns: {
        "auto-fill": "repeat(auto-fill, minmax(300px, 1fr))",
      },
    },
  },
  plugins: [require("@headlessui/tailwindcss")],
};
