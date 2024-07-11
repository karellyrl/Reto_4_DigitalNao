# ahorcado_game/urls.py

from django.urls import path
from . import views

urlpatterns = [
    path('', views.jugar_ahorcado, name='jugar_ahorcado'),
]
