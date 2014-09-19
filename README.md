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

It also uses MongoDB as a persistent database, to work locally with no connection to the database, you will need to alter config/models and set connections to "localDiskDb" otherwise contact Scott Wyatt to get a copy of the local.js file that connects the live database.

Symantis.org uses Foundation 5 Sass framework and Compass.

### To get up and running ###
You will need to have Sails v0.10 installed on your machine (sudo npm install sails -g) and then clone the repo, cd into the project directory and run

    $ npm install (if you are on Windows using Vagrant, be sure to: npm install --no-bin-links)
    $ cd assets
    $ bower install
    $ cd ../
    $ sails lift

Once Lifted, livereload has been enabled, so any changes you make to an scss file or to anything inside assets will update live in your browser.

If you do not have Compass installed you will need to run `sudo gem install compass` and `npm install compass`

Development process
-------------------

Developers work in their own trees, then submit pull requests when they think
their feature or bug fix is ready.

If it is a simple/trivial/non-controversial change, then one of the Symantis
development team members simply pulls it.

If it is a *more complicated or potentially controversial* change, then the patch
submitter will be asked to start a discussion with the devs and community.

The patch will be accepted if there is broad consensus that it is a good thing.
Developers should expect to rework and resubmit patches if the code doesn't
match the project's coding conventions (see `doc/coding.txt`) or are
controversial.

The `master` branch is regularly built and tested, but is not guaranteed to be
completely stable. [Tags](https://github.com/Symantis/Symantis.org/tags) are created
regularly to indicate new official, stable release versions of Symantis.org.


##Rational##

###Why Javascript?###

For the first time, Javascript is availible on the frontend and backend (Node.js) of web technologies.  In addition, it's really quick.  By using a Javascript Only architecture, new comers to our world will only need to handle a single language to get started.  This lowers the barriers of entry into the Symantis pipeline.

###Why Sails.js###

Sails has brought a really functional and powerful MVC framework to the Node.js platform.  Since a Symantis goal is to keep developers and designers on the same beat, we need to implement common structures like MVC. Sails.js is also stable and is quickly becoming popular amongst the Node.js community.

###Why Angular.js###

Angular.js, while so many things, allows for expressive html markup.  This expression will allow for millions of different people to build and recycle expressive, easy to understand, markup in projects.  The second major benefit to us using Angular is the way it implements 2-way data binding.  Using SyQuery and SyScribe, we can use this data binding and websockets to create realtime collaborative projects between developers and designers.

###Why a Crypto Currency###

We quickly realized that it would be impossible for a non-funded starter organization to host cloud repositories for the potential millions of users.  We investigated using Torrents as way of seeding repositories, and liked how that would work, but realized there was little incentive to hosting these.  Then we investigated Crypto Currencies and realized that we could add potential value to hosting and sharing repositories with a timestamp that could credit the creators and contributers.  The Symanitis Currency will also allow for users who are not designers or developers to improve the network through maintenance like mining. This is also a very likely model to add value to good-will open source contributions which could completely change the employer/employee relationship.
