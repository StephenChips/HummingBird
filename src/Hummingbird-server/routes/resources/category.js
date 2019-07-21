var mockRouter = require('./mock-router')

function category (categoryId, categoryName, sectionId) {
    return { categoryId, categoryName, sectionId };
}

function categoryList (list) {
    return list.map(function (value, index) {
        var [categoryName, sectionId] = value;
        return category(index, categoryName, sectionId);
    });
}

var MOCK = categoryList([
    ['Java', 'Tech'],
    ['JavaScript', 'Tech'],
    ['Visual C++', 'Tech'],
    ['Basic', 'Tech'],
    ['Photograph', 'Life'],
    ['Travel', 'Life']
]);

module.exports = mockRouter('category', MOCK);