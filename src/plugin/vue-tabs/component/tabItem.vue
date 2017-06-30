<template>
    <li :class="{'active': tabData.active, 'loading': tabData.loading}" class="text-truncate"
		:title="title" :style="style" ref="tab">
        {{title}}
        <span class="btn-close" @click.stop="close" v-if="!isLocked">&times;</span>
    </li>
</template>
<script>
export default {
    props: {
        tabData: Object,
        tabWidth: Number,
        needMenu:Boolean,
    },
    computed: {
        title () {
            return this.tabData.title || this.tabData.meta.title;
        },
        isLocked () {
            return this.tabData.meta.locked;
        },
		style () {
        	return `width:${this.tabWidth}px`;
		}
    },
    methods: {
        close () {
            this.$emit('close', this.tabData);
        },
		reuse () {
			this.$emit('reuse', this.tabData);
		},
		closeAll () {
			this.$emit('close-all', this.tabData);
		},
		closeOther () {
			this.$emit('close-other', this.tabData);
		},
		initMenu () {
			let that = this;
			let tabview = this.$refs.tab;
			let menu_text = [
//				{
//					header: 'Example'
//				},
				{
					text: '刷新当前窗口',
					href: 'javascript:;',
					action: function (e, selector) {
						that.reuse();
					}
				},
				{
					text: '关闭全部',
					href: 'javascript:;',
					action: function (e, selector) {
						that.closeAll();
					}
				},
				{
					text: '关闭其他全部',
					href: 'javascript:;',
					action: function (e, selector) {
						that.closeOther();
					}
				}
//				{
//					icon: 'glyphicon-edit',
//					text: 'Edit',
//					action: function(e, selector) { alert('Edit clicked on ' + selector.prop("tagName") + ":" + selector.attr("id")); }
//				}
			];
			if (!this.isLocked) {
				menu_text.splice(1,0,{
					text: '关闭当前窗口',
					href: 'javascript:;',
					action: function (e, selector) {
						that.close();
					}
				});
			}
			$(tabview).contextjs().init({
//				fadeSpeed: 100,
				above: 'auto',
				preventDoubleContext: true,
//				compress: false
			});
			$(tabview).contextjs().attach(tabview,menu_text);
		}
    },
	mounted () {
		if (this.needMenu){
			this.$nextTick(function () {
				this.initMenu();
			});
		}
	},
	data () {
		return {}
	}
}
</script>
