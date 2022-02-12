import { Injectable } from '@angular/core';
import { PlanModel } from '@app/infrastructure/models/project/planModel';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { ApiService } from '../api/api.service';
import { TokenService } from '../token.service';

@Injectable({
    providedIn: 'root',
})
export class PlanService {
    constructor(
        private apiService: ApiService,
        private tokenService: TokenService,
    ) {}

    getAllPlans(): Observable<any> {
        return this.apiService.get(`${environment.apiRoute}/Plan/GetAllPlans`);
    }

    getPlans(pageIndex: number, PageSize: number): Observable<any> {
        return this.apiService.get(
            `${environment.apiRoute}/Plan/GetPlan` +
                '?pageIndex=' +
                pageIndex +
                '&pageSize=' +
                PageSize,
        );
    }

    getPlanId(planId: number): Observable<any> {
        return this.apiService.get(
            `${environment.apiRoute}` + '?planId=' + planId,
        );
    }

    addPlan(plansForm: PlanModel): Observable<any> {
        return this.apiService.post(
            `${environment.apiRoute}/Plan/AddPlan`,
            plansForm,
        );
    }

    updatePlan(plansForm): Observable<any> {
        return this.apiService.put(
            `${environment.apiRoute}/Plan/UpdatePlan`,
            plansForm,
        );
    }

    deletePlan(id: number): Observable<any> {
        return this.apiService.delete(
            `${environment.apiRoute}/Plan/DeletePlan?id=` + id,
        );
    }
}
