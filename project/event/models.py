from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User
from django.contrib.contenttypes.fields import GenericForeignKey, GenericRelation
from django.contrib.contenttypes.models import ContentType

class Event(models.Model):
	title = models.CharField(max_length=50)
	description = models.TextField()
	location = models.CharField(max_length=20)
	created_at = models.DateTimeField(default=timezone.now)
	user = models.ForeignKey(User)	

	def __str__(self):
		return self.title


class Attendee(models.Model):
	ATTENDING = 'A'
	NOT_ATTENDING = 'N'
	MAYBE = 'M'
	STATUS_CHOICES = (
		(ATTENDING, 'Attending'),
		(NOT_ATTENDING, 'Not Attending'),
		(MAYBE, 'Maybe'),
	)
	status = models.CharField(max_length=2, choices=STATUS_CHOICES, default=ATTENDING)
	user = models.ForeignKey(User)
	event = models.ForeignKey(Event)



	