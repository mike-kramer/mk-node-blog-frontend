<template>
    <nuxt-child />
</template>

<script>
export default {

}
</script>
<style lang="scss">

</style>
<router>
    {
        namedViews: {
            views: {
                sidebar: '~/components/assistants/defaultSidebar'
            },
            chunkNames: {
                sidebar: '~/components/assistants/defaultSidebar'
            }
        }
    }
</router>
