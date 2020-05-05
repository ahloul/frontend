<template>
  <div class="container my-5">
    <div v-html="content.content" />
  </div>
</template>

<script>
import { createClient } from '~/plugins/modules/contentful.js'
const client = createClient()

export default {
  name: 'Imprint',
  async asyncData({ params }) {
    const { fields } = await client.getEntry('7a1SZ1ECcC0TnVozMRKRAt')
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
