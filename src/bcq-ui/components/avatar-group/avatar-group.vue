<template>
  <bc-container :class="componentCssClasses" :data-avatar-group-id="id">
    <slot /><bc-avatar :tile="limitTile" :size="limitSize" :elevation="limitElevation" :color="limitColor" :variant="limitVariant" :font-size="limitFontSize" :font-weight="limitFontWeight" :class="[`${baseCss}-limit`, limit > 0 ? null : 'hidden']">{{ limitLabel(hiddenAvatars) }}</bc-avatar>
    <bc-reactive-style>
    .{{ baseCss }}[data-avatar-group-id="{{ id }}"] .bc-avatar
    {
      margin-left: {{ gap }}px;
    }
    </bc-reactive-style>
  </bc-container>
</template>
<script>
import methods from '../../mixins/methods'

export default {
  name: 'BcAvatarGroup',
  mixins: [
    methods
  ],
  data () {
    return {
      id: this.uuid(),
      hiddenAvatars: 0,
      baseCss: this.componentBaseCss('avatar-group')
    }
  },
  computed: {
    componentCssClasses () {
      return [
        this.baseCss,
        'select-none'
      ]
    },
    avatarsLength () {
      return this.$el.querySelectorAll('.bc-avatar:not(.bc-avatar-group-limit)').length
    }
  },
  watch: {
    limit () {
      this.setLimit()
    }
  },
  props: {
    gap: {
      type: Number,
      default: -12
    },
    limit: {
      type: Number,
      default: 0
    },
    limitColor: {
      type: String,
      default: 'secondary'
    },
    limitElevation: {
      type: String,
      default: 'md'
    },
    limitFontWeight: {
      type: String,
      default: 'normal'
    },
    limitFontSize: {
      type: String,
      default: 'sm'
    },
    limitLabel: {
      type: Function,
      default (value) {
        return `+${value}`
      }
    },
    limitSize: {
      type: String,
      default: '48px'
    },
    limitTile: {
      type: Boolean,
      default: false
    },
    limitVariant: {
      type: String,
      default: 'outline'
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.setLimit()
    },
    getAvatars () {
      return this.$el.querySelectorAll('.bc-avatar:not(.bc-avatar-group-limit)')
    },
    getLimitAvatar () {
      return this.$el.querySelector('.bc-avatar-group-limit')
    },
    setLimit () {
      const avatars = this.getAvatars()
      const limitAvatar = this.getLimitAvatar()
      const limit = this.limit
      const hidden = 'hidden'
      this.hiddenAvatars = limit === 1 ? avatars.length : avatars.length - limit
      avatars.forEach(avatar => {
        avatar.classList.add(hidden)
      })
      switch (limit) {
        case 1:
          avatars.forEach(avatar => {
            avatar.classList.add(hidden)
          })
          break
        case 0:
          avatars.forEach(avatar => {
            avatar.classList.remove(hidden)
          })
          break
        default:
          for (let step = 0; step < limit; step ++) {
            const avatar = avatars[step]
            if (avatar) {
              avatars[step].classList.remove(hidden)
            }
          }
      }
      limitAvatar.classList[limit === avatars.length ? 'add' : 'remove'](hidden)
    }
  }
}
</script>
