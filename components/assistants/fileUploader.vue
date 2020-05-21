<template>
    <v-card>
        <v-card-title secondar-title>
            <v-icon>mdi-upload</v-icon>Загрузка файлов
        </v-card-title>
        <v-card-text>
            <v-file-input label="Выберете файл" @change="fileChosen"></v-file-input>
            <v-btn primary @click="upload()">Загрузить</v-btn>
            <v-text-field readonly id="uploaded-name" v-model="uploadedPath"></v-text-field>
            <v-btn secondary @click="copy">Копировать</v-btn>
        </v-card-text>
    </v-card>
</template>

<script>
    export default {
        data() {
            return {
                uploadedPath: "",
                chosenFile: null
            }
        },
        methods: {
            fileChosen(file) {
                this.chosenFile = file;
            },
            async upload() {
                if (!this.chosenFile) {
                    return;
                }
                let formData = new FormData();
                formData.append("file", this.chosenFile);
                let result = await this.$axios.$post("file-upload", formData);
                this.uploadedPath = result.uploadedFilePath;
            },
            copy() {
                let element = document.getElementById("uploaded-name");
                element.select();
                element.setSelectionRange(0, 99999);
                document.execCommand("copy");
            }
        }
    }
</script>

<style scoped>

</style>
