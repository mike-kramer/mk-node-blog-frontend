<template>
    <ul style="list-style: none;">
        <li>
            <nuxt-link to="/">Главная</nuxt-link>
        </li>
        <template v-if="$auth.loggedIn">
            <li>
                <nuxt-link to="/admin/posts">Посты</nuxt-link>
            </li>
        </template>
    </ul>
</template>

<script>
    export default {
        name: "adminSidebar"
    }
</script>

<style scoped>

</style>
