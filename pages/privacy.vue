<template>
  <div class="container my-5">
    <div class="max-w-3xl mx-auto" v-html="$md.render(content.content)" />
  </div>
</template>

<script>
import { createClient } from '~/plugins/modules/contentful.js'
const client = createClient()

export default {
  name: 'Privacy',
  async asyncData({ params }) {
    const { fields } = await client.getEntry('3QLBYuZtuw64ICL4xwppOE')
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

<style lang="css" scoped></style>
