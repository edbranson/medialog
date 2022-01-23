from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse, HttpResponseRedirect
from django.urls import reverse, reverse_lazy
from django.views import generic
from django.views import View
from .models import Media, User, Entry
from datetime import date
from django.db import models
from django.http import JsonResponse
from django.core import serializers
from django.views.decorators.csrf import csrf_protect

# Create your views here.
class GetUsers(View):
    def get(self, request):
        qUsers = User.objects.all()
        data = {}
        users = []
        for obj in qUsers:
            users.append({
                "id": obj.id,
                "firstName": obj.name_first,
                "lastName": obj.name_last,
                "cellPhone": obj.cell_phone,
                "email": obj.email,
                "address": obj.address,
                "yearOfBirth": obj.year_of_birth,
            })
        data['qUsers'] = users
        return JsonResponse(data)


class GetMedia(View):
    def get(self, request):
        qMedia = Media.objects.all()
        data = {}
        media = []
        for obj in qMedia:
            media.append({
                "title": obj.title,
                "author": obj.author,
                "actors": obj.actors,
                "subject": obj.subject,
                "reader": obj.reader,
                "mediaType": obj.media_type,
                "audience": obj.audience,
                "promoDesc": obj.promo_desc
            })
        # print(len(media))
        data['qMedia'] = media
        return JsonResponse(data)


class GetEntries(View):
    def get(self, request):
        qEntries = Entry.objects.all()
        data = {}
        entries = []
        for obj in qEntries:
            entries.append({
                "id": obj.id,
                "user": obj.user.id,
                "userFirstName": obj.user.name_first,
                "userLastName": obj.user.name_last,
                "media": obj.media.id,
                "title": obj.media.title,
                "author": obj.media.author,
                "actors": obj.media.actors,
                "subject": obj.media.subject,
                "reader": obj.media.reader,
                "type": obj.media.media_type,
                "audience": obj.media.audience,
                "promoDesc": obj.media.promo_desc,
                "source": obj.source,
                "rating": obj.rating,
                "myComment": obj.mycomment,
                "recommendedBy": obj.recommended_by,
                "status": obj.status,
                "dateStarted": obj.date_started,
                "dateFinished": obj.date_finished
            })
        data['qEntries'] = entries
        return JsonResponse(data)


class Home(View):

    def get(self, request):
        return render(request, "home.html")


class UpdateEntry(View):
    def post(self, request):
        print(request)
        print("beginning of UpdateEntry View")
        id1 = request.POST.get('id')
        user1 = request.POST.get('user')
        media1 = request.POST.get('media')
        print((id1, user1, media1))
        title1 = request.POST.get('title')
        author1 = request.POST.get('author')
        actors1 = request.POST.get('actors')
        subject1 = request.POST.get('subject')
        rating1 = request.POST.get('rating')
        objEntry = Entry.objects.get(id=id1)
        objMedia = Media.objects.get(id=media1)
        objUser = User.objects.get(id=user1)
        objMedia.title = title1
        print(objMedia.title)
        objMedia.author = author1
        objMedia.actors = actors1
        objMedia.subject = subject1
        objEntry.rating = rating1
        print(objMedia.actors)
        print(objMedia.id)
        objEntry.save()
        objMedia.save()

        entry = {'id': objEntry.id, 'user': objUser.id, 'media': objMedia.id, 'title': objMedia.title,'author': objMedia.author, 'actors': objMedia.actors, 'subject': objMedia.subject, 'rating': objEntry.rating}

        data = {
            'entry': entry
            }
        print(data)
        return JsonResponse(data)
