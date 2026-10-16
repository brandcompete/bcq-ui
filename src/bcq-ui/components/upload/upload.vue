<template>
  <bc-container :data-upload="name" :inert="inert || loading" :block="block ? 'block' : 'inline-block'" :class="componentCssClasses" :style="componentStyle">
    <bc-container :class="innerWrapperCssClasses">
      <bc-table-layout y-align="middle">
        <bc-table-layout-row>
          <bc-table-layout-cell x-align="left">
            <bc-container tag="label" :for="id" :class="['block', 'w-full']">
              <bc-async-form :form-data="{}">
                <bc-btn block @click="clickUploadInput" :class="[clearable ? 'border-noround-right' : null]" :icon-provider="iconProvider" elevation="none" :roundness="roundness" :icon-left="iconLeft" :icon-right="iconRight" :loading="loading" :font-weight="labelsFontWeight" :uppercase="labelsUppercase" :size="size" :color="color" :variant="variant">{{ label }}</bc-btn>
                <input @change="getFileData" :key="key" type="file" :name="name" :id="id" :accept="mimeTypes.join(',')" :disabled="disabled" :class="['appearance-none', 'hidden']" :multiple="multiple ? 'multiple' : null" tabindex="-1" />
              </bc-async-form>
            </bc-container>
          </bc-table-layout-cell>
          <bc-table-layout-cell x-align="left" v-if="clearable" :class="[`${baseCss}-clearable-cell`]">
            <bc-btn block @click="reset" :inert="!isReady || loading" :icon-provider="iconProvider" :icon="iconClearable" elevation="none" :roundness="roundness" :size="size" :color="color" :variant="variant" :class="['border-noround-left']" />
          </bc-table-layout-cell>
        </bc-table-layout-row>
      </bc-table-layout>
    </bc-container>
    <bc-text-field-label :text="hint" :class="['text-right', labelsUppercase ? 'uppercase' : null, 'mt-1', isReady ? 'mb-1' : null, makeFontWeight(labelsFontWeight)]" />
    <bc-card v-if="isReady" :key="key" :elevation="elevation">
      <bc-card-text>
        <bc-list divider :max-height="fileListMaxHeight">
          <bc-list-item v-for="(file, index) in files" :key="index" :class="[file.fileTooBig ? makeUiColorVariant(colorFileTooBig, 'solid') : null]">
            <bc-list-item-icon>
              <bc-avatar tile block :size="fileListImageThumbnailSize" :elevation="elevation" v-if="isImage(index)" :src="file.result" :border-width="0" />
              <bc-icon v-else :name="file.fileTooBig ? iconFileTooBig : iconFile" />
            </bc-list-item-icon>
            <bc-list-item-content>
              <bc-list-item-content-title v-text="file.name" />
              <bc-list-item-content-sub-title v-text="file.sizeFormatted" :class="['opacity-75']" />
              <bc-list-item-content-sub-title v-if="file.fileTooBig" v-text="messageFileTooBig" />
            </bc-list-item-content>
            <bc-list-item-icon v-if="clearable">
              <bc-icon :class="['cursor-pointer']" :name="iconClearable" @click="removeFile(index)" />
            </bc-list-item-icon>
          </bc-list-item>
        </bc-list>
      </bc-card-text>
    </bc-card>
  </bc-container>
</template>
<script>
import methods from '../../mixins/methods'

