import request from '../request';

export const MAX_ARTICLE_NUMBER_PER_PAGE = 15;

export default {
    namespaced: true,

    state: {
        currentTag: null, 
        editable: true,
        currentPage: 0,
        totalPageCount: 0,
        articleList: [],

        selectedArticles: []
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

        selectArticle (state, { articleURL, selected }) {
            var index = state.selectedArticles.findIndex(url => url === articleURL);

            if (selected && index === -1) {
                state.selectedArticles.push(articleURL);
            } else if (!selected && index !== -1) {
                state.selectedArticles.splice(index, 1);
            }

            console.log(state.selectedArticles);
        },

        clearArticleSelection (state) {
            state.selectedArticles = [];
        },

        removeSelectedArticle(state, { selected }) {
            var index = state.selectedArticles.findIndex(article => article === selected);
            if (index !== -1) {
                state.selectedArticles.splice(index, 1);
            }
        },

        setTotalPageCount(state, { totalPageCount }) {
            state.totalPageCount = totalPageCount;
        }
    },

    actions: {
        loadCurrentTagInfo({ commit }, { sectionID, tagID }) {
            return request.getTag(sectionID, tagID).then(tag => {
               commit('setCurrentTag', { currentTag: tag }); 
            });
        },

        loadArticles({ commit, state, rootState }, payload) {
            var page, tagID, sectionID;
            
            sectionID = rootState.app.currentSection.id;
            if (state.currentTag !== undefined) {
                tagID = state.currentTag.id;
            }
            
            if (payload !== undefined && payload.page !== undefined) {
                page = payload.page;
            } else {
                page = 1;
            }

            var start = MAX_ARTICLE_NUMBER_PER_PAGE * (page - 1);
            var end = MAX_ARTICLE_NUMBER_PER_PAGE * page - 1;

            return request.getArticles(sectionID, tagID, [ start, end ])
                .then(articleList => {
                    commit('setArticleList', { articleList });
                    commit('setCurrentPage', { currentPage: page });
                });
        },

        loadTotalPageCount({ commit, state, rootState }) {
            var sectionID, tagID;

            sectionID = rootState.app.currentSection.id;
            
            if (state.currentTag) {
                tagID = state.currentTag.id;
            }

            request.getArticleCount(sectionID, tagID).then(count => {
                commit('setTotalPageCount', { totalPageCount: Math.ceil(count / MAX_ARTICLE_NUMBER_PER_PAGE) });
            });
        },

        removeAllSelectedArticle({ state, dispatch, commit }) {
            return request.removeArticles.apply(request, state.selectedArticles).then(() => {
                commit('clearArticleSelection');
                dispatch('loadArticles', { page: state.currentPage });
            });
        }
    }
};