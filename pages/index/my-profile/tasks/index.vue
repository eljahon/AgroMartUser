<template>
  <div class="bg-white border rounded-md shadow-sm">
    <div class="mt-2 ring-1 ring-gray-300 sm:-mx-6 md:mx-2 md:rounded-lg">
      <table class="min-w-full divide-y divide-gray-300">
        <thead>
          <tr>
            <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
              {{ $t('word.title') }}
            </th>
            <th scope="col" class="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell">
              {{ $t('word.description') }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(task, index) in tasks" :key="index">
            <td class="relative py-4 pl-4 sm:pl-6 pr-3 text-sm w-1/3">
              <div class="font-medium text-gray-900">
                {{ task.title }}
              </div>
            </td>
            <td class="hidden px-3 py-3.5 text-sm text-gray-500 lg:table-cell">
              {{ task.description }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Tasks',
  components: {},
  data () {
    return {
      tasks: []
    }
  },
  computed: {
    ...mapState({
      currentUser: state => state.auth.user
    })
  },
  mounted () {
    this.fetchTasks()
  },
  methods: {
    toDetail (task) {
      this.$router.push(
        { path: this.localePath(`/my-profile/tasks/${task.id}`) }
      )
    },
    toNewLand () {
      this.$router.push(
        { path: this.localePath('/my-profile/tasks/new') }
      )
    },
    async fetchTasks () {
      await this.$store.dispatch('crud/task/getTasks',
        {
          // '_where[0][userid.id]': this.currentUser.id
        }
      ).then((res) => {
        this.tasks = res
      })
    }
  }
}
</script>
