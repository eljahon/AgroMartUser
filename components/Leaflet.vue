<template>
  <div style="position: relative">
    <div id="leaflet" :style="height" class="w-full" />
    <button
      v-if="from === 'field-list' && !drawEnabled"
      id="newField"
      type="button"
      class="
        p-2
        border border-transparent
        text-xs
        leading-4
        font-medium
        rounded-md
        text-light-orange
        bg-orange-50
        focus:outline-none
        flex
      "
      @click="addNewField()"
    >
      {{ $t('text.newField') }}
      <svg
        class="ml-2 -mr-0.5 h-4 w-4"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
      </svg>
    </button>
    <button
      v-if="from === 'field-list' && drawEnabled"
      id="newField"
      type="button"
      class="
        p-2
        border border-transparent
        text-xs
        leading-4
        font-medium
        rounded-md
        text-white
        bg-red-600
        focus:outline-none
        flex
      "
      @click="disebleDraw()"
    >
      {{ $t('word.cancel') }}
      <svg
        class="ml-2 -mr-0.5 h-4 w-4"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
      </svg>
    </button>
  </div>
</template>

<script>
// import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-draw/dist/leaflet.draw.css'
// import 'leaflet-draw/dist/leaflet.draw';
// eslint-disable-next-line camelcase
import parse_georaster from 'georaster'
import landModal from '~/modals/land.vue'
// import GeoRasterLayer from 'georaster-layer-for-leaflet'
// import chroma from 'chroma-js'

