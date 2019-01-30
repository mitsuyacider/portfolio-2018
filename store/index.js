import Vuex from 'vuex'
import workData from '@/assets/data/data.json'

const createStore = () => {
  return new Vuex.Store({
    state: () => ({
			selectedWork: workData["web"][0]
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