// https://vuex.vuejs.org/en/mutations.html

import * as TYPES from './mutations-types'
import { findIndex, find } from 'lodash'
import { localStorageSetItem } from '../../../../utils/local'

/* eslint-disable no-param-reassign */
export default {
    [TYPES.ADD_DRINK_TO_SAVED_DRINKS](state, obj) {

        obj.rootState.Auth.user.saved_drinks.push(obj.drink)
        localStorageSetItem('user', {user: obj.rootState.Auth.user})
    },

    [TYPES.REMOVE_DRINK_FROM_SAVED_DRINKS](state, obj) {

        const index = findIndex(obj.rootState.Auth.user.saved_drinks, {id: obj.drink.id})

        if(index > -1){
            obj.rootState.Auth.user.saved_drinks.splice(index, 1)
            localStorageSetItem('user', {user: obj.rootState.Auth.user})
        }
    }
}
