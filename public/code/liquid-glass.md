<!-- with default config -->
<bc-card v-liquid-glass>
  <bc-card-text>
    <bc-icon name="home" />
  </bc-card-text>
</bc-card>

<!-- with custom config -->
<bc-card
  data-distortion="large | medium | small"
  v-liquid-glass="{ background: 'rgba(255, 255, 255, .5)' }">
  <bc-card-text>
    <bc-icon name="home" />
  </bc-card-text>
</bc-card>
