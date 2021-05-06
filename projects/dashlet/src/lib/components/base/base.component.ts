import { EventEmitter } from '@angular/core';
import { DataService } from '../../services';
import { Observable, of } from 'rxjs';
import { InputParams, IBase, IData, ReportState, IReportType, UpdateInputParams } from '../../types';
import { tap } from 'rxjs/operators';
import { constants} from '../../tokens/constants';
export abstract class BaseComponent implements Partial<IBase> {

  constructor(protected dataService: DataService) { }

  height: string = "100%";
  width: string = "100%";
  id: string;
  state: EventEmitter<ReportState> = new EventEmitter();
  protected _isInitialized: boolean = false;

  data = [];
  abstract reportType: IReportType;
  abstract config: object;
  abstract _defaultConfig: object;

  abstract initialize(config: InputParams): Promise<any>
  abstract reset(): void;
  abstract destroy(): void;
  abstract update(config: UpdateInputParams);
  abstract addData(data: object);

  fetchData(config: IData): Observable<any[]> {
    const { values, location: { url, apiConfig = {} } = {} } = config;
    if (values) return of(values);
    let input = { url, ...apiConfig };
    this.state.emit(ReportState.PENDING);
    return this.dataService.fetchData(input).pipe(
      tap(_ => this.state.emit(ReportState.DONE))
    );
  }

  getConfigValue(key: string) {
    return this.config[key];
  }

  protected checkIfInitialized(): never | void {
    if (!this._isInitialized) {
      throw Error(constants.CHART_NOT_INITIALIZED);
    }
  }
}
