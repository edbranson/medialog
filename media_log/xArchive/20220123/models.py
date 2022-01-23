from django.db import models
from django.urls import reverse



# Create your models here.

class Profile(models.Model):
    name_first = models.CharField(max_length=20)
    name_last = models.CharField(max_length=25)
    cell_phone = models.CharField(max_length=15)
    email = models.EmailField()



class Media(models.Model):
    TEXT = 'TEXT'
    VIDEO = 'VIDEO'
    AUDIBLE = 'AUDIBLE'
    MEDIA_CHOICES = [(TEXT, 'Text'), (VIDEO, 'Video'), (AUDIBLE, 'Audible')]
    title = models.CharField(max_length=100)
    author = models.CharField(max_length=100, blank=True)
    actors = models.CharField(max_length=200, blank=True)
    subject = models.CharField(max_length=30, blank=True)
    reader = models.CharField(max_length=100, blank=True)
    media_type = models.CharField(max_length=10, choices=MEDIA_CHOICES)
    audience = models.CharField(max_length=30, blank=True)
    promo_img = models.ImageField(blank=True)
    promo_desc = models.TextField(max_length=10000, blank=True)


class Entry(models.Model):
    FINISHED = 'FINISHED'
    STARTED = 'STARTED'
    WISHLIST = 'WISHLIST'
    STATUS_CHOICES = [(FINISHED, 'Finished'), (STARTED, 'Started'), (WISHLIST, 'Wish List')]
    user = models.ForeignKey(Profile, on_delete=models.PROTECT, default="")
    media = models.ForeignKey(Media, on_delete=models.PROTECT, default="")
    source = models.CharField(max_length=25, blank=True)
    rating = models.DecimalField(decimal_places=2, max_digits=3)
    mycomment = models.CharField(max_length= 100, blank=True)
    recommended_by = models.CharField(max_length=30, blank=True)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES)
    date_started = models.DateField(blank=True, null=True)
    date_finished = models.DateField(blank=True, null=True)
# Create your models here.
