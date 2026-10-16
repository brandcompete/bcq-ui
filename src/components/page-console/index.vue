<template>
  <bc-container :class="componentCssClasses">
    <bc-table-layout y-align="middle">
      <bc-table-layout-row>
        <bc-table-layout-cell :class="['w-full', 'relative']">
          <bc-speed-dial @item-click="onItemClick" v-if="!expanded" color="secondary" position="absolute" :label="getLang.share" :items="SocialBarServices" :class="['-mt-1', '-ml-2']" />
          <bc-card v-else>
            <bc-card-text>
              <bc-checkbox size="xs" v-model:checked="clearOnRoutePath" :label="getLang.clearConsoleOnPathChange" :block="false" />
            </bc-card-text>
          </bc-card>
        </bc-table-layout-cell>
        <bc-table-layout-cell :class="['white-space-nowrap']">
          <template v-if="expanded">
            <bc-icon :name="wrapIcon" :class="['ml-2', buttonsCssClasses]" :title="getLang.consoleWrap(wrap)" @click="wrap = !wrap" />
            <bc-icon :name="$icons.cancel" :class="['m-2', buttonsCssClasses]" @click="init" :title="getLang.clearConsole" />
          </template>
          <span v-else @click="toggleConsole" :class="labelCssClasses" :title="getLang.toggleConsole(expanded)" v-text="getLang.toggleConsole(expanded)" />
          <bc-badge v-model:visible="chip" :icon="$icons.bell" color="success">
            <bc-icon :name="toggleConsoleIcon" :class="buttonsCssClasses" @click="toggleConsole" :title="getLang.toggleConsole(expanded)" />
          </bc-badge>
        </bc-table-layout-cell>
      </bc-table-layout-row>
    </bc-table-layout>
    <bc-card :class="['mt-2']" v-if="expanded">
      <bc-card-text overflow="auto" :style="consoleStyle" :padding="[]">
        <ul :class="[messages.length > 1 ? 'mb-1' : null]">
          <li v-for="(message, index) in messages" :class="[`${baseCss}-message`]">
            <bc-container :class="consoleOutputCssClasses" v-html="message" />
            <bc-divider v-if="index < messages.length - 1" />
          </li>
        </ul>
      </bc-card-text>
    </bc-card>
  </bc-container>
</template>
<script>
import methods from '../../mixins/methods.js'
import computed from '../../mixins/computed.js'
import props from '../../mixins/props.js'
import SocialBarServices from '@/helpers/social-bar-services.js'

export default {
  name: 'PageConsole',
  mixins: [
    props,
    methods,
    computed
  ],
  data () {
    return {
      SocialBarServices,
      messages: [],
      chip: false,
      wrap: false,
      expanded: false,
      clearOnRoutePath: true,
      baseCss: 'page-console',
    }
  },
  props: {
    maxHeight: {
      type: String,
      default: '158px'
    }
  },
  computed: {
    labelCssClasses () {
      return [
        'mr-2',
        'text-xs',
        'uppercase',
        'small-caps',
        'select-none',
        'align-middle',
        'inline-block',
        'font-semibold',
        this.buttonsCssClasses
      ]
    },
    componentCssClasses () {
      return [
        this.baseCss
      ]
    },
    wrapIcon () {
      return this.$icons[this.wrap ? 'wrap' : 'wrapDisabled']
    },
    consoleOutputCssClasses () {
      return [
        this.wrap ? null : 'white-space-nowrap',
        'p-1'
      ]
    },
    buttonsCssClasses () {
      return [
        'cursor-pointer',
        'opacity-50',
        'hover:opacity-100',
        'transition-opacity',
        'transition-duration-300'
      ]
    },
    consoleStyle () {
      return {
        height: this.maxHeight
      }
    },
    toggleConsoleIcon () {
      return this.$icons[this.expanded ? 'chevronDown' : 'console']
    }
  },
  watch: {
    expanded () {
      if (this.expanded) {
        this.chip = false
      }
      if (!this.messages.length) {
        this.welcome()
      }
    },
    '$route.path' () {
      if (this.clearOnRoutePath) {
        this.init()
      }
    }
  },
  created () {
    this.bind()
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.messages = []
      if (this.expanded) {
        this.welcome()
      }
      this.objectToStyle({
        color: 'red',
        background: 'lime'
      })
    },
    onItemClick ($event) {
      const width = 800
      const height = 600
      const left = (screen.width / 2) - (width / 2)
      const top = (screen.height / 2) - (height / 2)
      return window.open($event.url(), '_share', `width=${width}, height=${height}, top=${top}, left=${left}, toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no`)
    },
    welcome () {
      const config = this.getConfig
      this.log(config.appName.toLowerCase(), {ready: true}, config.version)
    },
    toggleConsole () {
      const main = document.querySelector('main')
      this.expanded = !this.expanded
      main.classList[this.expanded ? 'add' : 'remove']('mb-4')
      main.style.paddingBottom = this.expanded ? this.maxHeight : 'unset'
    },
    bind () {
      this.$emitter.on('page-console:message', data => {
        this.messages.push(`<code></code>${this.format(data)}`)
        this.chip = !this.expanded
        this.$nextTick(() => {
          this.scrollToElement(`.${this.baseCss}-message:last-of-type`, null)
        })
      })
    },
    format (data) {
      return data.args.map(arg => {
        let style = ''
        let value = arg
        const cssClasses = [typeof arg]
        if (typeof arg === 'object') {
          try {
            value = arg ? JSON.stringify(arg, null, 2)
              .replace(/"([^"]+)"\s*:/g, '$1:')
              .replace(/:\s*"([^"]*)"/g, ": '$1'") : 'null'
          } catch {
            value = '[object Object]'
          }
        }
        if (this.isStringHex(value)) {
          style = this.objectToStyle({color: value})
        }
        if (value && value.indexOf !== undefined && value.indexOf('bc-') > -1) {
          cssClasses.push('bc-tag', 'font-semibold')
        }
        return `<code class="${cssClasses.join(' ')}" style="${style}">${String(value)}</code>&nbsp;`
      }).join('&nbsp;')
    }
  }
}
</script>
<style>
.page-console .page-console-message code
{
  font-size: 0.9em;
}

.page-console .number,
.page-console .boolean
{
  color: #8e76eb;
}

.page-console .object
{
  color: #dc7c51;
}

.page-console .page-console-message code:nth-of-type(1),
.page-console .page-console-message code:nth-of-type(2)
{
  opacity: .75;
}

.page-console .page-console-message code:nth-of-type(1)::before
{
  content: "\232A\0020";
  color: #a1a2ff;
}

.page-console .page-console-message code.bc-tag:nth-of-type(3)::before
{
  content: "<";
}

.page-console .page-console-message code.bc-tag:nth-of-type(3)::after
{
  content: " />";
}

.page-console .page-console-message code:nth-of-type(3)::before,
.page-console .page-console-message code:nth-of-type(3)::after
{
  opacity: .5;
}

.page-console .page-console-message code:nth-of-type(1)
{
  font-weight: bolder;
}

.page-console .page-console-message img
{
  display: none;
}
</style>
