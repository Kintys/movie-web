import { Component } from '@angular/core'
import { DialogModule } from 'primeng/dialog'
import { ImageModule } from 'primeng/image'
import { FloatLabelModule } from 'primeng/floatlabel'
import { ButtonModule } from 'primeng/button'
import { FormsModule } from '@angular/forms'
import { InputTextModule } from 'primeng/inputtext'
@Component({
    selector: 'app-login-popup',
    standalone: true,
    imports: [DialogModule, ImageModule, FloatLabelModule, ButtonModule, FormsModule, InputTextModule],
    templateUrl: './login-popup.component.html',
    styleUrl: './login-popup.component.scss'
})
export class LoginPopupComponent {
    open: boolean = true
    error: boolean = false
    value: string | undefined
}
