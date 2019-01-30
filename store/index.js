import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: () => ({
			selectedWork: {}
    }),
    mutations: {
			setSelectedWork(state, data) {
				state.selectedWork = data;
			}
		},
		actions: {
			setSelectedWork (context, data) {
				context.commit('setSelectedWork', data)
			}
		},
		getters: {
			selectedWork (state) {
				return state.selectedWork
			}
		}
  })
}

export default createStore