
import { IChartBase } from './IChart';

export interface IBigNumberConfig {
  header?: string;
  footer?: string;
  dataExpr?: string;
  data?: number | string
}

export interface IBigNumber extends IChartBase {
  config: IBigNumberConfig;
  _defaultConfig: IBigNumberConfig
}


