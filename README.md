# IsoReportProcessor
Isomorphic Report processor

# Updated 
* Added Front end ui for Dashboard
* Added React-router routing for Dashboard items (All ToDO UI's atleast with dummy text to verify we have reached the route)
* Set up API for post and get request (didn't test yet however via POSTMAN)
* Added sick Nav
* Added in flux/altjs component communication(via dispatchers/actions)

#ToDO:
* Add a subform (90% complete)
* Join Forms
* Grid view of employees
* Grid view of Reports
* Create a report template
* Autoassigned reports
* Add in alloyeditor
* Add in jsTOPDF

#Bugs:
* First document addition for user takes too long or can't be found
* Spamming routes in chrone(~50 times) freezes up data fetching on chrome
* Alias on webpack can't find Alloy-editor
* Navbar doesn't know which route we are on therefore animation doesn't change marker :/

#About:

This Web Application is a isomorphic version of the ReportProcessor project I was working on, which has a RESTful API, however this one is a recreation of that web app, with ES6, React, WebPack, AltJS, Express/Node/Mongo, and Isomorphism. Everything important is bundled and is rendered on the server and the client.

#What does it do?:

The idea behind this app is that people at offices generally have to make reports for their employers and managers. They often regularly,monthly, quarterly, review their progress of themselves and their employees and how much closer they have made it towards their goal and write up a document for it. This Web App allows a user to create that report, copy and paste their text data in, and create templates for it. It also allows the employee to assign certain parts of his report to his or her underlings. Those are called Subreports, which have a parent that is the ParentReport. Of course, a SubReport can also have a SubReport as well, and now we have a Tree-Like data structure. The benefit is that whoever sits at the top of the tree can assign reports to the next level, whom can assign reports to their next level and so forth with a click of a button. The task of writing these reports are repetitive and redundant which is why I think its a good idea to simplify it even further.

#Hurdles To Cross:
* Converting HTML to DOCX DOC or PDF
* Using AlloyEditor to its maximum abillity (being able to generate multiple editors on a page, processing the data in the editor as a POST request)