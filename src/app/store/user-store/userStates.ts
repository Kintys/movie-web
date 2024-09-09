export interface User {
    userApiName?: string | null
    displayName?: string | null
    userEmail?: string | null
    userPhoto?: string | null
    accountId: string | null
    sessionId: string | null
    loginPopup: boolean
    subscribePopup: boolean
    error?: string | null
    success?: string | null
}
export const userState: User = {
    userApiName: null,
    displayName: null,
    userEmail: null,
    userPhoto: null,
    accountId: null,
    sessionId: null,
    loginPopup: false,
    subscribePopup: false
}
