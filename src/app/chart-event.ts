import { ChartEvent } from 'chart.js';

export interface ChartClickEvent extends ChartEvent {
  active: any[];
}
