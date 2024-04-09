import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, of } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { OlympicCountry } from 'src/app/core/models/Olympic';
import { ChartDataService } from 'src/app/core/services/chart-data.service';
import { ChartData } from 'chart.js';
import { OlympicError } from 'src/app/core/errors/olympic-error';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();

  errorMessage: string | null = null;

  public olympics$: Observable<OlympicCountry[] | null | undefined> = of(null);
  public chartData: ChartData<'pie'> = {
    labels: [],
    datasets: [],
  };
  public chartLabels: string[] = [];
  public olympicGamesCount: number = 0;

  constructor(
    private olympicService: OlympicService,
    private chartDataService: ChartDataService
  ) {}

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();
    this.olympics$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (data) => {
          if (data) {
            this.chartData = {
              labels: this.chartDataService.getChartData(data).map((item) => item.name),
              datasets: [
                {
                  data: this.chartDataService.getChartData(data).map((item) => item.value),
                  backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
                  label: 'Medals',
                },
              ],
            };
            this.chartLabels = this.chartData.labels as string[];
            this.olympicGamesCount = this.getOlympicGamesCount(data);
          }
        },
        (error: OlympicError) => {
          this.errorMessage = error.message;
        }
      );
  }

  getOlympicGamesCount(data: OlympicCountry[]): number {
    const uniqueYears = new Set<number>();

    data.forEach((country) => {
      country.participations.forEach((participation) => {
        uniqueYears.add(participation.year);
      });
    });

    return uniqueYears.size;
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
