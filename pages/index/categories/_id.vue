<template>
    <v-layout
        column
        justify-center
        align-center
    >
        <v-card width="100%">
            <v-card-title class="headline">
                {{category.name}}
            </v-card-title>
            <v-card-text>
                <post-list :posts="posts" :categories="categories"></post-list>
                <div class="text-center" v-if="pageCount > 1">
                    <v-pagination
                        v-model="page"
                        :length="pageCount"
                        @input="goToPage()"
                    ></v-pagination>
                </div>
            </v-card-text>
        </v-card>
    </v-layout>
</template>

<script>
    import PostList from "../../../components/assistants/postList";
    export default {
        components: {PostList},
        watchQuery: true,
        async asyncData({$axios, params, app, query}) {
            const page = query.page && !isNaN(parseInt(query.page))  ? parseInt(query.page): 1;
            const [posts, postsCount] = await $axios.$get(`posts?category=${params.id}&page=${page}`);
            return {
                posts,
                postsCount,
                pageCount: Math.ceil(postsCount / 20),
                categories: await app.$categoryService.getCategories(),
                category: await app.$categoryService.getCategory(params.id)
            }
        },
        methods: {
            goToPage() {
                this.$router.push(`/categories/${category.id}?page=${this.page}`);
            },
        }
    }
</script>
<style lang="scss">

</style>

