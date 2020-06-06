<template>
    <div>

        <v-card>
            <v-card-title>Посты</v-card-title>
            <v-card-text>
                <v-btn to="/admin/posts/new" nuxt>Новый пост</v-btn>
                <v-simple-table>
                    <template v-slot:default>
                        <thead>
                        <tr>
                            <th class="text-left">Название</th>
                            <th class="text-left">Категория</th>
                            <th class="text-left">Дата публикации</th>
                            <th class="text-left">Действие</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="post in posts" :key="post.id">
                            <td>{{ post.title }}</td>
                            <td>
                                <category-path :admin="true" :category-path="categoryPath(post.category)"></category-path>
                            </td>
                            <td>
                                {{reformatDate(post.createdAt, "DD.MM.YYYY HH:mm")}}
                            </td>
                            <td>
                                <v-btn color="primary" :to="`/admin/posts/${post.id}`" :icon="true" nuxt><v-icon>mdi-pencil</v-icon></v-btn>
                                <v-btn color="secondary" :to="`/post/${post.id}`" :icon="true" nuxt><v-icon>mdi-eye</v-icon></v-btn>
                                <v-btn color="error" @click="removePost(post)" :icon="true"><v-icon>mdi-delete</v-icon></v-btn>
                            </td>
                        </tr>
                        </tbody>
                    </template>
                </v-simple-table>
                <div class="text-center" v-if="pageCount > 1">
                    <v-pagination
                        v-model="page"
                        :length="pageCount"
                        @input="goToPage()"
                    ></v-pagination>
                </div>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
    import helpers from "../../../mixins/helpers";
    import CategoryPath from "../../../components/assistants/categoryPath";
    import datetime from "../../../mixins/datetime";
    const perPage = 20;

    async function loadPosts(query, $axios, app) {
        const page = query.page ? parseInt(query.page) : 1;
        const [posts, postsCount] = await $axios.$get(`/posts-admin/list?page=${page}&perPage=${perPage}&sortBy=createdAt&sortDirection=DESC`);
        const pageCount = Math.ceil(postsCount / perPage);
        const categories = await app.$categoryService.getCategories();
        return {
            page, posts, postsCount, pageCount, categories
        };
    }

    export default {
        components: {CategoryPath},
        mixins: [helpers, datetime],
        watchQuery: true,
        async asyncData({$axios, query, app}) {
            return await loadPosts(query, $axios, app);
        },
        head() {
            return {
                title: "Посты"
            };
        },
        methods: {
            goToPage() {
                this.$router.push(`/admin/posts?page=${this.page}`);
            },
            removePost(post) {
                if (confirm(`Вы уверены, что хотите удалить пост ${post.title}`)) {
                    this.$axios.$delete(`/posts-admin/${post.id}`).then(
                        async () => {
                            let postsData = await loadPosts(this.$route.query, this.$axios, {$categoryService: this.$categoryService});
                            this.posts = postsData.posts;
                            this.postsCount = postsData.postsCount;
                            this.pageCount = postsData.pageCount;
                            if (this.page > this.pageCount) {
                                this.page--;
                                this.goToPage();
                            }
                        }
                    )
                }
            }
        }
    }
</script>

<style scoped>

</style>
