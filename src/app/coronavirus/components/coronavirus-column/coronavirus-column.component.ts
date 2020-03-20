import { Component, OnInit, Input, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexLegend,
  ApexStroke,
  ApexXAxis,
  ApexFill,
  ApexTooltip
} from 'ng-apexcharts';

export interface ChartOptions {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
}

@Component({
  selector: 'app-coronavirus-column',
  templateUrl: './coronavirus-column.component.html',
  styleUrls: ['./coronavirus-column.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoronavirusColumnComponent implements OnInit {

  @Input() data;
  @ViewChild('chart') chart: ChartComponent;

  chartOptions: Partial<ChartOptions>;
  chinaConfirmed: number[] = [];
  otherConfirmed: number[] = [];
  dates: string[] = [];

  constructor() { }

  ngOnInit(): void {
    this.initDatas();
    this.initChart();
  }

  private initChart(): void {
    this.chartOptions = {
      series: [
        {
          name: 'Chine',
          data: this.chinaConfirmed
        },
        {
          name: 'Reste du monde',
          data: this.otherConfirmed
        }
      ],
      chart: {
        type: 'bar',
        height: 'auto',
        toolbar: {
          show: false
        }
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          endingShape: 'rounded'
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
      },
      xaxis: {
        categories: this.dates
      },
      yaxis: {
        title: {
          text: 'Nombre de cas'
        }
      },
      fill: {
        opacity: 1
      }
    };
  }

  private initDatas(): void {
    this.data.forEach((element, index) => {
      if (this.data.length - index < 15) {
        this.chinaConfirmed.push(element.mainlandChina);
        this.dates.push(element.reportDateString);
        this.otherConfirmed.push(element.otherLocations);
      }
    });
  }

}