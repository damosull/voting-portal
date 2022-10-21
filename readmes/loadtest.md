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

1. We have a list of 1500+ users and valid meeting ID combinations
2. Choose a random meeting and user from the list, log in with that user and directly navigate to the meeting details page
3. Put random vote decisions for each proposal and submit the votes
4. Logout
5. Repeat this over and over  
  

  

## Tech behind it?
We have built a customized test script to perform the above actions. We then use a combination of docker images and docker-compose to start multiple containers at once so that the application has several parallel users voting at the same time. Our current VMSS infrastructure has been tested to support up to thirty parallel sessions.

For this requirement, we have chosen cypress to run the load as the ask was to put a realistic UI-based load on the system, like how end users would be using it. There was no requirement for the Quality guild to produce any metrics for the load. We had cypress automation already in place and with minor tweaks to the test script, we were able to get this working.

If there was a need for metrics to be produced via these tests, a dedicated load test tool such as JMeter should be used.
  
  
  
## How to run these loadtests?
You can run this loadtest via [this](https://dev.azure.com/glasslewis/Development/_build?definitionId=407) pipeline. Steps below:
1. Launch the above URL.
2. Click on `Run Pipeline`
3. There are three parameters to this pipeline:
    1. `Branch/tag` - Choose master to run with default settings (Environment is Aqua and Script is bypass workflow). For a customized run, create a branch and make required changes to the command on the docker-compose.yml file.
    2. `Number of Parallel Instances` - Choose the number of parallel users you want to hit the environment. Enter a number between 1 and 30
    3. `New Image?` - keep this checked so that the pipeline uses the latest code to run tests
4. Click on `Run`


## How to monitor the load?
Always ensure that the load is doing what it's supposed to do by checking the logs. Once you run the pipeline, it will take about 5 minutes for the load to start on the test environment.

In your build, go to the `Run Cypress Tests` stage and see the logs. Once the containers are created, you will start seeing logs as below. It can take anywhere from 2 to 3 minutes at this stage to appear.

If you see logs like this - some ticks and some lines in red, it is perfectly fine. Some tests are bound to fail due to the random nature of selecting meetings.

If you see logs like this - all lines are red continuously, that means something is wrong. Cancel the build and try to use the environment manually and see if all pages are loading normally.
  
  
### Important URLs -
- Viewpoint Application Aqua - https://viewpoint.aqua.glasslewis.com/
- Viewpoint Application Ultra - https://viewpoint.ultra.glasslewis.com/
- Loadtest Pipeline - https://dev.azure.com/glasslewis/Development/_build?definitionId=407
- Cypress Tests - https://dev.azure.com/glasslewis/Development/_git/votingportal-automation-tests