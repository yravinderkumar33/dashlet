import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { DataService } from '../../services';
import { IData, IReportType, InputParams, IBigNumberConfig, IBigNumber, ChartType, UpdateInputParams } from '../../types';
import { BaseComponent } from '../base/base.component';
import { DEFAULT_CONFIG as DEFAULT_CONFIG_TOKEN } from '../../tokens';
import { round, sumBy, toNumber } from 'lodash-es'
@Component({
  selector: 'sb-big-number',
  templateUrl: './big-number.component.html',
  styleUrls: ['./big-number.component.css'],
  providers: [
    {
      provide: DEFAULT_CONFIG_TOKEN,
      useValue: {
        header: '',
        footer: ''
      }
    }
  ]
})
export class BigNumberComponent extends BaseComponent implements IBigNumber, OnInit {

  config: any;
  data: IData;
  reportType: IReportType = IReportType.CHART;
  type: ChartType = ChartType.BIG_NUMBER;
  _defaultConfig: IBigNumberConfig;

  private _isInitialized: boolean = false;
  chart: IBigNumberConfig = {};

  constructor(protected dataService: DataService, @Inject(DEFAULT_CONFIG_TOKEN) defaultConfig: IBigNumberConfig, private cdr: ChangeDetectorRef) {
    super(dataService);
    this._defaultConfig = defaultConfig;
  }

  async initialize({ config, data, type = "bigNumber" }: InputParams): Promise<any> {
    if (!(config && data)) throw new SyntaxError('Missing Configuration');
    this.config = config = { ...config, type };
    const fetchedJSON = await this.fetchData(data).toPromise().catch(err => []);
    this.chartBuilder(config as IBigNumberConfig, fetchedJSON);
    this._isInitialized = true;
  }

  chartBuilder(config: IBigNumberConfig, JSONData) {
    const { header = this._defaultConfig.header, footer = this._defaultConfig.footer, dataExpr } = config;
    if (!dataExpr || !JSONData) {
      throw Error('Missing data');
    }
    const bigNumberObj = {
      header, footer,
      data: this.getSum(JSONData)(dataExpr)
    }
    this.setBigNumberData(bigNumberObj);
  }

  private getSum = data => key => (round(sumBy(data, val => toNumber(val[key])))).toLocaleString('hi-IN');

  private setBigNumberData(config: object) {
    this.chart = { ...this._defaultConfig, ...this.chart, ...config };
    this.cdr.detectChanges();
  }

  reset(): void {
    throw new Error('Method not implemented.');
  }

  destroy(): void {
    throw new Error('Method not implemented.');
  }

  update(input: UpdateInputParams) {
    if (!this._isInitialized) throw new Error('Chart is not initialized');
    if (!input) throw new Error('Missing input');
    const { config, data } = input;
    const { header, footer, dataExpr } = config as IBigNumberConfig;
    this.setBigNumberData({
      ...(header && { header }),
      ...(footer && { footer }),
      ...(dataExpr && data && {
        data: this.getSum(data)(dataExpr)
      })
    })
  }

  addData(data: object) {
    throw new Error('Method not implemented.');
  }

  refreshChart() {
    throw new Error('Method not implemented.');
  }
  getTelemetry() {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
  }

}
