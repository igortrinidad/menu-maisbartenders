import * as TYPES from './mutations-types'

export const setUserDrinkLikes = ({ commit }, likes) => {

    /**
     * Commit the mutations
     */
    commit(TYPES.SET_USER_DRINK_LIKES, {
        likes
    })
}

export const addUserDrinkLike = ({ commit }, like) => {
    /**
     * Commit the mutations
     */
    commit(TYPES.ADD_USER_DRINK_LIKE, {
        like
    })
}

export const removeUserDrinkLike = ({ commit }, like) => {

    /**
     * Commit the mutations
     */
    commit(TYPES.REMOVE_USER_DRINK_LIKE, {
        like
    })
}
