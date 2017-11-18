<template>
	<div>
		<p>Ticket Event: {{ticket.event}}</p> <p>Event-Attendee: {{ticket.attendee}}</p>
	</div>
</template>

<script>
export default {
	name: 'ticket-summary',
	props:{
		ticket: Object
	}
};
</script>