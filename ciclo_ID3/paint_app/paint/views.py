from django.shortcuts import render  
from django.http import JsonResponse
import base64  

def index(request):
    return render(request, 'paint/index.html')  # renderiza la plantilla de html

def save_painting(request):
    if request.method == 'POST':  # verificar que la solicitud sea de tipo post
        data = request.POST.get('image')  # obtiene los datos de la imagen codificada 
        format, imgstr = data.split(';base64,')  #eepara el formato de la imagen y los datos
        ext = format.split('/')[-1]  # obtiene la extension de archivo 
        img_data = base64.b64decode(imgstr)  # decodifica los datos base64 a bytes de imagen
        with open(f"paint/static/paint/images/painting.{ext}", "wb") as f:  # abre un archivo binario para escribir la imagen decodificada
            f.write(img_data)  # escribe los datos de la imagen en el archivo
        return JsonResponse({'status': 'éxito'})  # respuesta indicando exito al guardar la imagen
    return JsonResponse({'status': 'falla'})  # respuesta indicando falla si la solicitud no es de tipo post
