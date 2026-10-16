<template>
  <bc-container :class="componentCssClasses">
    <bc-container :tag="tag" v-for="repeat in repeats" :key="repeat" :class="itemsMargin" v-html="item()" />
  </bc-container>
</template>
<script>
import methods from '../../mixins/methods'

export default {
  name: 'BcLoremIpsum',
  mixins: [
    methods
  ],
  data () {
    return {
      baseCss: this.componentBaseCss('lorem-ipsum'),
      paragraphs: [
        `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
        dolore magna aliqua. <a href="#" class="underline">Ut enim ad minim</a> veniam, quis nostrud exercitation
        ullamco laboris nisi ut aliquip ex ea commodo consequat.`,
        `Sed ut <a href="#" class="underline">perspiciatis</a> unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem
        aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
        Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni
        dolores eos qui ratione voluptatem sequi nesciunt.`,
        `Neque porro <a href="#" class="underline">quisquam est</a>, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non
        numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.`,
        `Ut enim ad minima <a href="#" class="underline">veniam</a>, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid
        ex ea commodi consequatur? Quis autem vel eum iure <a href="#" class="underline">reprehenderit</a> qui in ea voluptate velit esse quam
        nihil molestiae consequatur, <a href="#" class="underline">vel illum</a> qui dolorem eum fugiat quo voluptas nulla pariatur?`,
        `At vero eos et <a href="#" class="underline">accusamus</a> et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque
        corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident`,
        `Et harum quidem rerum facilis est et expedita <a href="#" class="underline">distinctio</a>. Nam libero tempore,
        cum soluta nobis est eligendi optio
        cumque nihil <a href="#" class="underline">impedit quo minus</a> id quod maxime placeat facere possimus, omnis voluptas assumenda
        est, omnis dolor repellendus.`
      ]
    }
  },
  props: {
    repeats: {
      type: Number,
      default: 1
    },
    tag: {
      type: String,
      default: 'p'
    },
    fontSize: {
      type: String,
      default: 'sm'
    },
    itemsMargin: {
      type: Array,
      default () {
        return ['mb-2']
      }
    }
  },
  computed: {
    componentCssClasses () {
      return [
        this.baseCss,
        `text-${this.fontSize}`
      ]
    }
  },
  methods: {
    item () {
      const paragraphs = this.paragraphs
      return paragraphs[Math.floor(Math.random() * paragraphs.length)]
    }
  }
}
</script>
