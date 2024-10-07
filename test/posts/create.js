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


    it('create a post', async function () {
        try {
            uid = await user.create({
                username: 'uploads user',
                password: 'abracadabra',
                gdpr_consent: 1,
            });
    
            ({ cid } = await categories.create({
                name: 'Test Category',
                description: 'Test category created by testing script',
            }));
            
            endorsed = false;

            const topicPostData = await topics.post({
                uid,
                cid,
                title: 'topic with some images',
                content: 'here is an image [alt text](/assets/uploads/files/abracadabra.png) and another [alt text](/assets/uploads/files/shazam.jpg)',
                endorsed
            });
            } catch (error) {
            assert.strictEqual(error.message, '[[error:invalid-uid]]');
        }
    });
});

describe('addReplyTo', function () {
});

describe('checkToPid', function () {
});
