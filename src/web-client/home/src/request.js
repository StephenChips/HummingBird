const TAGS = [
    { url: '/life/zh', name: '中文', id: 'zh' },
    { url: '/life/lv-you', name: '旅游', id: 'lv-you' },
    { url: '/tech/qian-duan', name: '前端', id: 'qian-duan' },
    { url: '/tech/hou-duan', name: '后端', id: 'hou-duan'}
];

var SECTIONS = [
    { url: '/life', id: 'life', name: '生活' },
    { url: '/tech', id: 'tech', name: '技术' }
];

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
    
    getArticles (sectionID, tagID, range) {
        var total = 10;

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

        var result = [];
    
        for (var i = 0; i < total; i++) {
            result.push({
                publishDate: Date.now(),
                title: 'hello, world',
                url: '/article/hello+world+' + i
            });
        }

        return Promise.resolve(result);
    },
    
    getSection (sectionID) {
        return Promise.resolve(SECTIONS.find(section => section.id === sectionID));
    }
};