import Api from './Api';

class PropertiesApi extends Api {
  fetchProperties(path, config) {
    return fetch(`${this.BASE_URL}${path}?${config.query}`);
  }
}

export default new PropertiesApi();
