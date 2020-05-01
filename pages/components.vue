<template>
  <div class="container">
    <!-- CTA -->
    <div
      class="hero flex items-stretch flex-col h-48 md:h-64 bg-cover bg-center rounded-lg mt-2 text-white"
      style="background-image: url('/img/berlin.png');"
    >
      <div class="flex-1 text-right px-4 py-2 m-2">
        <button class="link ml-auto">
          <icon name="close" fill="white" />
        </button>
      </div>
      <div class="self-center flex-1 text-center px-4 py-2 m-2">
        <h1 class="antialiased text-white font-semibold">Hallo Berlin</h1>
      </div>
      <div class="flex-1 text-center px-4 py-2 m-2">
        <!-- Bottom -->
      </div>
    </div>
    <!-- Navbar -->
    <h2 class="my-5">
      Navbar
    </h2>
    <div class="max-w-sm">
      <navbar />
    </div>
    <!-- Buttons -->
    <h2 class="my-5">
      Buttons
    </h2>
    <div class="flex flex-wrap examples-button">
      <button class="primary">Primary Button</button>
      <button class="primary spinner-light">Spinner Button</button>
      <button>Default Button</button>
      <button class="link">Button Link</button>
      <button class="bordered">Button Bordered</button>
      <button class="bordered spinner-dark">Spinner Bordered</button>
      <button class="primary icon-r">
        <icon name="google"></icon>
        Button with icon
      </button>
    </div>
    <!-- Toast -->
    <h2 class="my-5">
      Toast
    </h2>
    <div class="flex flex-wrap examples-button">
      <button
        class="primary"
        @click="
          $store.dispatch('toast/add', { message: `Toast ${uniqueId()}` })
        "
      >
        Add Toast
      </button>
      <button
        class="primary"
        @click="
          $store.dispatch('toast/add', {
            message: `Toast ${uniqueId()}`,
            dontHide: true,
          })
        "
      >
        Add Toast (dont hide)
      </button>
    </div>
    <!-- Icon examples -->
    <h2 class="my-5">Icon Examples</h2>
    <div class="flex flex-wrap">
      <div class="m-3">
        <icon name="github"></icon>
        <icon name="facebook" fill="royalBlue"></icon>
        <icon name="facebook-outline" fill="royalBlue"></icon>
        <icon name="google"></icon>
        <icon name="google-outline"></icon>
      </div>
      <div class="m-3">
        <icon name="person"></icon>
        <icon name="person-outline"></icon>
      </div>
      <div class="m-3">
        <icon name="shopping-bag"></icon>
        <icon name="shopping-bag-outline"></icon>
        <icon name="shopping-cart"></icon>
        <icon name="shopping-cart-outline"></icon>
      </div>
      <div>
        <icon name="shop"></icon>
      </div>
    </div>
    <div>
      <a href="https://akveo.github.io/eva-icons/#/" target="_blank"
        ><icon name="link-2-outline" class="mr-1" />Full List</a
      >
    </div>
    <!-- Modal -->
    <h2>Modal</h2>

    <modal
      :show="showModal"
      centered
      dismiss="Close Modal"
      @dismiss="showModal = false"
      @confirm="showModal = false"
      >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque,
      dignissimos?
      <br />
      <b>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</b></modal
    >

    <button class="primary" @click="showModal = !showModal">Open Modal</button>
    <!-- Notification -->
    <h2 class="my-5">Notification</h2>

    <div class="text-center py-4 lg:px-4">
      <notification pill="new" icon="github"
        >Get the coolest t-shirts from our brand new store</notification
      >
    </div>
    <!-- Form examples -->
    <h2 class="my-5">Forms</h2>
    <div class="form-content">
      <label class="form-label">
        <span>Name</span>
        <input class="form-input" placeholder="Jane Doe" />
      </label>

      <div class="mt-4">
        <span>Account Type</span>
        <div class="mt-2">
          <label class="inline-flex items-center">
            <input
              type="radio"
              class="form-radio"
              name="accountType"
              value="personal"
            />
            <span class="ml-2">Personal</span>
          </label>
          <label class="inline-flex items-center ml-6">
            <input
              type="radio"
              class="form-radio"
              name="accountType"
              value="busines"
            />
            <span class="ml-2">Business</span>
          </label>
        </div>
      </div>

      <label class="block mt-4">
        <span class="text-gray-700">Requested Limit</span>
        <select class="form-select">
          <option>$1,000</option>
          <option>$5,000</option>
          <option>$10,000</option>
          <option>$25,000</option>
        </select>
      </label>

      <div class="flex mt-6">
        <label class="flex items-center">
          <input type="checkbox" class="form-checkbox" />
          <span class="ml-2"
            >I agree to the <span class="underline">privacy policy</span></span
          >
        </label>
      </div>
    </div>
    <!-- Toggle 
    <h2 class="my-5">Toggle</h2>
    <toggle />
    -->

    <!-- Wysiwyg -->
    <h2 class="my-5">wysiwyg editor</h2>
    <wysiwyg />
  </div>
</template>
<script>
import { uniqueId } from 'lodash'
import Navbar from '~/components/layout/Navbar'
import Notification from '~/components/elements/Notification'
// import Toggle from '~/components/elements/Toggle'
import Wysiwyg from '~/components/utils/Wysiwyg'
// import Imageupload from '~/components/utils/Imageupload'
export default {
  components: {
    Notification,
    Navbar,
    // Toggle,
    Wysiwyg,
  },
  middleware: 'authenticated',
  data: () => ({
    showModal: false,
    uniqueId,
  }),
}
</script>
<style lang="scss" scoped>
.hero {
  box-shadow: inset 0 0 0 100vw rgba(78, 33, 90, 0.3);
}
.examples {
  &-button button {
    @apply m-2;
  }
}
</style>
