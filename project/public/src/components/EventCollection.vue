<template>
	<div>
		<a href="/about">About</a>
		<ul>
			<li 
				is="event-list-item" 
				v-for="item in $store.getters.getEvents" 
				v-bind:post="item">
			</li>
		</ul>
		<create-event></create-event>
	</div>
</template>


<script>
export default {
	name: "events-collection"
};
</script>