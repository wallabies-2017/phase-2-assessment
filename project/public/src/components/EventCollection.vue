<!-- https://chenz24.github.io/vue-blu/#/en/components/tabs -->

<template>	
	<div class="columns">
		<div class="column">
			<tabs type="toggle" :is-full-width="true">
				
				<tab-item label="Events" icon="image">
					<ul>
						<li 
							is="event-summary" 
							v-for="item in events" 
							v-bind:event="item">
						</li>
					</ul>
					<pagination
						v-model="currentPage"
						:total-page="totalPages"
					/>
				</tab-item>
				
				<tab-item label="Profile" icon="music">
					<p>Placeholder</p>
				</tab-item>
				
				<tab-item label="Create Event" icon="film">
					<div class="columns">

						<div class="column is-6" is="create-event"></div>
					</div>
				</tab-item>
			
			</tabs>
		</div>
	</div>
</template>


<script>
export default {
	name: "event-collection",
	data: function(){
		return {
			currentPage: parseInt(this.$route.query.page) || 1,
			perPage: 3
		}
	},
	computed: {
		totalPages: function(){
			return Math.ceil(this.$store.getters.getEvents.length  / this.perPage);
		},
		events: function(){
			var events, chunkStart, chunkEnd;
			events = this.$store.getters.getEvents;
			chunkStart = (this.currentPage - 1) * this.perPage;
			chunkEnd = chunkStart + this.perPage;
			return events.slice(chunkStart, chunkEnd);
		}
	},
	watch: {
		"$route": function(newRoute, oldRoute){
			this.$set(this, "currentPage", parseInt(newRoute.query.page));
		},
		"currentPage": function(newPage, oldPage){
			this.$router.push({"path": location.path, "query": {"page": newPage}});
		}
	}
};
</script>