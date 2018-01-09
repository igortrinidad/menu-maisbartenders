// https://vuex.vuejs.org/en/mutations.html
import * as TYPES from './mutations-types'

/* eslint-disable no-param-reassign */
export default {
    [TYPES.SET_LOADING](state, obj) {

        state.loader = obj.options
    },

    [TYPES.SET_LANGUAGE](state, {language}) {

        localStorage.setItem('language', language)

        state.language = language
    },

    [TYPES.SET_CATEGORIES](state, {categories}) {

        state.categories = categories
    }
}
