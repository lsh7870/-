import Vue from "vue"
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state:{
		topListId:[],
		nextId:''
	},
	mutations:{
		INIT_TOPLISTTDS(state,payload){
			state.topListId=payload
		},
		NEXT_ID(state,payload){
			for(var i=0;i<state.topListId.length;i++){
				if(state.topListId[i]==payload){
					state.nextId=state.topListId[i+1].id
				}
				// state.nextId=payload
			}
		}
	}
})

