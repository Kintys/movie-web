import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { CheckboxModule } from 'primeng/checkbox'
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'
import { IconFieldModule } from 'primeng/iconfield'
import { InputIconModule } from 'primeng/inputicon'
import { InputTextModule } from 'primeng/inputtext'
import { RadioButtonModule } from 'primeng/radiobutton'
import { DropdownModule } from 'primeng/dropdown'
import { ButtonModule } from 'primeng/button'
import { Store } from '@ngrx/store'
import { selectAllMovieList, selectMovieGenre } from '@/app/store/movie-store/movieSelector'
import { AsyncPipe, CommonModule } from '@angular/common'
import { ClearObservable } from '@/app/shared/clearObserveble'
import { findMovieWithSearchText, loadMovieListWithFilterParams } from '@/app/store/movie-store/movieActions'
import { v4 as uuidv4 } from 'uuid'
import { movieDateModule } from '@/app/shared/type/filter'
import { PrefixUrlPipe } from '@/app/shared/pipes/prefix-url/prefix-url.pipe'
import { takeUntil } from 'rxjs'
import { MovieCardComponent } from '../movie-card/movie-card.component'
import { ImageModule } from 'primeng/image'
import { RatingModule } from 'primeng/rating'
import { RatingPipe } from '../../shared/pipes/movie-rating/rating.pipe'
@Component({
    selector: 'app-filter-panel',
    standalone: true,
    imports: [
        RatingModule,
        ImageModule,
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
        CheckboxModule,
        PrefixUrlPipe,
        MovieCardComponent,
        RatingPipe
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
    radioButtonMovieDate?: movieDateModule[]
    dropdownSort?: { name: string; code: string }[]
    selectedMovieList$ = this.store.select(selectAllMovieList)
    selectedMovieGenre$ = this.store.select(selectMovieGenre)
    filterForms!: FormGroup
    constructor(private store: Store) {
        super()
    }
    ngOnInit(): void {
        this.radioButtonMovieDate = [
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
        this.dropdownSort = [
            { name: 'popular up', code: 'popularity.desc' },
            { name: 'popular down', code: 'popularity.asc' },
            { name: 'title first', code: 'title.desc' },
            { name: 'title last', code: 'title.asc' },
            { name: 'rating up', code: 'vote_average.desc' },
            { name: 'rating down', code: 'vote_average.asc' }
        ]
        this.inputCheck = new FormControl('', [Validators.minLength(3)])
        this.inputCheck.valueChanges.subscribe((val) => this.getSearchText(val))
        this.filterForms = new FormGroup({
            chooseSortParams: new FormControl<string>(this.dropdownSort[0].code),
            chooseYearParams: new FormControl<string>(
                this.radioButtonMovieDate[this.radioButtonMovieDate.length - 1].value
            ),
            chooseGenreParams: new FormControl<string[]>([])
        })
        this.filterForms.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((val) => {
            this.store.dispatch(
                loadMovieListWithFilterParams({
                    filterParams: {
                        sort: val.chooseSortParams,
                        year: val.chooseYearParams,
                        genre: val.chooseGenreParams
                    }
                })
            )
        })
    }

    clearFilter() {
        // ;(this.filterForms.value.chooseSortParams = ''),
        //     (this.filterForms.value.chooseYearParams = ''),
        //     (this.filterForms.value.chooseGenreParams = [])
    }
    getSearchText(inputText: string) {
        if (!this.inputCheck.valid) {
            this.inputErrorText = 'You need to enter at least 3 characters.'
            this.isShowError = true
        } else {
            this.store.dispatch(
                findMovieWithSearchText({
                    searchText: inputText
                })
            )
            // this.searchText.emit(inputText)
            this.inputErrorText = ''
            this.isShowError = false
        }
    }
}
