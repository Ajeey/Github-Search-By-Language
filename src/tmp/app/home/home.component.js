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
var search_1 = require('./search');
var github_service_1 = require('./github.service');
var shared_1 = require('../shared');
var HomeComponent = (function () {
    function HomeComponent(githubSearchService, elementRef) {
        this.githubSearchService = githubSearchService;
        this.repos = [];
        this.originalRepos = [];
        this.languageTags = [];
        this.model = new search_1.Search('');
        this.fetching = false;
        this.isError = false;
        this.isEmpty = null;
        this.repoCount = 0;
        this.pageNumber = 1;
        this.loadingMore = false;
        this.maxStarCount = 100;
        this.sortedByHighest = true;
        this.sortedByLowest = false;
        this.elementRef = elementRef;
        this.strings = shared_1.CONSTANTS.MAIN.APP;
    }
    HomeComponent.prototype.onSubmit = function () {
        this.fetching = true;
        this.clearRepos();
        this.fetchRepos(this.pageNumber);
    };
    HomeComponent.prototype.fetchRepos = function (pageNumber) {
        this.githubSearchService.getReposByUsername(this.model.text, pageNumber)
            .subscribe(this.success.bind(this), this.error.bind(this));
    };
    HomeComponent.prototype.fetchNextPage = function () {
        this.loadingMore = true;
        this.pageNumber++;
        this.fetchRepos(this.pageNumber);
    };
    HomeComponent.prototype.clearRepos = function () {
        this.repos = [];
        this.originalRepos = [];
    };
    HomeComponent.prototype.success = function (repos) {
        this.repos = this.repos.concat(repos.items);
        this.originalRepos = this.repos;
        this.repoCount = repos.total_count;
        this.isError = false;
        if (repos.length === 0) {
            this.isEmpty = true;
        }
        else {
            this.isEmpty = false;
            this.getMaxStarCount();
        }
        this.fetching = false;
        this.loadingMore = false;
        this.fetchRateLimit();
    };
    HomeComponent.prototype.error = function (error) {
        this.handleError();
    };
    HomeComponent.prototype.fetchRateLimit = function () {
        this.githubSearchService.getApiRateLimit()
            .subscribe(this.rateLimitSuccess.bind(this), this.rateLimitFailure.bind(this));
    };
    HomeComponent.prototype.rateLimitSuccess = function (response) {
        this.totalRateLimit = response.limit;
        this.totalRateLimitRemaining = response.remaining;
    };
    HomeComponent.prototype.rateLimitFailure = function (error) {
        console.error("Could not get rate limit response", error);
    };
    HomeComponent.prototype.getMaxStarCount = function () {
        this.maxStarCount = this.repos[0].stargazers_count;
        this.sliderMaxCount = this.maxStarCount;
        this.starSlider.slider("option", "max", this.maxStarCount);
        this.starSlider.slider("option", "value", this.maxStarCount);
    };
    HomeComponent.prototype.handleError = function () {
        this.fetching = false;
        this.isError = true;
        this.isEmpty = false;
        this.repos = null;
        this.repoCount = 0;
    };
    // Slider Range Change detection
    HomeComponent.prototype.filterReposByStar = function (stars) {
        this.repos = this.originalRepos.filter(function (repo) {
            return repo.stargazers_count <= stars;
        });
    };
    HomeComponent.prototype.sortByHighest = function () {
        this.repos = this.originalRepos.sort(function (item1, item2) {
            // return item1.stargazers_count >= item2.stargazers_count;
            return item2.stargazers_count - item1.stargazers_count;
        });
        this.sortedByHighest = true;
        this.sortedByLowest = false;
    };
    HomeComponent.prototype.sortByLowest = function () {
        this.repos = this.originalRepos.sort(function (item1, item2) {
            // return item1.stargazers_count >= item2.stargazers_count;
            return item1.stargazers_count - item2.stargazers_count;
        });
        console.log(this.repos);
        this.sortedByLowest = true;
        this.sortedByHighest = false;
    };
    HomeComponent.prototype.toggleFilterContainer = function (e) {
        var currentElement = $(e.currentTarget);
        currentElement.toggleClass("up-arrow");
        $(this.elementRef.nativeElement).find(".filter-options").slideToggle();
    };
    HomeComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        var self = this;
        // Init Autocomplete
        this.githubSearchService.getLanguageTags().subscribe(function (tags) {
            this.languageTags = tags;
            $(this.elementRef.nativeElement).find(".search-text").autocomplete({
                source: this.languageTags,
                select: function (event, ui) {
                    console.log(ui.item.value);
                    self.model.text = ui.item.value;
                }
            });
        }.bind(this), function (error) {
            console.error("Could not fetch language tags", error);
        }.bind(this));
        // Initialize Slider
        this.starSlider = $(this.elementRef.nativeElement).find("#slider").slider({
            range: false,
            min: 0,
            max: 20000,
            value: this.maxStarCount,
            slide: function (event, ui) {
                _this.maxStarCount = ui.value;
                _this.filterReposByStar(ui.value);
            }
        });
    };
    HomeComponent = __decorate([
        core_1.Component({
            selector: 'as-home',
            templateUrl: 'app/home/home.html',
            styleUrls: [
                'app/home/home.css'
            ],
            directives: [],
            providers: [github_service_1.GithubSearchService]
        }), 
        __metadata('design:paramtypes', [github_service_1.GithubSearchService, core_1.ElementRef])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;

//# sourceMappingURL=home.component.js.map
