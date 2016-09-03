"use strict";
var testing_1 = require('@angular/core/testing');
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var testing_2 = require('@angular/http/testing');
var http_2 = require('@angular/http');
var mock_repos_1 = require('./mock-repos');
var github_service_1 = require('./github.service');
describe('MockBackend: GithubSearchService', function () {
    var mockbackend, service;
    testing_1.beforeEachProviders(function () { return [
        github_service_1.GithubSearchService,
        http_2.HTTP_PROVIDERS,
        testing_2.MockBackend,
        http_1.BaseRequestOptions,
        core_1.provide(http_1.Http, {
            useFactory: function (backend, options) { return new http_1.Http(backend, options); },
            deps: [testing_2.MockBackend, http_1.BaseRequestOptions] })
    ]; });
    beforeEach(testing_1.inject([testing_2.MockBackend, github_service_1.GithubSearchService], function (_mockbackend, _service) {
        mockbackend = _mockbackend;
        service = _service;
    }));
    it('should return mocked response', function (done) {
        var response = mock_repos_1.MOCK_REPOS;
        mockbackend.connections.subscribe(function (connection) {
            connection.mockRespond(new http_1.Response(new http_1.ResponseOptions({ body: response })));
        });
        service.getReposByUsername().subscribe(function (repos) {
            repos.forEach(function (repo) {
                expect(repo.name).toBeDefined();
                expect(repo.description).toBeDefined();
                expect(repo.html_url).toBeDefined();
                expect(repo.stargazers_count).toBeDefined();
                expect(repo.owner).toBeDefined();
                expect(repo.owner.avatar_url).toBeDefined();
            });
            expect(repos.length).toBe(2);
            done();
        });
    });
    it('it should return mocked error', function (done) {
        var response = { code: 404, message: 'Not Found' };
        mockbackend.connections.subscribe(function (connection) {
            connection.mockRespond(new http_1.Response(new http_1.ResponseOptions({ body: response })));
        });
        service.getReposByUsername().subscribe(function (error) {
            expect(error.code).toBe(404);
            expect(error.message).toEqual("Not Found");
            done();
        });
    });
    it('should form url based on language and page number', function () {
        var language = "js";
        var pageNumber = 1;
        var repoUrl = service.formRepoUrl(language, pageNumber);
        expect(repoUrl).toEqual("https://api.github.com/search/repositories?q=+language:js&page=1");
    });
    it('should return an error', function () {
        var error = {
            "message": "Not Found",
            "documentation_url": "https://developer.github.com/v3"
        };
        var result = service.handleError(error);
        expect(result.error).toEqual("Not Found");
    });
});

//# sourceMappingURL=github.service.spec.js.map
