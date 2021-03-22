import { Injectable } from '@angular/core';
import { OperatorModel } from '@app/infrastructure/models/project/operatorModel';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { ApiService } from '../api/api.service';

@Injectable({
    providedIn: 'root',
})
export class OperatorService {
    constructor(private apiService: ApiService) {}

    getAllOperators(): Observable<any> {
        return this.apiService.get(
            `${environment.apiRoute}/Operators/getAllOperators`,
        );
    }

    getOperators(pageIndex: number, PageSize: number): Observable<any> {
        return this.apiService.get(
            `${environment.apiRoute}/Operators/GetOperators` +
                '?pageIndex=' +
                pageIndex +
                '&pageSize=' +
                PageSize,
        );
    }

    getOperatorsId(operatorId: number): Observable<any> {
        return this.apiService.get(
            `${environment.apiRoute}/Operators/GetOperatorId` +
                '?jobId=' +
                operatorId,
        );
    }

    addOperator(operatorModel: OperatorModel): Observable<any> {
        return this.apiService.post(
            `${environment.apiRoute}/Operators/AddOperator`,
            operatorModel,
        );
    }

    updateOperator(operatorModel: OperatorModel): Observable<OperatorModel> {
        return this.apiService.put(
            `${environment.apiRoute}/Operators/UpdateOperator`,
            operatorModel,
        );
    }

    deleteOperator(id: number): Observable<any> {
        return this.apiService.delete(
            `${environment.apiRoute}/Operators/DeleteOperator?id=` + id,
        );
    }
}
