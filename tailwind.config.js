/* eslint-disable global-require */
module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx}',
        './src/components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                'ibm-plex': ['IBM Plex Sans', 'sans-serif'],
            },
            colors: {
                'search-red': '#FF2020',
                'search-gray': '#F3F3F3',
                'search-white': '#FFFFFF',
                'search-dark-blue': '#111827',
                'search-bright-blue': '#205FFF',
            },
            boxShadow: {
                search: '0 16px 16px 2px rgba(29,17,51,.04),0 6px 24px 4px rgba(9,32,77,.12),0 8px 12px -5px rgba(29,17,51,.12)',
            },
        },
    },
    plugins: [require('@tailwindcss/forms')],
};
