const defaults = { imageLoadedClass: "js-lazy-image--handled", imageSelector: ".js-lazy-image", rootMargin: "750px 0px", threshold: .01 };
let config, images, imageCount, observer;

function fetchImage(e) {
    return new Promise((n, o) => {
        const t = new Image;
        t.src = e, t.onload = n, t.onerror = o
    })
}

function preloadImage(e) { const n = e.dataset.src; if (n) return fetchImage(n).then(() => { applyImage(e, n) }) }

function loadImagesImmediately(e) { for (let n = 0; n < e.length; n++) { preloadImage(e[n]) } }

function disconnect() { observer && observer.disconnect() }

function onIntersection(e) {
    if (0 !== imageCount)
        for (let n = 0; n < e.length; n++) {
            let o = e[n];
            o.intersectionRatio > 0 && (imageCount--, observer.unobserve(o.target), preloadImage(o.target))
        } else disconnect()
}

function applyImage(e, n) { e.classList.add(config.imageLoadedClass), e.src = n }
let LazyLoad = {
    init: e => {
        if (config = { ...defaults, ...e }, images = document.querySelectorAll(config.imageSelector), imageCount = images.length, "IntersectionObserver" in window) {
            observer = new IntersectionObserver(onIntersection, config);
            for (let e = 0; e < images.length; e++) {
                let n = images[e];
                n.classList.contains(config.imageLoadedClass) || observer.observe(n)
            }
        } else loadImagesImmediately(images)
    }
};


/**For Background Image**/
let lazyObjectObserver = new IntersectionObserver(function(entries, observer) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting) {
            let lazyObject = entry.target;
            if(!(lazyObject.dataset.lazybg == '')){
                bgsrc = lazyObject.dataset.lazybg;
                wbgsrc = lazyObject.dataset.webp;
                if(document.querySelector('html').classList.contains('webp') && entry.target.hasAttribute('data-webp') ) {
                    lazyObject.style.backgroundImage = 'url('+wbgsrc+')';
                }
                else {
                    lazyObject.style.backgroundImage = 'url('+bgsrc+')';
                }
                setTimeout(function(){ lazyObject.classList.remove("lazybg"); }, 200);
                lazyObject.dataset.lazybg = '';
                lazyObject.dataset.webp='';
                lazyObjectObserver.unobserve(lazyObject);
            }
        }
    });
},{ rootMargin: "900px 0px 0px 0px" });

document.addEventListener("DOMContentLoaded", function() {
var lazyObjects = [].slice.call(document.querySelectorAll(".lazybg"));
lazyObjects.forEach(function(lazyObject) {
    lazyObjectObserver.observe(lazyObject);
});
});