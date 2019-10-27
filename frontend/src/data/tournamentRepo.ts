const apiRoot = "http://localhost:3001/api";

export function getTournamets() {
	return fetch(apiRoot)
		.then(res => res.json());
}

export function addTournament(name: string) {
	return fetch(apiRoot, {
		method: 'POST',
		body: JSON.stringify({ name }),
		headers: {
			"Content-Type": "application/json"
		}
	});
}

export function addPlayer(tournamentName: string, playerName: string) {
	return fetch(`${apiRoot}/${tournamentName}/add/`, {
		method: 'POST',
		body: JSON.stringify({ name: playerName }),
		headers: {
			"Content-Type": "application/json"
		}
	});
}

export function getPlayers(tournamentName: string) {
	return fetch(`${apiRoot}/${tournamentName}/players/`)
		.then(res => res.json());
}

export function getMatches(tournamentName: string) {
	return fetch(`${apiRoot}/${tournamentName}/matches/`)
		.then(res => res.json());
}

export function finishMatch(tournamentName: string, playerName: string, isDraw = false) {
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

export function newRound(tournamentName: string) {
	return fetch(`${apiRoot}/${tournamentName}/newRound/`)
}
