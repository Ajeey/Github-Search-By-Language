import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import {Observable} from 'rxjs/Rx';

@Injectable() 
export class GithubSearchService {
    
    constructor (private http: Http) {}

    formRepoUrl(language, pageNumber) {
        // return `https://api.github.com/users/${username}/repos`; // Tempate strings yay!
        return `https://api.github.com/search/repositories?q=+language:${language}&page=${pageNumber}`; // Tempate strings yay!
    }

    getRateLimitUrl() {
        return "https://api.github.com/rate_limit";
    }

    langaugeTagsUrl() {
        return "https://gist.githubusercontent.com/mayurah/5a4d45d12615d52afc4d1c126e04c796/raw/ccbba9bb09312ae66cf85b037bafc670356cf2c9/languages.json";
    }

    getReposByUsername (language, pageNumber): Observable<any> {
        return this.http.get(this.formRepoUrl(language, pageNumber))
                        .map(this.parseRepos)
                        .catch(this.handleError);
    }

    getLanguageTags() {
        return this.http.get(this.langaugeTagsUrl())
                        .map(this.parseTags)
                        .catch(this.handleError);
    }

    getApiRateLimit() {
        return this.http.get(this.getRateLimitUrl())
                .map(this.parseRateLimit)
                .catch(this.handleError);
    }

    private parseRateLimit(response) {
        let body = response.json();
        return body.resources.search;
    }

    private parseTags(tags) {
        return tags.json();
    }

    private parseRepos(response) {
        let body = response.json();
        return body || { };
    }

    private handleError (error) {
        let errMsg = (error.message) ? error.message :
        error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

    
}
