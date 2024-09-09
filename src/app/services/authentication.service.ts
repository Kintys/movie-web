// import { environment } from '@/environments/environment.development'
// import { HttpClient } from '@angular/common/http'
// import { Injectable, inject } from '@angular/core'
// import { SessionModule, TokenModule } from '../shared/type-declorate'
// import { Observable, forkJoin, from, of, switchMap } from 'rxjs'
// import {
//     Auth,
//     signInWithPopup,
//     GoogleAuthProvider,
//     createUserWithEmailAndPassword,
//     signInWithEmailAndPassword
// } from '@angular/fire/auth'

// @Injectable({
//     providedIn: 'root'
// })
// export class AuthenticationService {
//     readonly apiKey = environment.apiKey
//     readonly apiUrl = environment.apiUrl
//     readonly apiToken = environment.apiToken
//     readonly userName = environment.userName
//     readonly userPass = environment.userPassword
//     private auth: Auth = inject(Auth)
//     constructor(private http: HttpClient) {}
//     public createNewSession() {
//         return this.http.get<TokenModule>(`${this.apiUrl}authentication/token/new${this.apiKey}`).pipe(
//             switchMap((tokenRes) => {
//                 return this.http.post<TokenModule>(
//                     `${this.apiUrl}authentication/token/validate_with_login${this.apiKey}`,
//                     {
//                         username: this.userName,
//                         password: this.userPass,
//                         request_token: tokenRes.request_token
//                     }
//                 )
//             }),
//             switchMap((validRes) => {
//                 return this.http
//                     .post<SessionModule>(`${this.apiUrl}authentication/session/new${this.apiKey}`, {
//                         request_token: validRes.request_token
//                     })
//                     .pipe(
//                         switchMap((sessionId) => {
//                             return forkJoin({
//                                 sessionId: of(sessionId.session_id),
//                                 accountInfo: this.http.get<any>(
//                                     `${this.apiUrl}account${this.apiKey}&session_id=${sessionId.session_id}`
//                                 )
//                             })
//                         })
//                     )
//             })
//         )
//     }
//     singInWithGoogle(): Observable<any> {
//         return from(signInWithPopup(this.auth, new GoogleAuthProvider()))
//     }
//     createNewUser(email: string, password: string): Observable<any> {
//         return from(createUserWithEmailAndPassword(this.auth, email, password))
//     }
//     logIn(email: string, password: string): Observable<any> {
//         return from(signInWithEmailAndPassword(this.auth, email, password))
//     }
// }
