/* After API of workflow-expansion was fixed, we will remove theses steps to to corresponding steps in workflow.js
 */

// Then('I get the response for {string} API', (api) => {
// 	//request API and store response as an env variable
// 	cy.get('#csrf-token')
// 		.should('exist')
// 		.invoke('attr', 'value')
// 		.then((csrf) => {
// 			cy.request({
// 				method: 'POST',
// 				url: `/Api/Data/${api}`,
// 				form: true,
// 				headers: {
// 					CSRFToken: csrf,
// 				},
// 				body: {
// 					PageInfo: {
// 						IgnorePagesize: 'false',
// 						Page: '1',
// 						PageSize: '20',
// 					},
// 					SortInfo: [
// 						{
// 							FieldName: 'BallotControlNumber',
// 							SortDirection: 'asc',
// 						},
// 					],
// 					FilterInfo: {
// 						0: {
// 							FieldName: 'DeadlineDate',
// 							CollectionMemberFieldname: '',
// 							ValueType: '0',
// 							Expressions: [
// 								{
// 									Operator: 'Between',
// 									Value: '0,30',
// 									ValueSemantics: '1',
// 									SiblingJoin: 'and',
// 								},
// 							],
// 							IsPreprocessorFilter: 'false',
// 						},
// 						1: {
// 							FieldName: 'BallotID',
// 							CollectionMemberFieldname: '',
// 							ValueType: '0',
// 							Expressions: [
// 								{
// 									Operator: 'IsGreaterThan',
// 									Value: '0',
// 									ValueSemantics: '0',
// 									SiblingJoin: 'and',
// 								},
// 							],
// 							IsPreprocessorFilter: 'false',
// 						},
// 						2: {
// 							FieldName: 'AgendaKey',
// 							CollectionMemberFieldname: '',
// 							ValueType: '0',
// 							Expressions: [
// 								{
// 									Operator: 'IN',
// 									Value: Cypress.env('FirstAgendaKey'),
// 									ValueSemantics: '0',
// 									SiblingJoin: 'and',
// 								},
// 							],
// 							IsPreprocessorFilter: 'false',
// 						},
// 					},
// 					SelectedFields: {
// 						Fields: {
// 							0: { ID: '1' },
// 							1: { ID: '2' },
// 							2: { ID: '15' },
// 							3: { ID: '39' },
// 							4: { ID: '17' },
// 							5: { ID: '10' },
// 							6: { ID: '8' },
// 							7: { ID: '3' },
// 							8: { ID: '7' },
// 							9: { ID: '4' },
// 							10: { ID: '5' },
// 							11: { ID: '6' },
// 							12: { ID: '11' },
// 							13: { ID: '70005' },
// 							14: { ID: '1007' },
// 							15: { ID: '1017' },
// 							16: { ID: '141' },
// 							17: { ID: '56' },
// 							18: { ID: '9999' },
// 							19: { ID: '53' },
// 							20: { ID: '54' },
// 							21: { ID: '16' },
// 							22: { ID: '18' },
// 							23: { ID: '2022' },
// 							24: { ID: '19' },
// 							25: { ID: '20' },
// 							26: { ID: '21' },
// 							27: { ID: '22' },
// 							28: { ID: '24' },
// 							29: { ID: '23' },
// 							30: { ID: '1051' },
// 							31: { ID: '1052' },
// 							32: { ID: '1050' },
// 							33: { ID: '1056' },
// 							34: { ID: '1053' },
// 							35: { ID: '1054' },
// 							36: { ID: '1055' },
// 							37: { ID: '700' },
// 							38: { ID: '710' },
// 							39: { ID: '1015' },
// 							40: { ID: '9' },
// 							41: { ID: '29' },
// 							42: { ID: '30' },
// 							43: { ID: '31' },
// 							44: { ID: '33' },
// 							45: { ID: '34' },
// 							46: { ID: '35' },
// 							47: { ID: '1002' },
// 							48: { ID: '55' },
// 							49: { ID: '36' },
// 							50: { ID: '1011' },
// 							51: { ID: '1010' },
// 							52: { ID: '1012' },
// 							53: { ID: '70004' },
// 							54: { ID: '500' },
// 							55: { ID: '108' },
// 							56: { ID: '41' },
// 							57: { ID: '1601' },
// 							58: { ID: '1008' },
// 							59: { ID: '109' },
// 							60: { ID: '1014' },
// 							61: { ID: '44' },
// 							62: { ID: '6002' },
// 							63: { ID: '6001' },
// 							64: { ID: '4801' },
// 							65: { ID: '46' },
// 							66: { ID: '47' },
// 							67: { ID: '6000' },
// 							68: { ID: '48' },
// 						},
// 					},
// 				},
// 			}).then((response) => {
// 				const isAggregatedApi = api.includes('Aggregated');
// 				const isPerformanceApi = api.includes('Performance');

