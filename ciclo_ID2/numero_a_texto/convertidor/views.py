from django.shortcuts import render  
from django.http import HttpResponse  

class NumeroATexto:
    def __init__(self, numero):
        self.numero = numero  #número a convertir
        self.unidades = ["", "uno", "dos", "tres", "cuatro", "cinco", "seis", "siete", "ocho", "nueve"]  
        self.decenas = ["", "diez", "veinte", "treinta", "cuarenta", "cincuenta", "sesenta", "setenta", "ochenta", "noventa"]  
        self.centenas = ["", "ciento", "doscientos", "trescientos", "cuatrocientos", "quinientos", "seiscientos", "setecientos", "ochocientos", "novecientos"]  
        self.num_diferentes = ["diez", "once", "doce", "trece", "catorce", "quince", "dieciséis", "diecisiete", "dieciocho", "diecinueve"] 
        self.miles = ["", "mil", "millón"]  #

    def convertir_a_texto(self, numero=None):
        if numero is None:
            numero = self.numero  
        if not 1 <= numero <= 1000000:  #verifica que el número esté dentro del rango válido
            return "Número fuera de rango"
        if numero < 10:
            return self.unidades[numero]  #devuelve la palabra para los números del 1 al 9
        elif numero < 20:
            return self.num_diferentes[numero - 10]  #devuelve la palabra para los números del 10 al 19
        elif numero < 100:
            if numero % 10 == 0:
                return self.decenas[numero // 10]  #devuelve la palabra para las decenas exactas(20, 30, ...)
            else:
                return f"{self.decenas[numero // 10]} y {self.unidades[numero % 10]}"  # combinación de decenas y unidades 
        elif numero < 1000:
            centena = self.centenas[numero // 100]  
            resto = numero % 100
            if resto == 0:
                if numero // 100 == 1:
                    return "cien"  #indicar cien para el número 100
                else:
                    return centena  #devuele la palabra para la centena exacta (200, 300, ...)
            elif resto < 10:
                return f"{centena} {self.unidades[resto]}"  #combinación de centenas y unidades 
            elif resto < 20:
                return f"{centena} {self.num_diferentes[resto - 10]}"  #combinación de centenas y números del 10 al 19 
            elif resto % 10 == 0:
                return f"{centena} {self.decenas[resto // 10]}"  #combinación de centenas y decenas exactas 
            else:
                return f"{centena} {self.decenas[resto // 10]} y {self.unidades[resto % 10]}"  #combinación de centenas, decenas y unidades
        else:
            palabras = []
            indice = 0
            while numero > 0: 
                segmento = numero % 1000 #verificar si el numero es mayor o igual a 1000
                if segmento != 0:
                    if indice == 1:
                        if segmento == 1:
                            palabras.insert(0, "mil")  
                        else:
                            palabras.insert(0, self.convertir_a_texto(segmento) + " " + self.miles[indice])  
                    else:
                        palabras.insert(0, self.convertir_a_texto(segmento) + " " + self.miles[indice])  
                numero //= 1000
                indice += 1

            resultado = " ".join(palabras).strip()  #unir las palabras 
            resultado = resultado.replace("uno millón", "un millón")  #cambiar  el uno a un

            return resultado

def index(request):
    if request.method == 'POST':
        numero = int(request.POST['numero'])  # obtener el número 
        convertidor = NumeroATexto(numero)  
        resultado = convertidor.convertir_a_texto()  #usar el método
        return render(request, 'convertidor/index.html', {'resultado': resultado})  
    return render(request, 'convertidor/index.html')  
