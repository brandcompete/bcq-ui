<template>
  <div :class="['p-4']">
    <bc-heading tag="h1" font-size="2xl" :divider="true">Hello world</bc-heading>
    <p :class="['mt-3']">
      Your Becquerel UI project is ready. Edit <code>src/pages/hello-world.vue</code> and save to see your changes.
    </p>
    <p :class="['mt-3']">
      All components, directives and utility classes, with live demos and code examples, are on the
      <a href="https://bcq-ui.brandcompete.com/" target="_blank" :class="['underline']">Becquerel UI website</a>.
    </p>
    <bc-btn color="primary" tag="a" href="https://bcq-ui.brandcompete.com/" target="_blank" :class="['mt-3']">
      Docs & Demo Website
    </bc-btn>
    <bc-heading tag="h2" font-size="lg" :class="['mt-6']">What's installed</bc-heading>
    <ul :class="['mt-2', 'pl-5', 'list-disc']">
      <li><span :class="['font-semibold']">Vue 3</span> + <span :class="['font-semibold']">Vite</span></li>
      <li><span :class="['font-semibold']">Becquerel UI</span>, set up in <code>src/main.js</code>, theme variables in <code>src/styles/variables.css</code></li>
      <!-- installed options -->
    </ul>
    <!-- examples -->
  </div>
</template>
<script>
export default {
  name: 'PageHelloWorld'
}
</script>
