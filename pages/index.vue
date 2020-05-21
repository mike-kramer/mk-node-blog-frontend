<template>
    <nuxt-child />
</template>

<script>

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
