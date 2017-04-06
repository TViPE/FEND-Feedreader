/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    describe('RSS Feeds', function() {
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        it('has a URL defined and that the URL is not empty', function() {
            allFeeds.forEach(function(feed) {
                var feedUrl = feed.url;
                expect(feedUrl).toBeDefined();
                expect(feedUrl).not.toBe("");
            });
        });

        it('has a name defined and that the name is not empty', function() {
            allFeeds.forEach(function(feed) {
                var feedName = feed.name;
                expect(feedName).toBeDefined();
                expect(feedName).not.toBe("");
            });
        });
    });

    describe('The menu', function() {
        var body = document.body;

        it('is hidden by default', function(){
            expect($(body).hasClass('menu-hidden')).toBe(true);
        });

        it('displays the menu when click on the menu icon and hide the menu when click on the menu icon again', function() {
            $('.icon-list').click();
            expect($(body).hasClass('menu-hidden')).toBeFalsy();            // $('.icon-list').click();
            $('.icon-list').click();
            expect($(body).hasClass('menu-hidden')).toBeTruthy();
        });
    });

    describe("Initial Entries", function() {
        beforeEach(function(done){
            loadFeed(0, done);
        });

        it('has at least a single .entry element within .feed container after the loadFeed function is called and completes its works', function() {
            var entries = $('.feed .entry');
            var entriesLen = entries.length;
            expect(entriesLen).toBeGreaterThan(0);
        });
    });

    describe("New Feed Selection", function(){
        var feedContents_0,
            feedContents_1;

        beforeEach(function(done){
            loadFeed(1, function(){
                feedContents_1 = $('.feed').html();
                //console.log(feedContents_1.length);
                loadFeed(0, function(){
                    feedContents_0 = $('.feed').html();
                    //console.log(feedContents_0.length);
                    done();
                });
            });        
        });

        it('ensures when a new feed is loaded by the loadFeed function that the content actually changes', function(){
            expect(feedContents_1).not.toEqual(feedContents_0);
        });
    });
}());
