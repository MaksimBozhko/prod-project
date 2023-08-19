import { StateSchema } from '@/app/providers/StoreProvider';

export const getAddCommentsFormText = (state: StateSchema) => state.addCommentForm?.text || ''
export const getAddCommentsFormError = (state: StateSchema) => state.addCommentForm?.error
