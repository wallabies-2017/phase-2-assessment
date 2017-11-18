from django.shortcuts import render

# Create your views here.

from django.contrib.auth.models import User
from django.http import HttpResponseRedirect, Http404
from django.shortcuts import get_object_or_404

from events.models import Event, Ticket
from events.serializers import (
	EventSerializer, TicketSerializer
)

from rest_framework import generics, permissions


class EventListView(generics.ListCreateAPIView):
	queryset = Event.objects.all()
	serializer_class = EventSerializer
	

	def perform_create(self, serializer):
		serializer.save(creator=self.request.user)

class EventDetail(generics.RetrieveUpdateDestroyAPIView):
	queryset = Event.objects.all()
	serializer_class = EventSerializer
	


class EventTicketListView(generics.ListCreateAPIView):
	queryset = Ticket.objects.all()
	serializer_class = TicketSerializer
	
	def get_event(self):
		pk = self.kwargs.get('pk')
		return get_object_or_404(Event, id=pk)

	def get_queryset(self):
		queryset = super().get_queryset()
		queryset = queryset.filter(event=self.get_event())
		return queryset

	def perform_create(self, serializer):
		event = self.get_event()
		serializer.save(attendee=self.request.user, event=event)


class TicketDetail(generics.RetrieveUpdateDestroyAPIView):
	queryset = Ticket.objects.all()
	serializer_class = TicketSerializer


	





