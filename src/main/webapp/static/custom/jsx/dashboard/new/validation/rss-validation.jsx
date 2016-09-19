export function isRssValid(feed) {
    var reg = /^.{5,100}\.rss$/;
    return reg.test(feed);
}