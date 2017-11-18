<template>
	<div>
		<p>Name: {{event.title}}</p> <p>Description: {{event.description}}</p><p>Location: {{event.location}}</p>
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