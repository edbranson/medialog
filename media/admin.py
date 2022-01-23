from django.contrib import admin
from .models import Media, Profile, Entry


# Register your models here

class MediaAdmin(admin.ModelAdmin):
    list_display = ('title','author','actors')
    
    search_fields = ['author','actors', 'title']

class ProfileAdmin(admin.ModelAdmin):
    list_display = ('name_first','name_last', 'cell_phone', 'email')

class EntryAdmin(admin.ModelAdmin):
    list_display = ('id', 'rating')
    list_filter = ['rating']        

admin.site.register(Media, MediaAdmin)    
admin.site.register(Profile, ProfileAdmin) 
admin.site.register(Entry, EntryAdmin) 
