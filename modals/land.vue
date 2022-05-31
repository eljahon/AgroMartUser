<template>
  <div class="relative p-3">
    <div class="text-lg text-gray-700 pb-2">
      {{ $t('text.landName') }}
    </div>
    <div
      class="absolute right-2 top-2 text-center p-1 rounded-md hover:bg-gray-100 cursor-pointer"
      @click="onClose('canceled')"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        style="fill: rgba(75, 85, 99, 1); transform: ; -ms-filter: "
      >
        <path
          d="M16.192 6.344L11.949 10.586 7.707 6.344 6.293 7.758 10.535 12 6.293 16.242 7.707 17.656 11.949 13.414 16.192 17.656 17.606 16.242 13.364 12 17.606 7.758z"
        />
      </svg>
    </div>
    <div class="mt-1">
      <ValidationObserver ref="observer" v-slot="{ passes, invalid }">
        <form class="" @submit.prevent="passes(onSubmit)">
          <ValidationProvider
            v-slot="{ errors }"
            name="name"
            :rules="{ required: true }"
            mode="eager"
            class="grid md:grid-cols-3 grid-cols-1 mb-2"
          >
            <label for="name" class="text-gray-700 font-medium text-base">
              {{ $t('word.name') }}*
            </label>
            <input
              v-model="land.name"
              :class="
                errors.length > 0
                  ? 'border-red-400'
                  : land.name
                    ? 'border-green-600'
                    : 'border-gray-300'
              "
              type="text"
              name="name"
              class="md:col-span-2 lg:mt-0 mt-3 text-sm rounded-md"
            >
          </ValidationProvider>
          <ValidationProvider
            v-slot="{ errors }"
            name="Description"
            :rules="{ required: true }"
            mode="eager"
            class="grid md:grid-cols-3 grid-cols-1 mb-2"
          >
            <label for="description" class="text-gray-700 font-medium text-base">
              {{ $t('word.description') }}*
            </label>
            <textarea
              v-model="land.description"
              cols="3"
              :class="
                errors.length > 0
                  ? 'border-red-400'
                  : land.description
                    ? 'border-green-600'
                    : 'border-gray-300'
              "
              name="description"
              class="md:col-span-2 lg:mt-0 mt-3 text-sm rounded-md"
            />
          </ValidationProvider>
          <div
            class="border-gray-200 grid md:grid-cols-3 grid-cols-1"
          >
            <label class="text-sm font-medium text-gray-700 col-span-1" for="activities">{{
              $t('word.activities')
            }}</label>
            <div class="max-w-2xl md:col-span-2 muto sm:w-full" @blur="isMultiselectOpened = false">
              <div class="w-full flex flex-col items-center mx-auto relative">
                <div
                  class="w-full"
                  tabindex="0"
                  @click="isMultiselectOpened = !isMultiselectOpened"
                >
                  <div class="my-2 p-1 flex border border-gray-200 bg-white rounded">
                    <div class="flex flex-auto flex-wrap">
                      <div
                        v-for="(activity, index) in land.activities"
                        :key="index"
                        class="
                          flex
                          justify-center
                          items-center
                          m-1
                          font-medium
                          py-1
                          px-2
                          rounded-full
                          text-green-700
                          bg-green-100
                          border border-green-300
                        "
                      >
                        <div
                          class="
                            text-xs
                            font-normal
                            leading-none
                            max-w-full
                            flex-initial
                            text-green-800
                          "
                        >
                          {{ activity.title }}
                        </div>
                        <div
                          class="flex flex-auto flex-row-reverse"
                          @click="removeActivity(activity)"
                        >
                          <i
                            class="
                              bx bx-x
                              cursor-pointer
                              hover:text-green-400
                              text-green-800
                              rounded-full
                            "
                          />
                        </div>
                      </div>
                      <div class="flex-1">
                        <input
                          placeholder=""
                          :readonly="true"
                          class="
                            bg-transparent
                            p-1
                            px-2
                            appearance-none
                            outline-none
                            h-full
                            w-full
                            text-gray-800
                          "
                        >
                      </div>
                    </div>
                    <div
                      class="
                        text-gray-300
                        w-8
                        py-1
                        pl-2
                        pr-1
                        border-l
                        flex
                        items-center
                        border-gray-200
                      "
                      @click="hideDropdownButton"
                    >
                      <div
                        class="cursor-pointer w-6 h-6 text-gray-600 outline-none focus:outline-none"
                      >
                        <i v-if="!isMultiselectOpened" class="w-4 h-4 bx bx-chevron-down" />
                        <i v-else class="w-4 h-4 bx bx-chevron-up" />
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  v-show="isMultiselectOpened"
                  class="
                    absolute
                    shadow
                    mt-14
                    bg-white
                    z-40
                    w-full
                    lef-0
                    rounded
                    max-h-select
                    overflow-y-auto
                  "
                >
                  <div class="flex flex-col w-full">
                    <div
                      v-for="(activity, index) in activities"
                      :key="index"
                      class="
                        cursor-pointer
                        w-full
                        border-gray-100
                        rounded-t
                        border-b
                        hover:bg-green-100
                      "
                      @click="addToSelectedActivities(activity)"
                    >
                      <div
                        class="
                          flex
                          w-full
                          items-center
                          p-2
                          pl-2
                          border-transparent border-l-2
                          relative
                        "
                        :class="activity.selected ? 'border-green-600' : ''"
                      >
                        <div class="w-full items-center flex">
                          <div class="mx-2 leading-6">
                            {{ activity.title }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ValidationProvider
            v-slot="{ errors }"
            name="Hectare"
            :rules="{ required: true }"
            mode="eager"
            class="grid md:grid-cols-3 grid-cols-1 mb-2"
          >
            <label for="hectare" class="text-gray-700 font-medium text-base">
              {{ $t('word.hectare') }}*
            </label>
            <input
              v-model="land.hectare"
              :class="
                errors.length > 0
                  ? 'border-red-400'
                  : land.hectare
                    ? 'border-green-600'
                    : 'border-gray-300'
              "
              type="text"
              name="hectare"
              readonly
              class="md:col-span-2 lg:mt-0 mt-3 text-sm rounded-md"
            >
          </ValidationProvider>
          <ValidationProvider
            v-slot="{ errors }"
            name="GroupName"
            :rules="{ required: true }"
            mode="eager"
            class="grid md:grid-cols-3 grid-cols-1 mb-2"
          >
            <label for="group_name" class="text-gray-700 font-medium text-base">
              {{ $t('text.groupName') }}*
            </label>
            <input
              v-model="land.group_name"
              :class="
                errors.length > 0
                  ? 'border-red-400'
                  : land.group_name
                    ? 'border-green-600'
                    : 'border-gray-300'
              "
              type="text"
              name="group_name"
              class="md:col-span-2 lg:mt-0 mt-3 text-sm rounded-md"
            >
          </ValidationProvider>
          <ValidationProvider
            v-slot="{ errors }"
            name="company"
            :rules="{ required: true }"
            mode="eager"
            class="grid md:grid-cols-3 grid-cols-1 mb-2"
          >
            <label for="company" class="text-gray-700 font-medium text-base">
              {{ $t('word.company') }}*
            </label>
            <select
              v-model="land.company_id"
              :class="
                errors.length > 0
                  ? 'border-red-400'
                  : land.company_id
                    ? 'border-green-600'
                    : 'border-gray-500'
              "
              class="text-sm text-gray-500 font-normal md:col-span-2 w-full rounded-md h-9"
            >
              <option
                v-for="(company, index) in companies"
                :key="index"
                class="text-sm text-gray-600 font-normal"
                :value="company.id"
              >
                {{ company.name }}
              </option>
            </select>
          </ValidationProvider>
          <button
            type="submit"
            :disabled="invalid"
            :class="
              invalid
                ? 'bg-gray-100 text-gray-500 w-full rounded-md py-2 mt-2'
                : 'bg-light-orange w-full rounded-md text-white py-2 mt-2'
            "
          >
            {{ $t('word.save') }}
          </button>
        </form>
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      land: {
        name: '',
        description: '',
        group_name: '',
        hectare: '',
        company_id: null,
        activities: [],
        imagePath: '',
        polygon: {}
      },
      isMultiselectOpened: false,
      companies: [],
      activities: []
    }
  },
  mounted () {
    this.land.hectare = this.data.area
    this.land.polygon = this.data.polygon
    this.fetchData()
  },
  methods: {
    handleFocusOut () {
      console.log('Handle focus out')
    },
    handleFocus () {
      console.log('Handle focus')
    },
    async onSubmit () {
      await this.$store.dispatch('crud/field/postFields', { data: this.land }).then((res) => {
        this.$router.push(
          { path: this.localePath(`/my-profile/lands/${res.id}`) }
        )
        this.onClose()
      })
    },
    addToSelectedActivities (item) {
      const index = this.land.activities.findIndex(el => el.id === item.id)
      const activityInd = this.activities.findIndex(el => el.id === item.id)
      if (index >= 0) {
        // eslint-disable-next-line no-console
        console.log('This activity already selected')
        return
      }
      this.activities[activityInd].selected = true
      this.land.activities.push(item)
    },
    removeActivity (item) {
      const index = this.land.activities.findIndex(el => el.id === item.id)
      const activityInd = this.activities.findIndex(el => el.id === item.id)
      this.land.activities.splice(index, 1)
      this.activities[activityInd].selected = false
    },
    hideDropdownButton () {
      this.isMultiselectOpened = false
    },
    multiselectShowHide (status) {
      if (status !== undefined) {
        this.isMultiselectOpened = status
        return
      }
      this.isMultiselectOpened = !this.isMultiselectOpened
    },
    onClose (e) {
      this.$emit('close')
      this.$root.$emit('land', e)
    },
    async fetchData () {
      await this.$store.dispatch('crud/company/getCompanies').then((res) => {
        this.companies = res
      })
      await this.$store.dispatch('crud/activity/getActivities').then((res) => {
        this.activities = res
        this.activities.forEach((activity) => {
          activity.selected = false
          for (let i = 0; i < this.land.activities.length; i++) {
            if (activity.id === this.land.activities[i].id) {
              activity.selected = true
            }
          }
        })
      })
    }
  }
}
</script>
