import { Injectable } from '@angular/core';
import { OlympicCountry } from '../models/Olympic';

interface ChartDataItem {
  name: string;
  value: number;
}

@Injectable({
  providedIn: 'root',
})
export class ChartDataService {
  constructor() {}

  getChartData(olympicData: OlympicCountry[] | null | undefined): ChartDataItem[] {
    if (!olympicData) {
      return [];
    }
    return olympicData.map((country) => ({
      name: country.country,
      value: country.participations.reduce((total, participation) => total + participation.medalsCount, 0),
    }));
  }
}