// 				const envKey = `${isPerformanceApi ? 'Cache' : 'Db'}${isAggregatedApi ? 'Aggregated' : 'NonAggregated'}`;
// 				const envValue = isPerformanceApi ? JSON.parse(response.body) : response.body;

// 				Cypress.env(envKey, envValue);
// 			});
// 		});
// });

// Then('the data from CacheAggregated API and DbAggregated API are equal', () => {
// 	//verify properties inside items of 2 apis
// 	let listDbItemsData = [];
// 	let listCacheItemsData = [];

// 	const dbAggregatedItem = Cypress.env('DbAggregated').items[0];
// 	const cacheAggregatedItem = Cypress.env('CacheAggregated').items[0];

// 	const listDbProperties = Object.getOwnPropertyNames(dbAggregatedItem);

// 	for (const property of listDbProperties) {
// 		listDbItemsData.push(dbAggregatedItem[property]);
// 		listCacheItemsData.push(cacheAggregatedItem[property]);
// 	}

// 	expect(listDbItemsData).to.deep.equal(listCacheItemsData);
// 	// verify the rest properties in 2 apis
// 	expect(Cypress.env('DbAggregated').Source).to.equal('DbAggregated');
// 	expect(Cypress.env('CacheAggregated').Source).to.equal('CacheAggregated');
// 	expect(Cypress.env('DbAggregated').pages).to.equal(Cypress.env('CacheAggregated').pages);
// 	expect(Cypress.env('DbAggregated').totalCount).to.equal(Cypress.env('CacheAggregated').totalCount);
// 	expect(Cypress.env('DbAggregated').lookups.MeetingIDs).to.deep.equal(
// 		Cypress.env('CacheAggregated').lookups.MeetingIDs
// 	);
// });

// Then('{string} property from DbNonAggregated and CacheNonAggregated API are equal', (property) => {
// 	//Verify all inner properties except Summaries
// 	let listDbValue = [];
// 	let listCacheValue = [];

// 	switch (property) {
// 		case 'Agendas': {
// 			let dbNonAggregatedAgenda = Cypress.env('DbNonAggregated').items[0].Agendas[0];
// 			let cacheNonAggregatedAgenda = Cypress.env('CacheNonAggregated').items[0].Agendas[0];
// 			let listDbAgendaProperties = Object.getOwnPropertyNames(dbNonAggregatedAgenda);

// 			for (const property of listDbAgendaProperties) {
// 				listDbValue.push(dbNonAggregatedAgenda[property]);
// 				listCacheValue.push(cacheNonAggregatedAgenda[property]);
// 			}
// 			break;
// 		}
// 		case 'Agendas.Policies': {
// 			let dbNonAggregatedAgendaPolicies = Cypress.env('DbNonAggregated').items[0].Agendas[0].Policies[0];
// 			let cacheNonAggregatedAgendaPolicies = Cypress.env('CacheNonAggregated').items[0].Agendas[0].Policies[0];
// 			let listDbPoliciesProperties = Object.getOwnPropertyNames(dbNonAggregatedAgendaPolicies);

// 			for (const property of listDbPoliciesProperties) {
// 				listDbValue.push(dbNonAggregatedAgendaPolicies[property]);
// 				listCacheValue.push(cacheNonAggregatedAgendaPolicies[property]);
// 			}
// 			break;
// 		}
// 		case 'Agendas.Policies.Ballots': {
// 			let dbNonAggregatedBallots = Cypress.env('DbNonAggregated').items[0].Agendas[0].Policies[0].Ballots[0];
// 			let cacheNonAggregatedBallots = Cypress.env('CacheNonAggregated').items[0].Agendas[0].Policies[0].Ballots[0];
// 			let listDbBallotsProperties = Object.getOwnPropertyNames(dbNonAggregatedBallots);

