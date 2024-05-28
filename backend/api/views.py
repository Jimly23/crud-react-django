from django.shortcuts import render
from rest_framework import generics
from .serializers import BukuSerializer
from .models import Buku

# Create your views here.

class BukuListCreateView(generics.ListCreateAPIView):
    queryset = Buku.objects.all()
    serializer_class = BukuSerializer

class BukuDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Buku.objects.all()
    serializer_class = BukuSerializer