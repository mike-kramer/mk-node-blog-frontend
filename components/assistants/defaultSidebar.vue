<template>
    <ul style="list-style: none;">
        <li>
            <nuxt-link to="/">Главная</nuxt-link>
        </li>
        <li v-if="$auth.loggedIn">
            <nuxt-link to="/admin">Админка</nuxt-link>
        </li>
        <li>
            Категории:
            <v-treeview
                dense
                :items="categories"

            >
                <template v-slot:label="{ item, open }">
                    <a href="#">{{item.name}}</a>
                </template>
            </v-treeview>
        </li>
    </ul>

</template>

<script>
    export default {
        mounted() {
            this.$categoryService.getCategories().then(
                (resp) => this.categories = resp
            );
        },
        data() {
            return {
                categories: [],
                items: [
                    {
                        icon: 'mdi-home',
                        title: 'Главная',
                        to: '/'
                    },
                ],
            }
        }
    }
</script>

<style scoped>

</style>
