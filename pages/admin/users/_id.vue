<template>
  <div>
    <admin-bar />
    <static-modal
      v-if="showModal"
      :dismiss="$t('dismiss')"
      @dismiss="showModal = false"
    >
      <autocomplete
        value=""
        :endpoint="`shops`"
        name="shopId"
        display-name="shopId"
        placeholder="Shop ID"
        @selection="assignShop"
    /></static-modal>
    <div class="card mt-3">
      <div class="flex items-center">
        <div class="mr-2">
          <img
            class="rounded-full mx-auto"
            :src="user.picture.url"
            width="50"
            @error="(e) => (e.target.src = '/img/placeholder.png')"
          />
        </div>
        <div class="flex items-center w-full">
          <div class="w-full">
            <h3 class="text-lg leading-6 font-medium">
              User Information
            </h3>
            <p class="max-w-2xl text-sm leading-5">
              Personal details
            </p>
          </div>
          <div>
            <button @click="showDeleteModal">
              <icon name="trash-outline" display-name="shopId" />
            </button>
          </div>
        </div>
      </div>
      <div class="mt-5 border-t border-gray-200 pt-5">
        <dl>
          <div class="sm:grid sm:grid-cols-3 sm:gap-4">
            <dt class="text-sm leading-5 font-medium">
              Full name
            </dt>
            <dd class="mt-1 text-sm leading-5 sm:mt-0 sm:col-span-2">
              {{ user.name }}
            </dd>
          </div>
          <div
            class="mt-8 sm:grid sm:mt-5 sm:grid-cols-3 sm:gap-4 sm:border-t sm:pt-5"
          >
            <dt class="text-sm leading-5 font-medium">
              E-Mail address
            </dt>
            <dd class="mt-1 text-sm leading-5 sm:mt-0 sm:col-span-2">
              {{ user.email }}
            </dd>
          </div>
          <div
            class="mt-8 sm:grid sm:mt-5 sm:grid-cols-3 sm:gap-4 sm:border-t sm:pt-5"
          >
            <dt class="text-sm leading-5 font-medium">
              Registered since
            </dt>
            <dd class="mt-1 text-sm leading-5 sm:mt-0 sm:col-span-2">
              <client-only>
                <timeago v-if="user.createdAt" :datetime="user.createdAt"
              /></client-only>
            </dd>
          </div>
          <div
            class="mt-8 sm:grid sm:mt-5 sm:grid-cols-3 sm:gap-4 sm:border-t sm:pt-5"
          >
            <dt class="text-sm leading-5 font-medium">
              Role
            </dt>
            <dd class="mt-1 text-sm leading-5 sm:mt-0 sm:col-span-2">
              {{ user.role }}
            </dd>
          </div>
          <div
            class="mt-8 sm:grid sm:mt-5 sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5"
          >
            <dt class="text-sm leading-5 font-medium text-gray-500">
              About
            </dt>
            <dd
              class="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2"
              v-html="user.description || 'No Description'"
            ></dd>
          </div>
          <div
            class="mt-8 sm:grid sm:mt-5 sm:grid-cols-3 sm:gap-4 sm:border-t sm:pt-5"
          >
            <dt class="text-sm leading-5 font-medium">
              Active Shop
            </dt>
            <dd class="mt-2 text-sm leading-5 sm:mt-0 sm:col-span-2 flex">
              <div
                v-if="user.activeShop"
                class="mb-3 flex flex-wrap justify-between w-full"
              >
                <div class="flex items-center">
                  <img
                    class="mx-auto mr-2"
                    :src="user.activeShop.logo.url"
                    width="50"
                    @error="(e) => (e.target.src = '/img/placeholder.png')"
                  />
                  <div class="flex flex-col">
                    <div class="font-bold">{{ user.activeShop.name }}</div>
                    <div class="">
                      <a
                        :href="`https://getit.market/${user.activeShop.shopId}`"
                        target="_blank"
                        class=""
                        >{{ user.activeShop.shopId }}</a
                      >
                    </div>
                  </div>
                </div>

                <div class="flex mt-3">
                  <button class="mr-1" @click="removeActiveShop">
                    Remove
                  </button>
                </div>
              </div>
            </dd>
          </div>
          <div
            class="mt-8 sm:grid sm:mt-5 sm:grid-cols-3 sm:gap-4 sm:border-t sm:pt-5"
          >
            <dt class="text-sm leading-5 font-medium">
              Shops
            </dt>
            <dd class="mt-2 text-sm leading-5 sm:mt-0 sm:col-span-2">
              <ul class="items-center">
                <li
                  v-for="shop in user.shops"
                  :key="shop._id"
                  class="mb-3 flex flex-wrap justify-between"
                >
                  <div class="flex items-center">
                    <div>
                      <img
                        class="mr-2"
                        :src="shop.logo.url"
                        width="50"
                        @error="(e) => (e.target.src = '/img/placeholder.png')"
                      />
                    </div>
                    <div class="flex flex-col">
                      <div class="font-bold">{{ shop.name }}</div>
                      <div class="">
                        <a
                          :href="`https://getit.market/${shop.shopId}`"
                          target="_blank"
                          class=""
                          >{{ shop.shopId }}</a
                        >
                      </div>
                    </div>
                  </div>

                  <div class="flex mt-3">
                    <button class="primary mr-1" @click="setActive(shop)">
                      Set active
                    </button>
                    <button class="button" @click="revokeShop(shop)">
                      Revoke Shop
                    </button>
                  </div>
                </li>
              </ul>
              <div class="flex mt-5">
                <button class="mx-auto" @click="showModal = true">
                  <icon name="plus" />
                </button>
              </div>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  </div>
