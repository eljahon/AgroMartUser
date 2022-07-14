<template>
  <div class="max-w-7xl mx-auto py-6 px-6 lg:px-8">
    <div class="pb-6 flex justify-between px-0">
      <breadcrumbs :items="items" />
    </div>
    <div class="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 mt-4 gap-4">
      <div v-for="(video, index) in videos" :key="index" class="h-72 relative border shadow-md rounded-md">
        <div class="container h-auto cursor-pointer w-full">
          <iframe
            loading="lazy"
            :src="video.videoPath"
            frameborder="0"
            allowfullscreen
            class="responsive-iframe rounded-md"
          />
        </div>
        <p class="text-gray-700 font-medium absolute lg:bottom-2 bottom-3 inset-x-3 line-clamp-2 text-base">
          {{ video.title[$i18n.locale] }}
        </p>
      </div>
    </div>
    <pagination
      v-if="pagination.pageCount > 1"
      :current-page="parseInt($route.query.offset)"
      :page-count="pagination.pageCount"
      @callback="pageChanged($event)"
    />
  </div>
</template>

<script>
import Mixins from '@/mixins/video'
export default {
  name: 'Videos',
  auth: false,
  async asyncData ({$AllApi, route}) {
    const videos = await $AllApi.getVideo(route);
    return {videos}
  },
  mixins: [Mixins]

}
</script>

<style scoped>
.container {
  position: relative;
  overflow: hidden;
  width: 100%;
  padding-top: 56.25%; /* 16:9 Aspect Ratio (divide 9 by 16 = 0.5625) */
}

/* Then style the iframe to fit in the container div with full height and width */
.responsive-iframe {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
}
</style>
