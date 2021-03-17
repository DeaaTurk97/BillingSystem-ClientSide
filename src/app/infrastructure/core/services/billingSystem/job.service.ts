import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { JobModel } from '@models/project/JobModel';

@Injectable({
    providedIn: 'root',
})
export class JobsService {
    constructor(private apiService: ApiService) {}

    getAllJobs(): Observable<any> {
        return this.apiService.get(`${environment.apiRoute}/Jobs/getAllJobs`);
    }

    getJobs(pageIndex: number, PageSize: number): Observable<any> {
        return this.apiService.get(
            `${environment.apiRoute}/Jobs/GetJobs` +
                '?pageIndex=' +
                pageIndex +
                '&pageSize=' +
                PageSize,
        );
    }

    getJobId(jobId: number): Observable<any> {
        return this.apiService.get(
            `${environment.apiRoute}/Jobs/GetJobId` + '?jobId=' + jobId,
        );
    }

    addJob(JobsForm: JobModel): Observable<any> {
        return this.apiService.post(
            `${environment.apiRoute}/Jobs/AddJob`,
            JobsForm,
        );
    }

    updateJob(JobsForm: JobModel): Observable<JobModel> {
        return this.apiService.put(
            `${environment.apiRoute}/Jobs/UpdateJob`,
            JobsForm,
        );
    }

    deleteJob(id: number): Observable<any> {
        return this.apiService.delete(
            `${environment.apiRoute}/Jobs/DeleteJob?id=` + id,
        );
    }
}
