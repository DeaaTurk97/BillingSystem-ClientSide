import { PlanServiceModel } from './planServiceModel';

export class PlanModel {
    id: number;
    name: string;
    description: string;
    code: string;
    price: number;
    planServices: PlanServiceModel[];
}
