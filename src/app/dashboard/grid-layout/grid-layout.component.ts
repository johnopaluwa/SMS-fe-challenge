import { Component, OnInit } from '@angular/core';
import { process, State } from '@progress/kendo-data-query';

import { ApiService } from '../../services/api.service';
import { Response } from 'src/app/models/Response';

import { IntlService } from '@progress/kendo-angular-intl';
import {
  GridDataResult,
  DataStateChangeEvent
} from '@progress/kendo-angular-grid';

@Component({
  selector: 'app-grid-layout',
  templateUrl: './grid-layout.component.html',
  styleUrls: ['./grid-layout.component.css']
})
export class GridLayoutComponent implements OnInit {

  private gridData: GridDataResult;
  private initialGridDataResponse:  Array<Response>;
  private state: State = {
    skip: 0,
    take: 15, 
    filter: {
      logic: 'and',
      filters: [{ field: 'start_date', operator: 'gte', value: this.intl.parseDate('4/13/2013', ['G', 'd']) },
                { field: "end_date", operator: "lte", value: this.intl.parseDate('4/13/2013', ['G', 'd'])}
              ]
    }
  };

  constructor(
    private _apiService: ApiService,
    private intl: IntlService  
  ) { }

  ngOnInit() {
    this._apiService.get()
     .subscribe( (response: Array<Response>) => {
       response.forEach( (item) => {
        item.start_date = new Date(item.start_date);
        item.end_date = new Date(item.end_date);
      });

      this.initialGridDataResponse = response;
      this.gridData = process(response, this.state);
    })
  }

private dataStateChange(state: DataStateChangeEvent): void {
  this.state = state;
  this.gridData = process(this.initialGridDataResponse, this.state);
  this.gridData.data
}

}
