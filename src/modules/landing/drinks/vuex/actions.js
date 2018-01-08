import * as TYPES from './mutations-types'
import {cloneDeep} from 'lodash'

export const addDrinkToSavedDrinks = ({ commit, rootState }, drink) => {

    drink = cloneDeep(drink)

    /**
     * Commit the mutations
     */
    commit(TYPES.ADD_DRINK_TO_SAVED_DRINKS, {
        drink, rootState
    })
}

export const removeDrinkFromSavedDrinks = ({ commit, rootState }, drink) => {

    drink = cloneDeep(drink)

    /**
     * Commit the mutations
     */
    commit(TYPES.REMOVE_DRINK_FROM_SAVED_DRINKS, {
        drink, rootState
    })
}


export const setSelectedCategory = ({ commit }, category) => {


    commit(TYPES.SET_SELECTED_CATEGORY, {
        category
    })
}
