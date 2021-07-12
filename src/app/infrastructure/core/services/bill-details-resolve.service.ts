import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot,
} from '@angular/router';
import { ReportFilterModel } from '@app/infrastructure/models/project/reportFilterModel';
import { Observable } from 'rxjs';
import { CallDetailsService } from './billingSystem/call-details-service';

@Injectable({
    providedIn: 'root',
})
export class BillDetailsResolveService implements Resolve<string> {
    public pageIndex = 1;
    public pageSize = 10;
    public reportFilterModel: ReportFilterModel = new ReportFilterModel();

    constructor(private callDetailsService: CallDetailsService) {}
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
    ): Observable<string> {
        this.reportFilterModel.pageIndex = this.pageIndex;
        this.reportFilterModel.pageSize = this.pageSize;
        this.reportFilterModel.billId = Number(route.params.id);

        return this.callDetailsService.getCallDetails(this.reportFilterModel);
    }
}
