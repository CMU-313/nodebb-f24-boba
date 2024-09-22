'use strict';

const api = require('../../api');
const sockets = require('../index');

module.exports = function (SocketPosts) {
    SocketPosts.endorse = async function (socket, data) {
        if (!data || !data.pid || !data.uid) {
            throw new Error('[[error:invalid-data]]');
        }
        sockets.warnDeprecated(socket, 'POST /api/v3/posts/:pid/endorse');
        return await api.posts.endorse(socket, { pid: data.pid, uid: data.uid });
    };

    SocketPosts.unendorse = async function (socket, data) {
        if (!data || !data.pid || !data.uid) {
            throw new Error('[[error:invalid-data]]');
        }
        sockets.warnDeprecated(socket, 'POST /api/v3/posts/:pid/unendorse');
        return await api.posts.unendorse(socket, { pid: data.pid, uid: data.uid });
    };
};
