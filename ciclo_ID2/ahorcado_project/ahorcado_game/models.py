from django.db import models
import random

class Ahorcado(models.Model):
    #definir las palabras del juego
    palabras = [
        'Algoritmo', 'Variable', 'Funcion', 'Ciclo', 'Condicion',
        'Clase', 'Objeto', 'Metodo', 'Puntero', 'Recursividad',
        'Debugging', 'Compilador', 'Interprete', 'Javascript', 'Cadena',
        'Html', 'Java', 'Flotante', 'Booleano', 'Python'
    ]

    palabra_secreta = models.CharField(max_length=50, default='')
    letras_adivinadas = models.CharField(max_length=50, default='', blank=True)
    intentos_restantes = models.IntegerField(default=6)
    mensaje = models.CharField(max_length=200, default='', blank=True)

    def iniciar_juego(self):
        self.palabra_secreta = random.choice(self.palabras).upper() #palabra secreta aleatoria
        self.letras_adivinadas = '' 
        self.intentos_restantes = 6
        self.mensaje = ''
        self.save()

    def reiniciar_juego(self):
        self.iniciar_juego() #reiniciar para establecer una nueva palabra 
        self.save()

    def mostrar_palabra(self):
        resultado = ''
        for letra in self.palabra_secreta:
            if letra in self.letras_adivinadas:
                resultado += letra + ' ' #mostrar letras adivinadas
            else:
                resultado += '_ ' #ocultar las no adivinadas
        return resultado

    def adivinar(self, letra):
        letra = letra.upper()
        if letra in self.palabra_secreta and letra not in self.letras_adivinadas: #intento de adivinar
            self.letras_adivinadas += letra        
            self.mensaje = f'¡Bien hecho! {letra} está en la palabra.'
            self.save()
            return True  #actualiza las letras adivinadas
        else:
            self.intentos_restantes -= 1 #quitar un intento
            self.mensaje = f'Lo siento, {letra} no está en la palabra. Intentos restantes: {self.intentos_restantes}'
            self.save()
            return False

    def terminado(self):
        if all(letra in self.letras_adivinadas for letra in self.palabra_secreta): #verificar si ya estan todas las letras
            self.mensaje = '¡Felicidades, has ganado! La palabra era ' + self.palabra_secreta
            return True
        elif self.intentos_restantes <= 0: #verificar si se acabaron los intentos
            self.mensaje = '¡Has perdido! La palabra era ' + self.palabra_secreta
            return True
        return False

    def imagen_ahorcado(self):
        return f'ahorcado_game/images/hangman{6 - self.intentos_restantes}.png' #actualizar la imagen del hangman
