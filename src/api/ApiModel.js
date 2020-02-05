import _ from 'lodash';
import ApiService from './ApiService';

class ApiModel {
  constructor(params = {}) {
    this._params = params;
  }

  static apiService = new ApiService();
  static all = [];

  get apiService() {
    return this.constructor.apiService;
  }

  _param(key) {
    return this._params[key];
  }

  get fields() {
    return this.constructor.fields;
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
    const parseModels = (_data) => {
      this.all.push(...this._parseModels(_data));
      return this.all;
    };
    return this.apiService.getAll(this.apiPath).then(parseModels.bind(this));
  }

  _sync(data) {
    _.merge(this._params, data);
  }

  update(data) {
    return this.apiService.update(this.constructor.apiPath, this._param('id'), data).then(
      this._sync.bind(this)
    );
  }

  static create(data) {
    return this.apiService.create(this.apiPath, data).then((_data) => {
      const model = new this(_data);
      this.all.push(model);
      return model;
    });
  }

  destroy() {
    return this.apiService.destroy(this.constructor.apiPath, this._param('id')).then(() => {
      _.remove(this.constructor.all, { id: this.id });
      return this;
    });
  }

  static get(id) {
    return this.apiService.get(this.apiPath, id);
  }
}

export default ApiModel;
