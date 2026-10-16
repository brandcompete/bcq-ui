<bc-avatar-group 
  :gap="Number"
  :limit="Number"
  :limit-color="String"
  :limit-elevation="String"
  :limit-font-weight="String"
  :limit-font-size="String"
  :limit-label="Function"
  :limit-size="String"
  :limit-tile="Boolean"
  :limit-variant="String">
  <bc-avatar v-for="avatar in avatars">{{ avatar }}</bc-avatar>
</bc-avatar-group>
