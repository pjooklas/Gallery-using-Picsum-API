const leftPane = document.querySelector('.left-side');
const rightPane = document.querySelector('.right-side');
const baseURL = 'https://picsum.photos/id/';

fetch('https://picsum.photos/v2/list')
    .then(response => response.json())
    .then(data => {
        data.forEach(element => {
            const aTag = document.createElement('a');
            const img = document.createElement('img');
            img.setAttribute('src', baseURL + element.id + '/200/200');
            img.setAttribute('id', element.id);
            aTag.setAttribute('class', 'link');
            aTag.setAttribute('href', element.download_url);
            aTag.setAttribute('target', "right-side");
            aTag.appendChild(img);
            leftPane.appendChild(aTag);

            img.addEventListener('click', () => {

                console.log('paklikinai' + element.id);
            })
        });
    });