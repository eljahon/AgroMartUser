/* eslint-disable no-console */
import Vue from 'vue'
export const state = () => ({
  uploading: {
    show: false,
    percent: 0
  }
})
export const mutations = {
  SET_UPLOADING (state, payload) {
    state.uploading = payload
  }
}
export const actions = {
  async uploadFile ({ commit }, payload) {
    const res = await this.$axios.$post('/upload', payload)
    return res
  },
  async deleteMedia ({ commit, dispatch }, payload) {
    try {
      await this.$axios.$remove(`/media/${payload}/`)
      Vue.prototype.$snotify.error('Media Deleted Successfully')
    } catch (e) {
      console.error(e)
    }
  },
  uploadingAction ({ commit }, payload) {
    commit('SET_UPLOADING', payload)
  }
}
export const getters = {
  uploading: state => state.uploading
}