export default {
  name: 'BcUpload',
  mixins: [
    methods
  ],
  data () {
    return {
      key: 0,
      src: null,
      files: null,
      fileTooBig: false,
      fileNotAllowed: false,
      previewNotAvailable: true,
      id: `bc-upload-${this.uuid()}`,
      baseCss: this.componentBaseCss('upload')
    }
  },
  computed: {
    componentCssClasses () {
      return [
        this.baseCss,
        this.block ? null : ['inline-block', 'align-middle'],
        this.disabled && !this.inert ? 'disabled' : null,
        'select-none'
      ]
    },
    innerWrapperCssClasses () {
      return [
        this.makeElevation(this.elevation),
        this.makeBorderRadius(this.roundness)
      ]
    },
    componentStyle () {
      return {
        width: this.width
      }
    },
    isReady () {
      const files = this.files
      return files && files.length && this.src
    }
  },
  props: {
    block: {
      type: Boolean,
      default: true
    },
    clearable: {
      type: Boolean,
      default: true
    },
    color: {
      type: String,
      default: 'primary'
    },
    colorFileTooBig: {
      type: String,
      default: 'danger'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    elevation: {
      type: String,
      default: 'md'
    },
    fileListImageThumbnailSize: {
      type: String,
      default: '48px'
    },
    fileListMaxHeight: {
      type: String
    },
    hint: {
      type: String
    },
    iconClearable: {
      type: String,
      default: 'close-circle'
    },
    iconFile: {
      type: String,
      default: 'file'
    },
    iconFileTooBig: {
      type: String,
      default: 'alert'
    },
    iconLeft: {
      type: String
    },
    iconProvider: {
      type: String,
      default: 'mdi'
    },
    iconRight: {
      type: String
    },
    inert: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: 'Choose File...'
    },
    labelsUppercase: {
      type: Boolean,
      default: false
    },
    labelsFontWeight: {
      type: String,
      default: 'normal'
    },
    loading: {
      type: Boolean,
      default: false
    },
    maxFileSize: {
      type: Number
    },
    messageFileTooBig: {
      type: String,
      default: 'File too big. Choose a smaller file'
    },
    mimeTypes: {
      type: Array,
      default: () => {
        return []
      }
    },
    multiple: {
      type: Boolean,
      default: false
    },
    name: {
      type: String
    },
    roundness: {
      type: String,
      default: "full"
    },
    size: {
      type: String,
      default: 'sm'
    },
    sizes: {
      type: Array,
      default () {
        return [
          'Bytes',
          'KB',
          'MB',
          'GB',
          'TB',
          'PB',
          'EB',
          'ZB',
          'YB'
        ]
      }
    },
    variant: {
      type: String,
      default: 'solid'
    },
    width: {
      type: String
    }
  },
  methods: {
    getInputFileNode () {
      return this.$el.querySelector(`input[type="file"]`)
    },
    clickUploadInput () {
      this.getInputFileNode().click()
    },
    getFileList () {
      return this.getInputFileNode().files
    },
    getFileData () {
      this.files = this.getFileList()
      this.getBase64()
    },
    format (bytes, decimals = 2) {
      if (bytes === 0) {
        return '0 Bytes'
      }
      const k = 1024
      const dm = decimals < 0 ? 0 : decimals
      const sizes = this.sizes
      const i = Math.floor(Math.log(bytes) / Math.log(k))
      return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
    },
    isImage (index) {
      return this.files.item(index).type.includes('image')
    },
    isText (index) {
      return this.files.item(index).type.includes('text')
    },
    reset () {
      this.src = null
      this.files = null
      this.fileTooBig = false
      this.fileNotAllowed = false
      this.resetForm()
      this.$emit('clear', new DataTransfer().files)
    },
    resetForm () {
      this.$el.querySelector(`form`).reset()
    },
    removeFile (index) {
      const list = new DataTransfer()
      const newFileList = Array.from(this.files)
      newFileList.splice(index, 1)
      newFileList.forEach(file => {
        list.items.add(file)
      })
      if (!list.files.length) {
        this.reset()
      } else {
        this.files = list.files
        this.$emit('files', this.files)
      }
    },
    getBase64 () {
      Array.from(this.files).forEach((file, index) => {
        const reader = new FileReader()
        const type = this.files.item(index).type
        this.src = null
        if (this.mimeTypes.length && !this.mimeTypes.includes(type)) {
          this.fileNotAllowed = true
          return
        }
        if (this.isText(index)) {
          reader.readAsText(this.files.item(index))
        } else {
          reader.readAsDataURL(this.files.item(index))
        }
        reader.onload = () => {
          const size = this.files.item(index).size
          const maxFileSize = this.maxFileSize
          this.files.item(index).result = reader.result
          this.files.item(index).sizeFormatted = this.format(size)
          this.src = reader.result
          this.fileTooBig = false
          this.fileNotAllowed = false
          this.key++
          if (size > maxFileSize) {
            this.fileTooBig = true
            this.files.item(index).fileTooBig = true
          }
        }
        reader.onerror = (error) => {
          console.error(error)
        }
      })
      this.$emit('files', this.files)
    }
  }
}
</script>
<style>
.bc-upload .bc-upload-clearable-cell
{
  width: var(--icon-cell-width);
}
</style>
