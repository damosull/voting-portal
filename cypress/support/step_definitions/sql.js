import { When, Then } from '@badeball/cypress-cucumber-preprocessor';
const constants = require('../constants');

Then('I capture meeting ID by running the query {string}', (queryType) => {
	let query;

	if (queryType.includes('with specific Proposal Type Code and Recommended By Code')) {
		query =
			"SELECT TOP 1 a.meetingid from PX_ProposalRecommendations rec\
  	join PX_AgendaItem ai on rec.AgendaItemID = ai.AgendaItemID	join PX_Agenda a on a.AgendaID = ai.AgendaID\
    join PX_Ballot b on b.AgendaID = a.AgendaID and b.NoOfShares>0	join AM_Account ac on ac.AccountID = b.AccountID\
    where RecommendedVoteCode like 'inv%' and ProposalTypeCode <> 'D' and RecommendedByCode = 'Management' and CustomerID = '196'\
    order by meetingid desc";
	} else if (queryType.includes('for meetings with partial vote')) {
		query =
			"SELECT TOP 1 m.MeetingID from PX_Meeting m with (nolock)\
    join PX_Agenda a with (nolock)on a.MeetingID= m.MeetingID join PX_Ballot b with (nolock)on b.AgendaID = a.AgendaID\
    join am_account acc with(nolock)on acc.accountid = b.accountid join AA_customer cus with(nolock)on cus.customerid = acc.customerid\
    where m.IsAllowPartialVote ='1' AND Cus.CustomerID = 196 AND YEAR (votedeadlinedate)= 2023\
    order by MeetingDate desc";
	}

	cy.executeQuery(query).then((meetingId) => {
		Cypress.env('meetingId', meetingId);
	});
});

Then('I verify that the DB has updated with the absolute amount', () => {
	let query = `SELECT TOP 1 b.AbsoluteAmount from PX_Meeting m with (nolock)\
  join PX_Agenda a with (nolock)on a.MeetingID= m.MeetingID join PX_Ballot b with (nolock)on b.AgendaID = a.AgendaID\
  join am_account acc with(nolock)on acc.accountid = b.accountid join AA_customer cus with(nolock)on cus.customerid = acc.customerid\
  where m.IsAllowPartialVote ='1' AND Cus.CustomerID = 196 AND YEAR (votedeadlinedate)= 2023\
  and b.AbsoluteAmount = ${Cypress.env('partialVoteNominalAmount')}`;

	cy.executeQuery(query).then((amount) => {
		expect(amount.toString()).to.equal(Cypress.env('partialVoteNominalAmount'));
	});
});

Then('I verify that the absolute amount for the current meeting is correct', () => {
	let query = `SELECT TOP 1 b.AbsoluteAmount from PX_Meeting m with (nolock)\
  join PX_Agenda a with (nolock)on a.MeetingID= m.MeetingID join PX_Ballot b with (nolock)on b.AgendaID = a.AgendaID\
  join am_account acc with(nolock)on acc.accountid = b.accountid join AA_customer cus with(nolock)on cus.customerid = acc.customerid\
  where m.IsAllowPartialVote ='1' AND Cus.CustomerID = 196 AND YEAR (votedeadlinedate)= 2023\
  and m.MeetingID = ${Cypress.env('meetingId')}`;

	cy.executeQuery(query).then((amount) => {
		expect(Cypress.env('partialVoteNominalAmount')).to.contain(amount);
	});
});

Then('I delete the created test watchlist from database', () => {
	cy.sqlServer(
		`
    DELETE FROM [GLP].[dbo].[PX_WatchListSecurity]
    WHERE WatchListID IN (
      SELECT WatchListID FROM [GLP].[dbo].[PX_WatchList]
      WHERE WatchListName = '` +
			constants.testWatchlistName +
			`'
    )
    
    DELETE FROM [GLP].[dbo].[PX_WatchListUser]
    WHERE WatchListID in (
      SELECT WatchListID FROM [GLP].[dbo].[PX_WatchList]
      WHERE WatchListName = '` +
			constants.testWatchlistName +
			`'
    )
    
    DELETE FROM [GLP].[dbo].[PX_WatchList]
    WHERE WatchListName = '` +
			constants.testWatchlistName +
			`'
    `
	);
});

Then('I cleanup the newly created user from the database to reuse the test script', () => {
	cy.sqlServer(
		`
    DELETE FROM GLP.dbo.UM_UserPreferences
    WHERE userID IN (
      SELECT userID FROM GLP.dbo.UM_User
      WHERE LoginID = '` +
			constants.TESTUSER.CONTACTEMAIL +
			`'
      )
    DELETE FROM GLP.dbo.UM_User
    WHERE LoginID = '` +
			constants.TESTUSER.CONTACTEMAIL +
			`'
    `
	);
});

When('I delete all existing Vote Execution Profiles for the customer with id {int}', (customerID) => {
	cy.sqlServer(`DELETE FROM GLP.dbo.PX_VP_VoteExecutionProfileVotingGroups WHERE VoteExecutionProfileId in
   (SELECT VoteExecutionProfileId FROM GLP.dbo.PX_VP_VoteExecutionProfiles WHERE CustomerId = '${customerID}')`);
	cy.sqlServer(`DELETE FROM GLP.dbo.PX_VP_VoteExecutionProfiles WHERE CustomerId = '${customerID}'`);
});

When('I verify all Voting Groups in the DB are visible on the UI', () => {
	let query =
		"SELECT DISTINCT \
  CAST(AG.AccountGroupId AS NVARCHAR) AS Code, \
  AG.GroupName AS Name, \
  AG.CustomerID \
  FROM AM_AccountGroup AG \
  INNER JOIN AM_Account A ON A.VotingGroupId = AG.AccountGroupId \
  INNER JOIN UM_UserPreferences UP ON A.VotingGroupId=UP.PurposeID AND PurposeCode='VotingGroup' AND AG.CustomerID=187;";
	cy.executeQuery(query).then((result) => {
		for (var j = 0; j < result.length; j++) {
			cy.contains(result[j][1]).should('be.visible');
		}
	});
});

When('I navigate to a domestic spin control meeting', () => {
	let query =
		"SELECT top 10 ac.customerid, a.meetingid, a.AgendaKey, c.CustomerName from px_Agenda a \
	join PX_Ballot b on b.AgendaID = a.AgendaID \
	join AM_Account ac on ac.accountid = b.accountid \
	join AA_Customer c on c.CustomerID = ac.CustomerID \
	where a.AgendaID in (select agendaid from  px_Agendaitem ai \
	join PX_AgendaItemGroup aig on aig.AgendaItemId = ai.AgendaItemID and ai.ProposalTypeCode = 'DS') \
  and b.CreatedDate > DATEADD(DAY, -60, getdatE());";

	cy.executeQuery(query).then((result) => {
		let randomRow = Math.floor(Math.random() * result.length);
		cy.AddTenDaysToMeetingDates(result[randomRow][1]);
		cy.visit(`MeetingDetails/Index/${result[randomRow][0]}/${result[randomRow][1]}`);
	});
});
