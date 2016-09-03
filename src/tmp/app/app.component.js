"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var navbar_component_1 = require('./navbar/navbar.component');
var home_component_1 = require('./home/home.component');
var footer_component_1 = require('./footer/footer.component');
var shared_1 = require('./shared');
var AppComponent = (function () {
    function AppComponent() {
        this.appBrand = shared_1.CONSTANTS.MAIN.APP.BRAND;
        this.appTag = shared_1.CONSTANTS.MAIN.APP.TAGLINE;
    }
    AppComponent = __decorate([
        core_1.Component({
            selector: 'as-myapp',
            templateUrl: 'app/app.html',
            directives: [navbar_component_1.NavbarComponent, home_component_1.HomeComponent, footer_component_1.FooterComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;

//# sourceMappingURL=app.component.js.map
