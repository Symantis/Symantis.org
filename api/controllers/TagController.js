/**
 * TagController
 *
 * @description :: Server-side logic for managing tags
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	autoCompleteTags: function (req, res) {
		
		var tag = req.param('tag');

		var tags = [
			'Designer',
			'Developer',
			'Frontend',
			'Backend'
		];

		res.send(tags);
	}
};

