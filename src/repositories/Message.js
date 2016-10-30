const Repository = require('./repository');

class MessageRepository extends Repository {
  createMessage(message) {
    return this.models.Messages.create(message)
      .then(inserted => inserted.id);
  }
  getMessages(senderId, receiverId) {
    return this.models.Messages.getMessages(senderId, receiverId);
  }
}

module.exports = MessageRepository;
