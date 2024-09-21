'use strict';

const db = require('../database');

module.exports = function (Categories) {
	Categories.markAsAnsweredByProfessor = async function (cids, uid) {
		if (!Array.isArray(cids) || !cids.length || parseInt(uid, 10) <= 0) {
			return;
		}
		
		let keys = cids.map(postId => `cid:${postId}:answered_by_professor`);
		const hasAnswered = await db.isMemberOfSets(keys, uid);
		keys = keys.filter((key, index) => !hasAnswered[index]);
		await db.setsAdd(keys, uid);
	};
};
