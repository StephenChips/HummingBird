var __MOCK__ = {
    getById: {},
    bulkGetBySection: [
        
    ],
    bulkGetByCategory: [

    ],
    bulkGetBySection: [

    ]
}

var Article = {
    create (articleData) {
        return Promise.resolve();
    },

    deleteById (articleId) {
        return Promise.resolve();
    },

    bulkDeleteById (articleIdList) {
        return Promise.resolve();
    },

    updateById (articleId, fieldDict) {
        return Promise.resolve();
    },

    getById (articleId) {
        return Promise.resolve(__MOCK__.getById);
    },

    bulkGetById (articleIdList) {
        return Promise.resolve(__MOCK__.bulkGetById);
    },

    bulkGetByCategory (category, section) {
        return Promise.resolve(__MOCK__.bulkGetByCategory);
    },

    bulkGetBySection (section) {
        return Promise.resolve(__MOCK__.bulkGetBySection);
    },
};

module.exports = Article;
