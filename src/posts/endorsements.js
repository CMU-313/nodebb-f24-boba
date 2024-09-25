'use strict';

module.exports = function (Posts) {
    Posts.endorse = async function (pid, uid) {
        const postData = await Posts.getPostFields(pid, ['endorsedBy']);
        if (postData.endorsedBy) {
            throw new Error('[[error:post-already-endorsed]]');
        }
        await Posts.setPostField(pid, 'endorsedBy', uid);
    };

    Posts.unendorse = async function (pid, uid) {
        const postData = await Posts.getPostFields(pid, ['endorsedBy']);
        if (postData.endorsedBy === uid) {
            await Posts.setPostField(pid, 'endorsedBy', null);
        } else {
            throw new Error('[[error:not-endorsed-by-user]]');
        }
    };
};
