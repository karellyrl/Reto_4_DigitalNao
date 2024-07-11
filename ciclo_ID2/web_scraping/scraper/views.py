import requests  
from bs4 import BeautifulSoup  
from django.shortcuts import render  
from django.http import HttpResponse 

def scrape(request):
    url = 'https://listado.mercadolibre.com.mx/maquillaje#trends_tracking_id=dc8e73ea-c38a-4495-82bd-ed7c547df1f1&component_id=HIGHER_GROWTH'
    productos = []  # lista para almacenar los productos 

    #iterar a traves de las paginas 
    for page in range(1, 4):  
        params = {'page': page}  #paremetros de la URL para paginación
        respuesta = requests.get(url, params=params)  #solicitud HTTP con los parametros

        if respuesta.status_code == 200:  #verificar si la solicitud fue exitosa
            soup = BeautifulSoup(respuesta.content, 'html.parser')  #crea un objeto bs para analizar el contenido html

            #iterar sobre cada elemento de producto en la pagina
            for item in soup.select('.ui-search-result__wrapper'):
                titulo_elem = item.select_one('.ui-search-item__title')  #titulo del producto
                precio_elem = item.select_one('.ui-search-price__second-line .andes-money-amount__currency-symbol')  #precio del producto
                precio = ''
                if precio_elem:
                    precio += precio_elem.get_text(strip=True)  #símbolo del precio

                    fraccion_elem = item.select_one('.ui-search-price__second-line .andes-money-amount__fraction')  # fraccion del precio
                    if fraccion_elem:
                        precio += fraccion_elem.get_text(strip=True)  # parte entera del precio

                        centavos_elem = item.select_one('.ui-search-price__second-line .andes-money-amount__cents')  #centavos del precio
                        if centavos_elem:
                            precio += '.' + centavos_elem.get_text(strip=True)  

                else:
                    precio = 'Precio no listado'  #mensaje por si no se encuentra el elemento

                rating_elem = item.select_one('.ui-search-reviews__rating-number')  #calificacion del producto
                rating = rating_elem.get_text(strip=True) if rating_elem else 'Rating no disponible'  #obtiene la calificacion

                enlace = item.select_one('.ui-search-link')['href']  #enlace al producto
                imagen_elem = item.select_one('.ui-search-result__image img')  #imagen del producto
                imagen = imagen_elem['data-src'] if imagen_elem else 'Imagen no disponible'  # obtiene la url 

                #añade el producto con sus datos
                productos.append({
                    'title': titulo_elem.get_text(strip=True) if titulo_elem else 'No hay título disponible',
                    'price': precio,
                    'rating': rating,
                    'link': enlace,
                    'image': imagen
                })

        else:
            return HttpResponse(f'Error al obtener datos de Mercado Libre en la página {page}: {respuesta.status_code}', status=respuesta.status_code)  #mensaje de error si la solicitud no fue exitosa

    return render(request, 'scraper/products.html', {'products': productos})  #renderiza la plantilla html
