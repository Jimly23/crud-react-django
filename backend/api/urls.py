from django.urls import path
from .views import BukuDetailView, BukuListCreateView

urlpatterns = [
    path('buku/', BukuListCreateView.as_view(), name='list-buku'),
    path('buku/<int:pk>', BukuDetailView.as_view(), name='cek-buku')
]