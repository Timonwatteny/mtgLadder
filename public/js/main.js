(async function() {
	await addTournament("test");
	showTournaments(await getTournamets());
	
	await addPlayer("test", "louis");
	await addPlayer("test", "timon");
	showPlayers(await getPlayers("test"));

	newRound("test");
	showMatches(await getMatches("test"));

	finishMatch("test", "louis");
	showPlayers(await getPlayers("test"));
})()

function showTournaments(tournaments) {
	//TODO:
	console.log(tournaments);
}

function showPlayers(players) {
	//TODO:
	console.log(players);
}

function showMatches(matches) {
	//TODO:
	console.log(matches);
}
