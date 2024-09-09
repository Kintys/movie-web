import { Component, OnInit } from '@angular/core'
import { FloatLabelModule } from 'primeng/floatlabel'
import { InputMaskModule } from 'primeng/inputmask'
import { SelectButtonModule } from 'primeng/selectbutton'
import { TreeSelectModule } from 'primeng/treeselect'
import { PasswordModule } from 'primeng/password'
import { ButtonModule } from 'primeng/button'

import { ControlKeys, InvalidTextObject } from '@/app/shared/type/sing-up'
import { CheckboxModule } from 'primeng/checkbox'
import { DialogModule } from 'primeng/dialog'
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component'
import {
    AbstractControl,
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    ValidationErrors,
    Validators
} from '@angular/forms'
@Component({
    selector: 'app-sing-up-page',
    standalone: true,
    imports: [
        FloatLabelModule,
        InputMaskModule,
        SelectButtonModule,
        TreeSelectModule,
        PasswordModule,
        ButtonModule,
        ReactiveFormsModule,
        CheckboxModule,
        DialogModule,
        PrivacyPolicyComponent
    ],
    templateUrl: './sing-up-page.component.html',
    styleUrl: './sing-up-page.component.scss'
})
export class SingUpPageComponent implements OnInit {
    isOpenPrivacyPolicyDialog: boolean = false
    singUpForm!: FormGroup
    invalidStatus!: InvalidTextObject
    isInvalid: boolean = false
    ngOnInit(): void {
        this.invalidStatus = {
            email: {
                textError: '',
                isShowErrorMassage: false
            },
            agreement: {
                textError: '',
                isShowErrorMassage: false
            },
            confirmPassword: {
                textError: '',
                isShowErrorMassage: false
            }
        }
        this.singUpForm = new FormGroup(
            {
                name: new FormControl(''),
                email: new FormControl('', [Validators.email, Validators.required]),
                password: new FormControl('', [
                    Validators.required,
                    Validators.pattern(
                        /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/
                    )
                ]),
                repeatPassword: new FormControl(''),
                phone: new FormControl(''),
                agreement: new FormControl(false, [Validators.requiredTrue])
            },
            { validators: this.customPasswordMatching.bind(this) }
        )
        this.singUpForm.valueChanges.subscribe(() => {
            this.updateErrorMessages()
        })
    }
    private customPasswordMatching(control: AbstractControl): ValidationErrors | null {
        const password = control.get('password')?.value
        const repeatPassword = control.get('repeatPassword')?.value
        return password === repeatPassword ? null : { passwordMismatchError: true }
    }

    private updateErrorMessages() {
        const controls: {
            control: AbstractControl<string> | null
            formObj?: ValidationErrors | null
            key: ControlKeys
            requiredMsg: string
            invalidMsg?: string
        }[] = [
            {
                control: this.singUpForm.get('email'),
                key: 'email',
                requiredMsg: 'Email is required',
                invalidMsg: 'Invalid email format'
            },
            { control: this.singUpForm.get('agreement'), key: 'agreement', requiredMsg: 'Agreement is required' },
            {
                control: null,
                formObj: this.singUpForm.errors,
                key: 'confirmPassword',
                requiredMsg: 'Passwords do not match'
            }
        ]
        for (const { control, key, requiredMsg, formObj, invalidMsg } of controls) {
            this.invalidStatus[key].textError = this.getErrorMessage(control, key, requiredMsg, formObj, invalidMsg)
        }
    }
    private getErrorMessage(
        control: AbstractControl<string> | null,
        key: ControlKeys,
        requiredMsg: string,
        formObj?: ValidationErrors | null,
        invalidMsg?: string
    ): string {
        if (control && control.errors) {
            if (
                (control.untouched && this.isInvalid) ||
                (control.touched && !control.dirty && this.isInvalid) ||
                (control.dirty && control.errors['required'])
            ) {
                this.invalidStatus[key].isShowErrorMassage = true
                return requiredMsg
            } else if (invalidMsg && control.errors['email'] && control.dirty) {
                this.invalidStatus[key].isShowErrorMassage = true
                return invalidMsg
            }
        }
        if (formObj && formObj['passwordMismatchError'] && this.isInvalid) {
            this.invalidStatus[key].isShowErrorMassage = true
            return requiredMsg
        }
        this.invalidStatus[key].isShowErrorMassage = false
        return ''
    }
    showAgreementDialog() {
        this.isOpenPrivacyPolicyDialog = true
    }
    onSubmit() {
        if (!this.singUpForm.valid) {
            this.showError()
            this.updateErrorMessages()
        } else {
            console.log('ok!')
        }
    }
    showError() {
        Object.keys(this.invalidStatus).forEach((key) => {
            if (key !== 'isInvalid') {
                this.invalidStatus[key as keyof InvalidTextObject].isShowErrorMassage = true
            }
        })
        this.isInvalid = true
    }
}
