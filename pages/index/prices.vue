<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div class="max-w-7xl mx-auto py-6 px-4 lg:px-8">
    <div class="pb-6 flex justify-between">
      <breadcrumbs :items="items" />
      <router-link v-show="false" :to="{path: localePath('/graph')}" class="bg-green-600 rounded-md text-white font-medium px-4 py-2">
        {{ $t('text.graphView') }}
      </router-link>
    </div>
    <div class="md:hidden grid grid-cols-2 gap-2">
      <select
        v-model="query.region_id"
        name="option"
        class="
          mt-1
          block
          w-full
          pl-3
          pr-10
          py-2.5
          text-base text-gray-800
          border-transparent
          focus:outline-none
          rounded-md
        "
      >
        <option v-for="(region, index) in regions" :key="index" :value="region.id">
          {{ region.name[$i18n.locale] }}
        </option>
      </select>
      <select
        v-model="query.category_id"
        name="option"
        class="
                  mt-1
                  block
                  w-full
                  pl-3
                  pr-10
                  py-2
                  text-base text-gray-700
                  border-transparent
                  focus:outline-none
                  rounded-md
                "
      >
        <option v-for="(product, index) in categories" :key="index" :value="product.id">
          {{ product.title[$i18n.locale] }}
        </option>
      </select>
    </div>
    <div class="md:hidden flex items-center my-4 justify-between text-gray-700">
      <div class="text-gray-700 font-medium">
        {{ $t('text.numberOfProduct') }}:
        <span class="text-gray-800 font-bold">{{ prices.length }}</span>
      </div>
      <div class="flex items-center text-gray-700">
        {{ $t('word.all') }}
        <span class="ml-2">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.833 13.333v-10m0 0L2.5 6.666m3.333-3.333 3.334 3.333m5 0v10m0 0 3.333-3.333m-3.333 3.333-3.334-3.333"
              stroke="#374151"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </span>
      </div>
    </div>
    <div class="flex flex-col">
      <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div class="md:grid grid-cols-4 hidden gap-6">
            <!-- Search by region -->

            <div class="mb-6">
              <select
                v-model="query.region_id"
                name="option"
                class="
                  mt-1
                  block
                  w-full
                  pl-3x`
                  pr-10
                  py-2
                  text-sm text-gray-700
                  border-gray-300
                  focus:outline-none
                  sm:text-sm
                  rounded-md
                "
              >
                <option v-for="(region, index) in regions" :key="index" :value="region.id">
                  {{ region.name[$i18n.locale] }}
                </option>
              </select>
              <!-- <div>
                <div class="mt-1 relative">
                  <button type="button" class="bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" aria-haspopup="listbox" aria-expanded="true" aria-labelledby="listbox-label">
                    <span class="block truncate">{{ query.region_id }}</span>
                    <span class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd" />
                      </svg>
                    </span>
                  </button>
                  <div
                    class="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
                    tabindex="-1"
                    role="listbox"
                    aria-labelledby="listbox-label"
                    aria-activedescendant="listbox-option-3"
                  >
                    <div
                      v-for="(region, index) in regions"
                      id="listbox-option-0"
                      :key="index"
                      class="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9"
                      role="option"
                    >
                      <span class="font-normal block truncate">{{ region.name[$i18n.locale] }}</span>
                      <span class="text-indigo-600 absolute inset-y-0 right-0 flex items-center pr-4">
                        <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </div> -->
            </div>
            <!-- Search by category -->

            <div class="mb-6">
              <select
                v-model="query.category_id"
                name="option"
                class="
                  mt-1
                  block
                  w-full
                  pl-3
                  pr-10
                  py-2
                  text-sm text-gray-700
                  border-gray-300
                  focus:outline-none
                  sm:text-sm
                  rounded-md
                "
              >
                <option v-for="(product, index) in categories" :key="index" :value="product.id">
                  {{ product.title[$i18n.locale] }}
                </option>
              </select>
            </div>
            <!-- <div class="mb-6">
              <select
                name="option"
                class="
                  mt-1
                  block
                  w-full
                  pl-3
                  pr-10
                  py-2
                  text-sm text-gray-700
                  border-gray-300
                  focus:outline-none
                  sm:text-sm
                  rounded-md
                "
              >
                <option v-for="(limit, index) in limits" :key="index">
                  {{ limit.number }}
                </option>
              </select>
            </div>
            <div>
              <div class="mt-1 relative rounded-md shadow-sm">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M8 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM2 8a6 6 0 1 1 10.89 3.476l4.817 4.817a1 1 0 0 1-1.414 1.414l-4.816-4.816A6 6 0 0 1 2 8z"
                      fill="#9CA3AF"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  name="search"
                  class="text-gray-700 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                  placeholder="Mahsulot"
                >
              </div>
            </div> -->
          </div>
          <div class="md:flex hidden items-center text-lg justify-between">
            <div class="text-gray-700 font-medium">
              {{ $t('text.numberOfProduct') }}:
              <span class="text-gray-800 font-bold">{{ prices.length }}</span>
            </div>
            <div class="flex items-center text-gray-700">
              {{ $t('word.all') }}
              <span class="ml-2">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.833 13.333v-10m0 0L2.5 6.666m3.333-3.333 3.334 3.333m5 0v10m0 0 3.333-3.333m-3.333 3.333-3.334-3.333"
                    stroke="#374151"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </span>
            </div>
          </div>

          <!-- Price lists -->
          <div class="grid md:grid-cols-3 lg:grid-cols-4 grid-cols-1 gap-4 mt-4">
            <div
              v-for="(price, index) in prices"
              :key="index"
              :class="(price.min && price.max) < 0 ? 'hidden' : 'block'"
              class="bg-white p-3 rounded-md shadow-sm hover:shadow-md"
            >
              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <div v-if="price.product.mainimage || price.product.thumbnail" class="bg-gray-50 rounded-md">
                    <img :src="$tools.getFileUrl(price.product.thumbnail ? price.product.thumbnail : price.product.mainimage)" class="w-11 h-11 rounded-md object-cover">
                  </div>
                  <div v-else class="bg-gray-50 p-2 rounded-md">
                    <img
                      src="https://www.pinupacc.com/images/dummy.png"
                      class="w-9 rounded-md object-cover"
                    >
                  </div>
                  <div class="block ml-3">
                    <div class="text-xl text-gray-600">
                      {{ price.product.name[$i18n.locale] }}
                    </div>
                    <div
                      v-if="price.product.productcategory !== null"
                      class="text-gray-500 text-base"
                    >
                      {{ price.product.productcategory[$i18n.locale] }}
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <p class="text-gray-600 text-lg mr-4">
                    min
                  </p>
                  <p class="text-lg text-light-orange font-semibold">
                    {{ price.min }} <span class="text-sm text-gray-600 font-medium ml-2">UZS</span>
                  </p>
                </div>

                <div
                  v-if="price.minchange < 0"
                  :class="price.minchange === 0 ? 'hidden' : ''"
                  class="
                    inline-flex
                    items-center
                    h-5
                    px-1.5
                    py-0.5
                    rounded-full
                    text-xs
                    font-medium
                    bg-red-100
                    text-red-800
                    md:mt-2
                    lg:mt-0
                  "
                >
                  <i class="bx bx-down-arrow-alt text-red-800 text-base mr-1" />
                  {{ Math.round(price.minchange * 100) }} %
                </div>
                <div
                  v-else-if="price.minchange === 0"
                  class="
                    items-center
                    flex
                    h-5
                    px-2
                    py-0.5
                    rounded-full
                    text-xs
                    font-medium
                    bg-gray-100
                    text-gray-800
                    md:mt-2
                    lg:mt-0
                  "
                >
                  {{ Math.round(price.minchange * 100) }} %
                </div>
                <div
                  v-else
                  class="
                    inline-flex
                    items-center
                    h-5
                    px-1.5
                    py-0.5
                    rounded-full
                    text-xs
                    font-medium
                    bg-green-100
                    text-green-800
                    md:mt-2
                    lg:mt-0
                  "
                >
                  <i class="bx bx-up-arrow-alt text-green-800 text-base mr-1" />
                  {{ Math.round(price.minchange * 100) }} %
                </div>
              </div>
              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <p class="text-gray-600 text-lg mr-3.5">
                    max
                  </p>
                  <p class="text-lg text-red-600 font-semibold">
                    {{ price.max }} <span class="text-sm text-gray-600 font-medium ml-2">UZS</span>
                  </p>
                </div>
                <div
                  v-if="price.maxchange < 0"
                  class="
                    inline-flex
                    items-center
                    h-5
                    px-1.5
                    py-0.5
                    rounded-full
                    text-xs
                    font-medium
                    bg-red-100
                    text-red-800
                    md:mt-2
                    lg:mt-0
                  "
                >
                  <i class="bx bx-down-arrow-alt text-red-800 text-base mr-1" />
                  {{ Math.round(price.maxchange * 100) }} %
                </div>
                <div
                  v-else-if="price.maxchange === 0"
                  class="
                    items-center
                    flex
                    h-5
                    px-2
                    py-0.5
                    rounded-full
                    text-xs
                    font-medium
                    bg-gray-100
                    text-gray-800
                    md:mt-2
                    lg:mt-0
                  "
                >
                  {{ Math.round(price.maxchange * 100) }} %
                </div>
                <div
                  v-else
                  class="
                    inline-flex
                    items-center
                    h-5
                    px-1.5
                    py-0.5
                    rounded-full
                    text-xs
                    font-medium
                    bg-green-100
                    text-green-800
                    md:mt-2
                    lg:mt-0
                  "
                >
                  <i class="bx bx-up-arrow-alt text-green-800 text-base mr-1" />
                  {{ Math.round(price.maxchange * 100) }} %
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <pagination
      v-if="pageCount > 1"
      :current-page="parseInt(query.page)"
      :page-count="pageCount"
      @callback="pageChanged($event)"
    />
  </div>
</template>

<script>
import debounce from 'lodash.debounce'
import appConfig from '~/app.config'
import Breadcrumbs from '~/components/ui/Breadcrumbs.vue'
export default {
  auth: false,
  page: {
    title: 'Prices',
    meta: [{ name: 'description', content: `Log in to ${appConfig.title}` }]
  },
  components: { Breadcrumbs },
  directives: {
    debounce
  },
  data () {
    return {
      pageCount: 1,
      regions: [],
      selected: '',
      categories: [],
      query: {
        region_id: 14,
        category_id: null
      },
      limits: [{ number: 'Sahifadagi elementlar soni' }, { number: '20' }],
      items: [{ text: 'text.prices', link: '/prices', disabled: false }],
      prices: []
    }
  },
  watch: {
    '$route.query.region_id' () {
      this.fetchData(this.query)
    },
    'query.region_id' () {
      this.setQuery()
    },
    '$route.query.category_id' () {
      this.fetchData(this.query)
    },
    'query.category_id' () {
      this.setQuery()
    }
  },
  mounted () {
    this.$router.push({
      path: this.$route.path,
      query: this.query
    })
    this.fetchDirectories()
  },
  methods: {
    filterByInput: debounce(function () {
      this.fetchInfo()
    }, 1000),
    setQuery () {
      this.$router.push({
        path: this.localePath('/prices'),
        query: {
          region_id: this.query.region_id,
          category_id: this.query.category_id
        }
      })
    },
    async fetchData (query) {
      await this.$store
        .dispatch('crud/price/getPrice', {
          '_where[0][islast]': true,
          '_where[0][avg_gt]': 0,
          '_where[0][region.id]': query.region_id,
          '_where[0][product.productcategory]': query.category_id
        })
        .then((res) => {
          this.prices = res
        })
    },
    async fetchDirectories () {
      await this.$store.dispatch('crud/region/getRegion').then((res) => {
        this.regions = res
      })
      await this.$store.dispatch('crud/price/category/getProductCategory').then((res) => {
        this.categories = [ ...res ]
        this.categories.push({
          created_at: '2022-02-03T15:09:03.142Z',
          id: null,
          product: null,
          published_at: '2022-02-03T15:09:08.260Z',
          title: { en: 'All', ru: 'Все', uz: 'Ҳаммаси' },
          updated_at: '2022-02-03T15:09:08.278Z'
        })
      })
      await this.fetchData(this.query)
    }
  }
}
</script>
