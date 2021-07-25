import {
    Component,
    ChangeDetectionStrategy,
    EventEmitter,
    Output,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
    selector: 'app-report-export',
    templateUrl: './report-export.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportExportComponent {
    constructor(private dialog: MatDialog, private router: Router) {}

    @Output() public emitExport = new EventEmitter<string>();

    public export(fileType): void {
        this.emitExport.emit(fileType);
    }
}
