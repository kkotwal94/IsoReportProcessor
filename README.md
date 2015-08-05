# IsoReportProcessor
Isomorphic Report processor

# Updated 
* Added UI for merging documents in /reportsall
* Set up API for post and get request for merging documents(didn't test yet however via POSTMAN)
* Added actions/stores for merging reports
* Added in more convenient routing panels

#ToDO:
* Join Forms
* Grid view of employees
* Grid view of Reports
* Create a report template
* Autoassigned reports
* Add in alloyeditor
* Add in jsTOPDF

#Bugs:
* Spamming routes in chrome(~50 times) freezes up data fetching on chrome
* Alias on webpack can't find Alloy-editor
* Navbar doesn't know which route we are on therefore animation doesn't change marker :/
* Refresh on nested route can't load 'window.href' (should use react router to pull route)

#About:

This Web Application is a isomorphic version of the ReportProcessor project I was working on, which has a RESTful API, however this one is a recreation of that web app, with ES6, React, WebPack, AltJS, Express/Node/Mongo, and Isomorphism. Everything important is bundled and is rendered on the server and the client.

#What does it do?:

The idea behind this app is that people at offices generally have to make reports for their employers and managers. They often regularly,monthly, quarterly, review their progress of themselves and their employees and how much closer they have made it towards their goal and write up a document for it. This Web App allows a user to create that report, copy and paste their text data in, and create templates for it. It also allows the employee to assign certain parts of his report to his or her underlings. Those are called Subreports, which have a parent that is the ParentReport. Of course, a SubReport can also have a SubReport as well, and now we have a Tree-Like data structure. The benefit is that whoever sits at the top of the tree can assign reports to the next level, whom can assign reports to their next level and so forth with a click of a button. The task of writing these reports are repetitive and redundant which is why I think its a good idea to simplify it even further.

#Hurdles To Cross:
* Converting HTML to DOCX DOC or PDF
* Using AlloyEditor to its maximum abillity (being able to generate multiple editors on a page, processing the data in the editor as a POST request)