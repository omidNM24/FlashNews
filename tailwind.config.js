/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      zIndex: {
        100: "100",
      },
    },
    screens: {
      xl: "1280px",
      lg: "1024px",
      mlg: "868px",
      md: "768px",
      sm: "640px",
      xs: "540px",
      xxs: "440px",
      vs: "340px",
      vvs: "250px",
    },
    colors: {
      ...require("tailwindcss/colors"),
      pureBlack: "#000000",
      b1: "#111111",
      b2: "#222222",
      b3: "#333333",
      b4: "#444444",
      b5: "#555555",
      b6: "#666666",
      b7: "#777777",
      w1: "#fff",
      w2: "#eee",
      w3: "#ddd",
      w4: "#ccc",
      w5: "#bbb",
      w6: "#aaa",
    },
  },

  plugins: [require("@tailwindcss/typography")],
};
