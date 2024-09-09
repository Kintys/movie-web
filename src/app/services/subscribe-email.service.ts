// import { environment } from '@/environments/environment.development'
// import { Injectable } from '@angular/core'
// import emailjs, { type EmailJSResponseStatus } from '@emailjs/browser'
// import { Observable, catchError, from, map, throwError } from 'rxjs'
// @Injectable({
//     providedIn: 'root'
// })
// export class SubscribeEmailService {
//     serviceKey: string = environment.emailServiceKey
//     templateKey: string = environment.emailTemplateKey
//     publicEmailKey: string = environment.emailPublicKey
//     constructor() {}
//     // Висилає лист на вказану електронну пошту
//     public sendEmail(formElement: Event): Observable<string> {
//         return from(
//             emailjs.sendForm(this.serviceKey, this.templateKey, formElement.target as HTMLFormElement, {
//                 publicKey: this.publicEmailKey
//             })
//         ).pipe(
//             map(() => {
//                 return 'You have successfully subscribed to our website!'
//             }),
//             catchError((error) => {
//                 return throwError(() => new Error((error as EmailJSResponseStatus).text))
//             })
//         )
//     }
// }
