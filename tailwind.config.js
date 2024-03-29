module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "nhl-ana": "#000000",
        "nhl-ari": "#6F263D",
        "nhl-black": "#231E1F",
        "nhl-bos": "#000000",
        "nhl-silver": "#CED1D3",
        "nhl-buf": "#003087",
        "nhl-car": "#C8102E",
        "nhl-cbj": "#041E42",
        "nhl-cgy": "#C8102E",
        "nhl-chi": "#CE1126",
        "nhl-col": "#8A2432",
        "nhl-dal": "#00823E",
        "nhl-det": "#C8102E",
        "nhl-edm": "#00205B",
        "nhl-fla": "#C8102E",
        "nhl-lak": "#000000",
        "nhl-min": "#0E4431",
        "nhl-mtl": "#A6192E",
        "nhl-njd": "#CC0000",
        "nhl-nsh": "#FFB81C",
        "nhl-nyi": "#00468B",
        "nhl-nyr": "#154B94",
        "nhl-ott": "#000000",
        "nhl-phi": "#D24303",
        "nhl-pit": "#000000",
        "nhl-sea": "#001425",
        "nhl-sjs": "#006272",
        "nhl-stl": "#003087",
        "nhl-tbl": "#00205B",
        "nhl-tor": "#00205B",
        "nhl-van": "#00205B",
        "nhl-vgk": "#333F48",
        "nhl-wpg": "#041E42",
        "nhl-wsh": "#C8102E",
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
