import * as TYPES from './mutations-types'
import { findIndex } from 'lodash'
export default {

    [TYPES.SET_USER_DRINK_LIKES](state, obj) {
        state.drink_likes = obj.likes
    },

    [TYPES.ADD_USER_DRINK_LIKE](state, obj) {

        state.drink_likes.unshift(obj.like)
    },

    [TYPES.REMOVE_USER_DRINK_LIKE](state, obj) {

        const index = findIndex(state.drink_likes, {drink_id: obj.like.drink_id})

        if(index > -1){
            state.drink_likes.splice(index, 1)
        }
    },

}
