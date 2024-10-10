'use strict';

const db = require('../database');
const plugins = require('../plugins');
const privileges = require('../privileges');

module.exports = function (Posts) {
    Posts.endorse = async function (pid, uid) {
        console.log("Calling toggleEndorse with UID VICKY2:", uid);
        return await toggleEndorse('endorse', pid, uid);
    };

    Posts.unendorse = async function (pid, uid) {
        return await toggleEndorse('unendorse', pid, uid);
    };

    async function toggleEndorse(type, pid, uid) {
        if (parseInt(uid, 10) <= 0) {
            throw new Error('[[error:not-logged-in]]');
        }
        console.log("USER ID BEFORE CALLING CAN ENDORSE VICKY: ", uid);
        const isAllowed = await privileges.posts.canEndorse(uid);

        if (!isAllowed) {
            throw new Error('[[error:permission-denied]]');
        }

        const isEndorsing = type === 'endorse';

        const [postData, hasEndorsed] = await Promise.all([
            Posts.getPostFields(pid, ['pid', 'uid']),
            Posts.hasEndorsed(pid, uid),
        ]);

        if (isEndorsing) {
            await db.setAdd(`pid:${pid}:users_endorsed`, uid);
        } else {
            await db.setRemove(`pid:${pid}:users_endorsed`, uid);
        }
        postData.endorsed = await db.setCount(`pid:${pid}:users_endorsed`);
        await Posts.setPostField(pid, 'endorsed', postData.endorsed);

        plugins.hooks.fire(`action:post.${type}`, {
            pid: pid,
            uid: uid,
            owner: postData.uid,
            current: hasEndorsed ? 'endorsed' : 'unendorsed',
        });

        return {
            post: postData,
            isEndorsed: isEndorsing,
        };
    }

    Posts.hasEndorsed = async function (pid, uid) {
        if (parseInt(uid, 10) <= 0) {
            return Array.isArray(pid) ? pid.map(() => false) : false;
        }

        if (Array.isArray(pid)) {
            const sets = pid.map(pid => `pid:${pid}:users_endorsed`);
            return await db.isMemberOfSets(sets, uid);
        }
        return await db.isSetMember(`pid:${pid}:users_endorsed`, uid);
    };
};