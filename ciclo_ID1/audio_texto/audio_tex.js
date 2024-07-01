// Se agrega el evento 'click' 
document.getElementById('record').addEventListener('click', function() {
    // Variable para habilitar o deshabilitar el reconocimiento de voz
    var speech = true;

    // Verifica y asigna la implementación adecuada de SpeechRecognition
    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    // Nueva instancia de SpeechRecognition
    const recognition = new SpeechRecognition();
    
    recognition.lang = 'es-ES';

    // Se obtienen los resultados provisionales mientras se habla
    recognition.interimResults = true;

    // Evento para cuando hay resultados del reconocimiento de voz
    recognition.addEventListener('result', e => {
        // Obtiene y concatena los resultados de transcripción del habla
        const transcript = Array.from(e.results)
            .map(result => result[0])
            .map(result => result.transcript)
            .join('');

        // Actualiza el valor del elemento de texto convertido en la interfaz
        document.getElementById("convert_text").value = transcript;

        // Muestra la transcripción en la consola
        console.log(transcript);
    });

    // Evento para cuando el reconocimiento de voz termina
    recognition.addEventListener('end', () => {
        document.getElementById('record').textContent = 'Escuchar';
    });

    // Evento en caso de error durante el reconocimiento de voz
    recognition.addEventListener('error', (e) => {
        console.error('Se produjo un error en el reconocimiento: ', e.error);
        document.getElementById('record').textContent = 'Escuchar';
    });

    // Inicia el reconocimiento de voz si la variable 'speech' es verdadera
    if (speech === true) {
        recognition.start();
        document.getElementById('record').textContent = 'Escuchando...';
    }
});




