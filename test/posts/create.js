'use strict';

const assert = require('assert');
const db = require('../mocks/databasemock');
const plugins = require('../../src/plugins');
const user = require('../../src/user');
const topics = require('../../src/topics');
const categories = require('../../src/categories');
const groups = require('../../src/groups');
const privileges = require('../../src/privileges');
const meta = require('../../src/meta');
const Posts = {};


describe('create post', function () {
    let pid;
    let purgePid;
    let cid;
    let uid;
    let endorsed;

    it('create a post where endorsed is false', async function () {
        try {
            // Create a user
            uid = await user.create({
                username: 'uploads user',
                password: 'abracadabra',
                gdpr_consent: 1,
            });
    
            // Create a test category
            ({ cid } = await categories.create({
                name: 'Test Category',
                description: 'Test category created by testing script',
            }));
            
            // Create a post within the category
            const topicPostData = await topics.post({
                uid,
                cid,
                title: 'topic with some images',
                content: 'here is an image [alt text](/assets/uploads/files/abracadabra.png) and another [alt text](/assets/uploads/files/shazam.jpg)',
            });
            
            // Check if 'endorsed' is false
            endorsed = topicPostData.postData.endorsed;
            assert.strictEqual(endorsed, false);
        } catch (error) {
            console.log(error);
        }
    });
});

describe('addReplyTo', function () {
});

describe('checkToPid', function () {
});
