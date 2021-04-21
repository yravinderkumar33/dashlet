import { NgModule } from '@angular/core';
import { DashletComponent, ChartJsComponent, BigNumberComponent } from './components';
import { ReportWrapperDirective } from './directives';
import { HttpClientModule } from '@angular/common/http'
import { ChartsModule } from 'ng2-charts'
import { CommonModule } from '@angular/common';
@NgModule({
  declarations: [ChartJsComponent, DashletComponent, ReportWrapperDirective, BigNumberComponent],
  imports: [HttpClientModule, ChartsModule, CommonModule],
  exports: [DashletComponent]
})
export class DashletModule { }
