<template>
  <div v-if="!handleLoad">
    <ValidationObserver v-slot="{ handleSubmit }" slim>
      <form class="space-y-4" novalidate @submit.prevent="handleSubmit(onSubmit)">
        <div class="border rounded-md shadow-sm bg-white p-4 h-auto">
          <ValidationProvider
            v-slot="{ errors }"
            name="name"
            :rules="{ required: true }"
            mode="eager"
            class="grid md:grid-cols-3 grid-cols-1 border-b pb-5"
          >
            <label for="name" class="text-gray-700 font-medium text-base"> {{ $t('word.name') }}* </label>
            <input
              v-model="currentUser.name"
              :class="errors.length > 0 ? 'border-red-400'
                : currentUser.name
                  ? 'border-green-600'
                  : 'border-gray-300'"
              type="text"
              name="name"
              class="md:col-span-2 lg:mt-0 mt-3 text-sm rounded-md"
            >
          </ValidationProvider>
          <ValidationProvider
            v-slot="{ errors }"
            name="surname"
            :rules="{ required: true }"
            mode="eager"
            class="grid md:grid-cols-3 grid-cols-1 border-b py-5"
          >
            <label for="surname" class="text-gray-700 font-medium text-base"> {{ $t('word.surname') }}* </label>
            <input
              v-model="currentUser.surname"
              :class="errors.length > 0 ? 'border-red-400'
                : currentUser.surname
                  ? 'border-green-600'
                  : 'border-gray-300'"
              type="text"
              name="surname"
              class="md:col-span-2 lg:mt-0 mt-3 text-sm rounded-md border-gray-300"
            >
          </ValidationProvider>
          <ValidationProvider
            v-slot="{ errors }"
            name="gender"
            :rules="{ required: true }"
            mode="eager"
            class="grid md:grid-cols-3 grid-cols-1 border-b"
          >
            <label for="gender" class="text-gray-700 font-medium text-base my-4">
              {{ $t('word.gender') }}*
            </label>
            <select
              v-model="currentUser.gender"
              :class="errors.length > 0 ? 'border-red-400'
                : currentUser.gender
                  ? 'border-green-600'
                  : 'border-gray-300'"
              class="
                form-select
                w-full
                text-sm
                border
                md:my-5
                my-0
                text-gray-600
                py-2
                mb-1
                border-gray-300
                rounded-md
                focus:outline-none
                cursor-pointer
              "
            >
              <option value="1">
                {{ $t('word.male') }}
              </option>
              <option value="0">
                {{ $t('word.female') }}
              </option>
            </select>
            <br>
          </ValidationProvider>
          <div class="grid md:grid-cols-3 grid-cols-1 pt-5">
            <div class="text-gray-700 font-medium text-base">
              {{ $t('text.profilePicture') }}
            </div>
            <div class="md:col-span-2 gap-5 lg:mt-0 mt-3 flex items-center justify-start">
              <img
                class="w-14 h-14 rounded-full"
                :src="
                  currentUser.avatar
                    ? $tools.getFileUrl(currentUser.avatar)
                    : require('/assets/images/person/avatar.jpg')
                "
                alt="Avatar"
                @error="currentUser.avatar = require('/assets/images/person/avatar.jpg')"
              >
              <div
                v-if="!currentUser.avatar"
                class="
                    h-10
                    md:px-5
                    px-3
                    text-sm
                    flex
                    border
                    cursor-pointer
                    font-medium
                    border-gray-300
                    text-gray-500
                    justify-center
                    items-center
                    md:rounded-md
                    rounded-full
                  "
                @click="uploadAvatar()"
              >
                <i class="bx bx-download rotate-90 text-gray-700 text-base" />
                <span class="text-sm text-gray-600 md:flex hidden pl-2">{{ $t('text.download') }}</span>
              </div>
              <div
                v-else
                :class="currentUser.avatar ? '' : 'hidden'"
                class="flex"
              >
                <div
                  class="
                    h-10
                    flex
                    text-sm
                    md:px-5
                    p-3
                    font-medium
                    cursor-pointer
                    text-gray-700
                    justify-center
                    items-center
                    md:rounded-md
                    rounded-full
                    border border-red-700
                  "
                  @click="deleteAvatar(currentUser.avatar)"
                >
                  <i class="bx bx-trash text-red-700 text-base" />
                  <span class="md:flex hidden ml-2">{{ $t('word.delete') }}</span>
                </div>
                <div
                  class="
                    ml-4
                    h-10
                    flex
                    text-sm
                    px-5
                    font-medium
                    cursor-pointer
                    text-gray-700
                    justify-center
                    items-center
                    rounded-md
                    border  border-gray-300
                  "
                  @click="editAvatar(currentUser.avatar)"
                >
                  <i class="bx bx-edit text-base" />
                  <span class="ml-2">{{ $t('word.change') }}</span>
                </div>
              </div>
              <!-- <input
                id="userAvatar"
                ref="avatar"
                type="file"
                accept="image/*"
                name="image"
                style="display: none"
                @change="previewAvatar"
              > -->
            </div>
          </div>
          <!-- <div class="py-5 border-b">
            <p class="text-gray-900 text-lg font-medium">
              {{ $t('text.informationCompany') }}
            </p>
            <p class="text-sm text-gray-500">
              {{ $t('text.informationWork') }}
            </p>
          </div>
          <div class="grid md:grid-cols-3 grid-cols-1 pb-5 border-b">
            <div class="text-gray-700 font-medium text-base my-4">
              {{ $t('word.direction') }}
            </div>
            <select
              v-model="currentUser.category"
              class="
                form-select
                col-span-2
                text-sm
                w-full
                border
                md:my-5
                my-0
                text-gray-600
                py-2
                mb-1
                border-gray-200
                rounded-md
                focus:outline-none focus:border-gray-300
                transition-colors
                cursor-pointer
              "
            >
              <option value="man">
                Dehqonchilik
              </option>
              <option value="woman">
                Obodonlashtirish
              </option>
            </select>
            <div class="text-gray-700 font-medium text-base my-4">
              {{ $t('text.organization') }}
            </div>
            <div class="block col-span-2 md:mt-5 mt-0 space-y-5">
              <input
                v-model="currentUser.companyNameUz"
                type="text"
                name="full_name"
                :placeholder="$t('word.uzbek')"
                class="w-full text-sm rounded-md border-gray-300"
              >
              <input
                v-model="currentUser.companyNameRu"
                type="text"
                name="full_name"
                :placeholder="$t('word.russian')"
                class="w-full text-sm rounded-md border-gray-300"
              >
              <input
                v-model="currentUser.companyNameEn"
                type="text"
                name="full_name"
                :placeholder="$t('word.english')"
                class="w-full text-sm rounded-md border-gray-300"
              >
            </div>
          </div>
          <div class="grid md:grid-cols-3 col-span-1 py-5 border-b">
            <div class="text-gray-700 font-medium text-base">
              {{ $t('text.organizationLogo') }}
            </div>
            <div class="md:mt-1 mt-3 sm:col-span-2">
              <div
                class="
                  max-w-lg
                  flex
                  justify-center
                  px-6
                  pt-5
                  pb-6
                  border-2 border-gray-300 border-dashed
                  rounded-md
                "
              >
                <div class="space-y-1 text-center">
                  <svg
                    class="mx-auto h-10 w-10 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <div class="flex text-sm justify-center text-gray-600">
                    <label
                      for="imageUpload"
                      class="
                        relative
                        cursor-pointer
                        bg-white
                        rounded-md
                        font-medium
                        text-light-orange
                        focus-within:outline-none
                      "
                    >
                      <span>{{ $t('text.download') }}</span>
                    </label>
                    <input
                      id="imageUpload"
                      class="hidden"
                      accept="image/jpeg,image/png"
                      type="file"
                    >
                  </div>
                  <p class="text-xs text-gray-500">
                    PNG, JPG 10MB gacha
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="grid md:grid-cols-3 grid-cols-1">
            <div class="text-gray-700 font-medium text-base my-4">
              {{ $t('text.region') }}
            </div>
            <select
              v-model="currentUser.region"
              class="
                form-select
                col-span-2
                text-sm
                w-full
                border
                md:my-5
                my-0
                text-gray-600
                py-2
                mb-1
                border-gray-200
                rounded-md
                focus:outline-none focus:border-gray-300
                transition-colors
                cursor-pointer
              "
            >
              <option value="man">
                Tanlanmagan
              </option>
              <option value="woman">
                Toshkent
              </option>
            </select>
            <div class="text-gray-700 font-medium text-base my-4">
              {{ $t('word.district') }}
            </div>
            <select
              v-model="currentUser.district"
              class="
                form-select
                col-span-2
                text-sm
                w-full
                border
                md:my-5
                my-0
                text-gray-600
                py-2
                mb-1
                border-gray-200
                rounded-md
                focus:outline-none focus:border-gray-300
                transition-colors
                cursor-pointer
              "
            >
              <option value="man">
                Tanlanmagan
              </option>
              <option value="woman">
                Mirzo Ulug'bek
              </option>
            </select>
            <div class="text-gray-700 font-medium text-base my-4">
              {{ $t('word.area') }}
            </div>
            <div class="grid md:grid-cols-2 grid-cols-1 col-span-2">
              <div class="md:mr-3 mr-0">
                <input
                  v-model="currentUser.area"
                  type="text"
                  name="full_name"
                  placeholder="Yer maydoni(sonlarda)"
                  class="w-full h-10 md:mt-5 mb-5 text-sm rounded-md border-gray-300"
                >
              </div>
              <select
                v-model="currentUser.unit"
                class="
                  w-full
                  text-sm
                  h-10
                  border
                  md:my-5
                  my-0
                  text-gray-600
                  py-2
                  mb-1
                  border-gray-200
                  rounded-md
                  focus:outline-none focus:border-gray-300
                  transition-colors
                  cursor-pointer
                "
              >
                <option value="man">
                  O'lchov birligi
                </option>
                <option value="woman">
                  Kilogram
                </option>
              </select>
            </div>
          </div> -->
        </div>
        <div class="flex justify-end gap-3 my-5">
          <button class="text-gray-700 font-medium border border-gray-300 rounded-md py-2 px-4">
            {{ $t('word.cancel') }}
          </button>
          <button :class="currentUser.name && currentUser.surname && currentUser.gender ? 'bg-green-600' : '' " class="text-white border bg-gray-400 border-gray-300 rounded-md py-2 px-4">
            {{ $t('word.save') }}
          </button>
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import imageEditor from '~/modals/image-editor.vue'
export default {
  name: 'MyProfile',
  auth: true,
  data () {
    return {
      currentUser: {},
      handleLoad: true
    }
  },
  computed: {
    ...mapState({
      user: state => state.auth.user
    })
  },
  created () {
    this.currentUser = { ...this.user }
    this.handleLoad = false
  },
  mounted () {},
  methods: {
    // previewAvatar () {
    //   const input = this.$refs.avatar.files[0]
    //   const formData = new FormData()
    //   formData.append('file', input)
    //   this.$axios.post('/media/create/', formData, {
    //     headers: {
    //       Authorization: this.$auth.getToken('local'),
    //       'Content-Type': 'multipart/form-data'
    //     }
    //   }).then((res) => {
    //     this.currentUser.avatar = res.data.file
    //     this.onSubmit()
    //   })
    // },
    uploadAvatar () {
      this.openImageEditor('avatar', null)
      this.$root.$once('image-editor-modal', (item) => {
        if (item !== 'canceled') {
          this.currentUser.avatar = item.url
        }
      })
    },
    openImageEditor (type, url) {
      this.$modal.show(
        imageEditor,
        { type, url },
        {
          height: 'auto',
          maxWidth: 600,
          width: window.innerWidth <= 600 ? window.innerWidth - 30 : 600,
          scrollable: true,
          clickToClose: false
        }
      )
    },
    editAvatar (url) {
      this.openImageEditor('avatar', url)
      this.$root.$once('image-editor-modal', (item) => {
        if (item !== 'canceled') {
          this.currentUser.avatar = item.url
        }
      })
    },
    deleteAvatar (data) {
      this.currentUser.avatar = null
    },
    async onSubmit () {
      try {
        this.loading = true
        await this.$store.dispatch('crud/user/updateUsers', { id: this.currentUser.id, data: this.currentUser }).then((res) => {
          this.currentUser = res
          this.$auth.setUser(res)
          this.loading = false
        })
      } catch (error) {
        this.loading = false
      }
    }
  }
}
</script>
