from rest_framework import serializers
from event.models import Event, Attendee

class AttendeeDetailSerializer(serializers.ModelSerializer):

	user = serializers.SlugRelatedField(
		many=False,
		read_only=True,
		slug_field='username'
	)

	class Meta:
		model = Attendee
		fields = ['status', 'event', 'id', 'user']

class EventDetailSerializer(serializers.ModelSerializer):

	create_attendee = serializers.HyperlinkedIdentityField(view_name='event:attendees')

	user = serializers.SlugRelatedField(
		many=False,
		read_only=True,
		slug_field='username'
	)

	class Meta:
		model = Event
		fields = ('url', 'title', 'description', 'location', 'create_attendee', 'id', 'user')
		
		extra_kwargs = {
			"url": {"view_name": "event:event-detail"}
		}		