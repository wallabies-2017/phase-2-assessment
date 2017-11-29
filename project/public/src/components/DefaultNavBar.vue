<template>
	<el-menu
		:default-active="activeIndex"
		:router="!!$router"
		mode="vertical"
	>
		<el-menu-item index="/">Events</el-menu-item>
		<el-menu-item index="/profile">Profile</el-menu-item>
		<el-menu-item index="/create-event">Create Event</el-menu-item>
	</el-menu>
</template>



<script>
export default {
	name: "default-navbar",
	computed: {
		activeIndex: function(){
			return this.$route.path;
		}
	},

};
</script>