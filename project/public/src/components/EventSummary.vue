<template>
	<div>
		<p>Title: {{event.title}}</p> 
		<p>Description: {{event.description}}</p>
		<p>Location: {{event.location}}</p>
		<router-link v-bind:to="{name: 'event', params: {id: event.id}}">Detail</router-link>
	</div>
</template>


<script>
export default {
	name: "eventSummary",
	props:{
		event: Object
	}
};
</script>