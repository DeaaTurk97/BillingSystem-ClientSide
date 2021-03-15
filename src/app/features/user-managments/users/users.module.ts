import { NgModule } from '@angular/core';
import {
    UserRoutingModule,
    components as usersComponents,
} from './users-routing.module';
import { SharedModule } from '@app/infrastructure/shared/shared.module';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [usersComponents],
    imports: [CommonModule, SharedModule, UserRoutingModule],
})
export class UsersModule {}
