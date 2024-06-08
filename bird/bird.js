document.addEventListener("DOMContentLoaded", function() {
    fetch('https://freetestapi.com/api/v1/birds')
        .then(response => response.json())
        .then(data => {
            const gallery = document.getElementById('gallery');
            data.forEach(bird => {
                const figure = document.createElement('figure');
                const img = document.createElement('img');
                const caption = document.createElement('div');

                img.src = bird.image;
                img.alt = bird.name;

                caption.className = 'caption';
                caption.textContent = bird.name;

                figure.appendChild(img);
                figure.appendChild(caption);
                gallery.appendChild(figure);

                figure.addEventListener('click', () => {
                    showPopup(bird);
                });
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });

    function showPopup(bird) {
        const popup = document.getElementById('popup');
        document.getElementById('birdName').textContent = bird.name;
        document.getElementById('species').textContent = bird.species;
        document.getElementById('family').textContent = bird.family;
        document.getElementById('habitat').textContent = bird.habitat;
        document.getElementById('placeOfFound').textContent = bird.place_of_found;
        document.getElementById('diet').textContent = bird.diet;
        document.getElementById('description').textContent = bird.description;
        document.getElementById('wingspanCm').textContent = bird.wingspan_cm;
        document.getElementById('weightKg').textContent = bird.weight_kg;
        
        popup.style.display = 'flex';

        // button popup
        document.querySelector('.close-btn').addEventListener('click', () => {
            popup.style.display = 'none';
        });

        window.addEventListener('click', (event) => {
            if (event.target === popup) {
                popup.style.display = 'none';
            }
        });
    }
});
