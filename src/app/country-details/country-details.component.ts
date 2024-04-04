import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OlympicCountry } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { ChartData, ChartType } from 'chart.js';

@Component({
  selector: 'app-country-details',
  templateUrl: './country-details.component.html',
  styleUrls: ['./country-details.component.scss'],
})
export class CountryDetailsComponent implements OnInit {
  countryData: OlympicCountry | undefined;
  totalMedalsWon: number = 0;
  totalAthletesEntered: number = 0;
  medalsByEditionChartData: ChartData<'line'> | undefined;
  medalsByEditionChartLabels: string[] = [];

  constructor(private route: ActivatedRoute, private olympicService: OlympicService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const countryName = params.get('name');
      if (countryName) {
        this.olympicService.getOlympics().subscribe((data) => {
          if (data) {
            this.countryData = data.find((country) => country.country === countryName);
            if (this.countryData) {
              this.totalMedalsWon = this.countryData.participations.reduce(
                (total, participation) => total + participation.medalsCount,
                0
              );
              this.totalAthletesEntered = this.countryData.participations.reduce(
                (total, participation) => total + participation.athleteCount,
                0
              );
              this.medalsByEditionChartLabels = this.countryData.participations.map(
                (participation) => `${participation.year}`
              );
              this.medalsByEditionChartData = {
                labels: this.medalsByEditionChartLabels,
                datasets: [
                  {
                    label: 'Medals',
                    data: this.countryData.participations.map((participation) => participation.medalsCount),
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                    fill: false,
                    tension: 0.1,
                  },
                ],
              };
            }
          }
        });
      }
    });
  }
}
