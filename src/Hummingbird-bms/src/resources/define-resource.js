import _ from 'lodash';
import Axios from 'axios';
import qs from 'qs';
import joinUrl from 'url-join';

function setClause (optionName) {
    return function (options) {
        this.queryObject[optionName] = options;
        return this;
    }
}

const setWhereClause = setClause('where');
const setIdClause = setClause('id');
const setValuesClause = setClause('values');
const setResultClause = setClause('result');

export default {
    resourceMap: Object.create(null),

    define: function define (resourceName) {
        this.resourceMap[resourceName] = {
            url: `/api/${resourceName}`
        };
    },

    create: function create (resourceName) {
        var resourceUrl = this.getResourceUrl(resourceName);
        return CreationObject.clone(resourceUrl);
    },

    remove: function remove (resourceName) {
        var resourceUrl = this.getResourceUrl(resourceName);
        return RemoveObject.clone(resourceUrl);
    },

    update: function update (resourceName) {
        var resourceUrl = this.getResourceUrl(resourceName);
        return UpdateObject.clone(resourceUrl);
    },

    select: function select (resourceName) {
        var resourceUrl = this.getResourceUrl(resourceName);
        return SelectionObject.clone(resourceUrl);
    },
    
    getResourceUrl: function getResourceUrl (resourceName) {
        if (!this.resourceMap[resourceName]) {
            throw new Error('Resource doesn\'t define yet.');
        }
        return this.resourceMap[resourceName].url;
    }
};


/* Prototypes of below objects */
const ResourceQueryObject = {

    /**
     * 
     * @param {string} url URL to create, update and delete and search resource
     */
    init: function init (url) {
        this.url = url;
        this.queryObject = {};
    },

    clone: function clone (url) {
        var newQueryObject = Object.create(this);
        newQueryObject.init(url);
        return newQueryObject;
    }
};

/* Creation Object */
const CreationObject = {
    id: setIdClause,
    values: setValuesClause,

    send: function send () {
        return Axios.put(this.url, this.queryObject);
    }
};

Object.setPrototypeOf(CreationObject, ResourceQueryObject);

/* Remove Object */
const RemoveObject = {
    where: setWhereClause,

    send: function send () {
        return Axios.delete(this.url, queryObject);
    }
};

Object.setPrototypeOf(RemoveObject, ResourceQueryObject);

/* Update Object */
const UpdateObject = {
    where: setWhereClause,
    values: setValuesClause,

    send: function send () {
        return Axios.post(this.url, queryObject);
    }
};

Object.setPrototypeOf(UpdateObject, ResourceQueryObject);

/* Selection Object */
const SelectionObject = {
    where: setWhereClause,
    result: setResultClause,

    send: function send () {
        return Axios.get(joinUrl(this.url, qs.stringify(this.queryObject)));
    }
};

Object.setPrototypeOf(SelectionObject, ResourceQueryObject);