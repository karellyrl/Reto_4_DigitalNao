import requests  
from django.shortcuts import render  
from django.http import HttpResponse  

def index(request):
    api_key = 'c6ce32881c7ed70c73b7c9f6cc6185f3'  #clave de API TMDb
    language = 'es-LA' 
    num_pages = 10 
    poster_size = 'w200'  
    movies = []  #almacenar las películas obtenidas de la API

    for page in range(1, num_pages + 1):  #iterar sobre el rango de páginas 
        url = f'https://api.themoviedb.org/3/movie/popular?api_key={api_key}&language={language}&page={page}'
        #construir la URL para solicitar las películas 
        response = requests.get(url)  #realizar una solicitud GET a la URL construida

        if response.status_code == 200:  #verifica si la respuesta fue exitosa 
            data = response.json()  #convierte la respuesta JSON en un diccionario python

            if 'results' in data:  #verificar si la clave results está presente en los datos obtenidos
                for movie in data['results']:  #itera sobre cada película 
                    movie['poster_url'] = f"https://image.tmdb.org/t/p/{poster_size}{movie['poster_path']}"
                    #evitar agregar películas duplicadas 
                    if movie not in movies:
                        movies.append(movie)  #agrega la película a la lista de películas
            else:
                return HttpResponse('Clave "results" no encontrada en la respuesta.', status=500)
        else:
            return HttpResponse(f'Error al obtener datos de la API TMDB: {response.status_code}', status=response.status_code)
            

    return render(request, 'movies/index.html', {'movies': movies})   #renderiza el template html
  
