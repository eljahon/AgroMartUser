<template>
  <div v-if="!handleLoad">
    <form>
      <div class="border rounded-md shadow-sm bg-white p-4 h-auto">
        <div class="grid md:grid-cols-3 grid-cols-1 border-b pb-5">
          <label for="name" class="text-gray-700 font-medium text-base">
            {{ $t("word.name") }}*
          </label>
          <input
            v-model.trim="$v.currentUser.name.$model"
            :state="!$v.currentUser.name.$error"
            :class="
              !$v.currentUser.name.required
                ? 'border-red-400'
                : currentUser.name
                ? 'border-green-600'
                : 'border-gray-300'
            "
            type="text"
            name="name"
            class="md:col-span-2 lg:mt-0 mt-3 text-sm rounded-md"
          />
        </div>
        <div class="grid md:grid-cols-3 grid-cols-1 border-b py-5">
          <label for="surname" class="text-gray-700 font-medium text-base">
            {{ $t("word.surname") }}*
          </label>
          <input
            v-model.trim="$v.currentUser.surname.$model"
            :state="!$v.currentUser.surname.$error"
            :class="
              !$v.currentUser.surname.required
                ? 'border-red-400'
                : currentUser.surname
                ? 'border-green-600'
                : 'border-gray-300'
            "
            type="text"
            name="surname"
            class="md:col-span-2 lg:mt-0 mt-3 text-sm rounded-md border-gray-300"
          />
        </div>
        <div class="grid md:grid-cols-3 grid-cols-1 border-b">
          <label for="gender" class="text-gray-700 font-medium text-base my-4">
            {{ $t("word.gender") }}*
          </label>
          <select
            v-model.trim="$v.currentUser.gender.$model"
            :state="!$v.currentUser.gender.$error"
            :class="
              !$v.currentUser.gender.required
                ? 'border-red-400'
                : currentUser.gender
                ? 'border-green-600'
                : 'border-gray-300'
            "
            class="form-select w-full text-sm border md:my-5 my-0 text-gray-600 py-2 mb-1 border-gray-300 rounded-md focus:outline-none cursor-pointer"
          >
            <option
              v-for="(gender, ind) in genders"
              :key="ind"
              :value="gender.id"
            >
              {{ gender.name }}
            </option>
          </select>
          <br />
        </div>
        <div class="grid md:grid-cols-3 grid-cols-1 pt-5">
          <div class="text-gray-700 font-medium text-base">
            {{ $t("text.profilePicture") }}
          </div>
          <div
            class="md:col-span-2 gap-5 lg:mt-0 mt-3 flex items-center justify-start"
          >
            <img
              class="w-14 h-14 rounded-full"
              :src="
                currentUser.avatar
                  ? $tools.getFileUrl(currentUser.avatar)
                  : require('/assets/images/person/avatar.jpg')
              "
              alt="Avatar"
              @error="
                currentUser.avatar = require('/assets/images/person/avatar.jpg')
              "
            />
            <div
              v-if="!currentUser.avatar"
              class="h-10 md:px-5 px-3 text-sm flex border cursor-pointer font-medium border-gray-300 text-gray-500 justify-center items-center md:rounded-md rounded-full"
              @click="uploadAvatar()"
            >
              <i class="bx bx-download rotate-90 text-gray-700 text-base" />
              <span class="text-sm text-gray-600 md:flex hidden pl-2">{{
                $t("text.download")
              }}</span>
            </div>
            <div
              v-else
              :class="currentUser.avatar ? '' : 'hidden'"
              class="flex"
            >
              <div
                class="h-10 flex text-sm md:px-5 p-3 font-medium cursor-pointer text-gray-700 justify-center items-center md:rounded-md rounded-full border border-red-700"
                @click="deleteAvatar(currentUser.avatar)"
              >
                <i class="bx bx-trash text-red-700 text-base" />
                <span class="md:flex hidden ml-2">{{ $t("word.delete") }}</span>
              </div>
              <div
                class="ml-4 h-10 flex text-sm px-5 font-medium cursor-pointer text-gray-700 justify-center items-center rounded-md border border-gray-300"
                @click="editAvatar(currentUser.avatar)"
              >
                <i class="bx bx-edit text-base" />
                <span class="ml-2">{{ $t("word.change") }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex justify-end gap-3 my-5">
        <button
          class="text-gray-700 font-medium border border-gray-300 rounded-md py-2 px-4"
        >
          {{ $t("word.cancel") }}
        </button>
        <button
          class="text-white border bg-gray-400 border-gray-300 rounded-md py-2 px-4"
          @click="onSubmit"
        >
          {{ $t("word.save") }}
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapState } from "vuex";
import imageEditor from "~/modals/image-editor.vue";
import { required } from "vuelidate/lib/validators";
import { validationMixin } from "vuelidate";
export default {
  name: "MyProfile",
  auth: true,
  data() {
    return {
      currentUser: {},
      genders: [],
      handleLoad: true,
      avatar: null,
    };
  },
  computed: {
    ...mapState({
      user: (state) => state.auth.user,
    }),
  },
  created() {
    this.handleLoad = false;
  },
  mounted() {
    this.currentUser = { ...this.user };
    console.log('User: ', this.user);
    this.fetchData();
  },
  validations: {
    currentUser: {
      name: { required },
      surname: { required },
      gender: { required },
      language: { required },
    },
  },
  mixins: [validationMixin],
  methods: {
    onSubmit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.currentUser.avatar = this.avatar;
        console.log("User: ", this.currentUser);
        // this.$store
        //   .dispatch('crud/user/updateUsers', {
        //     data: this.user,
        //   })
        //   .then((res) => {
        //     this.currentUser = res;
        //     this.$auth.setUser(res);
        //   });
      }
    },
    uploadAvatar() {
      this.openImageEditor("avatar", null);
      this.$root.$once("image-editor-modal", (item) => {
        if (item !== "canceled") {
          console.log('AVatar: ', item);
          this.avatar = item.url;
        }
      });
    },
    openImageEditor(type, url) {
      this.$modal.show(
        imageEditor,
        { type, url },
        {
          height: "auto",
          maxWidth: 600,
          width: window.innerWidth <= 600 ? window.innerWidth - 30 : 600,
          scrollable: true,
          clickToClose: false,
        }
      );
    },
    editAvatar(url) {
      this.openImageEditor("avatar", url);
      this.$root.$once("image-editor-modal", (item) => {
        if (item !== "canceled") {
          this.avatar = item.url;
        }
      });
    },
    deleteAvatar(data) {
      this.currentUser.avatar = null;
    },
    async fetchData() {
      await this.$store.dispatch("crud/gender/getGenders").then((res) => {
        this.genders = res;
      });
    },
  },
};
</script>
