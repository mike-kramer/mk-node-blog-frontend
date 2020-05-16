<template>
    <nuxt-child />
</template>

<script>
    export default {
        middleware: 'auth',
    }
</script>

<style scoped>

</style>
<router>
    {
        namedViews: {
            views: {
                sidebar: '~/components/assistants/adminSidebar'
            },
            chunkNames: {
                sidebar: '~/components/assistants/adminSidebar'
            }
        }
    }
</router>
