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
    <div class="card text-primary mt-3 max-w-xl mx-auto">
      <p class="max-w-md mx-auto pb-3 text-center">
        {{ $t('processes.intro') }}
      </p>
      <div class="w-auto max-w-xs mx-auto">
        <n-link class="button primary mx-auto" to="/category">
          {{ $t('processes.add_article') }}
        </n-link>
      </div>
    </div>
    <div class="flex flex-col max-w-xl mx-auto">
      <div
        v-for="entry in news"
        :key="entry.id"
        class="card w-full mt-3 mx-auto"
      >
        <img
          v-if="entry.heroImage"
          :src="`https:${entry.heroImage.fields.file.url}`"
          alt=""
        />
        <h2 v-if="entry.title" class="mt-2">{{ entry.title }}</h2>
        <client-only>
          <timeago
            v-if="entry.createdAt"
            :datetime="entry.createdAt"
            :locale="$t('lang_code')"
            class="text-light"
        /></client-only>
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
    try {
      const { items } = await client.getEntries({
        content_type: 'dealerNews',
        order: '-sys.createdAt',
      })
      const news = items.map((i) => i.fields)
      return { news }
    } catch (e) {
      console.log(e)
    }
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
