const canvas = document.getElementById('canvas');  //obtener el elemento canvas del html
const context = canvas.getContext('2d');  
//definir  herramientas del dibujo
let painting = false; 
let erasing = false;   
let color = 'black';   
let lineWidth = 5;     
let brushType = 'marker';  

//funcion para iniciar el dibujo al presionar el mouse sobre el canvas
function startPosition(e) {
    painting = true;
    draw(e);  
}

//función para finalizar el dibujo al soltar el mouse
function endPosition() {
    painting = false;
    context.beginPath(); 
}

//funcion principal de dibujo 
function draw(e) {
    if (!painting) return;  //no hacer nada si no se esta dibujando
    
    context.lineWidth = lineWidth;  // establece el grosor del trazo
    context.lineCap = 'round';  // define el estilo de la punta del trazo
    context.strokeStyle = erasing ? 'white' : color;  // define borrador usando el color blanco

    //seleccion del tipo de pincel
    switch (brushType) {
        case 'marker':
            drawMarker(e);  
            break;
        case 'spray':
            drawSpray(e);   
            break;
        case 'crayon':
            drawCrayon(e);  
            break;
        case 'watercolor':
            drawWatercolor(e); 
            break;
        default:
            drawMarker(e);  // por defecto se usa el marcador
    }
}

//funcion para dibujar con el pincel de tipo marcador
function drawMarker(e) {
    context.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop); // dibuja una linea hasta la posicion actual del mouse
    context.stroke();  //dibuja el trazo
    context.beginPath();  //nuevo trazo
    context.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);  //mueve el punto de inicio del nuevo trazo
}

//funcion para dibujar con el pincel de tipo spray
function drawSpray(e) {
    context.fillStyle = color;  //color de relleno
    for (let i = 0; i < 30; i++) {
        const offsetX = (Math.random() - 0.5) * 20;  //desplazamiento aleatorio en x
        const offsetY = (Math.random() - 0.5) * 20;  //desplazamiento aleatorio en y
        context.fillRect(e.clientX - canvas.offsetLeft + offsetX, e.clientY - canvas.offsetTop + offsetY, 1, 1);  //dibuja un pequeño rectangulo 
    }
}

//funcion para dibujar con el pincel de tipo crayon
function drawCrayon(e) {
    context.fillStyle = color;  //color de relleno
    for (let i = 0; i < 5; i++) {
        const offsetX = (Math.random() - 0.5) * 10;  //desplazamiento aleatorio en x
        const offsetY = (Math.random() - 0.5) * 10;  //desplazamiento aleatorio en y
        context.fillRect(e.clientX - canvas.offsetLeft + offsetX, e.clientY - canvas.offsetTop + offsetY, 2, 2);  //dibuja un pequeño rectangulo
    }
}

//función para dibujar con el pincel de tipo acuarela
function drawWatercolor(e) {
    context.globalAlpha = 0.2;  //opacidad global
    context.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);  //dibuja una linea hasta la posición actual del mouse
    context.stroke();  // dibuja el trazo
    context.beginPath();  //nuevo trazo
    context.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);  //mueve el punto de inicio del nuevo trazo
    context.globalAlpha = 1.0;  // restablecer la opacidad global
}

// Event listeners para eventos del mouse y cambios en elementos de interfaz

canvas.addEventListener('mousedown', startPosition);  // se usa la funcion startPosition al presionar el mouse
canvas.addEventListener('mouseup', endPosition);      // se llama a la funcion endPosition al soltar el mouse 
canvas.addEventListener('mousemove', draw);           // se llama a la funcion draw al mover el mouse

document.getElementById('colorPicker').addEventListener('change', (e) => {
    color = e.target.value;  // cambia el color de dibujo 
});

document.getElementById('lineWidth').addEventListener('change', (e) => {
    lineWidth = e.target.value;  //cambia el grosor de dibujo 
});

document.getElementById('erase').addEventListener('click', () => {
    erasing = !erasing;  //modo de borrado 
});

document.getElementById('clear').addEventListener('click', () => {
    context.clearRect(0, 0, canvas.width, canvas.height);  // borra todo el contenido 
});

document.getElementById('brushType').addEventListener('change', (e) => {
    brushType = e.target.value;  // cambia el tipo de pincel 
});

document.getElementById('save').addEventListener('click', () => {
    const dataURL = canvas.toDataURL('image/png');  // convierte el contenido del canvas a imagen png
    fetch('/save/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-CSRFToken': getCookie('csrftoken')  //bbtiene el token csrf del navegador
        },
        body: 'image=' + encodeURIComponent(dataURL)  //envia la imagen codificada como datos 
    })
    .then(response => response.json())  // procesa la respuesta como json
    .then(data => {
        if (data.status === 'éxito') {
            alert('Dibujo guardado!');  // muestra una alerta si el guardado fue exitoso
        } else {
            alert('Falla para guardar el dibujo.');  // muestra una alerta si hubo una falla al guardar
        }
    });
});

//funcion para obtener el valor de una cookie especifica por su nombre
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');  // divide la cadena de cookies en un arreglo
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();  // obtiene una cookie y elimina espacios en blanco al inicio y al final
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));  // decodifica el valor de la cookie
                break;
            }
        }
    }
    return cookieValue;  // retorna el valor de la cookie
}
