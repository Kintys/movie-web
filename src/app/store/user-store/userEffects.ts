import { Actions, createEffect, ofType } from '@ngrx/effects'
import { Injectable } from '@angular/core'
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators'
import { forkJoin, of } from 'rxjs'
import { AuthenticationService } from '@/app/services/authentication.service'
import {
    loginWithGoogle,
    loadAccountSuccess,
    loadAccountFailure,
    loginWithEmailAndPass,
    loadAccountWithPassAndEmailSuccess,
    loadAccountWithPassAndEmailFailure,
    createAccountWithPassAndEmail,
    createAccountWithPassAndEmailSuccess,
    createAccountWithPassAndEmailFailure,
    sendSubscribeEmail,
    sendSubscribeEmailSuccess,
    sendSubscribeEmailFailure
} from './userActions'
import { SubscribeEmailService } from '@/app/services/subscribe-email.service'

@Injectable()
export class UserEffect {
    loginWithGoogle$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loginWithGoogle),
            switchMap(() =>
                forkJoin([this.authenticationAPI.singInWithGoogle(), this.authenticationAPI.createNewSession()]).pipe(
                    map(([userCredentialImp, apiUserObj]) =>
                        loadAccountSuccess({
                            accountId: apiUserObj.accountInfo.id,
                            userApiName: apiUserObj.accountInfo.username,
                            displayName: userCredentialImp.user.displayName,
                            userEmail: userCredentialImp.user.email,
                            userPhoto: userCredentialImp.user.photoURL,
                            sessionId: apiUserObj.sessionId,
                            loginPopup: false,
                            success: `Welcome `
                        })
                    ),
                    catchError((error) => of(loadAccountFailure({ error: error })))
                )
            )
        )
    )
    loginWithEmailAndPass$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loginWithEmailAndPass),
            switchMap((props) =>
                forkJoin([
                    this.authenticationAPI.logIn(props.email, props.password),
                    this.authenticationAPI.createNewSession()
                ]).pipe(
                    map(([userCredentialImp, apiUserObj]) => {
                        console.log(userCredentialImp)
                        return loadAccountWithPassAndEmailSuccess({
                            accountId: apiUserObj.accountInfo.id,
                            userApiName: apiUserObj.accountInfo.username,
                            userEmail: userCredentialImp.user.email,
                            sessionId: apiUserObj.sessionId,
                            loginPopup: false,
                            success: `Welcome`
                        })
                    }),
                    catchError((error) => of(loadAccountWithPassAndEmailFailure({ error: error })))
                )
            )
        )
    )
    createAccountWithPassAndEmail$ = createEffect(() =>
        this.actions$.pipe(
            ofType(createAccountWithPassAndEmail),
            switchMap((props) =>
                forkJoin([
                    this.authenticationAPI.createNewUser(props.email, props.password),
                    this.authenticationAPI.createNewSession()
                ]).pipe(
                    map(([userCredentialImp, apiUserObj]) =>
                        createAccountWithPassAndEmailSuccess({
                            accountId: apiUserObj.accountInfo.id,
                            userApiName: apiUserObj.accountInfo.username,
                            userEmail: userCredentialImp.user.email,
                            sessionId: apiUserObj.sessionId,
                            loginPopup: false,
                            success: `Welcome`
                        })
                    ),
                    catchError((error) => of(createAccountWithPassAndEmailFailure({ error: error })))
                )
            )
        )
    )
    sendSubscribeEmail$ = createEffect(() =>
        this.actions$.pipe(
            ofType(sendSubscribeEmail),
            mergeMap((props) => {
                return this.emailService.sendEmail(props.templateForm).pipe(
                    map((msg) => sendSubscribeEmailSuccess({ success: msg })),
                    catchError((error) => of(sendSubscribeEmailFailure({ error })))
                )
            })
        )
    )
    constructor(
        private actions$: Actions,
        private authenticationAPI: AuthenticationService,
        private emailService: SubscribeEmailService
    ) {}
}
