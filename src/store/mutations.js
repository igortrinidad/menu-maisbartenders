// https://vuex.vuejs.org/en/mutations.html
import * as TYPES from './mutations-types'

/* eslint-disable no-param-reassign */
export default {
    [TYPES.SET_LOADING](state, obj) {

        state.loader = obj.options
    },

}
