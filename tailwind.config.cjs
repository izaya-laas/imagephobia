/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        mynerve: ["Mynerve", "cursive"],
        indie: ["Amatic SC", "cursive"],
        code: ["Source Code Pro", "monospace"],
      },
      backgroundImage: {
        pattern: "url('/public/patterns/geometry.png')",
      },
    },
  },
  plugins: [],
};
