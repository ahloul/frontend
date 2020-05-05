<template>
  <div class="container">
    <!-- CTA -->
    <div
      class="hero flex items-stretch flex-col h-48 md:h-64 bg-cover bg-center rounded-lg mt-2 text-white"
      style="background-image: url('/img/shop.jpg');"
    >
      <div class="flex-1 text-right px-4 py-2 m-2">
        <!-- <button class="link ml-auto">
          <icon name="close" fill="white" />
        </button>
      --></div>
      <div class="self-center flex-1 text-center px-4 py-2 m-2">
        <h1 class="antialiased text-white font-semibold">
          {{ $t('processes.welcome') }}
        </h1>
      </div>
      <div class="flex-1 text-center px-4 py-2 m-2">
        <!-- Bottom -->
      </div>
    </div>
    <div class="card text-primary mt-3">
      <p class="max-w-md mx-auto pb-3 text-center">
        {{ $t('processes.intro') }}
      </p>
      <div class="w-auto max-w-xs mx-auto">
        <n-link class="button primary mx-auto" to="/category">
          {{ $t('processes.add_article') }}
        </n-link>
      </div>
    </div>
    <div
      v-for="entry in news"
      :key="entry.id"
      class="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2"
    >
      <div class="card">
        <img
          v-if="entry.heroImage"
          :src="`https:${entry.heroImage.fields.file.url}`"
          alt=""
        />
        <h2 v-if="entry.title" class="mt-2">{{ entry.title }}</h2>
        <timeago :datetime="entry.createdAt" class="text-light" />
        <div v-if="entry.body" class="mt-2" v-html="entry.body" />
      </div>
    </div>
    <!-- {{ shop }} -->
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { createClient } from '~/plugins/modules/contentful.js'
const client = createClient()

export default {
  middleware: 'authenticated',
  async asyncData({ params }) {
    const { items } = await client.getEntries({
      content_type: 'dealerNews',
      order: '-sys.createdAt',
    })
    const news = items.map((i) => i.fields)
    return { news }
  },
  computed: {
    ...mapGetters({
      shop: 'shop/shop',
    }),
  },
}
</script>
<style lang="scss" scoped>
.hero {
  box-shadow: inset 0 0 0 100vw rgba(78, 33, 90, 0.3);
}
</style>
