<template>
  <div class="">
    <div class="card text-light mt-3 max-w-3xl mx-auto">
      <p class="max-w-md mx-auto pb-3 text-center">
        {{ $t('processes.intro') }}
      </p>
      <div class="w-auto max-w-xs mx-auto">
        <n-link class="button cta bg-tertiary mx-auto" to="/category">
          {{ $t('processes.add_product') }}
        </n-link>
      </div>
    </div>
    <div class="news-grid">
      <div v-for="entry in news" :key="entry.id" class="card news-item">
        <img
          v-if="entry.heroImage"
          :src="`https:${entry.heroImage.fields.file.url}`"
          alt=""
        />
        <h2 v-if="entry.title" class="mt-2 leading-snug">{{ entry.title }}</h2>
        <client-only>
          <timeago
            v-if="entry.createdAt"
            :datetime="entry.createdAt"
            :locale="$t('lang_code')"
            class="text-light text-sm"
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
      return { news: [] }
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

.news {
  &-grid {
    @apply gap-2 mx-auto max-w-3xl;
    columns: 1;
    @screen sm {
      columns: 2;
    }
  }
  &-item {
    @apply mt-2 w-full inline-block;
  }
}
</style>
