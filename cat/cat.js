document.addEventListener("DOMContentLoaded", function() {
    fetch('https://freetestapi.com/api/v1/cats')
        .then(response => response.json())
        .then(data => {
            const gallery = document.getElementById('gallery');
            data.forEach(cat => {
                const figure = document.createElement('figure');
                const img = document.createElement('img');
                const caption = document.createElement('div');

                img.src = cat.image;
                img.alt = cat.name;

                caption.className = 'caption';
                caption.textContent = cat.name;

                figure.appendChild(img);
                figure.appendChild(caption);
                gallery.appendChild(figure);

                figure.addEventListener('click', () => {
                    showPopup(cat);
                });
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });

    function showPopup(cat) {
        const popup = document.getElementById('popup');
        document.getElementById('catName').textContent = cat.name;
        document.getElementById('origin').textContent = cat.origin;
        document.getElementById('temperament').textContent = cat.temperament;
        document.getElementById('colors').textContent = cat.colors;
        document.getElementById('description').textContent = cat.description;
        
        popup.style.display = 'flex';

        // button popuop
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
