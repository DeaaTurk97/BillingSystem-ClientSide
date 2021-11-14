import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { UserModel } from '@app/infrastructure/models/project/UserModel';
import { LanguageModel } from '@app/infrastructure/models/project/LanguageModel';
import { Constants } from '@app/infrastructure/utils/constants';
import { HttpParams } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    constructor(private apiService: ApiService) {}

    getUsers(pageIndex: number, pageSize: number): Observable<any> {
        return this.apiService.get(
            `${environment.apiRoute}/User/GetUsers?pageIndex=${pageIndex}&pageSize=${pageSize}`,
        );
    }

    addUser(usersForm: UserModel): Observable<any> {
        return this.apiService.post(
            `${environment.apiRoute}/User/AddUser`,
            usersForm,
        );
    }

    IsUserExists(userPhoneNumber: string) {
        return this.apiService.get(
            `${environment.apiRoute}/Authintecation/IsUserExistsByPhoneNumber` +
                '?userPhoneNumber=' +
                userPhoneNumber,
        );
    }

    updateUser(usersForm: UserModel): Observable<any> {
        return this.apiService.put(
            `${environment.apiRoute}/User/UpdateUser`,
            usersForm,
        );
    }

    deleteUser(userId: number): Observable<any> {
        return this.apiService.delete(
            `${environment.apiRoute}/User?userId=${userId}`,
        );
    }

    getAllSuperAdminsAsync(): Observable<UserModel[]> {
        return this.apiService.get(
            `${environment.apiRoute}/User/GetAllSuperAdmins`,
        );
    }

    updateUserLanguage(languageId: number): Observable<any> {
        return this.apiService.put(
            `${environment.apiRoute}/User/UpdateUserLanguage?languageId=${languageId}`,
            languageId,
        );
    }

    getLanguageInformations(): Observable<LanguageModel> {
        return this.apiService.get(
            `${environment.apiRoute}/User/GetLanguageInformations`,
        );
    }

    getAllRoles(): Observable<any> {
        return this.apiService.get(`${environment.apiRoute}/User/GetAllRoles`);
    }

    updateRoleUser(userModel): Observable<any> {
        return this.apiService.put(
            `${environment.apiRoute}/User/UpdateUserRole`,
            userModel,
        );
    }

    isTokenExist(): boolean {
        const authToken = sessionStorage.getItem('authToken');
        return authToken ? true : false;
    }

    getLanguageId(): number {
        const languageId = sessionStorage.getItem('languageId');
        return languageId ? Number(languageId) : Constants.DefaultLanguageId;
    }

    setLanguageId(languageId: string): void {
        sessionStorage.setItem('languageId', languageId);
    }

    getLanguageDir(): any {
        const languageDir = sessionStorage.getItem('languageDir');
        return languageDir ?? Constants.DefaultLanguageDirection;
    }

    setLanguageDir(languageDir: string): void {
        sessionStorage.setItem('languageDir', languageDir);
    }

    getUsersByCurrentRole(): Observable<any> {
        return this.apiService.get(
            `${environment.apiRoute}/User/GetUsersByCurrentRole`,
        );
    }
    changePassword(oldPassword: string, newPassword: string): Observable<any> {
        const params = new HttpParams()
            .set('oldPassword', oldPassword)
            .set('newPassword', newPassword);

        return this.apiService.post(
            `${environment.apiRoute}/User/ChangePassword`,
            null,
            { params: params },
        );
    }
}
