import request from '../request';

export const MAX_ARTICLE_NUMBER_PER_PAGE = 20;

export default {
    namespaced: true,

    state: {
        currentTag: null, 
        editable: false,
        currentPage: 0,
        articleList: [],
    },
    
    mutations: {
        setCurrentTag (state, { currentTag }) {
            state.currentTag = currentTag;
        },

        setEditable (state, { editable }) {
            state.editable = editable;
        },

        setCurrentPage (state, { currentPage }) {
            state.currentPage = currentPage;
        },

        setArticleList (state, { articleList }) {
            state.articleList = articleList;
        },

        selectArticle (state, { article, selected }) {
            var index = state.articleList.findIndex(a => a === article);
            if (index !== -1) {
                state.articleList[index].selected = selected;
            }
        },

        removeSelectedArticle(state, { selected }) {
            var index = state.selectedArticles.findIndex(article => article === selected);
            if (index !== -1) {
                state.selectedArticles.splice(index, 1);
            }
        }
    },

    actions: {
        loadCurrentTagInfo({ commit }, { sectionID, tagID }) {
            return request.getTag(sectionID, tagID).then(tag => {
               commit('setCurrentTag', { currentTag: tag }); 
            });
        },

        loadArticles({ commit, state, rootState }, payload) {
            var sectionID = rootState.app.currentSection.id;
            var tagID = state.currentTag.id;
            var page;
            
            if (payload !== undefined && payload.page !== undefined) {
                page = payload.page;
            } else {
                page = 1;
            }

            console.log('[sectonID, tagID]: ', sectionID, tagID)

            var start = MAX_ARTICLE_NUMBER_PER_PAGE * (page - 1);
            var end = MAX_ARTICLE_NUMBER_PER_PAGE * page - 1;

            return request.getArticles(sectionID, tagID, [ start, end ])
                .then(articleList => articleList.map(article => ({ selected: false, ...article })))
                .then(articleList => {
                    commit('setArticleList', { articleList });
                    commit('setCurrentPage', { currentPage: page });
                });
        },

        removeAllSelectedArticle({ state }) {
            var selected = state.articleList.filter(article => article.selected);
            return request.removeArticles(selected).then(({ count }) => {
                console.log('removed ' + count + ' articles.');
            });
        }
    }
};