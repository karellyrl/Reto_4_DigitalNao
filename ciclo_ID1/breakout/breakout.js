let score = 0; // Variable para almacenar el puntaje inicial del jugador

// Clase Ball (Pelota)
class Ball {
    constructor(x, y, radio, velX, velY) {
        this.x = x; 
        this.y = y; 
        this.radio = radio; 
        this.velX = velX; 
        this.velY = velY; 
    }

    // Método para dibujar la pelota en el canvas
    draw(context) {
        context.beginPath();
        context.arc(this.x, this.y, this.radio, 0, Math.PI * 2);
        context.fillStyle = '#098D05'; 
        context.fill();
        context.closePath();
    }

    // Método para actualizar la posición de la pelota
    update() {
        this.x += this.velX;
        this.y += this.velY;
    }
}

// Clase Paddle 
class Paddle {
    constructor(x, y, width, height, speed) {
        this.x = x; 
        this.y = y; 
        this.width = width; 
        this.height = height; 
        this.speed = speed;
    }

    // Método para dibujar el paddle en el canvas
    draw(context) {
        context.beginPath();
        context.rect(this.x, this.y, this.width, this.height);
        context.fillStyle = 'brown'; 
        context.fill();
        context.closePath();
    }

    // Método para mover el paddle en respuesta a las teclas de dirección
    move(direction) {
        this.x += this.speed * direction;
        // Limitar el movimiento dentro del canvas
        if (this.x < 0) {
            this.x = 0;
        } else if (this.x + this.width > canvas.width) {
            this.x = canvas.width - this.width;
        }
    }

    // Método para detectar colisión con la pelota en la parte superior del paddle
    collidesWith(ball) {
        return ball.x > this.x && ball.x < this.x + this.width && ball.y + ball.radio > this.y && ball.y - ball.radio < this.y + this.height;
    }
}

// Clase Brick 
class Brick {
    constructor(x, y, width, height) {
        this.x = x; 
        this.y = y; 
        this.width = width; 
        this.height = height; 
        this.broken = false; 
    }

    // Método para dibujar el ladrillo en el canvas
    draw(context) {
        if (!this.broken) {
            context.beginPath();
            context.rect(this.x, this.y, this.width, this.height);
            context.fillStyle = '#FFFDA4';
            context.fill();
            context.closePath();
        }
    }
}

// Clase Game 
class Game {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId); // Obtener el elemento canvas del HTML
        this.context = this.canvas.getContext('2d'); 
        this.canvas.width = 600; // Ajustar el ancho del canvas
        this.canvas.height = 500; // Ajustar el alto del canvas
        this.ball = new Ball(400, 300, 20, 2, -2); 
        this.paddle = new Paddle((this.canvas.width - 75) / 2, this.canvas.height - 20, 140, 20, 5); 
        this.bricks = []; 
        this.createBricks(); 
    }

    // Método para crear los ladrillos en filas y columnas
    createBricks() {
        const rows = 8; // Número de filas de ladrillos
        const cols = 10; // Número de columnas de ladrillos
        const brickWidth = 65; // Ancho de cada ladrillo
        const brickHeight = 25; // Alto de cada ladrillo
        const padding = 10; // Espacio entre ladrillos
        const offsetTop = 30; // Margen superior para los ladrillos
        const totalBricksWidth = cols * (brickWidth + padding) - padding; // Ancho total ocupado por todos los ladrillos más espacios
        const offsetLeft = (this.canvas.width - totalBricksWidth) / 2; // Centrar los ladrillos en el canvas

        // Crear los ladrillos 
        for (let c = 0; c < cols; c++) {
            for (let r = 0; r < rows; r++) {
                const x = c * (brickWidth + padding) + offsetLeft;
                const y = r * (brickHeight + padding) + offsetTop;
                this.bricks.push(new Brick(x, y, brickWidth, brickHeight)); // Agregar cada ladrillo al arreglo
            }
        }
    }

    // Método para dibujar todos los elementos del juego en el canvas
    draw() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height); // Limpiar el canvas
        this.ball.draw(this.context); // Dibujar la pelota
        this.paddle.draw(this.context); // Dibujar la paleta
        this.bricks.forEach(brick => brick.draw(this.context)); 
        this.drawScore(); 
    }

    // Mostrar el puntaje del jugador
    drawScore() {
        document.getElementById('score').textContent = "Score: " + score; // Mostrar el puntaje actualizado en el HTML
    }

    // Método para actualizar la lógica del juego 
    update() {
        this.ball.update(); // Actualizar la posición de la pelota

        // Controlar colisiones con las paredes del canvas
        if (this.ball.x + this.ball.velX > this.canvas.width - this.ball.radio || this.ball.x + this.ball.velX < this.ball.radio) {
            this.ball.velX = -this.ball.velX; // Invertir la velocidad en el eje X al chocar con los bordes horizontales
        }
        if (this.ball.y + this.ball.velY < this.ball.radio) {
            this.ball.velY = -this.ball.velY; 
        } else if (this.ball.y + this.ball.velY > this.canvas.height - this.ball.radio) {
            // Controlar colisión con la paleta
            if (this.paddle.collidesWith(this.ball)) {
                this.ball.velY = -this.ball.velY; // Invertir la velocidad en el eje Y al chocar con el paddle
                this.ball.y = this.paddle.y - this.ball.radio; 
            } else {
                // Game Over si la pelota se escapa por debajo del paddle
                alert('Game Over');
                this.reset(); 
            }
        }

        // Controlar colisiones con los ladrillos
        this.bricks.forEach(brick => {
            if (!brick.broken && this.ball.x > brick.x && this.ball.x < brick.x + brick.width && this.ball.y > brick.y && this.ball.y < brick.y + brick.height) {
                this.ball.velY = -this.ball.velY; // Invertir la velocidad en el eje Y al chocar con un ladrillo
                brick.broken = true; // Marcar el ladrillo como roto
                score += 10; // Aumentar el puntaje del jugador
            }
        });
    }

    // Método para reiniciar el juego
    reset() {
        score = 0; 
        this.ball.x = this.paddle.x + (this.paddle.width / 2); 
        this.ball.y = this.paddle.y - this.ball.radio; 
        this.bricks.forEach(brick => brick.broken = false); 
        this.draw();
    }

    // Método para iniciar el juego
    start() {
        // Escuchar eventos de teclado para mover el paddle
        document.addEventListener("keydown", (e) => {
            if (e.key === "ArrowLeft") {
                this.paddle.move(-1); 
            } else if (e.key === "ArrowRight") {
                this.paddle.move(1); 
            }
        });

        // Detener el movimiento del paddle al soltar la tecla de dirección
        document.addEventListener("keyup", (e) => {
            if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
                this.paddle.move(0); 
            }
        });

        // Bucle principal del juego usando requestAnimationFrame para animación 
        const loop = () => {
            this.update(); 
            this.draw(); 
            requestAnimationFrame(loop); 
        };
        loop(); 
    }
}

// Inicialización del juego al cargar el script
const game = new Game('gameCanvas'); 
game.start(); 




