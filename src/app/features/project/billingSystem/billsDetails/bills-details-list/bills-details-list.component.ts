import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-bills-details-list',
  templateUrl: './bills-details-list.component.html',
  styleUrls: ['./bills-details-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BillsDetailsListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
