const TAGS = [
    { url: '/life/zh', name: '中文', id: 'zh' },
    { url: '/life/lv-you', name: '旅游', id: 'lv-you' },
    { url: '/tech/qian-duan', name: '前端', id: 'qian-duan' },
    { url: '/tech/hou-duan', name: '后端', id: 'hou-duan'}
];

var SECTIONS = [
    { url: '/home', id: 'home', name: '主页' },
    { url: '/', id: 'home', name: '主页' },
    { url: '/life', id: 'life', name: '生活' },
    { url: '/tech', id: 'tech', name: '技术' }
];

var ARTICLES = createArticles(100);

function createArticles (total) {
    var result = [];

    const MS_IN_A_DAY = 1000 * 60 * 60 * 24;
    const NOW = Date.now();

    for (var i = 0; i < total; i++) {
        result.push({
            publishDate: NOW - 30 * i * MS_IN_A_DAY,
            title: 'hello, world',
            url: '/article/hello+world+' + i
        });
    }

    return result;
}

export default {
    addTag () {
        return Promise.resolve();
    },
    
    getTags (sectionID) {
        return Promise.resolve(TAGS);
    },
    
    getTag (sectionID, tagID) {
        return Promise.resolve(TAGS.find(tag => tag.id === tagID));
    },
    
    getArticles (sectionID, tagID, [start, end]) {
        if (sectionID === undefined) {
            return [];
        }
        else if (tagID !== undefined) {
            if (TAGS.findIndex(tag => tag.id === tagID) === -1) {
                return [];
            }
        } else {
            if (SECTIONS.findIndex(sec => sec.id === sectionID) === -1) {
                return [];
            }
        }
        return Promise.resolve(ARTICLES.slice(start, end));
    },

    removeArticles(...articleURLs) {
        ARTICLES = ARTICLES.filter(article => !articleURLs.includes(article.url));
        console.log(ARTICLES);
        return Promise.resolve(ARTICLES);
    },
    
    getSection (sectionID) {
        return Promise.resolve(SECTIONS.find(section => section.id === sectionID));
    },

    getSections (...sectionURLs) {
        var result = SECTIONS.filter(section => {
            return sectionURLs.findIndex(url => url === section.url) !== -1;
        });
        return Promise.resolve(result);
    },

    getArticleCount(section, tags) {
        return Promise.resolve(ARTICLES.length);
    }
};