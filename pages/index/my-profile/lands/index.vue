<template>
  <div class="bg-white border rounded-md shadow-sm">
    <nav
      :class="
        $route.query && $route.query.field_id ? 'block md:hidden' : 'hidden'
      "
      class="items-start px-4 py-3 sm:px-6 lg:px-8"
      aria-label="Breadcrumb"
      @click="toFieldsList()"
    >
      <a
        href="#"
        class="inline-flex items-center space-x-3 text-sm font-medium text-gray-900"
      >
        <!-- Heroicon name: solid/chevron-left -->
        <svg
          class="-ml-2 h-5 w-5 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
            clip-rule="evenodd"
          />
        </svg>
        <span>{{ $t("word.back") }}</span>
      </a>
    </nav>
    <div class="grid md:grid-cols-12 grid-cols-1">
      <div
        :class="
          !$route.query || !$route.query.field_id ? 'block' : 'md:block hidden'
        "
        class="md:col-span-4 col-span-12"
      >
        <div
          id="map-wrap"
          class="relative"
          v-if="Object.keys(field).length > 0"
        >
          <iframe
            :src="`http://localhost:4044/#/leaflet?field=${field.id}`"
            frameborder="0"
            scrolling="no"
            style="height: calc(72vh - 0px); width: 100%"
          ></iframe>
          <section class="map-calendar absolute bottom-0 w-52">
            <date-picker class="w-full" v-model="value1"></date-picker>
          </section>
          <div class="map-options" :class="`${openMenu ? 'map-options' : 'rigth-position'}`">
            <div class="overflow-y">
              <div v-if="list" class="map-options__list">
                <div><span class="number-value">0.95 − 1.00</span><span class="text-value">Густая растительность</span><span class="field-value">0га</span></div>
                <div><span class="number-value">0.95 − 1.00</span><span class="text-value">Густая растительность</span><span class="field-value">0га</span></div>
                <div><span class="number-value">0.95 − 1.00</span><span class="text-value">Густая растительность</span><span class="field-value">0га</span></div>
                <div><span class="number-value">0.95 − 1.00</span><span class="text-value">Густая растительность</span><span class="field-value">0га</span></div>
                <div><span class="number-value">0.95 − 1.00</span><span class="text-value">Густая растительность</span><span class="field-value">0га</span></div>
                <div><span class="number-value">0.95 − 1.00</span><span class="text-value">Густая растительность</span><span class="field-value">0га</span></div>
                <div><span class="number-value">0.95 − 1.00</span><span class="text-value">Густая растительность</span><span class="field-value">0га</span></div>
                <div><span class="number-value">0.95 − 1.00</span><span class="text-value">Густая растительность</span><span class="field-value">0га</span></div>
                <div><span class="number-value">0.95 − 1.00</span><span class="text-value">Густая растительность</span><span class="field-value">0га</span></div>
                <div><span class="number-value">0.95 − 1.00</span><span class="text-value">Густая растительность</span><span class="field-value">0га</span></div>
                <div><span class="number-value">0.95 − 1.00</span><span class="text-value">Густая растительность</span><span class="field-value">0га</span></div>
                <div><span class="number-value">0.95 − 1.00</span><span class="text-value">Густая растительность</span><span class="field-value">0га</span></div>
                <div><span class="number-value">0.95 − 1.00</span><span class="text-value">Густая растительность</span><span class="field-value">0га</span></div>
                <div><span class="number-value">0.95 − 1.00</span><span class="text-value">Густая растительность</span><span class="field-value">0га</span></div>
                <div><span class="number-value">0.95 − 1.00</span><span class="text-value">Густая растительность</span><span class="field-value">0га</span></div>
                <div><span class="number-value">0.95 − 1.00</span><span class="text-value">Густая растительность</span><span class="field-value">0га</span></div>
                <div><span class="number-value">0.95 − 1.00</span><span class="text-value">Густая растительность</span><span class="field-value">0га</span></div>
                <div><span class="number-value">0.95 − 1.00</span><span class="text-value">Густая растительность</span><span class="field-value">0га</span></div>
                <div><span class="number-value">0.95 − 1.00</span><span class="text-value">Густая растительность</span><span class="field-value">0га</span></div>
                <div><span class="number-value">0.95 − 1.00</span><span class="text-value">Густая растительность</span><span class="field-value">0га</span></div>
                <div><span class="number-value">0.95 − 1.00</span><span class="text-value">Густая растительность</span><span class="field-value">0га</span></div>
              </div>
            </div>
            <div class="flex px-4 justify-between align-middle">
              <div @click="dropdown = !dropdown" class="dropdown">
                <span>NDVI</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24">
                  <g>
                    <path d="M12 11.828l-2.828 2.829-1.415-1.414L12 9l4.243 4.243-1.415 1.414L12 11.828z"/>
                  </g>
                </svg>
                <div v-if="dropdown" class="dropdown-item">
                  <div>
                    <span>NVDI</span>
                  </div>
                  <div>
                    <span>NDRE</span>
                  </div>
                  <div>
                    <span>MSAVI</span>
                  </div>
                  <div>
                    <span>RECI</span>
                  </div>
                </div>
              </div>
              <svg class="cursor-pointer download-icon" xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fit="" preserveAspectRatio="xMidYMid meet" focusable="false">
                <g fill="none" fill-rule="evenodd">
                  <path fill="currentColor" d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"></path>
                </g>
              </svg>
              <svg v-if="!list" @click="list = !list" class="cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="28px" height="28px" viewBox="0 0 24 24" fit="" preserveAspectRatio="xMidYMid meet" focusable="false">
                <g fill="none" fill-rule="evenodd">
                  <path fill="currentColor" d="M17.456 6.544h-4.579L12.87 4.5h6.63l-.007 6.623h-2.037v-4.58zM6.544 17.456h4.579l.007 2.044H4.5l.007-6.623h2.037v4.58z"></path>
                </g>
              </svg>
              <svg v-else @click="list = !list" xmlns="http://www.w3.org/2000/svg" class="cursor-pointer" width="24px" height="24px" viewBox="0 0 24 24" fit="" preserveAspectRatio="xMidYMid meet" focusable="false">
                <g fill="none" fill-rule="evenodd">
                  <path fill="currentColor" d="M4 13.44h6.569l-.007 6.565H8.544v-4.539H4.007L4 13.44zm15.999-2.868H13.43V4l2.025.007v4.539h4.537l.007 2.026z"></path>
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div :class="$route.query.field_id !== 'new' ? 'lg:col-span-4' : ''">
        <div
          style="height: calc(72vh - 0px)"
          class="md:m-0 bg-white responsive overflow-y-auto scrollbar-track-blue-lighter scrollbar-thumb-blue scrollbar-w-2 scrolling-touch md:col-span-1 xl:col-span-1 col-span-1 border shadow-md rounded-md"
        >
          <div class="m-3 relative rounded-md">
            <div
              class="absolute inset-y-0 left-0 p-3 flex items-center pointer-events-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                style="fill: rgba(156, 163, 175, 1); "
              >
                <path
                  d="M19.023,16.977c-0.513-0.488-1.004-0.997-1.367-1.384c-0.372-0.378-0.596-0.653-0.596-0.653l-2.8-1.337 C15.34,12.37,16,10.763,16,9c0-3.859-3.14-7-7-7S2,5.141,2,9s3.14,7,7,7c1.763,0,3.37-0.66,4.603-1.739l1.337,2.8 c0,0,0.275,0.224,0.653,0.596c0.387,0.363,0.896,0.854,1.384,1.367c0.494,0.506,0.988,1.012,1.358,1.392 c0.362,0.388,0.604,0.646,0.604,0.646l2.121-2.121c0,0-0.258-0.242-0.646-0.604C20.035,17.965,19.529,17.471,19.023,16.977z M9,14 c-2.757,0-5-2.243-5-5s2.243-5,5-5s5,2.243,5,5S11.757,14,9,14z"
                />
              </svg>
            </div>
            <input
              type="text"
              name="search"
              :autocomplete="false"
              class="text-gray-400 text-sm bg-gray-100 block border-transparent w-full pl-10 sm:text-sm rounded-md"
              :placeholder="$t('text.searchByFields')"
            />
          </div>
          <div>
            <div v-if="fields.length > 0 && $route.query.field_id !== 'new'">
              <div
                v-for="(field, index) in fields"
                :key="index"
                class="hover:bg-gray-100 cursor-pointer"
                :class="
                  $route.query.field_id === `${field.id}`
                    ? 'bg-green-50'
                    : 'bg-white'
                "
              >
                <div class="col-span-1 flex shadow-sm rounded-md">
                  <div
                    class="flex-shrink-0 flex items-center justify-center w-16 text-white text-sm font-medium rounded-l-md"
                  >
                    <img
                      :src="require('/assets/images/crop-area.jpg')"
                      alt="crop-area"
                    />
                  </div>
                  <div
                    class="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 truncate"
                  >
                    <div
                      @click="toChangeLocation(field)"
                      class="flex-1 px-4 py-2 text-sm truncate"
                    >
                      <div
                        class="text-gray-900 font-medium hover:text-gray-600"
                      >
                        {{ field.name }}
                      </div>
                      <p class="text-gray-500">{{ field.hectare }}</p>
                    </div>
                    <div class="flex-shrink-0 pr-2">
                      <button
                        type="button"
                        class="w-8 h-8 inline-flex items-center justify-center text-gray-400 rounded-full bg-transparent hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                        @click="toFieldDetail(field)"
                      >
                        <svg
                          class="h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-else>
              <div class="align-middle text-center">
                <span class="rounded-md py-1 px-2 bg-green-200 text-gray-600">
                  {{ $t("text.youDontHaveFields") }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        :class="
          $route.query && $route.query.field_id ? 'block md:hidden' : 'hidden'
        "
        class="md:col-span-8 md:block"
      >
        <div id="map-wrap" class="relative" v-if="!iframeLoading">
          <iframe
            :src="`http://localhost:4044/#/leaflet?field=${field.id}`"
            frameborder="0"
            scrolling="no"
            style="height: calc(72vh - 0px); width: 100%"
          ></iframe>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "Lands",
  components: {},
  data() {
    return {
      dropdown: false,
      openMenu: false,
      list: false,
      value1: new Date(2019, 9, 9),
      fields: [],
      field: {},
      iframeLoading: false,
    };
  },
  watch: {
    "$route.query.field_id"() {
      if (this.$route.query && this.$route.query.field_id)
      this.getPolygon().then(() => {
        this.iframeLoading = false;
      });
    },
  },
  mounted() {
    this.fetchFields();
    if (this.$route.query.field_id) {
      this.getPolygon();
    }
  },
  methods: {
    toFieldsList() {
      this.$router.push({
        query: {},
      });
    },
    toFieldDetail(field) {
      this.iframeLoading = true;
      this.$router.push({
        path: this.localePath(`/my-profile/lands/${field.id}`),
      });
    },
    toChangeLocation(field) {
      this.iframeLoading = true;
      this.field = field;
      this.$router.push({
        query: { field_id: field.id },
      });
    },
    async getPolygon() {
      if (
        this.$route.query.field_id !== "new" ||
        this.$route.query.field_id !== ""
      ) {
        await this.$store
          .dispatch("crud/field/getFieldsById", {
            id: this.$route.query.field_id,
          })
          .then((res) => {
            this.field = res;
            if (this.$refs.leaflet) {
              this.$refs.leaflet.renderPolygon(res.polygon);
            }
          });
      }
    },
    toNewLand() {
      this.$router.push({ path: this.localePath("/my-profile/lands/new") });
    },
    async fetchFields() {
      await this.$store.dispatch("crud/field/getFields").then((res) => {
        this.fields = res;
      });
    },
  },
};
</script>
<style>
.map-options {
  position: absolute;
  min-width: 180px;
  bottom: 0%;
  right: 0%;
  min-height: 32px;
  background: #ffffff;
  border-radius: 12px;
  transition: .3s;
  list-style: none;
  max-height: 360px;
  border-radius: 0;
}
.overflow-y {
  max-height: 315px;
  overflow-y: hidden;
}
.map-options__list {
  max-height: 320px;
  overflow: scroll;
  padding: 10px;
  min-width: 250px;
}
.map-options__list::-webkit-scrollbar {
  width: 6px;
}

.map-options__list::-webkit-scrollbar-thumb {
  background: grey;
  border-radius: 10px;
}

.map-options__list::-webkit-scrollbar-thumb:hover {
  background: #b30000;
}
.map-options__list > div {
  margin-left: 15px;
  position: relative;
}
.map-options__list > div .number-value {
  margin-left: 5px;
}
.map-options__list > div .text-value {
  margin-left: 20px;
}
.map-options__list > div .field-value {
  margin-left: 40px;
}
.map-options__list > div:after {
  content: '';
  width: 14px;
  height: 14px;
  background: #02ff49;
  position: absolute;
  left: -25px;
  transform: translate(0, 3px);
}
svg path {
  fill: #7c7c7c !important;
}
.dropdown {
  display: flex;
  align-items: center;
  cursor: pointer;
}
.mx-calendar {
  width: 220px !important;
}
.dropdown-item {
  border: none;
  position: absolute;
  bottom: 30px;
  left: 0;
  background: #ffffff;
  min-width: 120px;
  padding: 6px 0px;
}
.dropdown-item > div {
  padding: 5px 10px;
}
.dropdown-item > div:hover {
  background: rgba(107, 114, 128, 0.63);
}
</style>
