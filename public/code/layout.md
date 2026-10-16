<bc-app>
  <!-- recommended location: app.vue, as a child of <bc-app /> -->
  <bc-layout 
    :sidebar-right="Object"
    :sidebar-left="Object"
    :header="Object"
    :header-height="Number"
    :icons-provider="String"
    :main="Object"
    :footer="Object"
    :footer-height="Object"
    :floating-sidebars="Boolean"
    :sidebars-collapsed-width="Number">
      <!-- all slots are optional, yet you might definitely need header, sidebar-left and main -->
      <template v-slot:header>header</template>
      <template v-slot:sidebar-left>left sidebar</template>
      <template v-slot:sidebar-left-controls>left sidebar controls</template>
      <template v-slot:main>main area</template>
      <template v-slot:sidebar-right>right sidebar</template>
      <template v-slot:sidebar-right-controls>right sidebar controls</template>
      <template v-slot:footer>footer</template>
    </bc-layout>
</bc-app>
