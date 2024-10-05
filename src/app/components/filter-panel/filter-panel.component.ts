import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { CheckboxModule } from 'primeng/checkbox'
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'
import { IconFieldModule } from 'primeng/iconfield'
import { InputIconModule } from 'primeng/inputicon'
import { InputTextModule } from 'primeng/inputtext'
import { RadioButtonModule } from 'primeng/radiobutton'
import { DropdownModule } from 'primeng/dropdown'
import { ButtonModule } from 'primeng/button'
import { Store } from '@ngrx/store'
import { selectMovieGenre } from '@/app/store/movie-store/movieSelector'
import { AsyncPipe, CommonModule } from '@angular/common'
import { ClearObservable } from '@/app/shared/clearObserveble'
import { takeUntil } from 'rxjs'
import { Genre } from '@/app/shared/type/movie'
import { addFilterValue } from '@/app/store/movie-store/movieActions'
import { v4 as uuidv4 } from 'uuid'
import { movieDateModule } from '@/app/shared/type/filter'
@Component({
    selector: 'app-filter-panel',
    standalone: true,
    imports: [
        RadioButtonModule,
        DropdownModule,
        FormsModule,
        IconFieldModule,
        InputIconModule,
        InputTextModule,
        ButtonModule,
        AsyncPipe,
        ReactiveFormsModule,
        CommonModule,
        CheckboxModule
    ],
    templateUrl: './filter-panel.component.html',
    styleUrl: './filter-panel.component.scss'
})
export class FilterPanelComponent extends ClearObservable implements OnInit {
    @Output() searchText = new EventEmitter<string>()
    inputText?: string
    inputCheck!: FormControl
    isShowError: boolean = false
    inputErrorText: string = ''
    selectedData?: string
    movieDate?: movieDateModule[]
    chosenGenreCheckboxArr: Genre[] = []
    selectedMovieGenre$ = this.store.select(selectMovieGenre)
    cities?: { name: string; code: string }[]
    selectedCity: any
    // selectedFilterParams$ = this.store.select(selectFilterParams)
    constructor(private store: Store) {
        super()
    }
    ngOnInit(): void {
        // this.selectedFilterParams$.pipe(takeUntil(this.destroy$)).subscribe((val) => {
        //     if (val) this.chosenGenreCheckboxArr = val
        // })
        this.inputCheck = new FormControl('', [Validators.minLength(3)])
        this.inputCheck.valueChanges.subscribe((val) => this.getSearchText(val))

        this.movieDate = [
            {
                id: uuidv4(),
                name: '2024',
                value: '2024'
            },
            {
                id: uuidv4(),
                name: '2023',
                value: '2023'
            },
            {
                id: uuidv4(),
                name: '2022',
                value: '2022'
            },
            {
                id: uuidv4(),
                name: '2021',
                value: '2021'
            },
            {
                id: uuidv4(),
                name: '2020',
                value: '2020'
            },
            {
                id: uuidv4(),
                name: 'other',
                value: ''
            }
        ]
        this.cities = [
            { name: 'New York', code: 'NY' },
            { name: 'Rome', code: 'RM' },
            { name: 'London', code: 'LDN' },
            { name: 'Istanbul', code: 'IST' },
            { name: 'Paris', code: 'PRS' }
        ]

        this.selectedData = this.movieDate[0].value
    }
    onCategoryChange(chosenGenreCheckboxArr: Genre[]): void {
        console.log(chosenGenreCheckboxArr)
        // this.store.dispatch(addFilterValue({ filterValue: chosenGenreCheckboxArr }))
    }
    clearFilter() {
        this.onCategoryChange((this.chosenGenreCheckboxArr = []))
    }
    getSearchText(inputText: string) {
        if (!this.inputCheck.valid) {
            this.inputErrorText = 'You need to enter at least 3 characters.'
            this.isShowError = true
        } else {
            this.searchText.emit(inputText)
            this.inputErrorText = ''
            this.isShowError = false
        }
    }
}
