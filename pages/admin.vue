<template>
    <nuxt-child />
</template>

<script>
    export default {
        middleware: 'auth',
        head() {
            return {
                titleTemplate:  "%s - Админка - Блог Михаила Крамера"
            }
        }
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
