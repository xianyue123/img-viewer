import * as types from './types'
import {state} from './state'

export default {
    /*头部*/
	[types.HEAD_SHOW_SUCCESS](state){
		state.headShow=true;
	},
	[types.HEAD_SHOW_FAIL](state){
		state.headShow=false;
	},
	/*loading*/
	[types.HIDE_LOADING](state){
		state.loading=false;
	},
	[types.SHOW_LOADING](state){
		state.loading=true;
	},
	/*footer*/
	[types.FOOTER_HIDE](state){
		state.footerShow=false;
	},
	[types.FOOTER_SHOW](state){
		state.footerShow=true;
	},
	[types.SET_TOKEN](state,token){
		state.token = token;
	},
	[types.SET_USERNAME](state, username){
		state.username = username;
	}

}