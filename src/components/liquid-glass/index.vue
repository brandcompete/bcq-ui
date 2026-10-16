<template>
  <bc-container :class="componentCssClasses" v-aspect-ratio="aspectRatio">
    <bc-grid>
      <bc-grid-col :xl="2" :lg="2" :md="3" :sm="3" :xs="6" v-for="route in getRoutes" :class="['p-4']">
        <bc-card v-liquid-glass :data-distortion="distortion" roundness="3xl">
          <bc-card-text v-aspect-ratio="1/1" :class="['flex', 'align-items-center', 'justify-content-center']">
            <bc-icon :name="route.icon" :size="iconSize" :class="['opacity-50', 'hover:opacity-100', 'transition-opacity', 'transition-duration-500']" />
          </bc-card-text>
        </bc-card>
      </bc-grid-col>
    </bc-grid>
    <bc-reactive-style>
    .{{ baseCss }}
    {
      background: url("{{ background }}") no-repeat center/cover;
    }
    </bc-reactive-style>
  </bc-container>
</template>
<script>
import methods from '../../mixins/methods.js'
import computed from '../../mixins/computed.js'
import props from '../../mixins/props.js'

export default {
  name: 'LiquidGlass',
  mixins: [
    props,
    methods,
    computed
  ],
  data () {
    return {
      baseCss: 'liquid-glass',
    }
  },
  computed: {
    componentCssClasses () {
      return [
        this.baseCss,
        this.floatBackground ? 'float-background' : null,
        'overflow-auto',
        'select-none'
      ]
    }
  },
  props: {
    floatBackground: {
      type: Boolean,
      default: true
    },
    aspectRatio: {
      type: String,
      default: '16/9'
    },
    background: {
      type: String
    },
    iconSize: {
      type: Number,
      default: 3
    },
    span: {
      type: Number,
      default: 2
    },
    distortion: {
      type: String,
      default: 'large'
    }
  }
}
</script>
<style>
.liquid-glass .bc-icon
{
  color: white;
}

.float-background
{
  animation: float-background 25s linear infinite;
}

@keyframes float-background
{
  0%,
  100%
  {
    background-size: 100%;
  }
  25%
  {
    background-size: 150%;
  }
  50%
  {
    background-size: 200%;
  }
  75%
  {
    background-size: 250%;
  }
}
</style>
