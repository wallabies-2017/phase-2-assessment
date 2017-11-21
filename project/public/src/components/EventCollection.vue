<template>	
	<div>
		<tabs>
			<tab title="Home">
				<p>Home</p>
			</tab>	
			<tab title="Scoop">
				<p>Scoop</p>
			</tab>
			<tab title="Test">
				<p>Test</p>
			</tab>	
		</tabs>

		
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