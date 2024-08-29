import { Component } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css'
})
export class ReportsComponent {

  pieChartData: ChartData<'pie', number[], string> = {
    labels: ['Ventas', 'Compras', 'Ganancias'],
    datasets: [
      {
        data: [500, 300, 200],
      },
    ],
  };

  pieChartType: ChartType = 'pie';
}
