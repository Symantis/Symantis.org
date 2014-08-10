angular.module('templates-app', ['about/index.tpl.html', 'header/index.tpl.html', 'home/index.tpl.html', 'messages/index.tpl.html', 'template/index.tpl.html']);

angular.module("about/index.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("about/index.tpl.html",
    "<div class=\"row\">\n" +
    "	<div class=\"large-12 columns\">\n" +
    "		<h1>About Symantis</h1>\n" +
    "\n" +
    "		<p>Symantis is a boilerplate application that uses the latest Sails.js and Angular to easily create realtime, single page web applications.</p>\n" +
    "		<p>It borrows ideas from <a href=\"https://github.com/ngbp/ngbp\">ngbp</a> and <a href=\"https://github.com/angular-app/angular-app/\">angular-app</a>.</p>\n" +
    "	</div>\n" +
    "</div>");
}]);

angular.module("header/index.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("header/index.tpl.html",
    "<div ng-controller=\"HeaderCtrl\">\n" +
    "    <nav class=\"top-bar\" data-topbar>\n" +
    "      <ul class=\"title-area\">\n" +
    "        <li class=\"name\">\n" +
    "          <h1><a href=\"/home\">Symantis</a></h1>\n" +
    "        </li>\n" +
    "         <!-- Remove the class \"menu-icon\" to get rid of menu icon. Take out \"Menu\" to just have icon alone -->\n" +
    "        <li class=\"toggle-topbar menu-icon\"><a href=\"#\"><span>Menu</span></a></li>\n" +
    "      </ul>\n" +
    "\n" +
    "      <section class=\"top-bar-section\">\n" +
    "        <!-- Right Nav Section -->\n" +
    "        <ul class=\"right\">\n" +
    "          <li ng-if=\"currentUser\" class=\"has-dropdown\">\n" +
    "            <a>\n" +
    "              {{currentUser.email}} \n" +
    "            </a>\n" +
    "            <ul class=\"dropdown\">\n" +
    "                <li>\n" +
    "                  <a href=\"/logout\">Logout</a>\n" +
    "                </li>\n" +
    "            </ul>\n" +
    "          </li>\n" +
    "        </ul>\n" +
    "        <!-- Left Nav Section -->\n" +
    "        <ul class=\"left\">\n" +
    "            <li ng-repeat=\"navItem in navItems\">\n" +
    "                <a href=\"{{navItem.url}}\">{{navItem.title}}</a>\n" +
    "            </li>\n" +
    "        </ul>\n" +
    "      </section>\n" +
    "    </nav>\n" +
    "</div>");
}]);

angular.module("home/index.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("home/index.tpl.html",
    "<div class=\"row\">\n" +
    "	<div class=\"large-12 columns\">\n" +
    "		<h1>Symantis</h1>\n" +
    "		<p class=\"lead\">Sails.js + Angular = Awesome</p>\n" +
    "\n" +
    "		<p>Read <a href=\"/about\">about</a> the project to learn more</p>\n" +
    "\n" +
    "		<p><a href=\"/messages\">View all messages</a></p>\n" +
    "\n" +
    "		<p><a href=\"/template\">View Template</a></p>\n" +
    "	</div>\n" +
    "</div>");
}]);

angular.module("messages/index.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("messages/index.tpl.html",
    "<div class=\"row\">\n" +
    "	<div class=\"large-12 columns\">\n" +
    "		<h2>Messages</h2>\n" +
    "		<p>Open this page in two browsers and see how easy Sails.js makes realtime applications!</p>\n" +
    "		<p ng-show=\"!currentUser\"><a href=\"/register\">Register</a> to post a message!</p>\n" +
    "	</div>\n" +
    "</div>\n" +
    "<div class=\"row\">\n" +
    "	<div class=\"large-6 columns\">\n" +
    "		<form role=\"form\" ng-submit=\"createMessage(newMessage)\">\n" +
    "			<div class=\"form-group\">\n" +
    "			<label for=\"messageTitle\">Your Message</label>\n" +
    "				<input type=\"text\" ng-model=\"newMessage.title\" class=\"form-control\" id=\"messageTitle\" ng-disabled=\"!currentUser\">\n" +
    "			</div>\n" +
    "			<button type=\"submit\" class=\"button primary-button\" ng-disabled=\"!currentUser || !newMessage.title\">Submit</button>\n" +
    "		</form>\n" +
    "	</div>\n" +
    "	<div class=\"large-6 columns\">\n" +
    "		<h3>All Messages</h3>\n" +
    "		<ul>\n" +
    "			<li ng-repeat=\"message in messages\">{{message.title}} <b>by</b> {{message.user.username}}, <span am-time-ago=\"message.updatedAt\"></span> <button type=\"button\" class=\"btn btn-danger btn-xs\" ng-click=\"destroyMessage(message)\" ng-show=\"currentUser.id === message.user.id\"><i class=\"fa fa-trash-o\"></i></button></li>\n" +
    "		</ul>\n" +
    "	</div>\n" +
    "</div>");
}]);

angular.module("template/index.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/index.tpl.html",
    "<div class=\"row grid_tpl\">\n" +
    "	<section class=\"large-2 columns main_left\">\n" +
    "		<p>left Column</p>\n" +
    "	</section>\n" +
    "	<section class=\"large-8 columns main_content\">\n" +
    "		<p>Main Content</p>\n" +
    "	</section>\n" +
    "	<section class=\"large-2 columns main_right\">\n" +
    "		<p>Right Column</p>\n" +
    "	</section>\n" +
    "</div>");
}]);
