<!-- This component is not part of BCQ -->
<!-- You can add it to your own components and then include in App.vue -->
<!-- Check https://www.flaticon.com/ for thousands of SVG icons you can use for your sprite -->
<template>
  <svg width="0" height="0" hidden>
    <symbol id="chevron-down" fill="none" :xmlns="xmlNs" :viewBox="viewBox">
      <path d="M6 9L12 15L18 9" :stroke="color" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
    </symbol>
    <symbol id="chevron-up" fill="none" :xmlns="xmlNs" :viewBox="viewBox">
      <path d="M6 15L12 9L18 15" :stroke="color" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
    </symbol>
  </svg>
</template>
<script>
export default {
  name: 'BcSvgIconSprite',
  props: {
    color: {
      type: String
    },
    viewBox: {
      type: String,
      default: '0 0 24 24'
    },
    xmlNs: {
      type: String,
      default: 'http://www.w3.org/2000/svg'
    }
  }
}
</script>
