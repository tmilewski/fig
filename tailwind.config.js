module.exports = {
  darkMode: ['class', '[data-theme="dark"]'],
  content: [
    './src/components/**/*.{ts,tsx,js,jsx}',
    './src/pages/**/*.{ts,tsx,js,jsx}',
    './src/ui/**/*.{ts,tsx,js,jsx}',
  ],
  theme: {
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
    },
    container: {
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
      },
      center: true,
    },

    colors: {
      white: '#FFFFFF',

      background: 'rgb(var(--background) / <alpha-value>)',
      foreground: 'rgb(var(--foreground) / <alpha-value>)',

      accent: {
        200: 'rgb(var(--accent-200) / <alpha-value>)',
        300: 'rgb(var(--accent-300) / <alpha-value>)',
        900: 'rgb(var(--accent-900) / <alpha-value>)',
      },

      blue: {
        light: 'rgb(var(--blue-light) / <alpha-value>)',
        base: 'rgb(var(--blue-base) / <alpha-value>)',
      },

      red: {
        lighter: 'rgb(var(--red-lighter) / <alpha-value>)',
        light: 'rgb(var(--red-light) / <alpha-value>)',
        base: 'rgb(var(--red-base) / <alpha-value>)',
        dark: 'rgb(var(--red-dark) / <alpha-value>)',
      },

      danger: {
        dark: 'rgb(var(--danger-dark) / <alpha-value>)',
        base: 'rgb(var(--danger-base) / <alpha-value>)',
      },

      error: {
        foreground: 'rgb(var(--red-base) / <alpha-value>)',
      },

      success: {
        foreground: 'rgb(var(--blue-base) / <alpha-value>)',
      },
    },

    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': theme('colors.foreground'),
            '--tw-prose-headings': theme('colors.foreground'),
            '--tw-prose-lead': theme('colors.foreground'),
            '--tw-prose-links': theme('colors.foreground'),
            '--tw-prose-bold': theme('colors.foreground'),
            '--tw-prose-counters': theme('colors.foreground'),
            '--tw-prose-bullets': theme('colors.foreground'),
            '--tw-prose-hr': theme('colors.accent[900]'),
            '--tw-prose-quotes': theme('colors.foreground'),
            '--tw-prose-quote-borders': theme('colors.foreground'),
            '--tw-prose-captions': theme('colors.foreground'),
            '--tw-prose-code': theme('colors.foreground'),
            '--tw-prose-pre-code': theme('colors.foreground'),
            '--tw-prose-pre-bg': theme('colors.foreground'),
            '--tw-prose-th-borders': theme('colors.foreground'),
            '--tw-prose-td-borders': theme('colors.foreground'),
            '--tw-prose-invert-body': theme('colors.foreground'),
            '--tw-prose-invert-headings': theme('colors.foreground'),
            '--tw-prose-invert-lead': theme('colors.foreground'),
            '--tw-prose-invert-links': theme('colors.foreground'),
            '--tw-prose-invert-bold': theme('colors.foreground'),
            '--tw-prose-invert-counters': theme('colors.foreground'),
            '--tw-prose-invert-bullets': theme('colors.foreground'),
            '--tw-prose-invert-hr': theme('colors.accent[900]'),
            '--tw-prose-invert-quotes': theme('colors.foreground'),
            '--tw-prose-invert-quote-borders': theme('colors.foreground'),
            '--tw-prose-invert-captions': theme('colors.foreground'),
            '--tw-prose-invert-code': theme('colors.foreground'),
            '--tw-prose-invert-pre-code': theme('colors.foreground'),
            '--tw-prose-invert-pre-bg': 'rgb(0 0 0 / 50%)',
            '--tw-prose-invert-th-borders': theme('colors.foreground'),
            '--tw-prose-invert-td-borders': theme('colors.foreground'),
          },
        },
      }),
    },
  },
  variants: {},
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms'), require('tailwindcss-animate')],
}
