import { createAction, props } from '@ngrx/store'
// account id

//===========================================================
export const loginWithGoogle = createAction('[UserAccount] Load Account Load Account With Google ')

export const loadAccountFailure = createAction(
    '[UserAccount] Load Account With Google Success Failure!',
    props<{ error: any }>()
)

export const loadAccountSuccess = createAction(
    '[UserAccount] Load Account With Google Success!',
    props<{
        accountId: string
        userApiName: string
        displayName: string | null
        userEmail: string | null
        userPhoto: string | null
        sessionId: string | null
        loginPopup: boolean
        success: string
    }>()
)
//===========================================================
export const loginWithEmailAndPass = createAction(
    '[UserAccount]Load Account With Pass And Email ',
    props<{ email: string; password: string }>()
)

export const loadAccountWithPassAndEmailSuccess = createAction(
    '[UserAccount] Load Account With Pass And Email Success!',
    props<{
        accountId: string
        userApiName: string
        userEmail: string | null
        sessionId: string | null
        loginPopup: boolean
        success: string
    }>()
)
export const loadAccountWithPassAndEmailFailure = createAction(
    '[UserAccount] Load Account With Pass And Email Failure!',
    props<{ error: any }>()
)
//===========================================================

export const createAccountWithPassAndEmail = createAction(
    '[CreateUserAccount] Create Account With Google Success Failure!',
    props<{ email: string; password: string }>()
)

export const createAccountWithPassAndEmailSuccess = createAction(
    '[CreateUserAccount] Create Account With Pass And Email Success!',
    props<{
        accountId: string
        userApiName: string
        userEmail: string | null
        sessionId: string | null
        loginPopup: boolean
        success: string
    }>()
)
export const createAccountWithPassAndEmailFailure = createAction(
    '[CreateUserAccount] Create Account With Pass And Email Failure!',
    props<{ error: any }>()
)
//===========================================================

export const openLoginPopup = createAction('[LoginPopup] Open Login Popup', props<{ loginPopup: boolean }>())
export const closeLoginPopup = createAction('[LoginPopup] Close Login Popup', props<{ loginPopup: boolean }>())

export const openSubscribePopup = createAction(
    '[OpenSubscribe] Open Subscribe Popup',
    props<{ subscribePopup: boolean }>()
)
export const closeSubscribePopup = createAction(
    '[CloseSubscribe] Close Subscribe Popup',
    props<{ subscribePopup: boolean }>()
)
//===========================================================

export const deleteUserAndAccId = createAction('[DeleteUser] Delete User And Account Id')
//===========================================================
// Subscribe Send Mail
export const sendSubscribeEmail = createAction('[SubscribeEmail] Subscribe Email!', props<{ templateForm: Event }>())

export const sendSubscribeEmailSuccess = createAction(
    '[SubscribeEmail]  Subscribe Email Success!',
    props<{
        success: string
    }>()
)
export const sendSubscribeEmailFailure = createAction(
    '[SubscribeEmail]  Subscribe Email Failure!',
    props<{ error: any }>()
)
// Success Status
export const deleteUserStatus = createAction('[Delete Success Status] Delete Success Status')
