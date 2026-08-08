/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        rose: {
          50: '#FDF6F8',
          100: '#FAE9EE',
          200: '#F3D2DC',
          300: '#EBB4C4',
          400: '#D98DA5',
          500: '#C97C92',
          600: '#B06579',
          700: '#8E4F60',
          800: '#6B3B48',
          900: '#4A2831',
        },
        gold: {
          light: '#E8C4A0',
          DEFAULT: '#C9A882',
          dark: '#A8875F',
        },
        cream: '#FDFBF9',
        offwhite: '#F8F5F2',
        beige: '#F2EAE1',
        ink: '#1C1719',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        luxe: '0.22em',
      },
      /* Altura do cabeçalho — usada por `h-header` e pelo deslocamento das
         barras grudadas abaixo dele (`top-header`). Manter os dois em sincronia. */
      height: {
        header: '4rem',
      },
      spacing: {
        header: '4rem',
      },
      boxShadow: {
        soft: '0 4px 24px -6px rgba(201, 124, 146, 0.18)',
        lift: '0 24px 48px -18px rgba(201, 124, 146, 0.32)',
        glow: '0 0 0 1px rgba(217, 141, 165, 0.25), 0 18px 40px -20px rgba(217, 141, 165, 0.5)',
      },
      backgroundImage: {
        'rose-gradient': 'linear-gradient(135deg, #D98DA5 0%, #C97C92 55%, #C9A882 100%)',
        'soft-fade': 'linear-gradient(180deg, #FDFBF9 0%, #FAE9EE 100%)',
      },
      keyframes: {
        /* Faixa contínua: a trilha tem duas cópias da lista, então
           -50% coloca a segunda exatamente onde a primeira começou. */
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        floaty: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        pulseRing: {
          '0%': { transform: 'scale(0.9)', opacity: '0.7' },
          '100%': { transform: 'scale(1.6)', opacity: '0' },
        },
      },
      animation: {
        marquee: 'marquee 34s linear infinite',
        shimmer: 'shimmer 2.5s linear infinite',
        floaty: 'floaty 4s ease-in-out infinite',
        pulseRing: 'pulseRing 2s ease-out infinite',
      },
    },
  },
  plugins: [],
}
