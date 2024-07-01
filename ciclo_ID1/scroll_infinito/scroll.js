// Esperar a que se cargue completamente el DOM antes de ejecutar el código
document.addEventListener('DOMContentLoaded', () => {
    const imageContainer = document.getElementById('image-container'); // Obtener el contenedor de imágenes del DOM

    // Función para cargar imágenes de perritos
    const loadDogImages = () => {
        for (let i = 0; i < 3; i++) {
            const img = document.createElement('img'); 
            img.src = `https://placedog.net/200/200?random&t=${new Date().getTime()}`; // URL aleatoria 
            img.alt = 'Perrito'; 
            imageContainer.appendChild(img); // Agregar la imagen al contenedor en el DOM
        }
    };

    // Cargar imágenes iniciales al cargar la página
    loadDogImages();

    // Función para detectar cuando el usuario llega al final de la página
    const handleScroll = () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
            loadDogImages(); // Cargar más imágenes cuando se llega al final de la página
        }
    };

    // Agregar event listener al scroll para activar la carga adicional de imágenes
    window.addEventListener('scroll', handleScroll);
});




