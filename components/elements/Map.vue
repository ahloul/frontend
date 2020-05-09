<template>
  <div>
    <div ref="map" class="map"></div>
  </div>
</template>

<script>
export default {
  name: 'Map',
  props: {
    position: {
      type: Object,
      default: () => ({
        latitude: 52.5,
        longitude: 13.4,
      }),
    },
    // Todo
    polygon: {
      type: Object,
      default: () => ({}),
    },
  },
  data: () => ({
    map: {},
  }),
  computed: {
    getPoligonCoordinates() {
      if (this.polygon) {
        const { coordinates } = this.polygon
        return coordinates
      }
      return null
    },
  },
  mounted() {
    // Render Map with Marker
    this.map = new window.H.Map(
      this.$refs.map,
      this.$herePlatform().createDefaultLayers().normal.map,
      {
        zoom: 12,
        center: { lat: this.position.latitude, lng: this.position.longitude },
      }
    ).addObject(
      new window.H.map.Marker({
        lat: this.position.latitude,
        lng: this.position.longitude,
      })
    )
  },
}
</script>

<style lang="scss" scoped>
.map {
  @apply w-auto;
  height: 20rem;
}
</style>
