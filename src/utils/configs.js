const _ = require('lodash');

function createPublicationConfigs(cfgs) {
  if (!_.isObject(cfgs) || !Object.keys(cfgs).length) {
    return {};
  }
  return Object.keys(cfgs)
    .filter(key => key.indexOf('CONFIG_') !== -1)
    .reduce((prev, next) => {
      const obj = {};
      const pubName = next.replace('CONFIG_', '').toLowerCase();
      obj[pubName] = cfgs[next];
      return _.merge(prev, obj);
    }, {});
}

module.exports = {
  createPublicationConfigs,
};
