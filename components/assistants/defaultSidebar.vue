<template>
    <v-card style="min-height: calc(100vh - 36px);">
        <v-card-title primary-title>Меню</v-card-title>
        <v-card-text>
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
                            <nuxt-link :to="`/categories/${item.id}`">{{item.name}}</nuxt-link>
                        </template>
                    </v-treeview>
                </li>
            </ul>
        </v-card-text>
    </v-card>
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
