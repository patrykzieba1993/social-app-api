const Repository = require('./repository');

class SearchRepository extends Repository {
  searchUsers(query) {
    return this.models.Users.searchUsers(query);
  }
}

module.exports = SearchRepository;
