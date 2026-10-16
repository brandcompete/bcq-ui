<template>
  <bc-container tag="router-link" to="/" :title="getConfig.appName" v-gradient-text="gradientText" :class="componentCssClasses" :style="style">
    {{ getConfig.appAbbreviation }}
    <bc-reactive-style>
    .logo::before
    {
      content: "";
      position: absolute;
      padding: {{ borderWidth }}px;
      background: linear-gradient(45deg, {{ getConfig.homePageGradient[0] }}, {{ getConfig.homePageGradient[1] }});
      inset: 0;
      border-radius: inherit;
      mask: conic-gradient(#000 0 0) content-box exclude, conic-gradient(#000 0 0);
    }
    </bc-reactive-style>
  </bc-container>
</template>
<script>
import methods from '../../mixins/methods.js'
import computed from '../../mixins/computed.js'

export default {
  name: 'Logo',
  mixins: [
    methods,
    computed
  ],
  data () {
    return {
      baseCss: 'logo',
    }
  },
  props: {
    size: {
      type: Number,
      default: 96
    },
    fontSize: {
      type: String,
      default: '2xl'
    },
    fontWeight: {
      type: String,
      default: 'bold'
    },
    elevation: {
      type: String,
      default: 'xl'
    },
    borderWidth: {
      type: Number,
      default: 6
    }
  },
  computed: {
    style () {
      const width = `${this.size}px`
      return {
        width,
        height: width,
        lineHeight: `calc(${width} - ${this.borderWidth / 2}px)`
      }
    },
    gradientText () {
      const colors = this.getConfig.homePageGradient
      return {
        tilt: 45,
        colors: [
          colors[1],
          colors[0]
        ]
      }
    },
    componentCssClasses () {
      return [
        this.baseCss,
        `text-${this.fontSize}`,
        `font-${this.fontWeight}`,
        `shadow-${this.elevation}`,
        'border-round-full',
        'text-center',
        'm-auto',
        'uppercase',
        'mb-3',
        'select-none',
        'relative'
      ]
    }
  }
}
</script>
