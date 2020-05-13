<template>
  <div>
    <h3 class="my-3">{{ count }} Users</h3>
    <div
      v-for="user in users"
      :key="user._id"
      class="bg-white p-4 shadow rounded-lg mt-3"
    >
      <div>
        <div class="flex items-start">
          <div class="w-10 mx-auto mr-2">
            <img
              class="rounded-full"
              :src="user.picture.url"
              @error="(e) => (e.target.src = '/img/placeholder.png')"
            />
          </div>
          <div class="flex flex-col w-full">
            <h3 class="leading-none">{{ user.name }}</h3>
            <div class="text-light">{{ user.email }}</div>
            <hr class="mt-2 mb-1" />
            <div class="text-light flex flex-wrap text-xs">
              <div class="mr-2">
                Created:
                <client-only>
                  <timeago
                    v-if="user.createdAt"
                    :datetime="user.createdAt"
                    :locale="$t('lang_code')"
                    class="text-light"
                /></client-only>
              </div>
              <div>
                Updated:
                <client-only>
                  <timeago
                    v-if="user.createdAt"
                    :datetime="user.createdAt"
                    :locale="$t('lang_code')"
                    class="text-light"
                /></client-only>
              </div>
            </div>
          </div>
          <!--
          <span
            class="rounded-lg py-1 px-2 text-white text-xs ml-auto"
            :class="[shop.published ? 'bg-success' : 'bg-warning']"
            >{{ shop.published ? 'Online' : 'Offline' }}</span
          >
        --></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    users: {
      type: Array,
      default: () => [],
      required: true,
    },
    count: {
      type: Number,
      default: 0,
    },
  },
}
</script>
