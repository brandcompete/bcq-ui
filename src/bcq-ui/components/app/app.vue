<template>
  <bc-container :class="componentCssClasses">
    <slot />
    <bc-reactive-style>
    :root
    {
      color-scheme: {{ dark ? 'dark' : 'light' }};
    }

    body,
    .bc-app{{ dark ? '.bc-app-theme-dark' :'' }}
    {
      background: {{ dark ? 'var(--bg-theme-dark)' : 'var(--bg-theme-light)' }};
      color: {{ dark ? 'var(--text-theme-dark)' : 'var(--text-theme-light)' }};
    }

    .bc-app .text-white,
    .bc-app .text-white-500
    {
      color: var(--white);
    }

    .bc-app .bg-white,
    .bc-app .bg-white-500
    {
      background: var(--white);
    }

    .bc-app .border-white,
    .bc-app .border-white-500
    {
      border-color: var(--white);
    }

    .bc-app .text-black,
    .bc-app .text-black-500
    {
      color: var(--black);
    }

    .bc-app .bg-black,
    .bc-app .bg-black-500
    {
      background: var(--black);
    }

    .bc-app .border-black,
    .bc-app .border-black-500
    {
      border-color: var(--black);
    }
    </bc-reactive-style>
    <bc-brand-color v-for="(hex, name) in colors" :name="name" :hex="hex" />
  </bc-container>
</template>
<script>
import methods from '../../mixins/methods.js'

export default {
  name: 'BcApp',
  mixins: [
    methods
  ],
  data () {
    return {
      baseCss: this.componentBaseCss('app')
    }
  },
  computed: {
    componentCssClasses () {
      const baseCss = this.baseCss
      return [
        baseCss,
        this.dark ? `${baseCss}-theme-dark` : null
      ]
    }
  },
  props: {
    dark: {
      type: Boolean,
      default: true
    },
    colors: {
      type: Object,
      default () {
        return {
          'red': '#f44336',
          'pink': '#e91e63',
          'purple': '#9c27b0',
          'deep-purple': '#673ab7',
          'indigo': '#3f51b5',
          'blue': '#2196f3',
          'light-blue': '#03a9f4',
          'cyan': '#00bcd4',
          'teal': '#009688',
          'green': '#4caf50',
          'light-green': '#8bc34a',
          'lime': '#cddc39',
          'yellow': '#ffeb3b',
          'amber': '#ffc107',
          'orange': '#ff9800',
          'deep-orange': '#ff5722',
          'brown': '#795548',
          'blue-grey': '#607d8b',
          'grey': '#9e9e9e'
        }
      }
    }
  }
}
</script>
