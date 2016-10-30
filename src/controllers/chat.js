const RouteController = require('./route');

class ChatController extends RouteController {
  createMessage(request, reply) {
    const message = request.payload;
    
    this.repositories.Message.createMessage(message)
      .then((messageId) =>
        this.repositories.Notification.createMessagesNotifications(message.receiverId, messageId)
      )
      .then(() => reply().code(201))
      .catch(e => reply(this.handleError(e)));
  }
  
  getMessages(request, reply) {
    const { senderId, receiverId } = request.params;
    
    this.repositories.Message.getMessages(senderId, receiverId)
      .then((raw) => reply(raw).code(200))
      .catch(e => reply(this.handleError(e)));
  }
}

module.exports = ChatController;