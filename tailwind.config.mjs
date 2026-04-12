/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: 'rgb(var(--color-background) / <alpha-value>)',
        foreground: 'rgb(var(--color-foreground) / <alpha-value>)',
        muted: 'rgb(var(--color-muted) / <alpha-value>)',
        'muted-foreground': 'rgb(var(--color-muted-foreground) / <alpha-value>)',
        border: 'rgb(var(--color-border) / <alpha-value>)',
        accent: 'rgb(var(--color-accent) / <alpha-value>)',
        'accent-foreground': 'rgb(var(--color-accent-foreground) / <alpha-value>)',
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        serif: ['Poppins', 'sans-serif'],
        sans: ['Nunito', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
