import { Component } from '@angular/core'
import { RouterLink } from '@angular/router'
import { ButtonModule } from 'primeng/button'
import { ImageModule } from 'primeng/image'
import { IconFieldModule } from 'primeng/iconfield'
import { InputIconModule } from 'primeng/inputicon'
import { InputTextModule } from 'primeng/inputtext'

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [RouterLink, ButtonModule, ImageModule, IconFieldModule, InputIconModule, InputTextModule],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class HeaderComponent {
    // function forEach(arr, function){
    //  for (let index = 0; index < arr.length; index++) {
    //     let element = array[index]; //копия елемента
    //     let index= index // номер індексу
    //     let baseArr =someArr // посилання на масив
    //     function() // фукція в яку ми передаємо всі ці значення
    // }
    // }
    // forEach(someArr, (element, index , baseArr)=> //щось робимо
    // )
}
