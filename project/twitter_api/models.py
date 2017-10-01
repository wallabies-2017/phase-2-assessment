from django.db import models
from django.utils import timezone
from django.contrib.auth import get_user_model


User = get_user_model()

class Tweet(models.Model):
	content = models.TextField(max_length=140)
	created_date = models.DateTimeField(default=timezone.now)
	user = models.ForeignKey(User)
	
	def __str__(self):
		return self.title








