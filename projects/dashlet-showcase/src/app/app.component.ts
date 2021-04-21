import { Component } from '@angular/core';
import { IBigNumberConfig } from 'dashlet';
import { data } from './data';

@Component({
  selector: 'sb-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'dashlet-showcase';

  type = "line";

  config2 = {
    labelExpr: 'District',
    datasets: [
      { dataExpr: 'Total Plays', label: 'Total Plays' },
      { dataExpr: 'Total Devices', label: 'Total Devices' },
      { dataExpr: 'New Devices', label: 'New Devices' }
    ],
    options: {
      title: {
        text: `Device Metrics`,
        display: true,
        fontSize: 20
      }
    }
  };

  data = {
    values: data
  };

  dtOptions = {
    data: data,
    info: false,
    columns: [{
      title: 'Districts',
      data: 'District'
    },
    {
      title: 'Total Devices',
      data: 'Total Devices'
    }, {
      title: 'New Devices',
      data: 'New Devices'
    }, {
      title: 'Goal of Devices',
      data: 'Goal of Devices'
    },
    {
      title: 'Content Plays Goal',
      data: 'Goal of content plays'
    }]
  };


  bigNumberConfig: IBigNumberConfig = {
    header: 'Total Device Count',
    footer: 'Uttar Pradesh',
    dataExpr: 'Total Devices'
  }

  constructor() { }
}
