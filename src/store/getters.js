export const loader = ({ loader }) => loader

export const language = (state) => {

    const language = !_.isEmpty(state.language) ? state.language : localStorage.getItem('language')

    if (language === 'pt' || !language || language == "undefined") {
        localStorage.setItem('language', 'pt');
        return 'pt'
    }
    if (language === 'en') {
        return 'en'
    }
}

export const getCategories = (state) => {

    if(!state.categories.length){

        var categories = JSON.parse(localStorage.getItem('categories'));

        if(categories){
            return categories;
        }

    }

    return state.categories;

}
