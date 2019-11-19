const faker = require('faker');


function Generator (opt) {
    this.articleCount = opt.articleCount;
    this.sectionCount = opt.sectionCount;
    this.seriesCount = opt.seriesCount;
}

Generator.prototype = {
    constructor: Generator,

    generateArticleList () {
        return this._generateList(this.articleCount, function (index) {
            const TODAY = new Date(2019, 11, 18).getTime();
            var generatedTime = faker.random.number({
                min: new Date(2000, 1, 1).getTime(),
                max: TODAY
            });
            var firstPublishTime = faker.random.number({
                min: generatedTime,
                max: TODAY
            });
            var lastEditTime = faker.random.number({
                min: firstPublishTime,
                max: TODAY
            });
            return {
                id: index,
                title: faker.lorem.sentence(),
                generatedTime,
                firstPublishTime,
                lastEditTime,
                content: faker.lorem.sentences(20),
                sectionID: faker.random.number(this.sectionCount),
                seriesID: faker.random.number(this.seriesID),
                state: faker.random.arrayElement([ 'published', 'draft' ])
            };
        });
    },

    generateSectionList () {
        return this._generateList(this.sectionCount, function (index) {
            return {
                sectionID: index,
                sectionName: faker.lorem.word()
            };
        })
    },

    generateSeriesList () {
        return this._generateList(this.seriesCount, function (index) {
            return {
                seriesID: index,
                sectionID: faker.random.number({ min: 0, max: this.sectionCount }),
                seriesName: faker.lorem.word()
            };
        })
    },
    
    generateJWT: function () {
        return {
            jwt: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
        };
    },

    generateUser: function () {
        return {
            userID: 0,
            userName: faker.name.firstName(),
            password: faker.random.alphaNumeric(10)
        };
    },

    _generateList(count, generate) {
        var list = [];
        for (var i = 0; i < count; i++) {
            list.push(generate.call(this, i));
        }
        return list;
    }
};

module.exports = Generator;

