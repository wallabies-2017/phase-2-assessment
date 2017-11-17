from django.contrib.auth.models import User
from django.http import HttpResponseRedirect, Http404
from django.shortcuts import get_object_or_404

from events.models import Event, Comment
from events.serializers import (
	EventDetailSerializer, CommentDetailSerializer, 

)
from events.permissions import EventIsOwnerOrReadOnly, CommentIsOwnerOrReadOnly
from rest_framework import generics, permissions


class EventListView(generics.ListCreateAPIView):
	queryset = Event.objects.all()
	serializer_class = EventDetailSerializer
	permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

	def perform_create(self, serializer):
		serializer.save(username=self.request.user)

class EventDetail(generics.RetrieveUpdateDestroyAPIView):
	queryset = Event.objects.all()
	serializer_class = EventDetailSerializer
	permission_classes = (EventIsOwnerOrReadOnly,)


class EventCommentsListView(generics.ListCreateAPIView):
	queryset = Comment.objects.all()
	serializer_class = CommentDetailSerializer
	permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

	def get_post(self):
		pk = self.kwargs.get('pk')
		return get_object_or_404(Event, id=pk)

	def get_queryset(self):
		queryset = super().get_queryset()
		queryset = queryset.filter(posts=self.get_post())
		return queryset

	def perform_create(self, serializer):
		post = self.get_post()
		serializer.save(username=self.request.user, post=post, parent=post)


class CommentDetail(generics.RetrieveUpdateDestroyAPIView):
	queryset = Comment.objects.all()
	serializer_class = CommentDetailSerializer
	permission_classes = (CommentIsOwnerOrReadOnly,)

	

# class CommentCommentsListView(generics.ListCreateAPIView):
# 	queryset = Comment.objects.all()
# 	serializer_class = CommentDetailSerializer
# 	permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

# 	def get_comment(self):
# 		pk = self.kwargs.get('pk')
# 		return get_object_or_404(Comment, id=pk)

# 	def get_queryset(self):
# 		queryset = super().get_queryset()
# 		queryset = queryset.filter(comment=self.get_comment())
# 		return queryset

# 	def perform_create(self, serializer):
# 		comment = self.get_comment()
# 		serializer.save(username=self.request.user, post=comment.post, parent=comment)










