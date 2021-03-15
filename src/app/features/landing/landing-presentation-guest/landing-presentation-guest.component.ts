import { Component, ChangeDetectionStrategy } from '@angular/core';

/**
 * Wrapper component for all `CaseModule` routes.
 */
@Component({
    selector: 'app-landing-presentation-guest',
    templateUrl: './landing-presentation-guest.component.html',
    styleUrls: ['./landing-presentation-guest.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingPresentationGuestComponent {}
