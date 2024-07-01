// Función para calcular el tiempo restante hasta una fecha específica
function getTimeRemaining(endtime) {
    const total = (Date.parse(endtime) - Date.now()) / 1000;
    
    // Calcula los segundos, minutos, horas y días restantes
    const seconds = Math.floor(total % 60);
    const minutes = Math.floor((total / 60) % 60);
    const hours = Math.floor((total / 3600) % 24);
    const days = Math.floor(total / 3600 / 24);

    return { total, days, hours, minutes, seconds };
}

// Función para inicializar un reloj de cuenta regresiva
function initializeClock(id, endtime) {
    // Obtiene los elementos del DOM 
    const daysC = document.getElementById('days');
    const hoursC = document.getElementById('hours');
    const minutesC = document.getElementById('minutes');
    const secondsC = document.getElementById('seconds');

    // Función para actualizar el reloj en la interfaz de usuario
    function updateClock() {
        const t = getTimeRemaining(endtime);

        // Actualiza los elementos del DOM con los valores calculados
        daysC.innerHTML = t.days + 'd';
        hoursC.innerHTML = t.hours + 'h';
        minutesC.innerHTML = t.minutes + 'm';
        secondsC.innerHTML = t.seconds + 's';

        // Detiene el intervalo si el tiempo total restante es menor o igual a cero
        if (t.total <= 0) {
            clearInterval(timeinterval); 
    }
}

    updateClock();

    // Intervalo de tiempo para llamar a updateClock cada segundo 
    const timeinterval = setInterval(updateClock, 1000);
}

// Calcula la fecha para el próximo año desde la fecha actual
const nextYear = new Date(Date.parse(new Date().getFullYear() + 1, 0, 1));

initializeClock('countdown', nextYear);



