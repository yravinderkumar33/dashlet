import { EventEmitter } from "@angular/core";

export enum IReportType {
  CHART = "chart",
  TABLE = "table"
}

export type InputParams = {
  type: string;
  config: object;
  data: IData
}

export enum ReportState {
  PENDING = "pending",
  DONE = "done"
}
export interface IBase {
  reportType: IReportType;
  readonly _defaultConfig: object;
  height: string;
  width: string;
  id: string;
  config: object;
  data: IData;
  state: EventEmitter<ReportState>;
  initialize(config: InputParams): void;
  reset(): void;
  destroy(): void;
  update(input: InputParams);
  fetchData(config: IData);
}

export type methodType = "GET" | "POST";
export interface IApiConfig {
  url: string;
  body: object | null;
  headers?: {
    [header: string]: string | string[];
  };
  methodType: methodType;
  params?: {
    [param: string]: string | string[];
  };
  response: {
    path: string;
  }
}
export interface IDataSchema {
  type: string,
  enum?: string[],
  default?: string,
  format?: string;
  items?: IDataSchema
}
export interface IData {
  values?: unknown[];
  location?: {
    apiConfig?: IApiConfig;
    url?: string;
  },
  dataSchema?: {
    [key: string]: IDataSchema;
  }
}
export interface IFilterConfig {
  reference: string;
  label: string;
  placeholder: string;
  controlType: "single-select" | "multi-select" | "date";
  searchable?: boolean;
  filters: IFilterConfig[];
  default?: string;
}
