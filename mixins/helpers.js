export default  {
    methods: {
        categoryPath(category) {
            let buildPath = (categories, category, path = []) => {
                for (let c of categories) {
                    let newPath = path.map(p => p);
                    newPath.push(c);
                    if (c.id == category.id) {
                        return newPath;
                    } else if (c.children.length) {
                        let childPath = buildPath(c.children,  category, newPath);
                        if (childPath) {
                            return childPath;
                        }
                    }
                }
                return false;
            }
            return buildPath(this.categories, category);
        },
        fieldErrors(entity, field, titles, errors) {
            if (!this.$v[entity][field].$dirty) {
                return [];
            }
            let errorMessages = [];
            for (let ekey in errors) {
                if (!this.$v[entity][field][ekey]) {
                    errorMessages.push(errors[ekey]);
                }
            }
            return errorMessages;
        },
        truncateText(postText, length) {
            let morePosition = postText.indexOf("<!--more-->");
            if (morePosition !== -1) {
                postText = postText.substr(0, morePosition);
                return postText.replace(/(<([^>]+)>)/ig,"");
            }
            let result = postText.replace(/(<([^>]+)>)/ig,"").substr(0, length);
            if (result.length < postText.length) {
                result += "…";
            }
            return result;
        }
    }
}
