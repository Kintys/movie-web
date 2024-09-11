import { MovieAPIService } from '@/app/services/movie-api.service';
import { loadMoviesListWithCat } from '@/app/store/movie-store/movieActions';
import { selectCategoryType } from '@/app/store/movie-store/movieSelector';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MainBannerSectionComponent } from './components/main-banner-section/main-banner-section.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [MainBannerSectionComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent implements OnInit {
  selectedCat$!: Observable<any>;
  constructor(
    private readonly store: Store,
    private service: MovieAPIService
  ) {}
  ngOnInit(): void {
    // this.selectedCat$ = this.store.select(selectCategoryType);
    // this.selectedCat$.subscribe((val) => {
    //   this.store.dispatch(loadMoviesListWithCat({ category: val.nowPlaying }));
    // });
    // this.service.getMovieListWitCat(val.now_playing).subscribe((val) => console.log(val))
  }
}
