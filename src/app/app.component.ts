import {Component} from '@angular/core';
import {NavbarComponent} from './navbar/navbar.component';
import {HomeComponent} from './home/home.component';
import {FooterComponent} from './footer/footer.component';
import {CONSTANTS} from './shared';

@Component({
    selector: 'as-myapp',
    templateUrl: 'app/app.html',
    directives: [NavbarComponent, HomeComponent, FooterComponent]
})
export class AppComponent {
    public appBrand: string;
    public appTag: string;

    constructor() {
        this.appBrand = CONSTANTS.MAIN.APP.BRAND;
        this.appTag = CONSTANTS.MAIN.APP.TAGLINE;
    }
}
