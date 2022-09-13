import { And } from "cypress-cucumber-preprocessor/steps"
const constants = require ('../constants')

And('I capture meeting ID by running the query with specific Proposal Type Code and Recommended By Code', () => {
  let query = "SELECT TOP 1 a.meetingid from PX_ProposalRecommendations rec\
  	join PX_AgendaItem ai on rec.AgendaItemID = ai.AgendaItemID	join PX_Agenda a on a.AgendaID = ai.AgendaID\
    join PX_Ballot b on b.AgendaID = a.AgendaID and b.NoOfShares>0	join AM_Account ac on ac.AccountID = b.AccountID\
    where RecommendedVoteCode like 'inv%' and ProposalTypeCode <> 'D' and RecommendedByCode = 'Management' and CustomerID = '196'\
    order by meetingid desc"

  cy.executeQuery(query).then((meetingId) => {
    Cypress.env('meetingId', meetingId)
    cy.log(Cypress.env('meetingId'))
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
      WHERE LoginID = '`+ constants.TESTUSER.CONTACTEMAIL +`'
      )
    DELETE FROM GLP.dbo.UM_User
    WHERE LoginID = '`+ constants.TESTUSER.CONTACTEMAIL +`'
    `
  )
})