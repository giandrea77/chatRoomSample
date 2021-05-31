module.exports = function(app) {
 
    var chatRoom = require("../controllers/chatRoomController.js");
    var deleteController = require('../controllers/deleteController.js');
    var usersController = require('../controllers/usersController.js');

    app.route('/recent').get(chatRoom.getRecentConversation);
    app.route('/:roomId').get(chatRoom.getConversationByRoomId);
    app.route('/initiate').post(chatRoom.initiate);
    app.route('/:roomId/message').post(chatRoom.postMessage)
    app.route('/:roomId/mark-read').put(chatRoom.markConversationReadByRoomId);

    app.route('/room/:roomId').delete(deleteController.deleteRoomById);
    app.route('/message/:messageId').delete(deleteController.deleteMessageById);

    app.route('/users').get(usersController.onGetAllUsers);
    app.route('/users').post(usersController.onCreateUser);
    app.route('/users/:id').get(usersController.onGetUserById);
    app.route('/users/:id').delete(usersController.onGetUserById);

}