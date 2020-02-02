import Auth from '@aws-amplify/auth';
import SampleApiClient from 'sample-api-client';

class ApiService {
  constructor() {
    this.client = new SampleApiClient.DefaultApi();
    this.client.apiClient.basePath = '/v1';
  }

  _makeRefreshedRequest(makeRequest, ...params) {
    return Auth.currentSession().then((authData) => {
      const apiClientInstance = SampleApiClient.ApiClient.instance;
      apiClientInstance.authentications.AuthToken.apiKey = authData.idToken.jwtToken;
      return makeRequest.call(this.client, ...params);
    });
  }

  getAll(model) {
    return this._makeRefreshedRequest(this.client[`${model}Get`]);
  }

  update(model, id, data) {
    return this._makeRefreshedRequest(this.client[`${model}IdPut`], id, data);
  }

  create(model, data) {
    return this._makeRefreshedRequest(this.client[`${model}Post`], data);
  }

  destroy(model, id) {
    return this._makeRefreshedRequest(this.client[`${model}IdDelete`], id);
  }

  get(model, id) {
    return this._makeRefreshedRequest(this.client[`${model}IdGet`], id);
  }
}

export default ApiService;
