<template>
    <div>
        <v-card width="100%" style="margin-bottom: 20px;" v-for="post in posts" v-bind:key="post.id" color="yellow">
            <v-card-title>{{post.title}}</v-card-title>
            <v-card-subtitle>
                {{reformatDate(post.createdAt, 'DD.MM.YYYY')}}
                <category-path :category-path="categoryPath(post.category)"></category-path>
            </v-card-subtitle>
            <v-card-text>{{post.excerpt ? post.excerpt: truncateText(post.text, 200)}}</v-card-text>
            <v-card-actions>
                <v-btn :to="`/post/${post.id}`" nuxt>Читать</v-btn>
                <v-btn :to="`/admin/posts/${post.id}`" nuxt v-if="$auth.loggedIn">Редактировать</v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script>
    import CategoryPath from "./categoryPath";
    import datetime from "../../mixins/datetime";
    import helpers from "../../mixins/helpers";

    export default {
        props: ["posts", "categories"],
        components: {CategoryPath},
        mixins: [datetime, helpers],
    }
</script>

<style scoped>

</style>
