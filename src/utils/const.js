module.exports = {
  ERROR_MESSAGES: {
    UNSUPPORTED_PUB_ID: 'Unsupported publication identifier',
    NOT_AUTHENTICATED: 'Not authenticated',
    DB_ERROR: 'Database Error',
    DB_LOAD_MODELS_ERROR: '{model} is not a valid model',
    DB_ASSOCIATE_MODELS_ERROR: 'DB models association error: {message}',
    NO_ACTIVITY_FOUND: 'No activity found for specific action',
    NO_ENV_VAR: 'Unknown environment',
  },
  ERROR_TYPES: {
    DB_ERROR: 'SequelizeDatabaseError',
    DB_UNIQUE: 'SequelizeUniqueConstraintError',
    TYPE_ERROR: 'TypeError',
  },
  EXTENSIONS: {
    ON_POST: 'onPostHandler',
    ON_PRE: 'onPreResponse',
  },
  BOOM_ERROR_METHODS: {
    NOT_FOUND: 'notFound',
    FORBIDDEN: 'forbidden',
    BAD_REQUEST: 'badRequest',
    BAD_DATA: 'badData',
    BAD_IMPLEMENTATION: 'badImplementation',
  },
};
