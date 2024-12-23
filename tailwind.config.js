// tailwind.config.js
export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Look for Tailwind classes in all JS/JSX files
  ],
  theme: {
    extend: {
      colors: {
        // Background colors
        'primary-background': '#00B5B8',  // Light Teal (Main Background Color)
        'secondary-background': '#F5F5F5', // Light Gray (Secondary Background)
        'section-background': '#FFFFFF',  // White (For Section Backgrounds)
        'card-background': '#F1F1F1',     // Light Gray (For Cards/Containers)

        'black-background': '#000000',    // Black

        'white-text': '#FFFFFF',          // White Text

        // Text colors
        'primary-text': '#4A4A4A',        // Dark Gray (For Text)
        'secondary-text': '#8D8D8D',      // Gray (For Secondary Text)
        'highlight-text': '#FFEB3B',      // Soft Yellow (For Highlighted Text)

        // Button colors
        'button-primary': '#00B5B8',      // Light Teal (Primary Button Background)
        'button-secondary': '#FFEB3B',    // Soft Yellow (Secondary Button Background)
        'button-text': '#FFFFFF',         // White (Button Text)
        'button-hover': '#007C7A',        // Darker Teal (Button Hover)

        // Accent colors
        'accent': '#FFEB3B',              // Soft Yellow (Accent Color)

        // Border colors
        'border-light': '#D1D1D1',        // Light Gray (For borders)
        'border-dark': '#4A4A4A',         // Dark Gray (For Dark Borders)

        // Input & form element colors
        'input-background': '#FFFFFF',    // White (For Input Background)
        'input-border': '#D1D1D1',        // Light Gray (For Input Borders)
        'input-text': '#4A4A4A',          // Dark Gray (For Input Text)
        'input-placeholder': '#8D8D8D',   // Gray (For Input Placeholder)

        // Notification or success/error colors
        'success': '#28A745',             // Green (Success Color)
        'error': '#DC3545',               // Red (Error Color)
        'info': '#17A2B8',                // Blue (Info Color)
        'warning': '#FFC107',             // Yellow (Warning Color)
      },
    },
  },
  plugins: [],
};