(async function() {
	await addTournament("yeet");
	await addPlayer("yeet", "louis");
	await addPlayer("yeet", "louis");
	showTournaments(await getTournamets());

	showPlayers(await getPlayers("yeet"));
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
