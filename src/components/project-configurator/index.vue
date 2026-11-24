<template>
  <bc-container :class="[baseCss]">
    <bc-async-form :form-data="formData">
      <bc-grid>
        <bc-grid-col :xl="6" :lg="6" :md="6" :sm="6" :xs="12" :class="['p-1']">
          <bc-text-field :error="!projectName" v-model:value="formData.name" labels-uppercase label="Project Name" :icon-left="$icons.vuejs" />
        </bc-grid-col>
        <bc-grid-col :xl="6" :lg="6" :md="6" :sm="6" :xs="12" :class="['p-1']">
          <bc-dropdown :visible-items="config.pm.length" :items="mapToDropdownArray(config.pm)" v-model:value="formData.pm" labels-uppercase label="Package Manager" :icon="$icons.package" />
        </bc-grid-col>
        <bc-grid-col :xl="6" :lg="6" :md="6" :sm="6" :xs="12" :class="['p-1']">
          <bc-dropdown :visible-items="config.theme.length" :items="mapToDropdownArray(config.theme)" v-model:value="formData.theme" labels-uppercase label="Theme" :icon="$icons.theme" />
        </bc-grid-col>
        <bc-grid-col :xl="6" :lg="6" :md="6" :sm="6" :xs="12" :class="['p-1']">
          <bc-dropdown :visible-items="config.language.length" :items="mapToDropdownArray(config.language)" v-model:value="formData.language" labels-uppercase label="Language" :icon="$icons[formData.language[0]]" />
        </bc-grid-col>
        <bc-grid-col :xl="6" :lg="6" :md="6" :sm="6" :xs="12" :class="['p-1']">
          <bc-checkbox v-model:checked="formData.router" label="Add Vue Router" />
        </bc-grid-col>
        <bc-grid-col :xl="6" :lg="6" :md="6" :sm="6" :xs="12" :class="['p-1']">
          <bc-checkbox v-model:checked="formData.axios" label="Add Axios and Vue Axios HTTP client" />
        </bc-grid-col>
        <bc-grid-col :xl="6" :lg="6" :md="6" :sm="6" :xs="12" :class="['p-1']">
          <bc-checkbox v-model:checked="formData.pinia" label="Add Pinia" />
        </bc-grid-col>
        <bc-grid-col :xl="6" :lg="6" :md="6" :sm="6" :xs="12" :class="['p-1']">
          <bc-checkbox v-model:checked="formData.install" label="Install dependencies automatically" />
        </bc-grid-col>
        <bc-grid-col :span="12" :class="['p-1']">
          <bc-checkbox v-model:checked="formData.force" label="Force create project in a non-empty folder" />
        </bc-grid-col>
      </bc-grid>
      <bc-divider :class="['mb-2']" />
      <bc-container :class="['p-1']">
        <bc-text-field :error="!projectName" :value="cmd" labels-uppercase :hint="!projectName ? 'Missing Project Name' : null" :inert="!projectName" :icon-left="$icons.console" :icon-right="$icons.copy" @icon-right-click="copyCommand" @icon-left-click="copyCommand" icon-cursor="pointer" :class="[`${baseCss}-command-line`]" />
      </bc-container>
    </bc-async-form>
  </bc-container>
</template>
<script>
import methods from '../../mixins/methods.js'
import computed from '../../mixins/computed.js'
import props from '../../mixins/props.js'

export default {
  name: 'ProjectConfigurator',
  mixins: [
    props,
    methods,
    computed
  ],
  data () {
    return {
      baseCss: 'project-configurator',
      formData: {
        pm: [
          'npm'
        ],
        name: 'becquerel-app',
        theme: [
          'dark'
        ],
        language: [
          'javascript'
        ],
        router: true,
        axios: true,
        pinia: true,
        install: true,
        force: false
      }
    }
  },
  computed: {
    // the cleaned name used in the command; "." (the current folder) stays as it is
    projectName () {
      return this.formData.name.trim() === '.' ? '.' : this.toProjectName()
    },
    cmd () {
      const formData = this.formData
      const options = [
        `--theme ${formData.theme}`,
        formData.language[0] === 'typescript' ? '--ts' : '--js',
        formData.router ? '--router' : '--no-router',
        formData.axios ? '--axios' : '--no-axios',
        formData.pinia ? '--pinia' : '--no-pinia',
        formData.install ? '--install' : '--no-install',
        ...(formData.force ? ['--force'] : [])
      ].join(' ')
      const project = this.projectName || 'becquerel-app'
      return formData.pm[0] === 'npm' ? `npm create becquerel@latest ${project} -- ${options}` : `${formData.pm[0]} create becquerel ${project} ${options}`
    }
  },
  props: {
    config: {
      type: Object,
      default () {
        return {
          name: '',
          pm: [
            'bun',
            'npm',
            'pnpm',
            'yarn'
          ],
          theme: [
            'dark',
            'light'
          ],
          language: [
            'javascript',
            'typescript'
          ]
        }
      }
    }
  },
  methods: {
    toProjectName () {
      return this.formData.name
        .trim()
        .normalize('NFKD').replace(/[̀-ͯ]/g, '')
        .toLowerCase()
        .replace(/[^a-z\d._~-]+/g, '-')
        .replace(/-{2,}/g, '-')
        .replace(/^[-._~]+|[-._~]+$/g, '')
    },
    copyCommand () {
      this.copyToClipboard(this.cmd).then(() => {
        this.$emitter.emit('bc-snackbar:message', {
          message: this.getLang.copiedToClipboard,
          autoCloseDelay: 5000,
          color: 'success',
          variant: 'solid'
        })
      })
    }
  }
}
</script>
<style>
.project-configurator .bc-text-field.project-configurator-command-line input
{
  font-family: var(--font-family-monospace);
}
</style>
