"""The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path

from media import views 
from django.urls import include
from django.views.generic import RedirectView

from django.conf import settings
from django.conf.urls.static import static
from django.contrib.staticfiles.urls import staticfiles_urlpatterns



urlpatterns = [
    path('users/', views.GetUsers.as_view(), name = 'users'),
    path('media/', views.GetMedia.as_view(), name = 'media'),
    path('entries/', views.GetEntries.as_view(), name = 'entries'),
    path('update/', views.UpdateEntry.as_view(), name = 'entry-update'),
    path('add/', views.AddEntry.as_view(), name = 'entry-add'),
    path('', views.Home.as_view(), name ='home'),
]


# urlpatterns += staticfiles_urlpatterns()