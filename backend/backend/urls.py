"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
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
from django.conf.urls import url
from django.contrib import admin
from django.urls import path
from rest_framework_jwt.views import obtain_jwt_token

from HabitRabbit import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('member/list', views.member_list),
    path('member/create', views.member_form_create),
    path('member/<int:pk>/get', views.member_form_get),
    path('member/<int:pk>/update', views.member_form_update),
    path('member/<int:pk>/delete', views.member_delete),
    path('habit/list', views.habit_list),
    path('habit/create', views.habit_form_create),
    path('habit/<int:pk>/get', views.habit_form_get),
    path('habit/<int:pk>/update', views.habit_form_update),
    path('habit/<int:pk>/delete', views.habit_delete),
    path('type/list', views.type_list),
    path('type/create', views.type_create),
    path('type/<int:pk>/get', views.type_form_get),
    path('type/<int:pk>/update', views.type_form_update),
    path('type/<int:pk>/delete', views.type_delete),
    path('message/list', views.message_list),
    path('message/create', views.message_create),
    path('message/<int:pk>/get', views.message_form_get),
    path('message/<int:pk>/update', views.message_form_update),
    path('message/<int:pk>/delete', views.message_delete),
    path('profilepicture/list', views.profilepicture_list),
    path('profilepicture/create', views.profilepicture_create),
    path('profilepicture/<int:pk>/get', views.profilepicture_form_get),
    path('profilepicture/<int:pk>/update', views.profilepicture_form_update),
    path('profilepicture/<int:pk>/delete', views.profilepicture_delete),

    url(r'^api-token-auth/', obtain_jwt_token),
]
