import _ from 'lodash';
import Auth from '@aws-amplify/auth';

class ApiService {
  _makeRefreshedRequest(path, method, data) {
    return Auth.currentSession().then((authData) => {
      const options = {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${authData.idToken.jwtToken}`
        }
      };

      if(_.includes(['PUT', 'POST'], method)) {
        options.body = JSON.stringify(data)
      }

      return fetch(`v1/${path}`, options)
        .then(res => res.json());
    });
  }

  getAll(model) {
    return this._makeRefreshedRequest(model, 'GET');
  }

  update(model, id, data) {
    return this._makeRefreshedRequest(`${model}/${id}`, 'PUT', data);
  }

  create(model, data) {
    return this._makeRefreshedRequest(model, 'POST', data);
  }

  destroy(model, id) {
    return this._makeRefreshedRequest(`${model}/${id}`, 'DELETE');
  }

  get(model, id) {
    return this._makeRefreshedRequest(this.client[`${model}IdGet`], id);
  }
}

export default ApiService;
