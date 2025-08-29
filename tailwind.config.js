/**
 * Tailwind CSS configuration file.
 *
 * @type {import('tailwindcss').Config}
 */
const { blackA, green, grass, mauve } = require('@radix-ui/colors')
const plugin = require('tailwindcss/plugin')
/**
 * Tailwind CSS configuration.
 *
 * @see https://tailwindcss.com/docs/configuration
 */
module.exports = {
  // Content paths to include in the generated CSS.
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],

  // Theme configuration.
  theme: {
    // Extend the default screens and colors.
    extend: {
     fontFamily: {
       ancient: ['ancient', 'system-ui', 'Avenir', 'Helvetica', 'Arial', 'sans-serif'],
       morris: ['morris', 'system-ui', 'Avenir', 'Helvetica', 'Arial', 'sans-serif'],
     },
      lineHeight: {
        '120': '120%',
        '140': '140%',
      },
      screens: {
        // Custom screen sizes.
        xs: '360px',
        xls: '390px',
        xm: '425px',
        sm: '640px',
        md: '744px',
        lg: '1024px',
        xl: '1280px',
        '1lg': '1366px',
        '2xl': '1536px',
        '3xl': '1920px'
      },
      colors: {
        // Custom colors.
        ...blackA,
        ...green,
        ...grass,
        ...mauve,
        primary: '#DF194C',
        header: '#ffffff',
        headerNav: '#f8f8f8',
        secondaryYellow: '#F5AF05',
        secondaryBlue: '#232F3F',
        tertiary: '#2D2001',
        'base-black': '#0b0a0a',
        'base-white': '#fafafa',
        red: {
          50: '#FFEBF0',
          100: '#fbdde5',
          200: '#f7bccb',
          300: '#f49ab1',
          400: '#f07897',
          500: '#ec577d',
          600: '#e83563',
          700: '#be1541',
          800: '#9c1235',
          900: '#7b0e2a',
          1000: '#5a0a1f'
        },
        yellow: {
          100: '#fef4db',
          200: '#fee9b6',
          300: '#fdde92',
          400: '#fcd26d',
          500: '#fbc749',
          600: '#fbbc25',
          700: '#d09504',
          800: '#ac7b04',
          900: '#876003',
          1000: '#624602'
        },
        blue: {
          100: '#e5eaf0',
          150: '#E3F9FA',
          200: '#cad4e2',
          300: '#b0bfd3',
          400: '#95a9c4',
          500: '#7b94b5',
          600: '#607ea7',
          700: '#4f6a8e',
          800: '#405774',
          900: '#324359',
          950: '#136366',
          1000: '#1a232f',
          1100: '#232F3F'
        },
        neutral: {
          base: '#fafafa',
          100: '#e4e4e4',
          200: '#cfcece',
          300: '#bab8b8',
          400: '#a5a1a1',
          500: '#908b8b',
          600: '#7a7474',
          700: '#655f5f',
          800: '#4e4949',
          900: '#383434',
          950: '#212529',
          1000: '#221f1f',
          1100: '#0b0a0a',
          1200: '#B2B2B2',
          1300: '#7A7474'
        },
        success: {
          50: '#DBFEE3',
          100: '#A4F4E7',
          200: '#15B097',
          300: '#0B7B69',
          400: '#0CB11C',
          1000: '#02620C'
        },
        warning: {
          100: '#F4C790',
          200: '#EDA145',
          300: '#CC7914'
        },
        error: {
          100: '#E4626F',
          200: '#C03744',
          300: '#8C1823'
        }
      },
      fontSize: {
        // Custom font sizes.
        x: '9px',
        s: '10px',
        xs: '11px',
        sm: '12px',
        md: '14px',
        base: '16px',
        lg: '18px',
        xl: '20px',
        '2xl': '24px',
        '3xl': '29px',
        '3xxl': '32px',
        '4xl': '34px',
        '4xxl': '40px',
        '5xl': '45px',
        '5xxl': '52px',
        '6xl': '56px',
        '7xl': '65px',
        '8xl': '96px'
      },
      aspectRatio: {
        "9/8": "1 / 1.125",
      },
      keyframes: {
        // Custom keyframes.
        overlayShow: {
          from: { opacity: 0 },
          to: { opacity: 1 }
        },
        contentShow: {
          from: { opacity: 0, transform: 'translate(-50%, -48%) scale(0.96)' },
          to: { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' }
        },
        slideDownAndFade: {
          from: { opacity: 0, transform: 'translateY(-2px)' },
          to: { opacity: 1, transform: 'translateY(0)' }
        },
        slideLeftAndFade: {
          from: { opacity: 0, transform: 'translateX(2px)' },
          to: { opacity: 1, transform: 'translateX(0)' }
        },
        slideUpAndFade: {
          from: { opacity: 0, transform: 'translateY(2px)' },
          to: { opacity: 1, transform: 'translateY(0)' }
        },
        slideRightAndFade: {
          from: { opacity: 0, transform: 'translateX(-2px)' },
          to: { opacity: 1, transform: 'translateX(0)' }
        }
      },
      animation: {
        // Custom animations.
        slideDownAndFade: 'slideDownAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        slideLeftAndFade: 'slideLeftAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        slideUpAndFade: 'slideUpAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        slideRightAndFade: 'slideRightAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        overlayShow: 'overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
        contentShow: 'contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)'
      },
      boxShadow: {
        1: '0px 0px 8px 0px #14141414',
        2: '0px 0px 32px 0px #0000000D',
        3: '0px 0px 16px 0px #0000000D',
        4: '0px 0px 20px 0px #0000000D',
        5: '0px 1px 8px 0px #3838381A',
        6: '0px 0px 8px 0px #0000001A',
        7: '0px 0px 32px 0px #0000001A',
        8: '0px 0px 8px 0px #0000000F',
        9: '0px 0px 16px 0px #0000001A',
        'notify-success': '0px 0px 16px 0px #49B08A66',
        'notify-warning': '0px 0px 16px 0px #EDA14566',
        'notify-error': '0px 0px 16px 0px #C0374466',
        'notify-info': '0px 0px 16px 0px #607ea766'
      }
    }
  },

  // Plugins to extend or modify the generated CSS.
  plugins: [
    plugin(({ matchUtilities }) => {
      matchUtilities({
        perspective: (value) => ({
          perspective: value
        })
      })
    })
  ]
}
