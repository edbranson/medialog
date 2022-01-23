import json

from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse, HttpResponseRedirect
from django.urls import reverse, reverse_lazy
from django.views import generic
from django.views import View
from .models import Media, Profile, Entry
from datetime import date
from django.db import models
from django.http import JsonResponse
from django.core import serializers
from django.views.decorators.csrf import csrf_protect

# Create your views here.
class GetUsers(View):
    def get(self, request):
        qUsers = Profile.objects.all()
        data = {}
        users = []
        for obj in qUsers:
            users.append({
                "id": obj.id,
                "firstName": obj.name_first,
                "lastName": obj.name_last,
                "cellPhone": obj.cell_phone,
                "email": obj.email,
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


class AddEntry(View):
    def get(self, request):
        return render(request, 'entrydetail.html')
    
    def post(self, request):
        # import  pdb; pdb.set_trace() # python debugger
        post = json.loads(request.body.decode('utf-8'))
        
        id1 = post.get('id', None)
        user1 = post.get('user', None)
        media1 = post.get('media', None)
        title1 = post.get('title', None)
        author1 = post.get('author', None)
        actors1 = post.get('actors', None)
        subject1 = post.get('subject', None)
        reader1 = post.get('reader', None)
        type1 = post.get('type', None)
        audience1 = post.get('audience', None)
        promodesc1 = post.get('promodesc', None)
        source1 = post.get('source', None)
        rating1 = post.get('rating', None)
        mycomment1 = post.get('mycomment', None)
        recommended1 = post.get('recommended', None)
        status1 = post.get('status', None)
        datestarted1 = post.get('datestarted', None)
        datefinished1 = post.get('datefinished', None)
        objEntry = Entry.objects.get(id=id1)
        objMedia = Media.objects.get(id=media1)
        objUser = User.objects.get(id=user1)
        objMedia.title = title1
        objMedia.author = author1
        objMedia.actors = actors1
        objMedia.subject = subject1
        objMedia.reader = reader1
        objMedia.media_type = type1
        objMedia.audience = audience1
        objMedia.promo_desc = promodesc1
        objEntry.source = source1
        objEntry.rating = rating1
        objEntry.mycomment = mycomment1
        objEntry.recommended_by = recommended1
        objEntry.status = status1
        objEntry.date_started = datestarted1
        objEntry.date_finished = datefinished1

        objEntry.save()
        objMedia.save()

        entry = {'id': objEntry.id, 'user': objUser.id, 'media': objMedia.id, 'title': objMedia.title,'author': objMedia.author, 'actors': objMedia.actors, 'subject': objMedia.subject, 'reader': objMedia.reader, 'type': objMedia.media_type, 'audience': objMedia.audience, 'promodesc': objMedia.promo_desc, 'source': objEntry.source, 'rating': objEntry.rating, 'mycomment': objEntry.my_comment, 'recommended': objEntry.recommended_by, 'status': objEntry.status, 'datestarted': objEntry.date_started, 'datefinished': objEntry.date_finished}

        data = {
            'entry': entry
            }
        print(data)
        return JsonResponse(data)


class UpdateEntry(View):
    # def get(self, request):
    #     entry = Entry.objects.get(id=pk)
    #     context = {'entry': entry}
    #     print(context)
    #     return render(request, 'entrydetail.html', context)

    def post(self, request):
        # import  pdb; pdb.set_trace() # python debugger

        post = json.loads(request.body.decode('utf-8'))
        id1 = post.get('id', None)
        user1 = post.get('user', None)
        media1 = post.get('media', None)
        title1 = post.get('title', None)
        author1 = post.get('author', None)
        actors1 = post.get('actors', None)
        subject1 = post.get('subject', None)
        reader1 = post.get('reader', None)
        type1 = post.get('type', None)
        audience1 = post.get('audience', None)
        promodesc1 = post.get('promodesc', None)
        source1 = post.get('source', None)
        rating1 = post.get('rating', None)
        mycomment1 = post.get('mycomment', None)
        recommended1 = post.get('recommended', None)
        status1 = post.get('status', None)
        datestarted1 = post.get('datestarted', None)
        datefinished1 = post.get('datefinished', None)
        objEntry = Entry.objects.get(id=id1)
        objMedia = Media.objects.get(id=media1)
        objUser = Profile.objects.get(id=user1)
        objMedia.title = title1
        objMedia.author = author1
        objMedia.actors = actors1
        objMedia.subject = subject1
        objMedia.reader = reader1
        objMedia.media_type = type1
        objMedia.audience = audience1
        objMedia.promo_desc = promodesc1
        objEntry.source = source1
        objEntry.rating = rating1
        objEntry.mycomment = mycomment1
        objEntry.recommended_by = recommended1
        objEntry.status = status1
        objEntry.date_started = datestarted1
        objEntry.date_finished = datefinished1

        objEntry.save()
        objMedia.save()

        entry = {'id': objEntry.id, 'user': objUser.id, 'media': objMedia.id, 'title': objMedia.title,'author': objMedia.author, 'actors': objMedia.actors, 'subject': objMedia.subject, 'reader': objMedia.reader, 'type': objMedia.media_type, 'audience': objMedia.audience, 'promodesc': objMedia.promo_desc, 'source': objEntry.source, 'rating': objEntry.rating, 'mycomment': objEntry.my_comment, 'recommended': objEntry.recommended_by, 'status': objEntry.status, 'datestarted': objEntry.date_started, 'datefinished': objEntry.date_finished}

        data = {
            'entry': entry
            }
        print(data)
        return JsonResponse(data)
