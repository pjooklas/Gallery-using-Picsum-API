'use strict';
const leftPane = document.querySelector('.left-side');
const rightPane = document.querySelector('.right-side');
let pageNumber = 1;
const itemsPerPage = 30;
const baseURL = 'https://picsum.photos/id/';

const fetchImageList = (pageNumber, itemsPerPage) => {
    fetch(`https://picsum.photos/v2/list?page=${pageNumber}&limit=${itemsPerPage}`)
        .then(response => response.json())
        .then(data => {
            data.forEach(element => {
                const aTag = document.createElement('a');
                const img = document.createElement('img');
                img.setAttribute('src', baseURL + element.id + '/200/200');
                img.setAttribute('id', element.id);
                aTag.setAttribute('href', element.download_url);
                aTag.setAttribute('target', "right-side");
                aTag.appendChild(img);
                leftPane.appendChild(aTag);
            });
        });
};

// Add 30 photos.
const loadMore = function() {
        fetchImageList(pageNumber++, itemsPerPage);
    }
    // Detect when scrolled to bottom.
leftPane.addEventListener('scroll', function() {
    if (leftPane.scrollTop + leftPane.clientHeight >= leftPane.scrollHeight) {
        loadMore();
    }
});
// Initially load some items.
loadMore();