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
}

export default ApiService;
