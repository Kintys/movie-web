import { ClearObservable } from '@/app/shared/clearObserveble'
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core'

import { Router } from '@angular/router'
import { ButtonModule } from 'primeng/button'
import { DialogModule } from 'primeng/dialog'
import { FloatLabelModule } from 'primeng/floatlabel'
import { ImageModule } from 'primeng/image'
import { InputTextModule } from 'primeng/inputtext'
import { takeUntil } from 'rxjs'

@Component({
    selector: 'app-login-popup',
    standalone: true,
    imports: [
        DialogModule,
        ImageModule,
        FloatLabelModule,
        ButtonModule,
        FormsModule,
        InputTextModule,
        ReactiveFormsModule
    ],
    templateUrl: './login-popup.component.html',
    styleUrl: './login-popup.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginPopupComponent extends ClearObservable implements OnInit {
    @Input() openDialog: boolean = false
    @Output() closeDialog = new EventEmitter<boolean>()
    logForm!: FormGroup
    error: boolean = false
    isInvalid: boolean = false
    emailErrorText: string = ''
    passwordErrorText: string = ''
    constructor(private router: Router) {
        super()
    }
    ngOnInit(): void {
        this.logForm = new FormGroup({
            email: new FormControl('', [Validators.email, Validators.required]),
            password: new FormControl('', [Validators.required])
        })
        this.logForm.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => {
            this.updateErrorMessages()
        })
    }

    private updateErrorMessages() {
        const emailControl = this.logForm.get('email')
        const passwordControl = this.logForm.get('password')
        if (emailControl && emailControl.errors) {
            if (
                (emailControl.untouched && this.isInvalid) ||
                (emailControl.touched && !emailControl.dirty && this.isInvalid) ||
                (emailControl.dirty && emailControl.errors['required'])
            ) {
                this.emailErrorText = 'Email is required'
            } else if (emailControl.errors['email']) {
                this.emailErrorText = 'Invalid email format'
            }
        } else {
            this.emailErrorText = ''
        }
        if (passwordControl && passwordControl.errors) {
            if (
                (passwordControl.untouched && this.isInvalid) ||
                (passwordControl.touched && !passwordControl.dirty && this.isInvalid) ||
                (passwordControl.dirty && passwordControl.errors['required'])
            ) {
                this.passwordErrorText = 'Password is required'
            }
        } else {
            this.passwordErrorText = ''
        }
    }
    onSubmit() {
        if (!this.logForm.valid) {
            this.error = true
            this.isInvalid = true
            this.updateErrorMessages()
        }
    }
    onClosePopup() {
        this.closeDialog.emit(false)
        this.error = false
    }
    goToSingUpPage() {
        this.onClosePopup()
        this.router.navigate(['/singUp'])
    }
}
