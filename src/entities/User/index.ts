export {
  userReducer,
  userActions,
} from './model/slice/userSlice'

export type {
  User,
  UserSchema,
} from './model/types/user'

export { getUserAuthData } from './model/selectors/getUserAuthData/getUserAuthData'
export { getUserInited } from './model/selectors/getUserInited/getUserInited'
export {
  getUserIsManager,
  getUserRoles,
  getUserIsAdmin,
} from './model/selectors/getUserRoles/getUserRoles'
export { UserRole } from './model/consts/userConsts';
