module.exports = {
  purge: ["./src/**/*.html", "./src/**/*.js", "./src/**/*.jsx"],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#cdb5ea",
          200: "#d3c1e8",
          300: "#b698d8",
          400: "#996fc9",
          500: "#6e32b3",
          600: "#58288f",
          700: "#421e6b",
          800: "#2c1447",
          900: "#160a23",
        },
        secondary: {
          100: "#5fd295",
          500: "#32b36e",
          900: "#217749",
        },
        // tertiary: {
        //   100: '#d2955f',
        //   500: '#b36e32',
        //   900: '#774921',
        // },
        tertiary: {
          100: "#F7F1EB",
          200: "#ECDBCC",
          300: "#E1C5AD",
          400: "#CA9A70",
          500: "#B36E32",
          600: "#A1632D",
          700: "#6B421E",
          800: "#513217",
          900: "#36210F",
        },
      },
    },
  },
  variants: [
    "responsive",
    "odd",
    "even",
    "hover",
    "focus",
    "active",
    "visited",
    "disabled",
  ],
  plugins: [],
}
