from django.contrib.auth.models import User
from django.http import HttpResponseRedirect, Http404
from django.shortcuts import get_object_or_404
from rest_framework import generics, permissions


from event.models import Event, Attendee
from event.serializers import (
	AttendeeDetailSerializer, EventDetailSerializer
)
from event.permissions import EventIsOwnerOrReadOnly, AttendeeIsOwnerOrReadOnly

class EventListView(generics.ListCreateAPIView):
	queryset = Event.objects.all()
	serializer_class = EventDetailSerializer
	permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

	def perform_create(self, serializer):
		serializer.save(user=self.request.user)

class EventDetail(generics.RetrieveUpdateDestroyAPIView):
	queryset = Event.objects.all()
	serializer_class = EventDetailSerializer
	permission_classes = (EventIsOwnerOrReadOnly,)


class EventAttendeesListView(generics.ListCreateAPIView):
	queryset = Attendee.objects.all()
	serializer_class = AttendeeDetailSerializer
	permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

	def get_serializer(self, *args, **kwargs):
		"""
		Return the serializer instance that should be used for validating and
		deserializing input, and for serializing output.
		"""
		serializer_class = self.get_serializer_class()
		kwargs['context'] = self.get_serializer_context()
		if "data" in kwargs:
			kwargs['data']['event'] = self.get_event().id
		return serializer_class(*args, **kwargs)

	def get_event(self):
		pk = self.kwargs.get('pk')
		return get_object_or_404(Event, id=pk)

	def get_queryset(self):
		queryset = super().get_queryset()
		queryset = queryset.filter(event=self.get_event())
		return queryset

	def perform_create(self, serializer):
		event = self.get_event()
		serializer.save(user=self.request.user, event=event)


class AttendeeDetail(generics.RetrieveUpdateDestroyAPIView):
	queryset = Attendee.objects.all()
	serializer_class = AttendeeDetailSerializer
	permission_classes = (AttendeeIsOwnerOrReadOnly,)

	def get_serializer(self, *args, **kwargs):
		"""
		Return the serializer instance that should be used for validating and
		deserializing input, and for serializing output.
		"""
		serializer_class = self.get_serializer_class()
		kwargs['context'] = self.get_serializer_context()
		if "data" in kwargs:
			kwargs['data']['event'] = self.get_event().id
		return serializer_class(*args, **kwargs)
	
	def get_event(self):
		pk = self.kwargs.get('pk')
		return get_object_or_404(Event, id=pk)
