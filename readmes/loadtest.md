# Introduction

This readme will help you run load on Viewpoint for Aqua or Ultra environments.

## What does this loadtest do?

This loadtest helps with running multiple users logging into Viewpoint and voting on a meeting. There are 2 available approaches to run loadtests:

A) Via Workflow Page:

1. Login with a random user and reach the Workflow page
2. Choose a random meeting from the Workflow page and reach the Meeting Details page
3. Put random vote decisions for each proposal and submit the votes
4. Logout
5. Repeat this over and over

B) Bypass Workflow Page:

1. We have a list of 900+ users and valid meeting ID combinations
2. Choose a random meeting and user from the list, log in with that user and directly navigate to the meeting details page
3. Put random vote decisions for each proposal and submit the votes
4. Logout
5. Repeat this over and over

NOTE: For Bypass Workflow Page, please remember to update the list of meetings in fixtures/meetings.json file. How to do it?
1. Connect to DB of the test environment
2. Run the below query:<br/>
_USE GLP;
select distinct m.meetingid as meetingId, u.* from PX_Meeting m 
	join px_Agenda a on m.meetingid = a.meetingid
	join PX_Ballot b on b.AgendaID = a.AgendaID
	join AM_Account ac on ac.accountid = b.accountid
	join (
		select LoginID as emailId, CustomerID from um_user u
			join aa_customerdivision cd on u.CustomerDivisionID = cd.CustomerDivisionID
		where loginid in
		('CalpersAutomation@glasslewis.com',
		  'CharlesSchwabAutomation@glasslewis.com',
		  'EvelynAutomation@glasslewis.com',
		  'FederatedAutomation@glasslewis.com',
		  'IFMAutomation@glasslewis.com',
		  'NeubergerAutomation@glasslewis.com',
		  'OpersAutomation@glasslewis.com',
		  'PutnamAutomation@glasslewis.com',
		  'RobecoAutomation@glasslewis.com',
		  'RoyalLondonAutomation@glasslewis.com',
		  'RussellAutomation@glasslewis.com',
		  'WellingtonAutomation@glasslewis.com')) u on u.CustomerID = ac.CustomerID
	where ISNULL(b.SubCustodianCutOffDate, m.MeetingDate) > getdate()+13_
<br/>
3. Copy the results, including the header
4. Convert this data into a json, using any csvtojson tool or website.
5. Replace the data in the meetings.json with the converted data.
6. Commit this change on a new branch and run the tests on this branch.

## Tech behind it?

We have built a customized test script to perform the above actions. We then use a combination of docker images and docker-compose to start multiple containers at once so that the application has several parallel users voting at the same time. Our current VMSS infrastructure has been tested to support up to thirty parallel sessions.

For this requirement, we have chosen cypress to run the load as we had UI automation scripts ready. With minor tweaks to the test script, we were able to deliver the requirement.

To increase the duration of the load test, increase the number of iterations in the feature file. The number of parallel sessions is taken via the parameter on the Azure job.

There was no requirement for the quality guild to produce any metrics for the load. If there was a need for metrics to be produced via these tests, a dedicated load test tool such as JMeter should be used.

## How to run these loadtests?

You can run this loadtest via [this](https://dev.azure.com/glasslewis/Development/_build?definitionId=407) pipeline. Steps below:

1. Launch the above URL.
2. Click on `Run Pipeline`
3. There are 6 parameters to this pipeline:
   1. `Branch/tag` - Let this be master to use latest stable changes.
   2. `Parallel Sessions on Aqua Via Workflow Page` - Enter number of parallel users for this setup.
   3. `Parallel Sessions on Aqua Bypassing Workflow Page` - Enter number of parallel users for this setup.
   4. `Parallel Sessions on Ultra Via Workflow Page` - Enter number of parallel users for this setup.
   5. `Parallel Sessions on Ultra Bypassing Workflow Page` - Enter number of parallel users for this setup.
   6. `New Image?` - keep this checked so that the pipeline uses the latest code to run tests
4. Click on `Run`

Please note: The total number of parallel users should not be greater than 30, as thats what the VM is capable of.

## How to monitor the load?

Always ensure that the load is doing what it's supposed to do by checking the logs. Once you run the pipeline, it will take about 5 minutes for the load to start on the test environment.

In your build, go to the `Run Cypress Tests` stage and see the logs. Once the containers are created, you will start seeing the logs. It can take anywhere from 2 to 3 minutes at this stage for the logs to appear.

If you see logs like this - some ticks and some lines in red, it is perfectly fine. Some tests are bound to fail due to the random nature of selecting meetings.

If you see logs like this - all lines are red continuously, that means something is wrong. Try to login to the test environment manually and see if all pages are loading normally. Cancel the build if the environment feels slow.

### Important URLs -

- Viewpoint Application Aqua - https://viewpoint.aqua.glasslewis.com/
- Viewpoint Application Ultra - https://viewpoint.ultra.glasslewis.com/
- Loadtest Pipeline - https://dev.azure.com/glasslewis/Development/_build?definitionId=407
- Cypress Tests - https://dev.azure.com/glasslewis/Development/_git/votingportal-automation-tests
