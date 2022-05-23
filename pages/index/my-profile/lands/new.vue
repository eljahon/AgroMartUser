<template>
  <div>
    <leaflet ref="leaflet" />
  </div>
</template>
<script>
export default {
  data () {
    return {}
  },
  mounted () {
    this.addLeafletPolygon()
  },
  methods: {
    addLeafletPolygon () {
      if (this.$refs.leaflet) { this.$refs.leaflet.createPolygon() }
    }
  }
}
</script>
