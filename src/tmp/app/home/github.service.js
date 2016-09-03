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
var http_1 = require('@angular/http');
var Rx_1 = require('rxjs/Rx');
var GithubSearchService = (function () {
    function GithubSearchService(http) {
        this.http = http;
    }
    GithubSearchService.prototype.formRepoUrl = function (language, pageNumber) {
        // return `https://api.github.com/users/${username}/repos`; // Tempate strings yay!
        return "https://api.github.com/search/repositories?q=+language:" + language + "&page=" + pageNumber; // Tempate strings yay!
    };
    GithubSearchService.prototype.getRateLimitUrl = function () {
        return "https://api.github.com/rate_limit";
    };
    GithubSearchService.prototype.langaugeTagsUrl = function () {
        return "https://gist.githubusercontent.com/mayurah/5a4d45d12615d52afc4d1c126e04c796/raw/ccbba9bb09312ae66cf85b037bafc670356cf2c9/languages.json";
    };
    GithubSearchService.prototype.getReposByUsername = function (language, pageNumber) {
        return this.http.get(this.formRepoUrl(language, pageNumber))
            .map(this.parseRepos)
            .catch(this.handleError);
    };
    GithubSearchService.prototype.getLanguageTags = function () {
        return this.http.get(this.langaugeTagsUrl())
            .map(this.parseTags)
            .catch(this.handleError);
    };
    GithubSearchService.prototype.getApiRateLimit = function () {
        return this.http.get(this.getRateLimitUrl())
            .map(this.parseRateLimit)
            .catch(this.handleError);
    };
    GithubSearchService.prototype.parseRateLimit = function (response) {
        var body = response.json();
        return body.resources.search;
    };
    GithubSearchService.prototype.parseTags = function (tags) {
        return tags.json();
    };
    GithubSearchService.prototype.parseRepos = function (response) {
        var body = response.json();
        return body || {};
    };
    GithubSearchService.prototype.handleError = function (error) {
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.error(errMsg);
        return Rx_1.Observable.throw(errMsg);
    };
    GithubSearchService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], GithubSearchService);
    return GithubSearchService;
}());
exports.GithubSearchService = GithubSearchService;

//# sourceMappingURL=github.service.js.map
