import { Component } from '@angular/core'
import { FloatLabelModule } from 'primeng/floatlabel'
import { InputMaskModule } from 'primeng/inputmask'
import { SelectButtonModule } from 'primeng/selectbutton'
import { TreeSelectModule } from 'primeng/treeselect'
@Component({
    selector: 'app-sing-up-page',
    standalone: true,
    imports: [FloatLabelModule, InputMaskModule, SelectButtonModule, TreeSelectModule],
    templateUrl: './sing-up-page.component.html',
    styleUrl: './sing-up-page.component.scss'
})
export class SingUpPageComponent {}
