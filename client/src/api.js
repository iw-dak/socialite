const axios = require('axios')

function kebabCaseToCamel(str) {
    return str.replace(/(-\w)/g, (matches) => matches[1].toUpperCase())
}

class API {
    constructor(url = process.env.REACT_APP_API_URL) {
        this.url = url
        this.endpoints = {}
    }
    /**
     * Create and store a single entity's endpoints
     * @param {A entity Object} entity
     */
    createEntity(entity) {
        /**
         * If there is a - in the entity.name, then change it
         * to camelCase. E.g
         * ```
         * myApi.createEntity({ name : 'foo-bar'})
         * myApi.endpoints.fooBar.getAll(...)
         */

        const name = kebabCaseToCamel(entity.name)
        this.endpoints[name] = this.createBasicCRUDEndpoints(entity)
    }

    createEntities(arrayOfEntity) {
        arrayOfEntity.forEach(this.createEntity.bind(this))
    }
    /**
     * Create the basic endpoints handlers for CRUD operations
     * @param {A entity Object} entity
     */
    createBasicCRUDEndpoints({ name }) {
        var endpoints = {}

        const resourceURL = `${this.url}/${name}`

        const globalConfig = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }

        endpoints.getAll = (config = {}) => {
            globalConfig.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
            return axios.get(resourceURL, Object.assign(globalConfig, config))
        }

        endpoints.getSpecific = ({ id }, config = {}) => {
            globalConfig.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
            return axios.get(`${resourceURL}/${id}`, Object.assign(globalConfig, config));
        }

        endpoints.create = (toCreate, config = {}) => {
            globalConfig.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
            return axios.post(resourceURL, toCreate, Object.assign(globalConfig, config));
        }

        endpoints.update = (toUpdate, config = {}) => {
            globalConfig.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
            return axios.put(`${resourceURL}/${toUpdate.id}`, toUpdate, Object.assign(globalConfig, config))
        }

        endpoints.patch = ({ id }, toPatch, config = {}) => {
            globalConfig.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
            return axios.patch(`${resourceURL}/${id}`, toPatch, Object.assign(globalConfig, config))
        }

        endpoints.delete = ({ id }, config = {}) => {
            globalConfig.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
            return axios.delete(`${resourceURL}/${id}`, Object.assign(globalConfig, config));
        }

        return endpoints
    }

}

export default API
