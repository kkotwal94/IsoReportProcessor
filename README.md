# IsoReportProcessor
Isomorphic Report processor

# Updated 
* Added UI for merging documents in /reportsall
* Set up API for post and get request for merging documents(didn't test yet however via POSTMAN)
* Added actions/stores for merging reports
* Added in more convenient routing panels
* JoinTable, to merge documents (add, remove, delete)
* Merging items in that table

#ToDO:
* Grid view of employees
* Grid view of Reports
* Create a report template (maybe done need this)
* Autoassigned reports
* Add in alloyeditor
* Add in jsTOPDF (in progress)

#Bugs:
* Spamming routes in chrome(~50 times) freezes up data fetching on chrome
* Alias on webpack can't find Alloy-editor
* Navbar doesn't know which route we are on therefore animation doesn't change marker :/
* Reloading css on refresh at nested route, and local data

#About:

This Web Application is a isomorphic version of the ReportProcessor project I was working on, which has a RESTful API, however this one is a recreation of that web app, with ES6, React, WebPack, AltJS, Express/Node/Mongo, and Isomorphism. Everything important is bundled and is rendered on the server and the client.

#What does it do?:

The idea behind this app is that people at offices generally have to make reports for their employers and managers. They often regularly,monthly, quarterly, review their progress of themselves and their employees and how much closer they have made it towards their goal and write up a document for it. This Web App allows a user to create that report, copy and paste their text data in, and create templates for it. It also allows the employee to assign certain parts of his report to his or her underlings. Those are called Subreports, which have a parent that is the ParentReport. Of course, a SubReport can also have a SubReport as well, and now we have a Tree-Like data structure. The benefit is that whoever sits at the top of the tree can assign reports to the next level, whom can assign reports to their next level and so forth with a click of a button. The task of writing these reports are repetitive and redundant which is why I think its a good idea to simplify it even further.

#Hurdles To Cross:
* Converting HTML to DOCX DOC or PDF
* Using AlloyEditor to its maximum abillity (being able to generate multiple editors on a page, processing the data in the editor as a POST request)

#Documentation for whats done so far:
*	API’s for everything
*	/GET Profile
*	/GET Reports
*	/GET SingletonReport
*	/GET IncompleteReports
*	/GET FinalCompletedReport (A API that puts together the form’s body, its subforms, and all the reports associated with it into a variable, so we can print or convert to pdf)
*	/GET AllUsers
*	/GET MyEmployees
*	/POST editProfile
*	/POST reports
*	/POST editSingleReport
*	/POST DeleteSingleReport
*	/POST addSubReport
*	/POST assignReport
*	/POST mergeReports (Combine reports on button Click)
*	/POST addToMergeList (Keep a list to keep track of the reports we want to put together)
*	/POST removeFromMergeList (Remove a report from that list)
*	/POST setTitle (create a title for our new report mergeReport will make)
*	/POST addNewReport (create a report for the user)
*	/POST setComplete (set the report to complete or incomplete)
*	/POST employUser (sets user as your employee, can set yourself too, and also deals with unemploying users)
*	/POST signup
*	/POST login

#Implemented in CKEDITOR for RTF(Rich-text-format editing):
*	Can paste in word documents
*	Can paste in images
*	Can type in a report in their if you want (styling options, bold, italics, etc)
*	Can create tables
*	Can full screen it
*	You can even spell check it

#User authentication
*	Create a Username and sign up at /signup
*	Login at /
*	Only one unique username can exist at a time
*	PassportJS is the library used for login/signup which hashes passwords as well

#Database
*	User model which defines their profile and login credentials, password is hashed. It also contains their mergeList, and saves the items/reports it wants to merge in case you navigate somewhere else or logout
*	Reports model which defines a report with a date, title, author (referenced by User:id), authors(all people involved in report, primary author is indexed at 0), and owner(the person who creates the report, or assigns it to someone else), and has subreports
*	MongoDB, with mongoose as its node client to do CRUD operations

#Webpack(bundler)
*	Bundles together all the node_modules, javascript files, css, and utilities into a file called bundle.js, reduces the size of the file loaded by browser to around 1mb, whereas the server-sided is also bundled in to files all smaller than 5kb (4 of them)
*	Uses a transpiler called BabelJS to convert ES6 or ES2015 Javascript (new official release of javascript) to ES5(standard older, everyday javascript) for browsers on the client side.
*	Uses a loader to extractCSS from the client into a minified version

#Frontend (ReactJS, Flux architecture)
*	All components are written in the apps/components folder,  they consist of all the javascript for our front end
*	They are written in React v0.13
*	They are routed via React-Router and Node Express(incase user hits refresh), and the router says {if this url is hit, then render the component that matches this url}, creating a single page app
*	Flux architecture sends data one way, and gives us a method to communicate between components, for example if /myReports loads data for all the reports that belong to me, then I can use this data in /myReportsIncomplete as well. We store this data into a ‘store’ which dispatches new data to all our components whenever that data is modified. Therefore all the data is updated live. It dispatches new data whenever a ‘action’ is fired. A action can be changing a firstName field in my profile in the front end, the action grabs the data entered into the form, sends it to our api, which updates the database, and then our action tells our store that we have new/modified data and it adjusts the store. 
*	Actions are in /actions, Stores are in /store
*	The Flux Library used was called altJS
*	All the utilities used are in a folder called utils
*	All the CSS is in a folder called CSS
*	All images/png/svg’s used are called in a folder named images
*	All routes are defined in route.js
*	Every component is inherited by APP.js, which is the entry point to our app
*	Base.html is the base html that has app mounted on to it
*	UniversalRenderer is what runs our router on the server and client/front end. So that it matches in both cases, it makes the whole app isomorphic as well. Everything is written in javascript, UniversalRender grabs our route, our stores, and our instance of the application and mounts it ontop of basehtml and lets our server(Node) know as well.
*	Helmconfig.js holds all our meta  tags and link tags for base.html
*	Can search all tables/data
*	Convert HTML to PDF
*	Done in ReportView.js, using the tool jsPDF we convert the html to pdf, however css/color isn’t maintained, and if it is pasted in data it looks really bad. Need to find alternative.

#BUGS:
*	Nested Routes: Any routes with a singleton or nested route can’t be refreshed on for example on the edit report route, or view single report route, or add subreport route, however back buttons work and so do forward buttons, the server must not be getting nested route data in UniversalRender
*	Internet explorer for some reason doesn’t want to update the reports body whenever it is edited immediately, after going to another route and back, it then does it, or even a refresh. Everything else updates fine in real time however. Currently trying this out: http://stackoverflow.com/questions/4303829/how-to-prevent-a-jquery-ajax-request-from-caching-in-internet-explorer
#	CKEditor when opening up ‘Edit this form’ displays the current data in the editor, but when editing a report the second time that data you are editing does not exist within the editor, however you can still edit it. The documentation is pretty bad but I have an idea of creating a new instance of ckeditor whenever we try to edit.
*	JSPDF: Converts pasted data in really badly (stuck at this bug)
*	MergeList/Combine report: It merges the reports really quick and well however the algorithm does it in a order where all Reports that don’t have subreports are indexed first, then all the ones that have subreports are indexed after those, which breaks the order of how a user might want to combine them. This is just a asynchronous issue, can figure out soon.
*	Navbar doesn’t know which route you are at so it stays at its default position or wherever you hit it last, however it still works. But if you are at ‘Dashboard’ and hit ‘Dashboard’ it will stay open, hitting the X icon manually closes it
*	Statistics button/route is empty for now

#BUGS fixed:
*	Updating data in IE9+
*	Panel hovering css in FireFox
*	Chrome halting fetching data after spamming 50+ routes (spamming back and forward buttons in reports to singlereports)
*	Login slow
*	Fetching data took too long for datasets over 1000 reports, optimized algorithm
*	Fetching data from a Tree-structure grabbing the data for a report in order from Main Report subreports its subreports
*	Getting loading function to work when generating report
*	First report ever made for any user was always slow, optimized function for that
*	Profile updates didn’t show In the reports info
*	Dropdown bar didn’t show proper names for selected items
*	Icons wouldn’t change immediately on update
*	Panel size was too inconsistent
*	Css out of place for body
*	HTTPS was activated, turned off for development  wouldn’t allow api changes when on


