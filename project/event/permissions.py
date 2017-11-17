from rest_framework import permissions

class EventIsOwnerOrReadOnly(permissions.BasePermission):
	'''
	Custom permission to allow owners of a Event object to edit it.
	'''
	def has_object_permission(self, request, view, obj):
		if request.method in permissions.SAFE_METHODS:
			return True
		return request.user == obj.user	

class AttendeeIsOwnerOrReadOnly(permissions.BasePermission):
	'''
	Custom permission to allow owners of a Ticket object to edit it.
	'''
	def has_object_permission(self, request, view, obj):
		if request.method in permissions.SAFE_METHODS:
			return True
		return request.user == obj.user	

