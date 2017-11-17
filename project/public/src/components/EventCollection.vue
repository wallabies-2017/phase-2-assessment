<template>
	<div>
		<ul>
			<li 
				is="event-detail" 
				v-for="item in $store.getters.getEvents" 
				v-bind:event="item">
			</li>
		</ul>
		<create-event></create-event>
	</div>
</template>


<script>
export default {
	name: "posts-collection"
};
</script>