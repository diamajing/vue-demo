<template>
	<li class="text-truncate" :title="title">
		<i class="fa fa-check" v-show="tabData.active"></i>
		{{title}}
		<span class="btn-close" @click.stop="close" v-if="!isLocked">&times;</span>
	</li>
</template>
<script>
	export default {
		props: {
			tabData: Object,
		},
		computed: {
			title () {
				return this.tabData.title || this.tabData.meta.title;
			},
			isLocked () {
				return this.tabData.meta.locked;
			},
		},
		methods: {
			close () {
				this.$emit('close', this.tabData)
			}
		}
	}
</script>
