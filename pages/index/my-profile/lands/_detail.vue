<template>
  <div class="rounded-sm h-full">
    <div class="grid grid-cols-3 gap-0">
      <div id="map-wrap" class="md:col-span-1 col-span-3 relative">
        <leaflet ref="leaflet" height="height: 24rem" from="field-detail" />
      </div>
      <div class="md:col-span-2 col-span-3 relative bg-white shadow-sm">
        <div class="bg-gray-100">
          <div class="flex items-center justify-between p-3">
            <button
              class="text-xs text-gray-500 bg-gray-200 font-medium flex items-center rounded-md p-2"
              @click="isEditable = !isEditable"
            >
              {{ isEditable ? $t('word.cancel') : $t('word.edit') }}
              <i v-if="!isEditable" class="bx bx-edit text-gray-600 pl-1.5" />
            </button>
            <div class="flex items-center space-x-5">
              <button
                v-if="isEditable"
                class="text-xs text-red-500 bg-red-100 font-medium flex items-center rounded-md p-2"
              >
                {{ $t('word.delete') }}
                <i class="bx bx-trash text-red-600 pl-1.5" />
              </button>
              <button
                class="
                  text-xs text-white
                  bg-light-orange
                  font-medium
                  flex
                  items-center
                  rounded-md
                  px-5
                  py-2
                "
              >
                {{ $t('word.back') }}
              </button>
            </div>
          </div>
          <div v-if="isEditable" class="grid grid-cols-2 gap-4 px-3 pb-3">
            <div class="block">
              <p class="text-sm text-gray-700 font-medium">
                {{ $t('text.landName') }}
              </p>
              <input
                v-model="field.name"
                type="text"
                placeholder="Mening yerim 2"
                class="rounded-md border border-gray-300 mt-1 w-full"
              >
            </div>
            <div class="block">
              <p class="text-sm text-gray-700 font-medium">
                {{ $t('text.groupName') }}
              </p>
              <input
                v-model="field.group_name"
                type="text"
                placeholder="Ko'rsatilmagan"
                class="rounded-md border border-gray-300 mt-1 w-full"
              >
            </div>
          </div>
        </div>
        <div class="mt-2 ring-1 ring-gray-300 sm:-mx-6 md:mx-2 md:rounded-lg">
          <table class="min-w-full divide-y divide-gray-300">
            <thead>
              <tr>
                <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                  {{ $t('text.cropName') }}
                </th>
                <th scope="col" class="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell">
                  {{ $t('text.seasonYear') }}
                </th>
                <th scope="col" class="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell">
                  {{ $t('text.timeOfSowing') }}
                </th>
                <th scope="col" class="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell">
                  {{ $t('text.harvestTime') }}
                </th>
              </tr>
            </thead>
            <tbody v-if="seasons.length > 0">
              <tr v-for="(season, index) in seasons" :key="index">
                <td class="relative py-4 pl-4 sm:pl-6 pr-3 text-sm">
                  <div class="font-medium text-gray-900">
                    {{ season.crop_id.name }}
                  </div>
                </td>
                <td class="hidden px-3 py-3.5 text-sm text-gray-500 lg:table-cell">
                  {{ season.year }}
                </td>
                <td class="hidden px-3 py-3.5 text-sm text-gray-500 lg:table-cell">
                  {{ season.planteddate }}
                </td>
                <td class="hidden px-3 py-3.5 text-sm text-gray-500 lg:table-cell">
                  {{ season.harvesteddate }}
                </td>
                <td class="hidden px-3 py-3.5 text-sm text-gray-500 lg:table-cell">
                  <div class="flex items-center gap-1">
                    <button
                      class="text-xs text-gray-500 bg-gray-200 font-medium flex items-center rounded-md p-2"
                      @click="toEditSeason(season)"
                    >
                      <i class="bx bx-edit text-gray-600" />
                    </button>
                    <button
                      class="text-xs text-red-500 bg-red-100 font-medium flex items-center rounded-md p-2"
                      @click="toDeleteSeason(season)"
                    >
                      <i class="bx bx-trash text-red-600" />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="flex items-center justify-center">
          <button
            class="
              flex
              items-center
              bg-green-100
              border-transparent
              text-green-700
              font-medium
              text-sm
              py-2
              px-5
              rounded-md
              mt-6
            "
            @click="toNewSeason()"
          >
            {{ $t('text.newSeason') }}
            <span class="ml-2">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 7.5V10m0 0v2.5m0-2.5h2.5M10 10H7.5m10 0a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0z"
                  stroke="#047857"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>
          </button>
        </div>
      </div>
      <div v-if="isEditable" class="col-start-3 mt-5 flex justify-end space-x-5">
        <button class="text-gray-700 font-medium bg-white border rounded-md py-1.5 px-3" @click="backToLands()">
          {{ $t('word.cancel') }}
        </button>
        <button class="text-white bg-green-500 border rounded-md py-1.5 px-4" @click="toAddField()">
          {{ $t('word.save') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
// import addField from '~/modals/add-field.vue'
import newSeason from '~/modals/season.vue'
import deleteModal from '~/modals/delete.vue'
export default {
  name: 'Edit',
  middleware: 'leaflet',
  data () {
    return {
      field: {},
      seasons: [],
      isEditable: false
    }
  },
  computed: {},
  created () {},
  mounted () {
    this.getPolygon().then(() => {
      this.fetchSeason()
    })
  },
  methods: {
    toAddField () {
      this.$router.push(this.localePath('/my-profile/lands'))
      // this.$modal.show(
      //   addField,
      //   { status: 'add-field' },
      //   {
      //     height: 'auto',
      //     maxWidth: 300,
      //     width: window.innerWidth <= 300 ? window.innerWidth - 10 : 300,
      //     acrollable: true
      //   }
      // )
    },
    toEditSeason (data) {
      this.openSeasonModal({
        crop_id: data.crop_id.id,
        year: data.year,
        planteddate: data.planteddate,
        harvesteddate: data.harvesteddate,
        expacted_harvest: data.expacted_harvest,
        harvested_amount: data.harvested_amount,
        description: data.description,
        field_id: this.field.id,
        id: data.id
      })
    },
    toDeleteSeason (data) {
      this.$modal.show(
        deleteModal,
        { data, link: 'crud/season/deleteSeasons' },
        {
          height: 'auto',
          maxWidth: 400,
          width: window.innerWidth <= 350 ? window.innerWidth - 10 : 350,
          scrollable: false
        }
      )
      this.$root.$once('delete-modal', (item) => {
        if (item === 'success') { this.fetchSeason() }
      })
    },
    toNewSeason () {
      this.openSeasonModal({})
    },
    openSeasonModal (data) {
      this.$modal.show(
        newSeason,
        { field: this.field, data },
        {
          height: 'auto',
          maxWidth: 500,
          width: window.innerWidth <= 450 ? window.innerWidth - 10 : 450,
          scrollable: false
        }
      )
      this.$root.$once('season-modal', (item) => {
        this.fetchSeason()
      })
    },
    async fetchSeason () {
      if (this.$route.params.detail !== 'new') {
        await this.$store
          .dispatch('crud/season/getSeasons', {
            '_where[0][field_id.id]': this.$route.params.detail
          })
          .then((res) => {
            this.seasons = res
          })
      }
    },
    async getPolygon () {
      if (this.$route.params.detail !== 'new') {
        await this.$store
          .dispatch('crud/field/getFieldsById', { id: this.$route.params.detail })
          .then((res) => {
            this.field = res
            if (this.$refs.leaflet) { this.$refs.leaflet.renderPolygon(res.polygon) }
          })
      }
    },
    backToLands () {
      this.$router.push(this.localePath('/my-profile/lands'))
    }
  }
}
</script>
