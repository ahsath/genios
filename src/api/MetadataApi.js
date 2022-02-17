import Api from './Api';

class MetadataApi extends Api {
  fetchMetadata(path, config) {
    return fetch(`${this.BASE_URL}${path}?${config.query}`);
  }

  fetchFooter(path, config) {
    return fetch(`${this.BASE_URL}${path}?${config.query}`);
  }
}

export default new MetadataApi();
