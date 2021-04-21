import { Component, EventEmitter, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../services';
import { BaseChartDirective } from 'ng2-charts';
import { IData, InputParams, IReportType, IDataset, IChart } from '../../types';
import { BaseComponent } from '../base/base.component';
import { IChartOptions, ChartType } from '../../types';
import { get, groupBy, mapValues, sumBy } from 'lodash-es';
import { DEFAULT_CONFIG } from '../../tokens';
import defaultConfiguration from './defaultConfiguration'
@Component({
  selector: 'sb-chart-js',
  templateUrl: './chart-js.component.html',
  styleUrls: ['./chart-js.component.css'],
  providers: [
    {
      provide: DEFAULT_CONFIG,
      useValue: defaultConfiguration
    }
  ]
})
export class ChartJsComponent extends BaseComponent implements IChart, OnInit, OnDestroy {

  @ViewChild(BaseChartDirective) baseChartDirective: BaseChartDirective;
  readonly reportType: IReportType = IReportType.CHART;
  data: IData;

  _defaultConfig: Partial<IChartOptions>;
  config: Partial<IChartOptions>;
  type: ChartType;
  _isInitialized: boolean = false;

  public chartData: Partial<IChartOptions> = {};
  _labelsAndDatasetsClosure: any;

  constructor(protected dataService: DataService, @Inject(DEFAULT_CONFIG) defaultConfig: object) {
    super(dataService);
    this._defaultConfig = defaultConfig;
  }
  chartClick: EventEmitter<any>;
  chartHover: EventEmitter<any>;

  async initialize({ config, type, data }: InputParams): Promise<any> {
    if (!(config && type && data)) throw new SyntaxError('Missing Configuration');
    this.config = config = { ...config, type };
    const fetchedJSON = await this.fetchData(data).toPromise().catch(err => []);
    this.chartBuilder(config, fetchedJSON);
    this._isInitialized = true;
  }

  private getLabelsAndDatasetsClosure(labelExpr: string) {
    return (data: object[]) => {
      const groupedDataBasedOnLabelExpr = groupBy(data, val => {
        const value = get(val, labelExpr);
        return value && typeof value === 'string' ? value.toLowerCase().trim() : '';
      });
      return {
        getLabels: () => Object.keys(groupedDataBasedOnLabelExpr),
        getDatasets: (datasets: IDataset[]) => {
          return datasets.map(dataset => {
            return {
              ...dataset,
              ...(dataset.dataExpr && {
                data: Object.values(mapValues(groupedDataBasedOnLabelExpr, rows => sumBy(rows, row => +(row[dataset.dataExpr] || 0))))
              })
            }
          })
        }
      }
    }
  }


  chartBuilder(config: Partial<IChartOptions>, data) {
    let { labels = [], labelExpr = null, type = null, legend = true, colors = [], datasets = [], options = {}, ...others } = config;
    options = { ...others, ...options };
    if (labelExpr) {
      this._labelsAndDatasetsClosure = this.getLabelsAndDatasetsClosure(labelExpr)
      const { getLabels, getDatasets } = this._labelsAndDatasetsClosure(data);
      labels = getLabels(); datasets = getDatasets(datasets);
    }
    this.setChartData({ labels, datasets, options, type, legend, colors });
  }

  ngOnInit(): void {}

  private setChartData(config: Partial<IChartOptions>) {
    this.chartData = { ...this._defaultConfig, ...this.chartData, ...config };
  }

  reset(): void {
    // throw new Error('Method not implemented.');
  }

  destroy(): void {
    this.baseChartDirective.chart.destroy();
  }

  ngOnDestroy() {
    this.destroy();
  }

  /**
   * @description updates the type, data or Dashlet configuration
   * @param {InputParams} input
   * @memberof ChartJsComponent
   */
  update(input: InputParams) {
    if (!this._isInitialized) this.chartNotInitialized();
    if (!input) throw new Error('Provide valid input');
    const { type = null, config = {}, data = null } = input;
    let labels, datasets;
    if (data) {
      const { getLabels, getDatasets } = this._labelsAndDatasetsClosure(data);
      labels = getLabels(), datasets = getDatasets(this.config.datasets);
    }
    this.setChartData({ ...config, ...(type && { type }), ...(labels && datasets && { labels, datasets }) });
    this.baseChartDirective.update();
  }

  addData(data: object) {
    if (!this._isInitialized) this.chartNotInitialized();
    if (!data) throw new Error('provide valid object');
    const { getLabels, getDatasets } = this._labelsAndDatasetsClosure([data]);
    const labels = getLabels(), datasets = getDatasets(this.config.datasets);
    //TODO re work required
  }

  chartNotInitialized(): never {
    throw Error('Chart is not initialized');
  }

  refreshChart() {
    throw new Error('Method not implemented.');
  }

  removeData();
  removeData(label: string);
  removeData(label?: any) {
    throw new Error('Method not implemented.');
  }

  getTelemetry() {
    throw new Error('Method not implemented.');
  }

  getCurrentSelection() {
    throw new Error('Method not implemented.');
  }

  getDatasetAtIndex(index: number) {
    throw new Error('Method not implemented.');
  }

}
