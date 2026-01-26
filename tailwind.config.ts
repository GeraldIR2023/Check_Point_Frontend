import type { Config } from "tailwindcss";

const config: Config = {
    content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
    theme: {
        extend: {
            colors: {
                checkpoint: {
                    orange: "#f47321",
                    wood: "#3e2723",
                    nitro: "#00e5ff",
                    offwhite: "#faf9f6",
                },
            },
            fontFamily: {
                checkpoint: ["var(--font-luckiest)"],
            },
        },
    },
};

export default config;
