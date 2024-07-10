// create a cache dictionary
var cache = {}
console.log("hello world");

document.addEventListener('htmx:beforeRequest', function(evt) {
    var url = evt.detail.requestConfig.path;
    console.log(evt.detail.requestConfig.headers.HX-Target);
    console.log(evt.detail.requestConfig.headers.Object);
    console.log(evt.detail.requestConfig.headers.Object["HX-Target"]);
    if (String(evt.detail.requestConfig.verb).toLowerCase() === "get") {
        if (cache[url]) {
            console.log(`URL: ${url} is already cached`);
            evt.preventDefault();
            // console.log(evt.detail.requestConfig);
            htmx.swap("#content", cache[url], {swapStyle: 'innerHTML'});
        } else {
            console.log(`URL: ${url} is not yet cached`);
        }
    }
});

document.addEventListener('htmx:afterRequest', function(evt) {
    var url = evt.detail.requestConfig.path;
    if (String(evt.detail.requestConfig.verb).toLowerCase() === "get") {
        if (!cache[url]) {
            evt.detail.xhr.responseText && (cache[url] = evt.detail.xhr.responseText);
            console.log(`Cached HTMX response for ${url}`);
        }
    }
});