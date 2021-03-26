import { Component, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'sb-chartjs',
  templateUrl: './chartjs.component.html',
  styleUrls: ['./chartjs.component.css']
})
export class ChartjsComponent implements OnInit {

  @Input() datasets;
  @Input() labels;
  @Input() plugins;
  @Input() colors;
  @Input() options;
  @Input() legend;
  @Input() chartType;
  @Output() chartHover;
  @Output() chartClick;

  constructor() { }

  ngOnInit(): void {
  }

  eventHandler(event, type) {
    switch (type) {
      case 'click': {
        this.chartClick.emit(event);
        break;
      }
      case 'hover': {
        this.chartClick.emit(event);
        break;
      }
    }
  }

}
