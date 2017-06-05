// http://vuex.vuejs.org/en/getters.html
import { isEmpty } from 'lodash'

// if has token, we assume that user is logged in our system
export const isLogged = ({ token }) => !isEmpty(token.token)
// get current user data
export const currentUser = ({ user }) => user

// get current user photo
export const userPhoto = ({user}) => {
    const current_provider = localStorage.getItem('provider')


    if(!current_provider && user){

        return user.photo_url ? user.photo_url : '/static/assets/user_avatar.jpg'
    }

    if(current_provider && (user && user.social_providers)){
        return user.social_providers.find(provider => provider.provider === current_provider).photo_url
    }
}
