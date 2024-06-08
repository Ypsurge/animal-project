document.addEventListener("DOMContentLoaded", function() {
    fetch('https://freetestapi.com/api/v1/dogs')
        .then(response => response.json())
        .then(data => {
            const gallery = document.getElementById('gallery');
            data.forEach(dog => {
                const figure = document.createElement('figure');
                const img = document.createElement('img');
                const caption = document.createElement('div');

                img.src = dog.image;
                img.alt = dog.name;

                caption.className = 'caption';
                caption.textContent = dog.name;

                figure.appendChild(img);
                figure.appendChild(caption);
                gallery.appendChild(figure);

                figure.addEventListener('click', () => {
                    showPopup(dog);
                });
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });

    function showPopup(dog) {
        const popup = document.getElementById('popup');
        document.getElementById('dogName').textContent = dog.name;
        document.getElementById('breedGroup').textContent = dog.breed_group;
        document.getElementById('size').textContent = dog.size;
        document.getElementById('lifespan').textContent = dog.lifespan;
        document.getElementById('origin').textContent = dog.origin;
        document.getElementById('temperament').textContent = dog.temperament;
        document.getElementById('colors').textContent = dog.colors;
        document.getElementById('description').textContent = dog.description;
        
        popup.style.display = 'flex';

        // popup button
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
