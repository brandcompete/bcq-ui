<template>
  <bc-reactive-style v-if="hsl">
    <template v-for="(lightness, swatch) in swatches">
    .bc-app .bg-{{ sanitizeClass }}-{{ swatch }}
    {
      background-color: hsl({{ getLightness }}, {{ lightness }}%);
    }
    .bc-app .text-{{ sanitizeClass }}-{{ swatch }}
    {
      color: hsl({{ getLightness }}, {{ lightness }}%);
    }
      .bc-app .border-{{ sanitizeClass }}-{{ swatch }} {
      border-color: hsl({{ getLightness }}, {{ lightness }}%);
    }
    </template>
    .bc-app .text-{{ sanitizeClass }},
    .bc-app .text-{{ sanitizeClass }}-500
    {
      color: {{ hex }};
    }
    .bc-app .bg-{{ sanitizeClass }},
    .bc-app .bg-{{ sanitizeClass }}-500
    {
      background-color: {{ hex }};
    }
    .bc-app .border-{{ sanitizeClass }},
    .bc-app .border-{{ sanitizeClass }}-500
    {
      border-color: {{ hex }};
    }
  </bc-reactive-style>
</template>
<script>
import methods from '../../mixins/methods'

export default {
  name: 'BcBrandColor',
  mixins: [
    methods
  ],
  data () {
    return {
      hsl: null,
      baseCss: this.componentBaseCss('brand-color')
    }
  },
  props: {
    hex: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    swatches: {
      type: Object,
      default: () => {
        return {
          50: 95,
          100: 90,
          200: 80,
          300: 70,
          400: 65,
          600: 40,
          700: 30,
          800: 20,
          900: 10,
          950: 7.5,
          1000: 5
        }
      }
    }
  },
  computed: {
    getLightness () {
      return this.hsl.split(',').slice(0, 2).join(',')
    },
    sanitizeClass () {
      return this.name.toLowerCase().replace(/\s+/g, ' ').replace(/\s+/g, '-')
    }
  },
  watch: {
    hex () {
      this.onMounted()
    }
  },
  mounted () {
    this.onMounted()
  },
  methods: {
    onMounted () {
      this.hsl = this.hexToHsl(this.hex)
    },
    hexToHsl (hex) {
      /* eslint-disable no-unused-expressions */
      /* eslint-disable no-sequences */
      hex = hex.replace(/#/g, '')
      if (hex.length === 3) {
        hex = hex.split('').map(function (hex) {
          return hex + hex
        }).join('')
      }
      const result = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})[\da-z]{0,0}$/i.exec(hex)
      if (!result) {
        return null
      }
      let r = parseInt(result[1], 16)
      let g = parseInt(result[2], 16)
      let b = parseInt(result[3], 16)
      r /= 255,
      g /= 255,
      b /= 255
      const max = Math.max(r, g, b)
      const min = Math.min(r, g, b)
      let h
      let s
      let l = (max + min) / 2
      if (max === min) {
        h = s = 0
      } else {
        const d = max - min
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
        switch (max) {
          case r:
            h = (g - b) / d + (g < b ? 6 : 0)
            break
          case g:
            h = (b - r) / d + 2
            break
          case b:
            h = (r - g) / d + 4
            break
        }
        h /= 6
      }
      s = s * 100
      s = Math.round(s)
      l = l * 100
      l = Math.round(l)
      h = Math.round(360 * h)
      return `${h}, ${s}%, ${l}%`
    }
  }
}
</script>
