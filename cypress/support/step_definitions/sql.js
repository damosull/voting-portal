import { And } from "cypress-cucumber-preprocessor/steps"
const constants = require('../constants')

And('I capture meeting ID by running the query {string}', (queryType) => {
  let query

  if (queryType.includes('with specific Proposal Type Code and Recommended By Code')) {
    query = "SELECT TOP 1 a.meetingid from PX_ProposalRecommendations rec\
  	join PX_AgendaItem ai on rec.AgendaItemID = ai.AgendaItemID	join PX_Agenda a on a.AgendaID = ai.AgendaID\
    join PX_Ballot b on b.AgendaID = a.AgendaID and b.NoOfShares>0	join AM_Account ac on ac.AccountID = b.AccountID\
    where RecommendedVoteCode like 'inv%' and ProposalTypeCode <> 'D' and RecommendedByCode = 'Management' and CustomerID = '196'\
    order by meetingid desc"
  } else if (queryType.includes('for meetings with partial vote')) {
    query = "SELECT TOP 1 m.MeetingID from PX_Meeting m with (nolock)\
    join PX_Agenda a with (nolock)on a.MeetingID= m.MeetingID join PX_Ballot b with (nolock)on b.AgendaID = a.AgendaID\
    join am_account acc with(nolock)on acc.accountid = b.accountid join AA_customer cus with(nolock)on cus.customerid = acc.customerid\
    where m.IsAllowPartialVote ='1' AND Cus.CustomerID = 196 AND YEAR (votedeadlinedate)= 2022\
    order by MeetingDate desc"
  }

  cy.executeQuery(query).then((meetingId) => {
    Cypress.env('meetingId', meetingId)
  })
})

And('I verify that the DB has updated with the absolute amount', () => {
  let query = `SELECT TOP 1 b.AbsoluteAmount from PX_Meeting m with (nolock)\
  join PX_Agenda a with (nolock)on a.MeetingID= m.MeetingID join PX_Ballot b with (nolock)on b.AgendaID = a.AgendaID\
  join am_account acc with(nolock)on acc.accountid = b.accountid join AA_customer cus with(nolock)on cus.customerid = acc.customerid\
  where m.IsAllowPartialVote ='1' AND Cus.CustomerID = 196 AND YEAR (votedeadlinedate)= 2022\
  and b.AbsoluteAmount = ${Cypress.env('partialVoteNominalAmount')}`

  cy.executeQuery(query).then((amount) => {
    expect(amount.toString()).to.equal(Cypress.env('partialVoteNominalAmount'))
  })
})

And('I delete the created test watchlist from database', () => {
  cy.sqlServer(
    `
    DELETE FROM [GLP].[dbo].[PX_WatchListSecurity]
    WHERE WatchListID IN (
      SELECT WatchListID FROM [GLP].[dbo].[PX_WatchList]
      WHERE WatchListName = '` + constants.testWatchlistName + `'
    )
    
    DELETE FROM [GLP].[dbo].[PX_WatchListUser]
    WHERE WatchListID in (
      SELECT WatchListID FROM [GLP].[dbo].[PX_WatchList]
      WHERE WatchListName = '` + constants.testWatchlistName + `'
    )
    
    DELETE FROM [GLP].[dbo].[PX_WatchList]
    WHERE WatchListName = '` + constants.testWatchlistName + `'
    `
  )
})

And('I cleanup the newly created user from the database to reuse the test script', () => {
  cy.sqlServer(
    `
    DELETE FROM GLP.dbo.UM_UserPreferences
    WHERE userID IN (
      SELECT userID FROM GLP.dbo.UM_User
      WHERE LoginID = '`+ constants.TESTUSER.CONTACTEMAIL + `'
      )
    DELETE FROM GLP.dbo.UM_User
    WHERE LoginID = '`+ constants.TESTUSER.CONTACTEMAIL + `'
    `
  )
})