'use strict';
const leftPane = document.querySelector('.left-side');
const rightPane = document.querySelector('.right-side');
const containerRight = document.querySelector('.enlarged-image');
const authorInfo = document.querySelector('#author');
const imageSize = document.querySelector('#img-size');
const greyscale = document.querySelector('#greyscale');
const blurSlider = document.querySelector('#blur');
let pageNumber = 1;
const itemsPerPage = 30;
const baseURL = 'https://picsum.photos/id/';

// -------------------------- //
// Fetch images from picsum photos API
const fetchImageList = (pageNumber, itemsPerPage) => {
    fetch(`https://picsum.photos/v2/list?page=${pageNumber}&limit=${itemsPerPage}`)
        .then(response => response.json())
        .then(data => {
            data.forEach(element => {
                const img = document.createElement('img');
                img.setAttribute('src', baseURL + element.id + '/200/200');
                img.setAttribute('id', element.id);
                leftPane.appendChild(img);

                img.addEventListener('click', () => {
                    imageSize.innerText = '';
                    authorInfo.innerText = '';
                    const imageEnlarged = new ImageEnlarged(element);
                    imageEnlarged.render(blurSlider.value);
                    
                    greyscale.addEventListener('change', () => {
                        imageEnlarged.render(blurSlider.value);
                    });

                    blurSlider.addEventListener('change', () => {
                        imageEnlarged.render(blurSlider.value);
                    });
                });

            });
        });
};


class ImageEnlarged {
    constructor(data) {
        this.id = data.id;
        this.width = data.width;
        this.height = data.height;
        this.author = data.author;
        this.url = data.download_url;
    }

    toLarge(blurValue) {
        const url = `${baseURL}${this.id}/${this.width}/${this.height}`;
        this.url =
            greyscale.checked && parseInt(blurValue) === 0 ? `${url}?grayscale` :
            !greyscale.checked && parseInt(blurValue) > 0 ? `${url}?blur=${blurValue}` :
            greyscale.checked && parseInt(blurValue) > 0 ? `${url}?grayscale&blur=${blurValue}` :
            `${url}`;


        const imageLarge = document.createElement('img');
        imageLarge.setAttribute('src', this.url);
        containerRight.appendChild(imageLarge);
        containerRight.addEventListener('contextmenu', (event) => event.preventDefault());
        authorInfo.innerText = `${this.author}`;
        imageSize.innerText = `${this.width}px / ${this.height}px`;
        
    }

    render(blurValue = 0) {
        containerRight.innerHTML = '';
        this.toLarge(blurValue);
    }
}


// -------------------------- //
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


// -------------------------- //
// Initially load some items.
loadMore();