import { withUt } from "uploadthing/tw";

/** @type {import('tailwindcss').Config} */
module.exports = withUt({
    theme: {
        extend: {
            colors: {
                brand: {
                    DEFAULT: '#da5249',
                    light: '#e47670',
                    dark: '#c4483f',
                    secondary: '#f8d7d5',
                    accent: '#8f3631',
                }
            }
        }
    }
}); 