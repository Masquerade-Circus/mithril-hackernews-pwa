let api = {
    fetch(section,param = 1) {
        return m.request({
            method: "GET",
            url: `/hackernews/${section}/${param}`
        });
    },
    getItem(id) {
        if (typeof id === 'object') {
            return Promise.resolve(id);
        }

        return m.request({
            method: "GET",
            url: `/hackernews/item/${id}`
        }).then(item => {
            return item[0] || item;
        });
    },
    getKids(kids = [], i = 0) {
        if (i >= kids.length) {
            return;
        }

        let kid = kids[i];
        return api.getItem(kid)
            .then(kid => {
                kids[i] = kid;
                i++;
                m.redraw();
                return api.getKids(kids, i);
            });
    }
};

export default api;
