from rest_framework.decorators import api_view, permission_classes
# from rest_framework.permissions import IsAuthenticated, IsAdminUser
from django.http import JsonResponse
from rest_framework.response import Response
from .serializers import ProfileSerializer, EntrySerializer, MediaSerializer
from media.models import Profile, Entry, Media

@api_view(['GET', 'POST'])
def getRoutes(request):

    routes = [
        {'GET': '/api/profiles'},
        {'GET': '/api/profile/id'},
        {'POST': '/api/profiles'},
        {'POST':'/api/profile/id'},
        {'GET': '/api/entries'},
        {'GET': '/api/entries/id'},
        {'POST': '/api/entries'},
        {'POST':'/api/entries/id'},
        {'GET': '/api/media'},
        {'GET': '/api/media/id'},
        {'POST': '/api/media'},
        {'POST':'/api/media/id'},

        {'POST': '/api/users/token'},
        {'POST': '/api/users/token/refresh'},

    ]
    return Response(routes)

@api_view(['GET', 'POST'])
def getProfiles(request):
    users = Profile.objects.all()
    serializer = ProfileSerializer(users, many=True)
    return Response(serializer.data) 

@api_view(['GET', 'POST'])
def getProfile(request, pk):
    user = Profile.objects.get(id=pk)
    serializer = ProfileSerializer(user, many=False)
    return Response(serializer.data) 

@api_view(['GET', 'POST'])
def getEntries(request):
    entries = Entry.objects.all()
    serializer = EntrySerializer(entries, many=True)
    return Response(serializer.data) 

@api_view(['GET', 'POST'])
def getEntry(request, pk):
    entry = Entry.objects.get(id=pk)
    serializer = EntrySerializer(entry, many=False)
    return Response(serializer.data)  

@api_view(['GET', 'POST'])
def getAllMedia(request):
    media = Media.objects.all()
    serializer = MediaSerializer(media, many=True)
    return Response(serializer.data) 

@api_view(['GET', 'POST'])
def getMedia(request, pk):
    media = Media.objects.get(id=pk)
    serializer = MediaSerializer(media, many=False)
    return Response(serializer.data)                            