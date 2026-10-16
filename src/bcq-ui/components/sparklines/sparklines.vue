<template>
  <bc-container :class="componentCssClasses">
    <svg xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:ev="http://www.w3.org/2001/xml-events" :stroke-width=".1" :width="width" :height="height" />
  </bc-container>
</template>
<script>
import methods from '../../mixins/methods'

export default {
  name: 'BcSparklines',
  mixins: [
    methods
  ],
  data () {
    return {
      baseCss: this.componentBaseCss('sparklines')
    }
  },
  computed: {
    componentCssClasses () {
      return [
        this.baseCss
      ]
    }
  },
  props: {
    color: {
      type: String,
      default: '#ababab'
    },
    height: {
      type: String,
      default: '128px'
    },
    series: {
      type: Array,
      default: () => {
        return []
      }
    },
    strokeWidth: {
      type: Number,
      default: 1
    },
    width: {
      type: String,
      default: '100%'
    }
  },
  watch: {
    series () {
      this.draw()
    }
  },
  mounted () {
    this.draw()
  },
  methods: {
    draw () {
      let max = -99999999
      let min = 99999999
      let x = 0
      let height
      let width
      let offset
      const svg = this.$el.querySelector('svg')
      const polyline = document.createElementNS('http://www.w3.org/2000/svg', 'polyline')
      if (!this.series.length) {
        return
      }
      this.$nextTick(() => {
        svg.innerHTML = ''
        this.series.forEach((n) => {
          if (n !== '') {
            let y = parseInt(n, 10)
            let pt = svg.createSVGPoint()
            pt.x = x
            pt.y = y
            polyline.points.appendItem(pt)
            max = Math.max(max, y)
            min = Math.min(min, y)
            x = x + 1
          }
        })
        height = max - min + 1
        width = x
        offset = height + min * 2
        polyline.setAttribute('stroke', this.color)
        polyline.setAttribute('stroke-width', this.strokeWidth)
        polyline.setAttribute('fill', 'none')
        polyline.setAttribute('transform', 'matrix(1 0 0 -1 0 ' + offset + ')')
        svg.appendChild(polyline)
        svg.setAttribute('viewBox', '0 ' + min + ' ' + width + ' ' + height)
        svg.setAttribute('preserveAspectRatio', 'none')
      })
    }
  }
}
</script>
