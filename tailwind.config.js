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
        },
      },
      gridTemplateColumns: {
        "auto-fill": "repeat(auto-fill, minmax(300px, 1fr))",
      },
    },
  },
  plugins: [require("@headlessui/tailwindcss")],
};
