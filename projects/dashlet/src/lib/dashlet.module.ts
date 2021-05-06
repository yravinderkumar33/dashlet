import { NgModule } from '@angular/core';
import { DashletComponent, ChartJsComponent, BigNumberComponent, DtTableComponent } from './components';
import { ReportWrapperDirective } from './directives';
import { HttpClientModule } from '@angular/common/http'
import { ChartsModule } from 'ng2-charts'
import { CommonModule } from '@angular/common';
@NgModule({
  declarations: [ChartJsComponent, DashletComponent, ReportWrapperDirective, BigNumberComponent, DtTableComponent],
  imports: [HttpClientModule, ChartsModule, CommonModule],
  exports: [DashletComponent],
  entryComponents: [ChartJsComponent, BigNumberComponent, DtTableComponent]
})
export class DashletModule { }
