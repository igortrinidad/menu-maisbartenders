import { vuex as admin } from '../modules/admin'
import { vuex as landing } from '../modules/landing'
// create a new object and preserv original keys
export default { ...admin.modules, ...landing.modules }