// const getColorFromValues = (values, min, max) => {
//   // eslint-disable-next-line no-unused-vars
//   const [BLUE, GREEN, RED, NIR, NDVI] = values
//   // const [RED, NIR] = values;
//   // const NIR = b4
//   // const BLUE = b1
//   // const GREEN = b2
//   // const RED = b3
//   if (NDVI === 0) {
//     return 'rgba(0,0,0,0)'
//   } else {
//     const _NDVI = NDVI + 1
//     return chroma.scale(['yellow', 'green']).domain([min, max])(_NDVI).hex()
//   }
// }
// const GeoRasterLayer = require('georaster-layer-for-leaflet')
export default {
  name: 'Map',
  props: {
    from: {
      type: String,
      required: true
    },
    height: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      map: null,
      polygon: null,
      current: {
        layer: null,
        coords: null,
        drawer: null
      },
      drawEnabled: false
    }
  },
  created () {
    if (process.browser) {
      window.L = require('leaflet')
      require('leaflet-draw/dist/leaflet.draw')
      // if (window.L) {
      //   window.GeoRasterLayer = require('georaster-layer-for-leaflet')
      // }
      // georaster-layer-for-leaflet
    }
  },
  mounted () {
    console.log('georaster: ', parse_georaster)
    this.renderMap()
    // this.renderSelectedArea()
    // this.renderingAnalyticLayer()
  },
  methods: {
    renderSelectedArea () {
      const latlngs = this.selectedArea.field.polygon.polygon[0]
      const polyline = window.L.polyline(latlngs, { color: 'red' }).addTo(this.map)
      this.map.fitBounds(polyline.getBounds())
    },
    // renderingAnalyticLayer (url) {
    //   const _url = url || 'https://agsat-files-admin.s3.eu-north-1.amazonaws.com/tiffs/20220116_053800_1025_3B_AnalyticMS_clip_bandmath.tif'
    //   fetch(_url)
    //     .then(response => response.arrayBuffer())
    //     .then((arrayBuffer) => {
    //       parse_georaster(arrayBuffer).then((georaster) => {
    //         const layer = new GeoRasterLayer({
    //           georaster,
    //           opacity: 1,
    //           pixelValuesToColorFn: values => getColorFromValues(values, 1, 1.3),
    //           resolution: 50
    //         })
    //         layer.addTo(this.map)
    //         this.map.fitBounds(layer.getBounds())
    //         // setTimeout(() => {
    //         //   this.map.removeLayer(layer)
    //         // }, 2000)
    //       })
    //     })
    // },
    createPolygon () {
      this.current.drawer = new window.L.Draw.Polygon(this.map, {
        allowIntersection: false,
        drawError: {
          color: '#ff0000',
          message: "<strong>Oh snap!<strong> you can't draw that!"
        },
        shapeOptions: {
          color: '#00ff23'
        }
      })
      this.current.drawer.enable()
    },
    renderMap () {
      const L = window.L
      this.map = L.map('leaflet', {
        center: [40.4446, 71.303996],
        zoom: 17
      })
      L.tileLayer(
        'https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token=sk.eyJ1Ijoib3liZWsxMDI0IiwiYSI6ImNsMHRoeDl0MzBsemEzYm5taHp6ZnB0ZGoifQ.Vs11zDgh6BCosFToZjqCGQ',
        {
          attribution:
            'Geo Analytics by &copy; <a href="https://www.agromart.uz/" target="_blank">Agromart</a> ©Copyright All rigths reseved.'
        }
      ).addTo(this.map)
      const editableLayers = new L.FeatureGroup()
      this.map.addLayer(editableLayers)
      const options = {
        position: 'topright',
        draw: {
          polyline: false,
          polygon: {
            allowIntersection: false, // Restricts shapes to simple polygons
            drawError: {
              color: '#e1e100', // Color the shape will turn when intersects
              message: "<strong>Oh snap!<strong> you can't draw that!" // Message that will show when intersect
            },
            shapeOptions: {
              color: '#bada55'
            }
          },
          circle: false, // Turns off this drawing tool
          rectangle: false,
          marker: false,
          circlemarker: false
        },
        edit: {
          featureGroup: editableLayers, // REQUIRED!!
          remove: true
        }
      }
      const drawControl = new L.Control.Draw(options)
      this.map.addControl(drawControl)
      const _this = this
      this.map.on('draw:created', function (e) {
        const layer = e.layer
        _this.current.layer = layer
        _this.current.coords = layer._latlngs
        editableLayers.addLayer(layer)
        const _area = window.L.GeometryUtil.geodesicArea(layer._latlngs[0])

        const _stArea = (_area / 10000).toString().split('.')
        const _filteredArea = parseFloat(_stArea[0] + '.' + _stArea[1].slice(0, 2))
        const _one = layer._latlngs[0][Math.ceil(layer._latlngs[0].length / 2)]
        const _center = [_one.lat, _one.lng]
        const _coords = [layer._latlngs[0].map(e => [e.lat, e.lng])]
        const _box = {
          zoom: 16,
          center: _center,
          polygon: _coords
        }
        _this.openLandModal({ polygon: _box, area: _filteredArea })
      })
    },
    remover (layer) {
      this.map.removeLayer(layer)
    },
    removeCurrentPolygon () {
      this.remover(this.polygon)
      this.remover(this.current.layer)
    },
    polygonCreator (coords) {
      if (this.polygon) {
        this.remover(this.polygon)
      }
      this.polygon = window.L.polygon(coords, { color: '#2e00ff' })
      this.polygon.addTo(this.map)
    },
    renderPolygon (polygon) {
      this.map.flyTo(polygon.center, 15, { duration: 4 })
      this.polygonCreator(polygon.polygon)
      this.polygon = window.L.polygon(polygon.polygon, { color: 'red' })
      this.polygon.addTo(this.map)
    },
    openLandModal (data) {
      this.$modal.show(
        landModal,
        { data },
        {
          height: 'auto',
          maxWidth: 600,
          width: window.innerWidth <= 600 ? window.innerWidth - 10 : 600,
          acrollable: true
        }
      )
    },
    disebleDraw () {
      this.drawEnabled = false
      this.$router.push({
        query: { field_id: '' }
      })
      this.current.drawer.disable()
    },
    addNewField () {
      this.$router.push({
        query: { field_id: 'new' }
      })
      this.current.drawer = new window.L.Draw.Polygon(this.map, {
        allowIntersection: false,
        drawError: {
          color: '#ff0000',
          message: '<strong>Oh snap!<strong> you can\'t draw that!'
        },
        shapeOptions: {
          color: '#00ff23'
        }
      })
      this.drawEnabled = true
      this.current.drawer.enable()
    }
  }
}
</script>
<style>
.yandexMap {
  height: 100vh;
  width: 100%;
}
#newField {
  position: absolute;
  bottom: 20px;
  right: 20px;
  padding: 10px;
  z-index: 400;
}
</style>
