var ChatRoom = require('../models/chatRoom'), User = require('../models/user'), ChatMessage = require('../models/chatMessage');

/**
 * Initialize a chat room
 * @param {} req 
 * @param {*} res 
 */
exports.initiate = (req, res) => {

    try {

        console.log("Initiate chatRoom")

        var jsonContent = JSON.parse(JSON.stringify(req.body))
        var chatRoom = new ChatRoom();

        chatRoom.chatRoomName = jsonContent.chatRoomName;
        chatRoom.userCreator = jsonContent.userCreator;

        chatRoom.save(function(err) {

            if (err) {
                console.log('[initiate ChatRoom] ' + err)
                res.status(500).json({ error: err.message })
            } else {
                console.log('[initiate ChatRoom] Saved!')
                res.status(200).json({ message: 'ok' })
            }

        });

    } catch (err) {
        console.log('[initiate ChatRoom]: ' + err)
        res.status(500).json({ error: err.message })
    }

};

/**
 * Post a message
 * 
 * @param {} req 
 * @param {*} res 
 */
exports.postMessage = async (req, res) => { 

    try {

        var chatMessage = new ChatMessage();
        var jsonContent = JSON.parse(JSON.stringify(req.body))

        async.parallel({

            userFind: function(cb) { User.find({'userId': jsonContent.userId}).exec(cb); },
            chatRoomFind: function(cb) { ChatRoom.find({'chatRoomId': jsonContent.chatRoomId}).exec(cb); }

        }, function(err, result) {

            if ( !result.userFind || result.userFind == undefined || result.userFind == "" || result.userFind.length == 0 
                || !result.chatRoomFind || result.chatRoomFind == undefined || result.chatRoomFind == "" || result.chatRoomFind.length == 0 ) {

                res.status(500).json({ error: '[postMessage] MIssing chatRoom or UserID' })

            } else {

                chatMessage.message = jsonContent.message;
                chatMessage.chatRoomName = jsonContent.chatRoomId;
                chatMessage.userID = jsonContent.userID;

                chatMessage.save(function(err) {

                    if (err) {
                        console.log('[postMessage] ' + err)
                        res.status(500).json({ error: err.message })
                    } else {
                        console.log('[postMessage] message saved!')
                        res.status(200).json({ message: 'ok' })
                    }

                });

            }

        });

    } catch (err) {
        console.log('[postMessage]: ' + err)
        res.status(500).json({ error: err.message })
    }

};

exports.getRecentConversation = async (req, res) => { };
exports.getConversationByRoomId = async (req, res) => { };
exports.markConversationReadByRoomId = async (req, res) => { };

