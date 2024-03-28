import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { OlympicCountry } from 'src/app/core/models/Olympic';
import { ChartDataService } from 'src/app/core/services/chart-data.service';
import { ChartType, ChartData } from 'chart.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public olympics$: Observable<OlympicCountry[] | null | undefined> = of(null); // Assign an initial value
  public chartData: ChartData<'pie'> = {
    labels: [],
    datasets: [],
  };
  public chartLabels: string[] = [];
  public olympicGamesCount: number = 0;

  constructor(private olympicService: OlympicService, private chartDataService: ChartDataService) {}

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics(); // Assign the observable directly
    this.olympics$.subscribe((data) => {
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
        this.olympicGamesCount = this.getOlympicGamesCount(data);
      }
    });
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
}
