// import { createReducer, on } from '@ngrx/store'
// import { userState } from './userStates'
// import {
//     closeLoginPopup,
//     closeSubscribePopup,
//     createAccountWithPassAndEmailFailure,
//     createAccountWithPassAndEmailSuccess,
//     deleteUserAndAccId,
//     loadAccountFailure,
//     loadAccountSuccess,
//     loadAccountWithPassAndEmailFailure,
//     loadAccountWithPassAndEmailSuccess,
//     openLoginPopup,
//     openSubscribePopup,
//     sendSubscribeEmailFailure,
//     sendSubscribeEmailSuccess
// } from './userActions'
// import { deleteMovieStatus } from '../movie-store/movieActions'
// export const UserReducers = createReducer(
//     userState,
//     // google
//     on(
//         loadAccountSuccess,
//         (state, { accountId, success, userApiName, userEmail, userPhoto, displayName, sessionId, loginPopup }) => {
//             return {
//                 ...state,
//                 userApiName: userApiName,
//                 displayName: displayName,
//                 userEmail: userEmail,
//                 userPhoto: userPhoto,
//                 accountId: accountId,
//                 sessionId: sessionId,
//                 loginPopup: loginPopup,
//                 success: success
//             }
//         }
//     ),
//     on(loadAccountFailure, (state, { error }) => {
//         return {
//             ...state,
//             error: error
//         }
//     }),
//     // pass and email
//     on(
//         loadAccountWithPassAndEmailSuccess,
//         (state, { accountId, success, userApiName, userEmail, sessionId, loginPopup }) => {
//             return {
//                 ...state,
//                 userApiName: userApiName,
//                 userEmail: userEmail,
//                 accountId: accountId,
//                 sessionId: sessionId,
//                 loginPopup: loginPopup,
//                 success: success
//             }
//         }
//     ),
//     on(loadAccountWithPassAndEmailFailure, (state, { error }) => {
//         return {
//             ...state,
//             error: error
//         }
//     }),
//     //===========================================================

//     on(
//         createAccountWithPassAndEmailSuccess,
//         (state, { accountId, success, userApiName, userEmail, sessionId, loginPopup }) => {
//             return {
//                 ...state,
//                 userApiName: userApiName,
//                 userEmail: userEmail,
//                 accountId: accountId,
//                 sessionId: sessionId,
//                 loginPopup: loginPopup,
//                 success: success
//             }
//         }
//     ),
//     //===========================================================

//     on(createAccountWithPassAndEmailFailure, (state, { error }) => {
//         return {
//             ...state,
//             error: error
//         }
//     }),
//     //===========================================================
//     on(sendSubscribeEmailSuccess, (state, { success }) => {
//         return {
//             ...state,
//             success: success
//         }
//     }),
//     on(sendSubscribeEmailFailure, (state, { error }) => {
//         return {
//             ...state,
//             error: error
//         }
//     }),
//     //===========================================================

//     on(openLoginPopup, (state, { loginPopup }) => {
//         return {
//             ...state,
//             loginPopup: loginPopup
//         }
//     }),
//     on(closeLoginPopup, (state, { loginPopup }) => {
//         return {
//             ...state,
//             loginPopup: loginPopup
//         }
//     }),
//     //===========================================================
//     on(openSubscribePopup, (state, { subscribePopup }) => {
//         return {
//             ...state,
//             subscribePopup: subscribePopup
//         }
//     }),
//     on(closeSubscribePopup, (state, { subscribePopup }) => {
//         return {
//             ...state,
//             subscribePopup: subscribePopup
//         }
//     }),
//     //===========================================================

//     on(deleteUserAndAccId, (state) => {
//         return {
//             ...state,
//             userApiName: null,
//             displayName: null,
//             userEmail: null,
//             userPhoto: null,
//             accountId: null,
//             sessionId: null,
//             loginPopup: false,
//             success: null
//         }
//     }),
//     //success status
//     on(deleteMovieStatus, (state) => {
//         return {
//             ...state,
//             error: null,
//             success: null
//         }
//     })
// )
