/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        colors: {
            black: '#000000',
            white: '#ffffff',
            transparent: 'transparent',
        current: 'currentColor',
        },
        extend: {
            backgroundImage: {
                'none': 'none',
            }
        },
    },
    plugins: [],
}