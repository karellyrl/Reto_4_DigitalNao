# views.py

from django.shortcuts import render, redirect
from .models import Ahorcado

def jugar_ahorcado(request):
    juego, creado = Ahorcado.objects.get_or_create(id=1)
    
    #verificar si se reinicio
    if request.GET.get('reiniciar'):
        juego.reiniciar_juego() 
        return redirect('jugar_ahorcado')  # redirigir 

    #verificar un intento de adivinar
    if request.method == 'POST':
        letra = request.POST.get('letra')
        if letra:
            juego.adivinar(letra)
        if juego.terminado(): # realizar finalizacion del juego
            context = {
                'juego': juego,
                'fin_juego': True,
                'imagen_ahorcado': juego.imagen_ahorcado(),
            }
            return render(request, 'ahorcado_game/jugar.html', context)

    #preparar el contexto 
    context = {
        'juego': juego,
        'imagen_ahorcado': juego.imagen_ahorcado(),
    }
    return render(request, 'ahorcado_game/jugar.html', context)
