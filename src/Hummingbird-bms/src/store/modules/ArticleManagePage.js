import Axios from 'axios';
import qs from 'qs';
import _ from 'lodash';

var isStoreInitialized = false;

var ModalState = constantObject({
    CREATE_SECTION: Symbol('create section'),
    UPDATE_SECTION: Symbol('update section'),
    CREATE_CATEGORY: Symbol('create category'),
    UPDATE_CATEGORY: Symbol('update category'),
    HIDE: Symbol('hide')
});

var ModalOnConfirmActions = constantObject({
    [ModalState.CREATE_CATEGORY]: function ({ state, commit, dispatch }) {
        var title = state.fieldsOfCategoryForm.textOfCategoryTitle;
        var sectionId = state.fieldsOfCategoryForm.textOfSelectedRefSectionId;
        return createCategory({ title, sectionId })
            .then(function (categoryInfo) {
                commit('hideModal');
                commit('pushCategoryToList', {
                    id: categoryInfo.categoryId,
                    title: categoryInfo.title,
                    sectionId
                });
            }).then(function () {
                return dispatch('updateArticleList', {
                    section: state.sectionIndex,
                    category: state.categoryIndex
                });
            });
    },

    [ModalState.UPDATE_CATEGORY]: function ({ state }) {
        var categoryId = state.fieldsOfCategoryForm.valueOfCategoryId;
        var title = state.fieldsOfCategoryForm.textOfCategoryTitle;
        var sectionId = state.fieldsOfCategoryForm.textOfSelectedRefSectionId;

        return updateCategory(categoryId, { title, sectionId })
            .then(function () {
                var index = state.categoryList.findIndex(item => item.categoryId == categoryId);
                var value = { categoryId, title, sectionId };
                commit('hideModal');
                commit('setCategoryAtIndex', { index, value })
            });
    },

    [ModalState.CREATE_SECTION]: function ({ state })  {
      var title = state.fieldsOfCategoryForm.textOfCategoryTitle;
      return createSection({ title })
          .then(function (sectionInfo) {
              commit('hideModal');
              commit('pushSectionToList', {
                  id: sectionInfo.sectionId,
                  title: sectionInfo.title
              });
          }).then(function () {
              return dispatch('updateCategoryList', {
                  section: state.sectionIndex,
                  category: state.categoryIndex
              });
          });
    },

    [ModalState.UPDATE_SECTION]: function ({ state }) {

    }
});

var state = {
    sectionIndex: null,
    categoryIndex: null,
    articleList: [],
    sectionList: [],
    categoryList: [],
    pageNumber: 1,
    totalArticleCount: null,

    // Modal relative
    currentModalState: ModalState.HIDE,
    modalContentComponent: null,
    textOfConfirmButton: null,
    textOfCancelButton: null,

    fieldsOfSectionForm: {
        valueOfSectionId: 0,
        textOfSectionTitle: ''
    },

    fieldsOfCategoryForm: {
        valueOfCategoryId: 0,
        textOfCategoryTitle: '',
        textOfSelectedRefSectionId: 0,
        listOfRefSectionId: []
    }
};

Object.defineProperty(state, 'MAX_ARTICLE_COUNT_PER_PAGE', constantDescriptor(30));

/** Following constants will be add to the state object while initialzing the store.
 * 
 * TOTAL_ARTICLE_COUNT
 * TOTAL_PAGE_COUNT
 */

var mutations = {
    setCurrentSection (state, index) {
        state.sectionIndex = index;
    },
    
    setCurrentCategory (state, index) {
        state.categoryIndex = index;
    },

    setPageNumber (state, pageNumber) {
        state.currentPage = pageNumber;
    },

    setTotalArticleCount (state, totalArticleCount) {
        state.totalArticleCount = totalArticleCount;
    },

    setArticleList (state, articleList) {
        state.articleList = articleList;
    },

    removeArticleFromList (state, index) {
        state.articleList.splice(index, 1);
    },

    setSection (state, section) {
        state.sectionList = section;
    },

    pushSectionToList (state, section) {
        state.sectionList.push(section);
    },

    setSectionAtIndex (state, { index, value }) {
        if (index < state.sectionList.length) {
            state.sectionList[index] = value;
        }
    },

    removeSectionFromList (state, index) {
        state.sectionList.splice(index, 1);
    },

    setCategory (state, category) {
      state.categoryList = category;
    },

    pushCategoryToList (state, category) {
        state.categoryList.push(category);
    },

    setCategoryAtIndex (state, { index, value }) {
        if (index < state.categoryList.length) {
            state.categoryList[index] = value;
        }
    },

    removeCategoryFromList (state, index) {
        state.categoryList.splice(index, 1);
    },

    showCreateSectionModal (state) {
        state.currentModalState = ModalState.CREATE_CATEGORY;
    },

    showUpdateSectionModal (state) {
        state.currentModalState = ModalState.UPDATE_SECTION;
    },

    showCreateCategoryModal (state) {
        state.currentModalState = ModalState.CREATE_CATEGORY;
    },

    showUpdateCategoryModal (state) {
        state.currentModalState = ModalState.UPDATE_CATEGORY;
    },

    hideModal (state) {
        state.currentModalState = ModalState.HIDE;
    }
};

