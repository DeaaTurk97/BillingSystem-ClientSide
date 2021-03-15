import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddGroupComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
