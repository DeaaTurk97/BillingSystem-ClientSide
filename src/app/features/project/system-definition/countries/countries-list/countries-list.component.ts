import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    ViewChild,
} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CountryService } from '@app/infrastructure/core/services/billingSystem/country.service';
import { NotificationService } from '@app/infrastructure/core/services/notification.service';
import { CountryModel } from '@app/infrastructure/models/project/CountryModel';
import { ConfirmDialogComponent } from '@app/infrastructure/shared/components/confirm-dialog/confirm-dialog.component';
import {
    ActionRowGrid,
    State,
} from '@app/infrastructure/shared/Services/CommonMemmber';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AddCountryComponent } from '../add-country/add-country.component';

@Component({
    selector: 'app-countries-list',
    templateUrl: './countries-list.component.html',
    styleUrls: ['./countries-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountriesListComponent implements OnInit {
    constructor(
        private countryService: CountryService,
        private dialog: MatDialog,
        private notify: NotificationService,
    ) {}

    @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
    public paginationIndex = 0;
    public pageIndex = 1;
    public pageSize = 10;
    public length = 0;
    public dataSource = new MatTableDataSource<CountryModel>([]);

    ngOnInit(): void {
        this.LoadCountries(this.pageIndex, this.pageSize);
    }

    getConfigDialog(data, isAddGridHeader?: boolean): MatDialogConfig {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.position = { top: '80px' };
        dialogConfig.width = '60%';
        dialogConfig.data = data;
        return dialogConfig;
    }

    onEditControlClick(resultClick: State) {
        switch (resultClick) {
            case State.Add:
                this.onAddRecord();
                break;
        }
    }

    applyFilter(searchKey: string) {
        this.dataSource.filter = searchKey
            ? searchKey.trim().toLocaleLowerCase()
            : '';
    }

    onActionRowGrid(ActionGrid: ActionRowGrid) {
        switch (ActionGrid.type) {
            case State.Edit:
                this.onEdit(ActionGrid.row);
                break;
            case State.Delete:
                this.onDelete(ActionGrid.row);
                break;
            case State.Pagination:
                this.LoadCountries(
                    ActionGrid.row.pageIndex,
                    ActionGrid.row.pageSize,
                );
                break;
        }
    }

    LoadCountries(pageIndex: number, pageSize: number) {
        this.countryService
            .getCountries(pageIndex, pageSize)
            .pipe(
                map((paginationRecord) => {
                    this.dataSource.data = paginationRecord.dataRecord;
                    this.length = paginationRecord.countRecord;
                }),
                catchError((error): any => {
                    this.notify.showTranslateMessage('ErrorOnLoadData');
                }),
            )
            .subscribe((result) => {});
    }

    onAddRecord() {
        const dialog = this.dialog.open(
            AddCountryComponent,
            this.getConfigDialog(null),
        );

        return dialog
            .afterClosed()
            .pipe(
                switchMap((dialogResult: string) => {
                    if (dialogResult) {
                        this.LoadCountries(1, this.pageSize);
                        this.dataSource.paginator = this.paginator;
                        this.notify.showTranslateMessage(
                            'AddedSuccessfully',
                            false,
                        );
                        return of({});
                    } else {
                        this.notify.showTranslateMessage('CancelAdd');
                        return of({});
                    }
                }),
                catchError((): any => {
                    this.notify.showTranslateMessage('ErrorOnAdd', true);
                }),
            )
            .subscribe((result) => {});
    }

    onEdit(countryModel: CountryModel) {
        const dialog = this.dialog.open(
            AddCountryComponent,
            this.getConfigDialog(countryModel),
        );

        return dialog
            .afterClosed()
            .pipe(
                switchMap((dialogResult: string) => {
                    if (dialogResult) {
                        this.LoadCountries(1, this.pageSize);
                        this.notify.showTranslateMessage(
                            'UpdatedSuccessfully',
                            false,
                        );
                        return of({});
                    } else {
                        this.notify.showTranslateMessage('CancelUpdate');
                        return of({});
                    }
                }),
                catchError((): any => {
                    this.notify.showTranslateMessage('ErrorOnUpdate');
                }),
            )
            .subscribe((result) => {});
    }

    onDelete(countryModel: CountryModel) {
        return this.dialog
            .open(ConfirmDialogComponent, {
                width: '27em',
                height: '9em',
                panelClass: 'confirm-dialog-container',
                position: { top: '5em' },
                disableClose: true,
                data: {
                    messageList: ['SureWantDelete'],
                    action: 'Delete',
                    showCancel: true,
                },
            })
            .afterClosed()
            .pipe(
                switchMap((dialogResult: string) => {
                    if (dialogResult) {
                        return this.countryService.deleteCountry(
                            countryModel.id,
                        );
                    } else {
                        this.notify.showTranslateMessage('CancelDelete');
                        return of({});
                    }
                }),
                catchError((): any => {
                    this.notify.showTranslateMessage('ErrorOnDelete');
                }),
            )
            .subscribe((result) => {
                this.LoadCountries(1, this.pageSize);
                this.notify.showTranslateMessage('DeletedSuccessfully');
            });
    }
}
