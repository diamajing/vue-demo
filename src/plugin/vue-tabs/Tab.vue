<template>
    <li :class="{'active': tabData.active, 'loading': tabData.loading}">
        {{title}}
        <span class="btn-close" @click.stop="close" v-if="!isLocked">&times;</span>
    </li>
</template>
<script>
export default {
    props: {
        tabData: Object
    },
    computed: {
        title () {
            let title = this.tabData.meta.title;
            if (this.tabData.params && this.tabData.params.title) {
                title = this.tabData.params.title;
            }
            return title;
        },
        isLocked () {
            return this.tabData.params && this.tabData.params.isLocked;
        }
    },
    methods: {
        close () {
            this.$emit('close', this.tabData);
        }
    }
};
</script>
