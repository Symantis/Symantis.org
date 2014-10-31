/**
 * WordpressController
 *
 * @description :: Server-side logic for managing wordpresses
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	getPosts: function(req, res){
		sails.Wordpress.getPosts(function( error, posts ) {
		    console.log( "Found " + posts.length + " posts!" );
		    res.json(posts);
		});
	},
	getPost: function(req, res){
		sails.Wordpress.getPost(req.param('id'), function( error, post ) {
		    console.log( "Found " + post.title);
		    res.json([post]);
		});
	}	
};

