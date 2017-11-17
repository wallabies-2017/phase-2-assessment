from rest_framework import serializers
from events.models import Event, Comment

class EventDetailSerializer(serializers.ModelSerializer):


	username = serializers.SlugRelatedField(
		many=False,
		read_only=True,
		slug_field='username'
	 )

	class Meta:
		model = Event
		fields = ( 'title', 'description', 'location' , 'username', 'id')
	

class CommentDetailSerializer(serializers.ModelSerializer):


	username = serializers.SlugRelatedField(
		many=False,
		read_only=True,
		slug_field='username'
	)

	class Meta:
		model = Comment
		fields = ['content', 'username', 'id']
