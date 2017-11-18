from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User

# Create your models here.



class Event(models.Model):
	title = models.CharField(max_length=50)
	description = models.TextField()
	location = models.CharField(max_length=20)
	creator = models.ForeignKey(User)
	created_at = models.DateTimeField(default=timezone.now)

	def __str__(self):
		return self.title


class Ticket(models.Model):
	
	status = models.CharField(max_length=2, default="ATTENDING")
	attendee = models.ForeignKey(User)
	event = models.ForeignKey(Event)