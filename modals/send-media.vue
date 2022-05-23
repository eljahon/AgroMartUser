<template>
  <div class="p-4">
    <div class="flex justify-between items-start p-5 rounded-t border-b dark:border-gray-600">
      <h3 class="text-xl font-semibold text-gray-900 lg:text-2xl dark:text-white">
        {{ $t('text.sendMedia') }}
      </h3>
      <button
        type="button"
        class="
          text-gray-400
          bg-transparent
          hover:bg-gray-200 hover:text-gray-900
          rounded-lg
          text-sm
          p-1.5
          ml-auto
          inline-flex
          items-center
          dark:hover:bg-gray-600 dark:hover:text-white
        "
        data-modal-toggle="defaultModal"
        @click="onClose('canceled')"
      >
        <svg
          class="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </div>
    <div style="position: relative">
      <div class="image_placeholder mb-2">
        <img v-if="image" :src="$tools.getFileUrl(image.url)" alt="image">
        <div v-else style="font-size: 144px; font-weight: 100">
          <i class="bx bx-image" />
        </div>
        <textarea
          v-if="image"
          id="comment"
          v-model="text"
          rows="4"
          name="comment"
          :placeholder="$t('text.messageText')"
          class="shadow-sm mt-2 focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
        />
      </div>
    </div>
    <div
      class="flex p-6 s space-x-2 w-full rounded-b border-t border-gray-200 dark:border-gray-600"
    >
      <button
        class="
          mr-2
          inline-flex
          items-center
          px-2.5
          py-1.5
          border border-transparent
          text-xs
          font-medium
          rounded
          text-blue-700
          bg-blue-100
          hover:bg-blue-200
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
        "
        @click="openFileUpload()"
      >
        {{ $t('word.upload') }}
      </button>
      <div style="display: flex">
        <button
          class="
            mr-2
            inline-flex
            items-center
            px-2.5
            py-1.5
            border border-transparent
            text-xs
            font-medium
            rounded
            text-red-700
            bg-red-100
            hover:bg-red-200
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500
          "
          @click="onClose('canceled')"
        >
          {{ $t('word.cancel') }}
        </button>
        <button
          class="
            mr-2
            inline-flex
            items-center
            px-2.5
            py-1.5
            border border-transparent
            text-xs
            font-medium
            rounded
            text-green-700
            bg-green-100
            hover:bg-green-200
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500
          "
          @click="send"
        >
          {{ $t('word.send') }}
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import imageEditor from '~/modals/image-editor.vue'
export default {
  name: 'MediaContent',
  data () {
    return {
      isOpen: false,
      image: null,
      text: ''
    }
  },
  methods: {
    send () {
      if (this.image) {
        this.onClose({
          image: this.image,
          text: this.text
        })
      }
    },
    openFileUpload () {
      this.$modal.show(
        imageEditor,
        { type: '4:3' },
        {
          height: 'auto',
          maxWidth: 600,
          width: window.innerWidth <= 600 ? window.innerWidth - 30 : 600,
          scrollable: true,
          clickToClose: false
        }
      )
      this.$root.$once('image-editor-modal', (item) => {
        if (item !== 'canceled') {
          this.image = item
        }
      })
    },
    onClose (data) {
      this.$emit('close')
      this.$root.$emit('send-media-modal', data)
    }
  }
}
</script>

<style scoped>
.image_placeholder {
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
}
img {
  width: 100%;
  height: auto;
  object-fit: contain;
}
</style>
