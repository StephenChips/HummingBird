const Generator = require('./generators');
const faker = require('faker');

var generator = new Generator({
    sectionCount: 5,
    seriesCount: 20,
    articleCount: 100
});

const sectionList = generator.generateSectionList();
const seriesList = generator.generateSeriesList();
const articleList = generator.generateArticleList();
const jwt = generator.generateJWT();
const user = generator.generateUser();

const pickOneFrom = function (arr) {
    return function () {
        return faker.random.arrayElement(arr);
    }
}

function pickMultipleFrom (array, count) {
    var sequenceOfIndice = createNatrualSequence(array.length);
    return function () {
        faker.helpers.shuffle(sequenceOfIndice);
        return pickbyGivenIndice(array, sequenceOfIndice.slice(0, count));
    }
}

function pickbyGivenIndice(array, arrayOfIndice) {
    var result = new Array(arrayOfIndice.length);
    for (var i = 0; i < arrayOfIndice.length; i++) {
        result[i] = array[arrayOfIndice[i]];
    }
    return result;
}

function createNatrualSequence (count) {
    var array = new Array(count);
    for (var i = 0; i < count; i++) {
        array[i] = i;
    }
    return array;
}

module.exports = {

    hasInit: false,

    oneArticle: pickOneFrom(articleList),
    multipleArticles: pickMultipleFrom(articleList, 20),

    oneSection: pickOneFrom(sectionList),
    multipleSections: pickMultipleFrom(sectionList, 3),

    oneSeries: pickOneFrom(seriesList),
    multipleSeries: pickMultipleFrom(seriesList, 10),

    oneJWT () {
        return jwt;
    },

    oneUser () {
        return user;
    }
}