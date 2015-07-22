import React from 'react';
import 'scss/main.scss';
export default class Readme extends React.Component {
render() {
    return (
      <div>
        <main>
        <div className = "readME">
          <div className ="date">
          July 22, 2015
          </div>
          <h1>So how do I use this app, what do I need to know?</h1>
          <p>This app is completely isomorphic, so it runs soely on javascript in the server and the client. Javascript has to be enabled in order to use it. The source can be viewed <a href = "https://github.com/kkotwal94/IsoReportProcessor"> here</a>.</p>
          <h1>What is a User in this app?</h1>
          <p>This web app generates a user on sign up, and soon as it is generated it allows that user to log in, this user is a employee who can assign employees that work for him or her <strong><a href="/AEmployees">here</a></strong>. Once a user assigns a employee here they can view their employees under the employee view widget or link <a href= "/MEmployees">here</a>. They can be unnassigned in this view if necessary. Try not to assign yourself as a employee it doesnt do much.</p>
          <p>Every user can edit their own profile by entering a first name, last name, date of birth, department, and position in the <strong>View/Edit Profile</strong> widget. The data updates asynchronously.</p>
          <h1>How does a user create a report, and what control does he or she have?</h1>
          <p>A user can add or create a report in the hamburger menu option or by clicking on the Create a new Report widget. Once the widget is hit, a user has a option to create a report based off one they made before (template) or a completely new report from scratch.</p>
          <h1>Creating a report from scratch</h1>
          <p>If you create a new report from scratch then in the next view it should display a title you want to give the document, a body to fill, and the amount of subreports you want. Sub reports are reports that make up your report. For example, if you would like to assign one of you employees a sub report, you can do so by selecting that employee in the dropdown, and give that subreport a document title. Once that is done that subreport will appear in the document with that Title and whatever that assignee writes for its body. Sub Reports are appended to the bottom of the document, so the order is important. Once done a user can hit submit, it will be generated and can be viewed in the my reports widget.</p>
          <p>Creating a form from a template is easier. It creates a template with subreport titles and the user can choose to remove sub reports or add them. Assignees can also be modified. If a user wants to edit/delete a report they can check it out at the view/edit reports widget. If a user wishes to download this report as a pdf simply click the button that allows them to at the view/edit report widget.</p>
          <h1>I was assigned a form?</h1>
          <p>Your employer has assigned you a form and you need to complete it, but how do you do it? Well either hit the view/edit my reports and it should appear as NOT COMPLETE. Hitting the reports assigned to me widget will show only reports that the user has yet to complete. Within these views they can hit the edit button next to the doc and begin editing.</p>
          </div>
        </main>
      </div>
    );
  }
}