// 			for (const property of listDbBallotsProperties) {
// 				listDbValue.push(dbNonAggregatedBallots[property]);
// 				listCacheValue.push(cacheNonAggregatedBallots[property]);
// 			}
// 			break;
// 		}
// 		default:
// 			throw new Error('undefined property given');
// 	}
// 	expect(listDbValue).to.deep.equal(listCacheValue);
// });

// Then('all Summaries property from DbNonAggregated and CacheNonAggregated API are equal', () => {
// 	//in here we will verify Agendas.Summaries/Agendas.Policies.Summaries/Agenda.Policies.Ballots.Summaries
// 	let listDbValue = [];
// 	let listCacheValue = [];

// 	let dbNonAggregatedAgenda = Cypress.env('DbNonAggregated').items[0].Agendas[0];
// 	let dbNonAggregatedPolicies = Cypress.env('DbNonAggregated').items[0].Agendas[0].Policies[0];
// 	let dbNonAggregatedBallots = Cypress.env('DbNonAggregated').items[0].Agendas[0].Policies[0].Ballots[0];

// 	let cacheNonAggregatedAgenda = Cypress.env('CacheNonAggregated').items[0].Agendas[0];
// 	let cacheNonAggregatedPolicies = Cypress.env('CacheNonAggregated').items[0].Agendas[0].Policies[0];
// 	let cacheNonAggregatedBallots = Cypress.env('CacheNonAggregated').items[0].Agendas[0].Policies[0].Ballots[0];

// 	let listDbSummaries = Object.getOwnPropertyNames(Cypress.env('DbNonAggregated').items[0].Summaries);

// 	for (const summariesProperty of listDbSummaries) {
// 		listDbValue.push(dbNonAggregatedAgenda.Summaries[summariesProperty]);
// 		listCacheValue.push(cacheNonAggregatedAgenda.Summaries[summariesProperty]);

// 		listDbValue.push(dbNonAggregatedPolicies.Summaries[summariesProperty]);
// 		listCacheValue.push(cacheNonAggregatedPolicies.Summaries[summariesProperty]);

// 		listDbValue.push(dbNonAggregatedBallots.Summaries[summariesProperty]);
// 		listCacheValue.push(cacheNonAggregatedBallots.Summaries[summariesProperty]);
// 	}
// 	expect(listDbValue).to.deep.equal(listCacheValue);
// });

// Then('the data from DbNonAggregated API and CacheNonAggregated API are equal', () => {
// 	let listDbItemsData = [];
// 	let listCacheItemsData = [];

// 	let dbNonAggregatedItem = Cypress.env('DbNonAggregated').items[0];
// 	let cacheNonAggregatedItem = Cypress.env('CacheNonAggregated').items[0];

// 	let listDbProperties = Object.getOwnPropertyNames(dbNonAggregatedItem);
// 	let listDbSummariesProperties = Object.getOwnPropertyNames(dbNonAggregatedItem.Summaries);

// 	for (const property of listDbProperties) {
// 		if (property !== 'Summaries' && property !== 'Agendas') {
// 			listCacheItemsData.push(cacheNonAggregatedItem[property]);
// 			listDbItemsData.push(dbNonAggregatedItem[property]);
// 		}
// 	}

// 	for (const summariesProperty of listDbSummariesProperties) {
// 		listCacheItemsData.push(cacheNonAggregatedItem.Summaries[summariesProperty]);
// 		listDbItemsData.push(dbNonAggregatedItem.Summaries[summariesProperty]);
// 	}

// 	expect(listDbItemsData).to.deep.equal(listCacheItemsData);

// 	expect(Cypress.env('DbNonAggregated').lookups.MeetingIDs).to.deep.equal(
// 		Cypress.env('CacheNonAggregated').lookups.MeetingIDs
// 	);
// 	expect(Cypress.env('DbNonAggregated').Source).to.equal('DB');
// 	expect(Cypress.env('CacheNonAggregated').Source).to.equal('Cache');
// 	expect(Cypress.env('DbNonAggregated').pages).to.equal(Cypress.env('CacheNonAggregated').pages);
// 	expect(Cypress.env('DbNonAggregated').totalCount).to.equal(Cypress.env('CacheNonAggregated').totalCount);
// });
