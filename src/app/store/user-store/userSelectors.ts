import { createSelector, createFeatureSelector } from '@ngrx/store'
import { User } from './userStates'

export const selectUser = createFeatureSelector<User>('userState')

export const selectSessionId = createSelector(selectUser, (state) => state.sessionId)

export const selectAccountId = createSelector(selectUser, (state) => state.accountId)

export const selectUserName = createSelector(selectUser, (state) =>
    state.userApiName && state.userEmail ? true : false
)
export const selectLoginPopup = createSelector(selectUser, (state) => state.loginPopup)
export const selectSubscribePopup = createSelector(selectUser, (state) => state.subscribePopup)
export const selectUserStatus = createSelector(selectUser, (state) => {
    return {
        success: state.success,
        error: state.error
    }
})
