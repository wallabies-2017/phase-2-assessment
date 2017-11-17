from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User
from django.contrib.contenttypes.fields import GenericForeignKey, GenericRelation
from django.contrib.contenttypes.models import ContentType


class Event(models.Model):
	title = models.CharField(max_length=50)
	description = models.TextField()
	location = models.CharField(max_length=50)

	username = models.ForeignKey(User)
	created_at = models.DateTimeField(default=timezone.now)
	updated_at = models.DateTimeField()

	comments = GenericRelation(
		'events.Comment', 
		object_id_field='object_id', 
		content_type_field='content_type',
		related_query_name='events'
	)
	
	def __str__(self):
		return self.title

	def save(self, *args, **kwargs):
		self.updated_at = timezone.now()
		super().save(*args, **kwargs)


class Comment(models.Model):
	content = models.TextField()
	username = models.ForeignKey(User)
	event = models.ForeignKey(Event)
	created_at = models.DateTimeField(default=timezone.now)	
	updated_at = models.DateTimeField()


	content_type = models.ForeignKey(ContentType)
	object_id = models.PositiveIntegerField()
	parent = GenericForeignKey('content_type', 'object_id')

	comments = GenericRelation(
		'events.Comment', 
		object_id_field='object_id', 
		content_type_field='content_type',
		related_query_name='comment'
	)


	def __str__(self):
		return "{} posted by {} at {}".format(self.content, self.username, self.created_at)

	def save(self, *args, **kwargs):
		self.updated_at = timezone.now()
		super().save(*args, **kwargs)

		


