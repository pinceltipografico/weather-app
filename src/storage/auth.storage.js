import { AppStorage } from './app.storage'

class AuthStorage extends AppStorage{}
export default new AuthStorage( '__oauth__' )