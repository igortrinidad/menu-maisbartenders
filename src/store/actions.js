import * as TYPES from './mutations-types'
export const setLoading = ({ commit }, options) => {

    /**
     * Commit the mutations
     */
    commit(TYPES.SET_LOADING, {
        options
    })
}
