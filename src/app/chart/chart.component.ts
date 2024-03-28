import { Component, Input } from '@angular/core';
import { ChartType, ChartData } from 'chart.js';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent {
  @Input() chartData: ChartData<'pie'> = {
    labels: [],
    datasets: [],
  };
  @Input() chartLabels: string[] = [];

  public chartType: ChartType = 'pie';

  constructor() {}
}
