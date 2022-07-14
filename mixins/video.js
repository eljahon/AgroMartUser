import Breadcrumbs from '~/components/ui/Breadcrumbs.vue'
export default {
  name: 'Videos',
  auth: false,
  components: { Breadcrumbs },
  data () {
    return {
      videos: [],
      pageCount: 1,
      query: {
        limit: 12,
        offset: 1
      },
      items: [
        { text: 'text.videoLessons', link: '/videos/', disabled: false }
      ]
    }
  },
  computed: {
    pagination () {
      return this.$store.state.crud.video.pagination
    }
  },
  watch: {
    '$route.query.offset' () {
      if (this.$route.query.offset) { this.fetchData(this.$route.query) }
    },
    '$route.query.category_id' () {
      if (this.$route.query.category_id) { this.fetchData(this.$route.query) }
    }
  },
  // mounted () {
  //   this.fetchData(Object.keys(this.$route.query).length > 0
  //     ? {
  //       category_id: this.$route.query.category_id,
  //       limit: this.$route.query.limit,
  //       offset: this.$route.query.offset
  //     }
  //     : {
  //       category_id: 'all',
  //       limit: this.pagination.limit,
  //       offset: this.pagination.page
  //     })
  // },
  methods: {
    pageChanged (offset) {
      this.$router.push({
        path: this.localePath(this.$route.query.path),
        query: this.setQuery(this.$route.query, offset)
      })
    },
    setQuery (query, offset) {
      if (query.category_id) {
        return {
          category_id: query.category_id,
          limit: query.limit ? query.limit : this.pagination.limit,
          offset
        }
      }
      return {
        limit: query.limit ? query.limit : this.pagination.limit,
        offset
      }
    },
    async fetchData (query) {
      await this.$store.dispatch('crud/video/getVideo',
        {
          _sort: 'created_at:DESC',
          '_where[0][category.id]': query.category_id !== 'all' ? query.category_id : null,
          _limit: query.limit,
          _start: (query.offset - 1) * query.limit
        }).then((res) => {
        this.videos = res
      })
    },
  }
}
