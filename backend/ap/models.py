from django.db import models

# Create your models here.

class MenuItem(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    price = models.DecimalField(max_digits=6, decimal_places=2)
    image = models.URLField()
    category = models.CharField(max_length=50)
    popular = models.BooleanField(default=False)

    def __str__(self):
        return self.name