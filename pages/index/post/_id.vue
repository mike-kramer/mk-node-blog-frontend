<template>
    <v-layout
        column
        justify-center
        align-center
    >
        <v-card width="100%">
            <v-card-title class="headline">
                {{post.title}}
            </v-card-title>
            <v-card-subtitle>
                {{reformatDate(post.createdAt, "DD.MM.YYYY")}}
                <category-path :category-path="categoryPath(post.category)"></category-path>
            </v-card-subtitle>
            <v-card-text>
                <div v-html="post.text"></div>

                <v-card style="margin-top: 20px;">
                    <v-card-title>Комментарии</v-card-title>
                    <v-card-text>
                        <comment-form :post-id="post.id" @commentPosted="reloadPostComments()"></comment-form>
                        <v-card v-for="c in post.comments" color="yellow" :key="c.id" style="margin: 10px 0;">
                            <v-card-title>{{c.authorName}}</v-card-title>
                            <v-card-subtitle>{{reformatDate(c.createdAt, "DD.MM.YYYY HH:mm")}}</v-card-subtitle>
                            <v-card-text style="white-space: pre;">{{c.commentText}}</v-card-text>
                        </v-card>
                    </v-card-text>
                </v-card>
            </v-card-text>
        </v-card>
    </v-layout>
</template>

<script>
    import helpers from "../../../mixins/helpers";
    import datetime from "../../../mixins/datetime";
    import CategoryPath from "../../../components/assistants/categoryPath";
    import CommentForm from "../../../components/assistants/commentForm";

    export default {
        components: {CommentForm, CategoryPath},
        mixins: [helpers, datetime],
        async asyncData({$axios, params, app}) {
            let post = await $axios.$get(`posts/${params.id}`);
            let categories = await app.$categoryService.getCategories();
            post.comments = post.comments.reverse();
            return {post, categories};
        },
        methods: {
            async reloadPostComments() {
                let post = await this.$axios.$get(`posts/${this.$route.params.id}`);
                this.post.comments = post.comments.reverse();
            }
        }
    }
</script>

<style scoped>

</style>

