mtg
===

[Magic the Gathering](http://gatherer.wizards.com/Pages/Default.aspx) deck builder and collection holder

Idea
===
Currently available deck builders are not supporting mobile and tablets. Also it is not convenient to keep track of your collection when you have 1000+ cards.

This solution should provide both easy collection adding (keyboard shortcuts, easy search etc) and convenient UI for both PC and mobile devices.
So next time you go to a draft, you can easly search what carda you have, what cards you want etc


Demo
===
Currently working demo can be found from http://37.139.10.26/#!/    
NOTE: There is no storage implementation so nothing is saved past current active session.

For those who are not familiar with MTG, few demo card names:    
Forest    
Air Elemental    
Serra Avatar  

Credits
===
Current search is done using [elasticsearch](http://www.elasticsearch.org/).
Front-end is done with [AngularJS](http://www.angularjs.org/) using [bootstrap](http://getbootstrap.com/) for ui.

MTG card info and images are provided by [MTGcardinfo](http://mtgjson.com/#exampleCard) and [MTGimages](http://mtgimage.com/)

