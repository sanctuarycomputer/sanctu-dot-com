import hashify from 'object-hash';

const ContentfulData = {
  cache: {
    getEntries: {},
    getLocales: {}
  },
  setRef(contentful) {
    this.contentful = contentful;
  },
  getEntries(query) {
    const hashified = hashify(query);
    if (!!this.cache.getEntries[hashified]) {
      return new Promise(resolve => resolve(this.cache.getEntries[hashified]));
    }

    const promise = this.contentful.getEntries(query).then(val => {
      this.cache.getEntries[hashified] = val;
      return val;
    });

    this.cache.getEntries[hashified] = promise;
    return promise;
  },
  getLocales() {
    return this.contentful.getLocales();
  }
};

export default ContentfulData;
