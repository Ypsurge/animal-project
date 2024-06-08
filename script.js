const dogApiUrl = 'https://freetestapi.com/api/v1/dogs?limit=5';
const catApiUrl = 'https://freetestapi.com/api/v1/cats?limit=5';
const birdApiUrl = 'https://freetestapi.com/api/v1/birds?limit=5';

async function fetchData(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

function createCarouselItem(item, index, type) {
    const carouselItem = document.createElement('div');
    carouselItem.classList.add('carousel__item');
    if (index === 0) {
        carouselItem.classList.add('carousel__item--main');
    } else if (index === 1) {
        carouselItem.classList.add('carousel__item--right');
    } else if (index === 4) {
        carouselItem.classList.add('carousel__item--left');
    }

    const img = document.createElement('img');
    img.src = item.image;

    const text = document.createElement('div');
    text.classList.add('carousel__text');

    if (type === 'dog') {
        text.innerHTML = `
            <p>DOG</p>
            <p>Name: ${item.name}</p>
            <p>Origin: ${item.origin}</p>
        `;
    } else if (type === 'cat') {
        text.innerHTML = `
            <p>CAT</p>
            <p>Name: ${item.name}</p>
            <p>Origin: ${item.origin}</p>
        `;
    } else if (type === 'bird') {
        text.innerHTML = `
            <p>BIRD</p>
            <p>Name: ${item.name}</p>
            <p>Place of found: ${item.place_of_found}</p>
        `;
    }

    carouselItem.appendChild(img);
    carouselItem.appendChild(text);

    return carouselItem;
}

async function initializeCarousel() {
    const carousel = document.querySelector('.carousel');

    const dogData = await fetchData(dogApiUrl);
    const catData = await fetchData(catApiUrl);
    const birdData = await fetchData(birdApiUrl);

    const allData = [
        ...dogData.map(item => ({ ...item, type: 'dog' })),
        ...catData.map(item => ({ ...item, type: 'cat' })),
        ...birdData.map(item => ({ ...item, type: 'bird' }))
    ];

    allData.forEach((item, index) => {
        const carouselItem = createCarouselItem(item, index, item.type);
        carousel.appendChild(carouselItem);
    });

    setupCarouselControls();
}

function setupCarouselControls() {
    const carouselItems = document.querySelectorAll('.carousel__item');
    let currentItem = document.querySelector('.carousel__item--main');
    const leftBtn = document.querySelector('#leftBtn');
    const rightBtn = document.querySelector('#rightBtn');

    rightBtn.addEventListener('click', function () {
        currentItem = document.querySelector('.carousel__item--right');
        const leftItem = document.querySelector('.carousel__item--main');
        carouselItems.forEach((item) => {
            item.classList = 'carousel__item';
        });
        currentItem.classList.add('carousel__item--main');
        leftItem.classList.add('carousel__item--left');
        const currentId = Array.from(carouselItems).indexOf(currentItem);
        const rightItem = currentId === carouselItems.length - 1 ? carouselItems[0] : carouselItems[currentId + 1];
        rightItem.classList.add('carousel__item--right');
    });

    leftBtn.addEventListener('click', function () {
        currentItem = document.querySelector('.carousel__item--left');
        const rightItem = document.querySelector('.carousel__item--main');
        carouselItems.forEach((item) => {
            item.classList = 'carousel__item';
        });
        currentItem.classList.add('carousel__item--main');
        rightItem.classList.add('carousel__item--right');
        const currentId = Array.from(carouselItems).indexOf(currentItem);
        const leftItem = currentId === 0 ? carouselItems[carouselItems.length - 1] : carouselItems[currentId - 1];
        leftItem.classList.add('carousel__item--left');
    });
}

initializeCarousel();