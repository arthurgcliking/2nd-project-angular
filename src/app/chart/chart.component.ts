import { Component, Input, ViewChild } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { Router } from '@angular/router';
import { ChartType, ChartData, ChartEvent } from 'chart.js';


@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent {
  @Input() chartData: ChartData<ChartType> | undefined;
  @Input() chartLabels: string[] = [];
  @Input() chartType: ChartType = 'pie';
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;


  constructor(private router: Router) {}

  ngAfterViewInit() {
    if (this.chart) {
      const chartInstance = this.chart.chart;
      // You can now use chartInstance for further operations
    }
  }

  onChartClick(event: any) {
    if (this.chartType === 'pie') {
      console.log('Chart clicked:', event);
      const chartEvent = event.event as ChartEvent;
      const activeElements = event.active;
      if (this.chart && activeElements.length > 0) {
        const countryName = this.chartLabels[activeElements[0].index];
        console.log('Chart labels:', this.chartLabels);
        console.log('Active element index:', activeElements[0].index);
        if (countryName) {
          console.log('Navigating to country:', countryName);
          this.router.navigate(['country', countryName]);
        } else {
          console.log('Country name is undefined');
        }
      } else {
        console.log('No active elements or chart is undefined');
      }
    }
  }
}
