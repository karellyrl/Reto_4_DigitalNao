from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('codigo/<str:codigo>/', views.codigo_detail, name='codigo_detail'),
]





