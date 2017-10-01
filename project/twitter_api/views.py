from django.shortcuts import render
from rest_framework import generics, exceptions
from django.views.generic import View
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth import get_user_model
from .models import Tweet
from .serializers import TweetSerializer
# Create your views here.

#User = get_user_model()

class CreateTweetView(generics.ListCreateAPIView):

	queryset = Tweet.objects.all()
	serializer_class = TweetSerializer

	def get_queryset(self):
		user = self.request.user
		queryset = self.queryset.filter(user=user)
		return queryset

	def perform_create(self, serializer):
		user = self.request.user
		# serializer.validated_data['api_token'] = token
		serializer.save(user=user)

	