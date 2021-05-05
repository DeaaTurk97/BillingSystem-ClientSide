import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Input,
    Output,
    AfterViewInit,
    ViewChild,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { State, ActionRowGrid } from '../../Services/CommonMemmber';
import { BehaviorSubject } from 'rxjs';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { DynamicColumn } from '@app/infrastructure/models/gridAddColumns-model';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
    selector: 'app-data-grid-view',
    templateUrl: './data-grid-view.component.html',
    styleUrls: ['./data-grid-view.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataGridViewComponent implements OnInit, AfterViewInit {
    @Input() gridDataSource: MatTableDataSource<any>;
    @Input() displayedColumns: string[];
    // tslint:disable-next-line:no-output-on-prefix
    @Output() onEditRow = new BehaviorSubject<ActionRowGrid>({
        type: State.Non,
        row: '',
    });
    // tslint:disable-next-line:no-output-on-prefix
    @Output() onDeleteRow = new BehaviorSubject<ActionRowGrid>({
        type: State.Non,
        row: '',
    });
    // tslint:disable-next-line:no-output-on-prefix
    @Output() onPagination = new BehaviorSubject<ActionRowGrid>({
        type: State.Non,
        row: '',
    });
    // tslint:disable-next-line:no-output-on-prefix
    @Output() onCheckRow = new BehaviorSubject<ActionRowGrid>({
        type: State.Non,
        row: '',
    });
    @ViewChild(MatSort, { static: true }) sort: MatSort;
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @Input() lengthData: number;
    @Input() PaginatorIndex: number;
    @Input() additionalColumns: DynamicColumn[] = [];
    @Input() isShowMainActionControls = true;
    @Input() isShowBoxSelectAll = false;
    @Output() onInStatusRow = new BehaviorSubject<ActionRowGrid>({
        type: State.Non,
        row: '',
    });
    pageIndex = 1;
    pageSize = 10;
    selection = new SelectionModel<any>(true, []);

    constructor() {}
    ngOnInit(): void {}

    ngAfterViewInit(): void {
        this.gridDataSource.sort = this.sort;
    }

    onEditClick(rowClicked) {
        const actionGrid: ActionRowGrid = { type: State.Edit, row: rowClicked };
        this.onEditRow.next(actionGrid);
    }

    onDeleteClick(rowClicked) {
        const actionGrid: ActionRowGrid = {
            type: State.Delete,
            row: rowClicked,
        };
        this.onDeleteRow.next(actionGrid);
    }

    onPaginationClick(event) {
        event.pageIndex += 1;
        const PaginationGrid: ActionRowGrid = {
            type: State.Pagination,
            row: event,
        };
        this.onPagination.next(PaginationGrid);
    }

    onStatusClick(rowClicked, state: State) {
        const actionGrid: ActionRowGrid = { type: state, row: rowClicked };
        this.onInStatusRow.next(actionGrid);
    }

    getDisplayColumns() {
        const selectionLastColumn = this.isShowBoxSelectAll
            ? 'Selection'
            : 'Actions';

        if (!this.isShowMainActionControls && !this.isShowBoxSelectAll) {
            return this.displayedColumns.concat(
                ...this.additionalColumns.map((e) => e.headerName),
            );
        }
        return this.displayedColumns
            .concat(...this.additionalColumns.map((e) => e.headerName))
            .concat(...[`${selectionLastColumn}`]);
    }

    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.gridDataSource.data.length;
        return numSelected === numRows;
    }

    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggle() {
        if (this.isAllSelected()) {
            this.selection.clear();
            this.onSelectedRow([]);
        } else {
            this.gridDataSource.data.forEach((row) => {
                this.selection.select(row);
            });
            this.onSelectedRow(this.gridDataSource.data);
        }
    }

    onSelectedRow(rowSelected) {
        const actionGrid: ActionRowGrid = {
            type: State.Check,
            row: rowSelected,
        };
        this.onCheckRow.next(actionGrid);
    }
}
