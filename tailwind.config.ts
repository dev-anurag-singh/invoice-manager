import type { Config } from 'tailwindcss';

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '2rem',
        md: '2.5rem',
      },
      screens: {
        md: '768px',
        lg: '826px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        'foreground-light': 'hsl(var(--foreground-light))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          hover: 'hsl(var(--secondary-hover))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        tertiary: {
          DEFAULT: 'hsl(var(--tertiary))',
          foreground: 'hsl(var(--tertiary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        scrollbar: {
          DEFAULT: 'hsl(var(--scrollbar))',
        },
        'carbon-blue': '#373B53',
        green: {
          DEFAULT: '#33D69F',
        },
        orange: {
          DEFAULT: '#FF8F00',
        },
        grey: {
          DEFAULT: '#979797',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      fontSize: {
        xl: [
          '2.25rem',
          {
            lineHeight: '2.0625rem',
            letterSpacing: '-1px',
            fontWeight: '700',
          },
        ],
        lg: [
          '1.5rem',
          {
            lineHeight: '1.375rem',
            letterSpacing: '-0.75px',
            fontWeight: '700',
          },
        ],
        md: [
          '0.9375rem',
          {
            lineHeight: '1.5rem',
            letterSpacing: '-0.25px',
            fontWeight: '700',
          },
        ],
        sm: [
          '0.9375rem',
          {
            lineHeight: '15px',
            letterSpacing: '-0.25px',
            fontWeight: '700',
          },
        ],
        base: [
          '0.8125rem',
          {
            lineHeight: '1.125rem',
            letterSpacing: '-0.1px',
            fontWeight: '500',
          },
        ],
        xs: [
          '0.8125rem',
          {
            lineHeight: '15px',
            letterSpacing: '-0.1px',
            fontWeight: '500',
          },
        ],
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;

export default config;
