<template>
    <div>
        <v-card width="100%" style="margin-bottom: 20px;" v-for="post in posts" v-bind:key="post.id" color="yellow">
            <v-card-title style="background: lightgreen; padding-bottom: 30px;">
                <nuxt-link :to="`/post/${post.id}`">{{post.title}}</nuxt-link>
            </v-card-title>
            <v-card-subtitle style="margin-top: -25px;">
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
    import * as moment from "moment";

    export default {
        name: "post-list",
        props: ["posts", "categories"],
        components: {CategoryPath},
        mixins: [datetime, helpers],
        serverCacheKey: props => {
            if (props.posts.length === 0) {
                return "pl-none";
            }
            let lastUpdateTime = Math.max(...props.posts.map(p => p.updatedAtTimeStamp));
            return `pl-${lastUpdateTime}` + props.posts.map(p => p.id).join("::");
        },
    }
</script>

<style scoped>

</style>
