<template>
  <bc-app :dark="dark">
    <bc-layout>
      <template v-slot:header><!-- header --></template>
      <template v-slot:sidebar-left><!-- left sidebar --></template>
      <template v-slot:sidebar-left-controls><!-- left sidebar controls --></template>
      <template v-slot:main><page-hello-world /></template>
      <template v-slot:sidebar-right><!-- right sidebar --></template>
      <template v-slot:sidebar-right-controls><!-- right sidebar controls --></template>
      <template v-slot:footer><!-- footer --></template>
    </bc-layout>
  </bc-app>
</template>
<script>
import PageHelloWorld from './pages/hello-world.vue'

export default {
  name: 'App',
  components: {
    PageHelloWorld
  },
  data () {
    return {
      dark: true
    }
  }
}
</script>
