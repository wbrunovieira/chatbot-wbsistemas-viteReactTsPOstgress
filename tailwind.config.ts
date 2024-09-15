import type { Config } from "tailwindcss";

const config: Config = {
    content: ["./src/**/*.{js,ts,jsx,tsx}", "./src/components/**/*.{ts,tsx}"],
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px",
            },
        },
        extend: {
            colors: {
                "custom-purple": "#792990",
                primary: "#350545",
                secondary: "#aaa6c3",
                yellowcustom: "#ffb947",
            },
            fontFamily: {
                sans: ["Plus Jakarta Sans", "sans-serif"],
                mono: ["Ubuntu Mono", "monospace"],
            },
            backgroundImage: {
                "custom-gradient": `radial-gradient(
          circle at top center,
          hsla(286, 55%, 36%, 0.5) 0%,
          hsla(222, 0%, 0%, 0) 50%,
          hsla(222, 0%, 0%, 0) 100%
        )`,
                "modern-gradient":
                    "linear-gradient(90deg, #350545 0%, #792990 50%, #350545 100%)",
            },
        },
    },
    plugins: [],
};

export default config;

// module.exports = {
//     content: ["./src/**/*.{js,ts,jsx,tsx}", "./components/**/*.{ts,tsx}"],
//     theme: {
//         extend: {
//             colors: {
//                 "custom-purple": "#792990",

//                 primary: "#350545",
//                 secondary: "#aaa6c3",
//                 yellowcustom: "#ffb947",
//             },
//             fontFamily: {
//                 sans: ["Plus Jakarta Sans", "sans-serif"],
//                 mono: ["Ubuntu Mono", "monospace"],
//             },
//             backgroundImage: {
//                 "custom-gradient": `radial-gradient(
// circle at top center,
// hsla(286, 55%, 36%, 0.5) 0%,
// hsla(222, 0%, 0%, 0) 50%,
// hsla(222, 0%, 0%, 0) 100%
// )`,
//                 "modern-gradient":
//                     "linear-gradient(90deg, #350545 0%, #792990 50%, #350545 100%)",
//             },
//         },
//     },
//     plugins: [],
// };
