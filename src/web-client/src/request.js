// tag.tagID + section ID is unique.
const TAGS = [
    { url: '/life/zh', tagName: '中文', tagID: 'zh', sectionID: 'life' },
    { url: '/life/lv-you', tagName: '旅游', tagID: 'lv-you', sectionID: 'life' },
    { url: '/tech/qian-duan', tagName: '前端', tagID: 'qian-duan', sectionID: 'tech' },
    { url: '/tech/hou-duan', tagName: '后端', tagID: 'hou-duan', sectionID: 'tech' }
];

// section.sectionID is unique.
var SECTIONS = [
    { url: '/life', sectionID: 'life', sectionName: '生活' },
    { url: '/tech', sectionID: 'tech', sectionName: '技术' }
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
            articleId: i
        });
    }

    return result;
}

export default {
    addTag () {
        return Promise.resolve();
    },

    getTagsOfSection (sectionID) {
        return Promise.resolve(TAGS);
    },

    getTag (sectionID, tagID) {
        return Promise.resolve(TAGS.find(tag => tag.tagID === tagID && tag.sectionID === sectionID));
    },

    getTagById (sectionID, tagID) {
        return Promise.resolve(TAGS.find(tag => tag.tagID === tagID && tag.sectionID === sectionID));
    },

    getArticleById (id) {
        return Promise.resolve({
            articleID: id,
            title: 'hello world',
            createdTime: new Date(2020, 1, 1, 8).getTime(),
            hasPublished: false,
            firstPublishTime: new Date(2020, 1, 1, 9).getTime(),
            lastEditTime: new Date(2020, 1, 1, 9).getTime(),
            content: `\
            <p>
            不知从何时起，HDR的名字开始出现在各大厂商的宣传语之中，从电视到投影仪，甚至近两年来的手机，
            都喜欢给自己的产品套上一个“支持HDR”的名号进行包装。作为一个2015年才真正诞生的标准化名词，HDR普及的迅速程度远超大家的想象，
            那么就让我们来了解一下，在厂商们纷乱的广告语之中，到底什么才是真正的HDR？
            </p>

            <h1>我们为什么需要HDR？</h1>

            <p>
            对于大多数消费者，第一次接触到HDR这个名词恐怕是在手机拍照。其实HDR技术用于拍照的历史可以追溯到胶片时代，
             几十年前，摄影师就会拍摄数张不同曝光程度的底片，并在暗房使用一种叫做减淡和加深（dodging and burning）的手法，
            将数张底片合成为一张具有高动态范围的照片。随着数码摄影的出现，HDR（High-Dynamic Range 高动态范围图像）将暗房里的技术带入了相机成像传感器，
            通过同一个场景进行多种不同的曝光，最后进行多张合成，最终增强照片动态的范围，增加照片的层次感。
            </p>

            <p>
            真实世界的亮度范围是十分广阔的，而人眼能感知到的亮度范围也能十万尼特左右。举个例子，用分光色度计测量向着阳光盛开的花朵，
            其黄色区域亮度最高可达14700尼特，边缘的红色是2300尼特，中央的花蕊和绿叶只有200尼特以下，但这张照片在窄色域、亮度普遍不超过100尼特，
            对比度也只有1000：1的SDR显示效果下色彩会暗淡很多，而随着技术的发展，HDR技术色域广、普遍亮度在1000尼特，对比度甚至能达到上万，
            虽然还是远达不到现实标准，但比三十年前的SDR还是前进了一大步。
            </p>

            <h1>HDR的繁多标准</h1>

            <p>
            目前在业界，HDR标准还没有一个最终定义：主流的有美国消费者技术协会主推的HDR10，杜比推出的Dolby Vision，三星的HDR10+，BBC和NHK联合制定的HLG格式，
            UHD Premium等，如果你想了解各大厂商在都分别属于哪种“HDR阵营”，请参考The HDR Ecosystem Tracker (mid-2019)。HDR标准大致可以分为两派，
            一种是只有硬件使用建议的HDR标准，一种是有明确硬件规定的HDR标准，前者的代表是HDR10、Dolby Vision和HDR10+、后者则是UHD Premium和DisPlayHDR。
            </p>`,
            sectionID: 0,
            seriesID: 0,
            state: 'published'
        });
    },

    searchArticlesByTitle (titleName) {
        return Promise.resolve([
            {
                publishDate: new Date().getTime(),
                section: '生活区',
                tag: '旅游',
                title: '你好，世界',
                articleId: 0,
            },
            {
                publishDate: new Date().getTime(),
                section: '生活区',
                tag: '旅游',
                title: '你好，世界',
                articleId: 0,
            },
            {
                publishDate: new Date().getTime(),
                section: '生活区',
                tag: '旅游',
                title: '你好，世界',
                articleId: 0,
            },
            {
                publishDate: new Date().getTime(),
                section: '生活区',
                tag: '旅游',
                title: '你好，世界',
                articleId: 0,
            },
            {
                publishDate: new Date().getTime(),
                section: '生活区',
                tag: '旅游',
                title: '你好，世界',
                articleId: 0,
            },                {
                publishDate: new Date().getTime(),
                section: '生活区',
                tag: '旅游',
                title: '你好，世界',
                articleId: 0,
            }
        ]);
    },

    searchArticlesByTag (tagName) {
        return Promise.resolve([
            {
                publishDate: new Date().getTime(),
                section: '生活区',
                tag: '旅游',
                title: '你好，世界',
                articleId: 0
            },
            {
                publishDate: new Date().getTime(),
                section: '生活区',
                tag: '旅游',
                title: '你好，世界',
                articleId: 0
            },
            {
                publishDate: new Date().getTime(),
                section: '生活区',
                tag: '旅游',
                title: '你好，世界',
                articleId: 0
            },
            {
                publishDate: new Date().getTime(),
                section: '生活区',
                tag: '旅游',
                title: '你好，世界',
                articleId: 0
            },
            {
                publishDate: new Date().getTime(),
                section: '生活区',
                tag: '旅游',
                title: '你好，世界',
                articleId: 0
            },                {
                publishDate: new Date().getTime(),
                section: '生活区',
                tag: '旅游',
                title: '你好，世界',
                articleId: 0
            }
        ]);
    },

    getArticlesBySection (sectionId, [ start, end ]) {
        return Promise.resolve([
            {
                publishDate: Date.now(),
                title: 'hello, world',
                articleId: 0
            },
            {
                publishDate: Date.now(),
                title: 'hello, world',
                articleId: 1
            },
            {
                publishDate: Date.now(),
                title: 'hello, world',
                articleId: 2
            },
            {
                publishDate: Date.now(),
                title: 'hello, world',
                articleId: 3
            },
            {
                publishDate: Date.now(),
                title: 'hello, world',
                articleId: 4
            },
            {
                publishDate: Date.now(),
                title: 'hello, world',
                articleId: 5
            }
        ])
    },

    async getArticles (sectionID, tagID, [start, end]) {
        if (sectionID === undefined) {
            return [];
        }
        else if (tagID !== undefined) {
            if (TAGS.findIndex(tag => tag.tagID === tagID) === -1) {
                return [];
            }
        } else {
            if (SECTIONS.findIndex(sec => sec.id === sectionID) === -1) {
                return [];
            }
        }
        return (ARTICLES.slice(start, end));
    },

    async updateArticle (oppts) {

    },

    async createArticle (opts) {

    },

    removeArticles(...articleURLs) {
        ARTICLES = ARTICLES.filter(article => !articleURLs.includes(article.url));
        return Promise.resolve();
    },

    withdrawArticle () {

    },

    saveAndPublishArticle () {

    },

    saveArticle () {

    },


    getSection (sectionID) {
        console.log(sectionID)
        return Promise.resolve(SECTIONS.find(section => section.sectionID === sectionID));
    },

    getSectionById (sectionID) {
        return Promise.resolve(SECTIONS.find(section => section.sectionID === sectionID));
    },

    getSections (...sectionIDs) {
        var result = SECTIONS.filter(section => {
            return sectionIDs.findIndex(id => id === section.sectionID) !== -1;
        });
        console.log(sectionIDs, result)
        return Promise.resolve(result);
    },

    getAllSections () {
        return Promise.resolve(SECTIONS);
    },

    getArticleCount(section, tags) {
        return Promise.resolve(ARTICLES.length);
    },

    updatePassword (password) {
        return Promise.resolve();
    }
};
