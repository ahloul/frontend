<template>
  <div class="container my-5 markdown-body">
    <div class="card w-full" v-html="$md.render(content)" />
  </div>
</template>

<script>
import { createClient } from '~/plugins/modules/contentful.js'

const client = createClient()

export default {
  name: 'Imprint',
  async asyncData({ params }) {
    const { fields } = await client.getEntry('383HaOpwTeaZpMV4nvJVTp')
    console.log(fields.content)
    return { content: fields.content }
  },
  data: () => ({}),
  head() {
    return {
      title: this.content.title,
    }
  },
}
</script>
