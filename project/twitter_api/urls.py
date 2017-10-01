"""project URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url
from twitter_api import views
from rest_framework.urlpatterns import format_suffix_patterns


urlpatterns = [
    url(r'^create/$', views.CreateTweetView.as_view(), name='create'),
	#url(r'^twitter_api/(?P<pk>[0-9]+)/$', DetailsTweetView.as_view(), name="details"),
    #url(r'^twitter_api/(?P<pk>[0-9]+)/replies$', CreateTaskView.as_view(), name="create-reply"),    
    
]

urlpatterns = format_suffix_patterns(urlpatterns)