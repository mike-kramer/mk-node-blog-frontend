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
        }
    }
}
