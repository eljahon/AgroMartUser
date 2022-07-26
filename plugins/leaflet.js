import Vue from 'vue'
import * as Vue2Leaflet from 'vue2-leaflet'
import { Icon, LatLng } from 'leaflet'

console.log(Icon, LatLng)

delete Icon.Default.prototype._getIconUrl
Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
})

Vue.component('LCircle', Vue2Leaflet.LCircle)
Vue.component('LCircleMarker', Vue2Leaflet.LCircleMarker)
Vue.component('LControl', Vue2Leaflet.LControl)
Vue.component('LControlAttribution', Vue2Leaflet.LControlAttribution)
Vue.component('LControlLayers', Vue2Leaflet.LControlLayers)
Vue.component('LControlScale', Vue2Leaflet.LControlScale)
Vue.component('LControlZoom', Vue2Leaflet.LControlZoom)
Vue.component('LFeatureGroup', Vue2Leaflet.LFeatureGroup)
Vue.component('LGeoJson', Vue2Leaflet.LGeoJson)
Vue.component('LGridLayer', Vue2Leaflet.LGridLayer)
Vue.component('LIcon', Vue2Leaflet.LIcon)
Vue.component('LIconDefault', Vue2Leaflet.LIconDefault)
Vue.component('LImageOverlay', Vue2Leaflet.LImageOverlay)
Vue.component('LLayerGroup', Vue2Leaflet.LLayerGroup)
Vue.component('LMap', Vue2Leaflet.LMap)
Vue.component('LMarker', Vue2Leaflet.LMarker)
Vue.component('LPolygon', Vue2Leaflet.LPolygon)
Vue.component('LPolyline', Vue2Leaflet.LPolyline)
Vue.component('LPopup', Vue2Leaflet.LPopup)
Vue.component('LRectangle', Vue2Leaflet.LRectangle)
Vue.component('LTileLayer', Vue2Leaflet.LTileLayer)
Vue.component('LTooltip', Vue2Leaflet.LTooltip)
Vue.component('LLwmsTileLayer', Vue2Leaflet.LWMSTileLayer)
