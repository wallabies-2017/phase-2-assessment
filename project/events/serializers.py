from rest_framework import serializers
from events.models import Event, Ticket

class EventSerializer(serializers.ModelSerializer):

	class Meta:
		model = Event
		fields = ['id','title', 'description', 'location', 'created_at']

class TicketSerializer(serializers.ModelSerializer):

	class Meta:
		model = Ticket
		fields = ['id','status']