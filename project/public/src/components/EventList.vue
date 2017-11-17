<template>
	<div> <p> Events : </p>
		<p>Name: {{event.title}}</p> <p>Description: {{event.description}} </p> <p> Located at: {{event.location}}<p> created by: {{event.username}}</p> 
	</div>
</template>


<script>
export default {
	name: "event-list-summary",
	props:{
		event: Object
	}
};
</script>