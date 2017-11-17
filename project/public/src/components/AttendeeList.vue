<template>
	<div>
		<p>User: {{attendee.user}}</p>
		<p>Status: {{attendee.status}}</p>
	</div>
</template>

<script>
export default {
	name: 'attendee-list',
	props:{
		attendee: Object
	}
};
</script>