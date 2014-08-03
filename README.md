Symantis.org
============

Symantis.org Website

In the digital pipeline, designers and developers don’t always understand each other.  When they do communicate it’s an endless debate of form vs function.

Symantis is the "realtime" digital system that allows a community of Designers and Developers to collaborate and accelerate their workflow. It creates production-level web apps while its users also learn new skillsets.

##The Symantis System is:##

A powerful Educational Ecosystem.

A robust Creator App that let's designers and developers speak the same language.

A distributed network of ideas that creates a fair economy without exploiting the creators.


## Symantis.org Bootstrap##

Symantis.org Bootstrap is a boilerplate for the initial build of Symantis.org, it is Angular-based, single page application that acts a portal to the Symantis System.

Current features include: a modular angular js architecture and file structure, an example of how to include services and directives from bower (lodash, angular-moment), and authentication using PassportJs and soon to be encorporating SyQuery and SyScribe.

It uses Foundation 5 Sass framework and Compass.

### To get up and running ###
You will need to have Sails v0.10 installed on your machine (sudo npm install sails@beta -g) and then clone the repo, cd into the project directory and run

    $ npm install (if you are on Windows using Vagrant, be sure to: npm install --no-bin-links)
    $ cd assets
    $ bower install
    $ cd ../
    $ sails lift

Once Lifted, compile the SASS by saving your app.scss file (this is a bug that needs fixed) and then Check it out at [http://localhost:1337](http://localhost:1337)


##Rational##

###Why Javascript?###

For the first time, Javascript is availible on the frontend and backend (Node.js) of web technologies.  In addition, it's really quick.  By using a Javascript Only architecture, new comers to our world will only need to handle a single language to get started.  This lowers the barriers of entry into the Symantis pipeline.

###Why Sails.js###

Sails has brought a really functional and powerful MVC framework to the Node.js platform.  Since a Symantis goal is to keep developers and designers on the same beat, we need implement common structures like MVC. Sails.js is also stable and is quickly becoming popular amongst the Node.js community.

###Why Angular.js###

Angular.js, while so many things, allows for expressive html markup.  This expression will allow for millions of different people to build and recycle expressive, easy to understand, markup in projects.  The second major benefit to us using Angular is the way it implements 2-way data binding.  Using SyQuery and SyScribe, we can use this data binding and websockets to create realtime collaborative projects between developers and designers.
