<template>	
	<div>
		<tabs>
			<tab title="Events">
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
			</tab>
			<tab title="Profile">
				<p>Placeholder</p>
			</tab>
			<tab title="Create Event" pull-right>
				<create-event></create-event>
			</tab>
		</tabs>
			
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