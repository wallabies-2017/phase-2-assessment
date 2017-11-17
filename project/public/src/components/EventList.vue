<template>
	<div>
		<p>Title: {{event.title}}</p> 
		<p>Description: {{event.description}}</p>
		<p>Location: {{event.location}}</p>
	</div>
</template>


<script>
export default {
	name: "eventList",
	props:{
		event: Object
	}
};
</script>