</template>

<script>
import { reject } from 'lodash'
import AdminBar from '~/components/pageElements/admin/AdminBar'
import StaticModal from '~/components/elements/StaticModal'
import Autocomplete from '~/components/elements/Autocomplete'
export default {
  name: 'AdminUser',
  middleware: ['admin'],
  components: {
    AdminBar,
    StaticModal,
    Autocomplete,
  },
  async asyncData({ $axios, query, redirect, store, params }) {
    try {
      const user = await $axios.$get(`/api/users/${params.id}`)
      return { user }
    } catch (error) {
      console.log(error)
      return { user: {} }
    }
  },
  data: () => ({
    showModal: false,
    pending: {
      getActiveShop: false,
      getUserShops: false,
    },
    activeShop: null,
    userShops: null,
  }),
  computed: {
    selectedShop(e) {
      return 'asd'
    },
  },
  methods: {
    showDeleteModal() {
      this.$store.commit('modal/showModal', {
        message: 'admin.user.delete_confirmation',
        dismissText: 'dismiss',
        onConfirm: this.deleteUser,
      })
    },
    showRevokeModal() {
      this.$store.commit('modal/showModal', {
        message: 'admin.user.revoke_confirmation',
        dismissText: 'dismiss',
        onConfirm: this.deleteUser,
      })
    },
    async setActive({ _id }) {
      try {
        // Set new Shop
        await this.$axios.patch(`/api/users/${this.user._id}/shops/active`, {
          _id,
        })
        await this.getUser()
        this.$store.dispatch('toast/add', { text: `Shop was set at user` })
      } catch (error) {
        this.$store.dispatch('toast/add', { message: `toast.something_wrong` })
        console.log(error)
      }
    },
    async deleteUser() {
      try {
        await this.$axios.$delete(`/api/users/${this.user._id}`)
        this.$router.push('/admin/users')
        this.$store.dispatch('toast/add', { text: `User deleted!` })
      } catch (error) {
        this.$store.dispatch('toast/add', { message: `toast.something_wrong` })
        console.log(error)
      }
    },
    async revokeShop(shop) {
      const newShops = reject(this.user.shops, { _id: shop._id })
      try {
        await this.$axios.$patch(`/api/users/${this.user._id}`, {
          shops: newShops,
        })
        await this.getUser()
        this.$store.dispatch('toast/add', { text: `Shop revoked!` })
      } catch (error) {
        this.$store.dispatch('toast/add', { message: `toast.something_wrong` })
        console.log(error)
      }
    },
    async removeActiveShop() {
      try {
        await this.$axios.$patch(`/api/users/${this.user._id}`, {
          activeShop: null,
        })
        await this.getUser()
        this.$store.dispatch('toast/add', { text: `Shop revoked!` })
      } catch (error) {
        this.$store.dispatch('toast/add', { message: `toast.something_wrong` })
      }
    },
    async getUser() {
      // Get User
      this.user = await this.$axios.$get(`/api/users/${this.$route.params.id}`)
    },
    async assignShop(shop) {
      this.user.shops.push(shop)
      try {
        await this.$axios.patch(`/api/users/${this.user._id}`, {
          shops: this.user.shops,
        })
        await this.getUser()
        this.showModal = false
        this.$store.dispatch('toast/add', { message: `Shop Added!` })
      } catch (error) {
        console.log(error)
        console.log('error')
        this.showModal = false
        this.$store.dispatch('toast/add', { message: `toast.something_wrong` })
      }
    },
  },
}
</script>