var actions = {
    init ({ dispatch }) {
        dispatch('updateArticleList', { section: null })
            .then(function () {
                isStoreInitialized = true;
                console.log('Article Manage Page is initialized.');
            });
    },

    updateArticleList: throwErrorIfStoreHasntInit(
        function ({ state, commit }, { sectionIndex, categoryIndex }) {
            if (sectionIndex >= state.sectionList.length || categoryIndex >= state.categoryList.length) {
                return Promise.reject('index out of range');
            } else {
                return fetchArticleList(section, category, 1)
                    .then(function ({ articleList, totalCount }) {
                        commit('setArticleList', articleList)
                        commit('setSectionIndex', sectionIndex);
                        commit('setCategoryIndex', categoryIndex);
                        commit('setPageNumber', 1);
                        commit('setArticleTotalCount', totalCount);
                    });
            }
        }
    ),

    updatePageNumber: throwErrorIfStoreHasntInit(
        function updatePageNumber ({ state, commit }, { pageNumber }) {
          return fetchArticleList(state.sectionIndex, state.categoryIndex, pageNumber)
              .then(function (articleList) {
                  commit('setArticleList', articleList);
                  commit('setPageNumber', pageNumber);
              });
        }
    ),

    confirmModal (...args) {
        return ModalOnConfirmActions[state.currentModalState].apply(this, args);
    },

    cancelModal ({ commit }) {
        commit('hideModal');
    }
};

var getters = {
    isModalVisible (state) {
        return state.currentModalState != ModalState.HIDE;
    },

    totalPageCount ({ totalArticleCount, MAX_ARTICLE_COUNT_PER_PAGE }) {
        return Math.ceil(totalArticleCount / MAX_ARTICLE_COUNT_PER_PAGE);
    }
};

function fetchArticleList (section, category, page) {
    if (section && !category) {
        return Promise.reject('cannot fetch article by category without providing a section.');
    } else {
        var from = (page - 1) * state.MAX_ARTICLE_COUNT_PER_PAGE;
        var to = page * state.MAX_ARTICLE_COUNT_PER_PAGE;
        var url = getArticleResourceUrl(section, category, [from, to]);
        return Axios.get(url).then(transformResult);
    }

    function transformResult (resultObject) {
        for (var articleInfo of resultObject) {
            renameKey(articleInfo, 'articleId', 'id');
            articleInfo.editPageUrl = `/articles/edit/${articleInfo.id}`;
            articleInfo.viewPageUrl = `/articles/${articleInfo.id}`;
        }
    }
}

function createCategory (title, sectionId) {
    // category and all the fields
    return Axios.post('/api/articles/?' + createQueryString(title, sectionId));

    function createQueryString (title, sectionId) {
        return `title=${title}&sectionId=${sectionId}`;
    }
}

function createSection (title) {
    // returns: sectionId and all the fields
    return Axios.post(`/api/sections/?title=${title}`);
}

function updateCategory (categoryId, fields) {
    // fields: sectionId & title
    // returns: if success (by status code), body: no content
    return Axios.put(`/api/sections/?categoryId=${categoryId}`, fields);
}

function updateSection (sectionId, fields) {
    // fields: title
    // returns: if success (by status code), body: no content
    return Axios.put(`/api/sections/?sectionId=${sectionId}`, fields)
}

function getArticleResourceUrl (sectionId, categoryId, range) {
    var query = {
        where: { categoryId, sectionId },
        return: {
          range,
          fields: ['articleId', 'title', 'publishDate']
        }
    };
    return `/api/articles/${qs.stringify(query)}`;
}

function renameKey(obj, key, newKey) {
    var descriptor = Object.getOwnPropertyDescriptor(obj, key);
    if (descriptor) {
        delete obj[key];
        Object.defineProperty(obj, newKey, descriptor);
    }
}

function throwErrorIfStoreHasntInit (func) {
    return function (...args) {
        if (!isStoreInitialized) {
          throw new Error('Vuex module ArticleManagePage hasn\'t initialized yet. Please call action \'initStore\' before using this module.');
        }
        func.call(this, args);
    }
}

function constantObject (object) {
    Object.setPrototypeOf(object, null);
    Object.freeze(object);
    return object;
}

function constantDescriptor (value) {
  return {
      value,
      enumerable: true,
      configurable: false,
      writable: false
  };
}

export default {
    state,
    mutations,
    actions,
    getters
};
