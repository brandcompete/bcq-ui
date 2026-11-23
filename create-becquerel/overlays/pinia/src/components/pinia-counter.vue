<template>
  <bc-card :class="['mt-6']">
    <bc-card-title :padding="['px-4', 'pt-4', 'pb-2']">Pinia example</bc-card-title>
    <bc-card-text :padding="['px-4', 'py-2']">
      <p>
        The count lives in the <code>counter</code> store (<code>src/stores/counter.js</code>), so every component
        using the store sees the same value.
      </p>
      <p :class="['mt-2']">Count: <span :class="['font-semibold']">{{ count }}</span>, doubled: <span :class="['font-semibold']">{{ double }}</span></p>
    </bc-card-text>
    <bc-card-actions :padding="['px-4', 'pt-2', 'pb-4']">
      <bc-btn color="primary" icon-left="plus" :class="['mr-2']" @click="increment">Increment</bc-btn>
      <bc-btn color="secondary" @click="reset">Reset</bc-btn>
    </bc-card-actions>
  </bc-card>
</template>
<script>
import { mapActions, mapState } from 'pinia'
import { useCounterStore } from '../stores/counter.js'

export default {
  name: 'PiniaCounter',
  computed: {
    ...mapState(useCounterStore, ['count', 'double'])
  },
  methods: {
    ...mapActions(useCounterStore, ['increment', 'reset'])
  }
}
</script>
