# from django.contrib.auth.models import User, Group
from rest_framework import serializers
from media.models import Profile, Entry, Media

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'

class MediaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Media       
        fields = '__all__'

class EntrySerializer(serializers.ModelSerializer):
    user = ProfileSerializer(many=False)
    media = MediaSerializer(many=False)
    class Meta:
        model = Entry
        fields = '__all__'
