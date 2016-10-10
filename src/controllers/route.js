const Boom = require('boom');
const Repositories = require('./../repositories');

const CONST = require('./../utils/const');
const BOOM_ERROR_METHODS = CONST.BOOM_ERROR_METHODS;
const ERROR_TYPES = CONST.ERROR_TYPES;

class RouteController {
  constructor(opts) {
    this.logger = opts.server.log.bind(opts.server);
    this.repositories = opts.server.plugins[Repositories.register.attributes.name].repositories;
  }

  // --------------------------------------------------------

  handleError(e) {
    let methodName = BOOM_ERROR_METHODS.BAD_REQUEST;
    let message = e.message;
    let data = null;
    let errorCode = e.code;

    // custom error handlers specific for system
    switch (e.name) {
      case ERROR_TYPES.DB_ERROR:
      case ERROR_TYPES.DB_UNIQUE:
        errorCode = 500;
        data = e.sql;
        message = e.message;
        break;
      case ERROR_TYPES.TYPE_ERROR:
        errorCode = 500;
        break;
      default:
        break;
    }

    // default error handlers
    switch (errorCode) {
      case 422:
        methodName = BOOM_ERROR_METHODS.BAD_DATA;
        break;
      case 403:
        methodName = BOOM_ERROR_METHODS.FORBIDDEN;
        break;
      case 404:
        methodName = BOOM_ERROR_METHODS.NOT_FOUND;
        break;
      case 500:
        methodName = BOOM_ERROR_METHODS.BAD_IMPLEMENTATION;
        this.logger('error', e.stack);
        this.rollbar.handleError(e);
        break;
      default:
        break;
    }

    return Boom[methodName](message, data);
  }
}

module.exports = RouteController;
