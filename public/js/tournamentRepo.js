const apiRoot = "/api";

function getTournamets() {
	return fetch(apiRoot)
		.then(res => res.json());
}

function addTournament(name) {
	return fetch(apiRoot, {
		method: 'POST',
		body: JSON.stringify({ name }),
		headers: {
			"Content-Type": "application/json"
		}
	});
}

function addPlayer(tournamentName, playerName) {
	return fetch(`${apiRoot}/${tournamentName}/add/`, {
		method: 'POST',
		body: JSON.stringify({ name: playerName }),
		headers: {
			"Content-Type": "application/json"
		}
	});
}

function getPlayers(tournamentName) {
	return fetch(`${apiRoot}/${tournamentName}/players/`)
		.then(res => res.json());
}

function getMatches(tournamentName) {
	return fetch(`${apiRoot}/${tournamentName}/matches/`)
		.then(res => res.json());
}

function finishMatch(tournamentName, playerName, isDraw = false) {
	return fetch(`${apiRoot}/${tournamentName}/finish/`, {
		method: 'POST',
		body: JSON.stringify({
			winner: playerName,
			isDraw
		}),
		headers: {
			"Content-Type": "application/json"
		}
	});
}

function newRound(tournamentName) {
	return fetch(`${apiRoot}/${tournamentName}/newRound/`)
}
