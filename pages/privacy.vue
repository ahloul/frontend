<template>
  <div class="container my-5 markdown-body">
    <div class="card w-full" v-html="$md.render(content.content)" />
  </div>
</template>

<script>
import { createClient } from '~/plugins/modules/contentful.js'
const client = createClient()

export default {
  name: 'Privacy',
  async asyncData({ params }) {
    const { fields } = await client.getEntry('49J54qlvRwgiHzdXm0qlKU')
    return { content: fields }
  },
  data: () => ({}),
  head() {
    return {
      title: this.content.title,
    }
  },
}
</script>
