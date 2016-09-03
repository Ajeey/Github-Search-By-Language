import { Component, ElementRef, AfterViewInit } from '@angular/core';
import { Search } from './search';
import { GithubSearchService } from './github.service';
import { CONSTANTS } from '../shared';

declare var $:any;

@Component({
    selector: 'as-home',
    templateUrl: 'app/home/home.html',
    styleUrls: [
        'app/home/home.css'
    ],
   directives: [  ],
    providers: [ GithubSearchService ]
})
export class HomeComponent implements AfterViewInit {
    public repos: Array<any> = [];
    public originalRepos: Array<any> = [];
    public languageTags: Array<any> = [];

    public elementRef: ElementRef;
    public strings;
    public model = new Search('');
    public fetching: Boolean = false;
    public isError: Boolean = false;
    public isEmpty = null;
    public repoCount = 0;
    public pageNumber = 1;
    public loadingMore = false;
    public maxStarCount = 100;
    public sliderMaxCount;
    public starSlider;
    public sortedByHighest = true;
    public sortedByLowest = false;
    public totalRateLimit;
    public totalRateLimitRemaining;
    
    constructor(private githubSearchService: GithubSearchService, elementRef: ElementRef) {
        this.elementRef = elementRef;
        this.strings = CONSTANTS.MAIN.APP;
    }

    onSubmit() { 
        this.fetching = true;
        this.clearRepos();
        this.fetchRepos(this.pageNumber);
    }

    fetchRepos(pageNumber) {
        this.githubSearchService.getReposByUsername(this.model.text, pageNumber)
                        .subscribe(
                            this.success.bind(this),
                            this.error.bind(this)
                        );
    }

    fetchNextPage() {
        this.loadingMore = true;
        this.pageNumber++;
        this.fetchRepos(this.pageNumber);
    }

    clearRepos() {
        this.repos = [];
        this.originalRepos = [];
    }

    success(repos) {
        this.repos = this.repos.concat(repos.items);
        this.originalRepos = this.repos;
        this.repoCount = repos.total_count;
        
        this.isError = false;

        if(repos.length === 0) {
            this.isEmpty = true;
        } else {
            this.isEmpty = false;
            this.getMaxStarCount();
        }

        this.fetching = false;
        this.loadingMore = false;

        this.fetchRateLimit();
    }

    error(error) {
        this.handleError();
    }

    fetchRateLimit() {
        this.githubSearchService.getApiRateLimit()
                                .subscribe(
                                    this.rateLimitSuccess.bind(this),
                                    this.rateLimitFailure.bind(this)
                                );
    }

    rateLimitSuccess(response) {
        this.totalRateLimit = response.limit;
        this.totalRateLimitRemaining = response.remaining;
    }

    rateLimitFailure(error) {
        console.error("Could not get rate limit response", error);
    }

    getMaxStarCount() {
        this.maxStarCount = this.repos[0].stargazers_count;
        this.sliderMaxCount = this.maxStarCount;
        this.starSlider.slider("option", "max", this.maxStarCount);
        this.starSlider.slider("option", "value", this.maxStarCount);
    }

    handleError() {
        this.fetching = false;
        this.isError = true;
        this.isEmpty = false;
        this.repos = null;
        this.repoCount = 0;
    }

    // Slider Range Change detection
    filterReposByStar(stars) {
       this.repos =  this.originalRepos.filter(function(repo) {
            return repo.stargazers_count <= stars;
        });

    }

    sortByHighest() {
        this.repos = this.originalRepos.sort(function(item1, item2):any {
            // return item1.stargazers_count >= item2.stargazers_count;
            return item2.stargazers_count - item1.stargazers_count; 
        });

        this.sortedByHighest = true;
        this.sortedByLowest = false;
    }

    sortByLowest() {
        this.repos = this.originalRepos.sort(function(item1, item2):any {
            // return item1.stargazers_count >= item2.stargazers_count;
            return item1.stargazers_count - item2.stargazers_count;
        });

        console.log(this.repos);

        this.sortedByLowest = true;
        this.sortedByHighest = false;
    }

    toggleFilterContainer(e) {
        let currentElement = $(e.currentTarget);
        currentElement.toggleClass("up-arrow");
        $(this.elementRef.nativeElement).find(".filter-options").slideToggle();
    }

    ngAfterViewInit() {
        let self = this;
        
        // Init Autocomplete
        this.githubSearchService.getLanguageTags().subscribe(function(tags){
            this.languageTags = tags;
            $(this.elementRef.nativeElement).find(".search-text").autocomplete({
                source: this.languageTags,
                select: function( event, ui ) {
                    console.log(ui.item.value);
                    self.model.text = ui.item.value; 
                }
            });
        }.bind(this), function(error){
            console.error("Could not fetch language tags", error);
        }.bind(this));

        // Initialize Slider
        this.starSlider = $(this.elementRef.nativeElement).find("#slider").slider({
            range: false,
            min: 0,
            max: 20000,
            value: this.maxStarCount,
            slide: ( event, ui ) => {
                this.maxStarCount = ui.value;
                this.filterReposByStar(ui.value);
            }
        });
    }
}
