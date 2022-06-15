Feature: Engagement permissions

    Background:
        Given I login as Calpers User

    Scenario: Create Dashboard Subscription entry and validate in SB_Subscription Database table
        When Navigate to the Dashboard page
        Then Select Subscriptions link
        And Click Add Subscription button
        And Select Calpers External Admin from Users list
        And Enter Filename DashboardTest
        And Enter Schedule to run Subscription
        And Enter Subject,header & footer
        And Click OK
        And Verify Toast message - Subscription added
        And Connect to Aqua Database and verify new row has been added to SB_Subscription table
        And Remove Subscription entry from Viewpoint

    Scenario: Validate Dashboard
        When Navigate to the Dashboard page
        Then Verify sidebar links
        And Verify Upcoming Meetings highlighted
        And Verify heading buttons and links
        And Verify Widget headers
        And Verify each widget has edit and remove buttons
        And Verify Subscriptions
        And Add a widget
        And Check dropdown values selectable
        And Select certain values
        And Check returned table headers
        And Remove widget