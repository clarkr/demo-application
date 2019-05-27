import _ from 'lodash';
import ApiService from './ApiService';

class ApiModel {
  constructor(params = {}) {
    this._params = params;
  }

  static apiService = new ApiService();

  get apiService() {
    return this.constructor.apiService;
  }

  _param(key) {
    return this._params[key];
  }

  get fields() {
    return this.constructor.fields;
  }

  get id() {
    return this._param('id');
  }

  get title() {
    return this._param('title');
  }

  get content() {
    return this._param('content');
  }

  get uniqueKey() {
    return `${this.constructor.apiPath}-${this.id}`;
  }

  fieldKey(field) {
    return `${this.uniqueKey}-${field.name}`;
  }

  static _parseModels(data) {
    return _.map(data, (_data) => new this(_data));
  }

  static getAll() {
    return this.apiService.getAll(this.apiPath).then(this._parseModels.bind(this));
  }

  _sync(data) {
    _.merge(this._params, data);
  }

  update(data) {
    return this.apiService.update(this.constructor.apiPath, this._param('id'), data).then(
      this._sync.bind(this)
    );
  }
}

export default ApiModel;
