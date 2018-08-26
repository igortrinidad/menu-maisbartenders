import * as TYPES from './mutations-types'
import axios from 'axios'

export const setLoading = ({ commit }, options) => {

    /**
     * Commit the mutations
     */
    commit(TYPES.SET_LOADING, {
        options
    })
}

export const setLanguage = ({ commit }, language) => {

    commit(TYPES.SET_LANGUAGE, {
        language
    })
}

export const setCategories = ({ commit }) => {

    var categories = JSON.parse(localStorage.getItem('categories'))

    //Se não encontrar categorias salvas
    if(!categories || !categories.length){
        axios.get(`/categories/list/pt`)
            .then(function (response) {
                var categories = response.data.categories

                localStorage.setItem('categories', JSON.stringify(categories));

                commit(TYPES.SET_CATEGORIES, {
                    categories
                })

            })
            .catch(function (error) {
                console.log(error)
            });

    }else{

        commit(TYPES.SET_CATEGORIES, {
            categories
        })
    }
}
