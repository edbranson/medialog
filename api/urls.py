from django.urls import path
from . import views

# from rest_framework_simplejwt.views import (
#     TokenObtainPairView,
#     TokenRefreshView,
# )

urlpatterns = [
    path('', views.getRoutes),
    path('profiles/', views.getProfiles),
    path('profiles/<str:pk>', views.getProfile),
    path('media/', views.getAllMedia),
    path('media/<str:pk>', views.getMedia),
    path('entries/', views.getEntries),
    path('entries/<str:pk>', views.getEntry),
]