import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpParams } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { ApiService } from '../api/api.service';
import { environment } from '@env/environment';
import { TokenService } from '../token.service';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private jwtHelper: JwtHelperService;

    constructor(
        private apiService: ApiService,
        private tokenService: TokenService,
    ) {}

    login(logModel: any) {
        return this.apiService
            .post(`${environment.apiRoute}/Authintecation/UserLogin`, logModel)
            .pipe(
                tap((response: any) => {
                    const user = response;
                    if (user) {
                        sessionStorage.setItem('authToken', user.token);
                        const decodedAuthToken = this.tokenService.decodeToken(
                            user.token,
                        );
                        this.tokenService.setAuthToken(decodedAuthToken);
                    }
                }),
                catchError((e) => throwError(e)),
            );
    }

    IsUserExists(userEmail: number) {
        return this.apiService.get(
            `${environment.apiRoute}/Authintecation/IsUserExists` +
                '?userEmail=' +
                userEmail,
        );
    }

    register(userRegister: any) {
        return this.apiService.post(
            `${environment.apiRoute}/Authintecation/Register`,
            userRegister,
        );
    }

    loadUsers(pageIndex: number, PageSize: number): Observable<any> {
        return this.apiService.get(
            `${environment.apiRoute}/Authintecation/UserLogin` +
                '?pageNumber=' +
                pageIndex +
                '&pageSize=' +
                PageSize,
        );
    }

    SearchByName(userName: string): Observable<any> {
        return this.apiService.get('', {
            params: new HttpParams().set('searchUserName', userName),
        });
    }

    loggedIn() {
        try {
            const token = sessionStorage.getItem('UserToken');
            return !this.jwtHelper.isTokenExpired(token);
        } catch {
            return false;
        }
    }

    GetToken() {
        return sessionStorage.getItem('UserToken');
    }

    IsTokenExpiredDate() {
        return this.jwtHelper.isTokenExpired(this.GetToken());
    }

    DeleteToken() {
        return sessionStorage.removeItem('UserToken');
    }

    loggedOut() {
        sessionStorage.clear();
        this.clearSession();
    }

    private clearSession(): void {
        this.tokenService.resetAuthToken();
    }
}
