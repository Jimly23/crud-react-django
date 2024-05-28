from django.db import models

# Create your models here.
class Buku(models.Model):
    judul = models.CharField(max_length=100)
    penulis = models.CharField(max_length=100)
    penerbit = models.CharField(max_length=100)

    def __str__(self) -> str:
        return self.judul