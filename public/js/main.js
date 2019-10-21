(async function () {
	showTournaments(await getTournamets());
})()

async function showDetails(tournament) {
	showConfig(tournament);
	showMatches(await getMatches(tournament), tournament);
	showPlayers(await getPlayers(tournament));
}

function showTournaments(tournaments) {
	const ul = document.createElement("ul");

	for (const tournament of tournaments) {
		const li = document.createElement("li");

		const text = document.createElement("span");
		text.innerText = tournament;

		const button = document.createElement("button");
		button.innerText = "Details";

		button.addEventListener("click", () => showDetails(tournament));

		li.appendChild(text);
		li.appendChild(button);

		ul.appendChild(li);
	}

	document.querySelector("#tournaments").appendChild(ul);

	return ul;
}

function showConfig(tournament) {
	const config = document.createElement("div");

	const roundButton = document.createElement("button");
	roundButton.innerText = "New Round";
	roundButton.addEventListener("click", () => {
		newRound(tournament);
		showDetails(tournament);
	});

	config.appendChild(roundButton);

	const container = document.querySelector("#config");
	container.innerHTML = "";
	container.appendChild(config);

	return config;
}

function showPlayers(players) {
	const ul = document.createElement("ul");

	for (const { _name, _score, _isPlaying } of players) {
		const li = document.createElement("li");

		const nameItem = document.createElement("span");
		nameItem.innerText = _name;
		const scoreItem = document.createElement("span");
		scoreItem.innerText = _score;
		const isPlayingItem = document.createElement("span");
		isPlayingItem.innerText = _isPlaying;

		li.appendChild(nameItem);
		li.appendChild(scoreItem);
		li.appendChild(isPlayingItem);

		ul.appendChild(li);
	}

	const container = document.querySelector("#players");
	container.innerHTML = "";
	container.appendChild(ul);

	return ul;
}

function showMatches(matches, tournament) {
	const ul = document.createElement("ul");

	for (const { _player1, _player2 } of matches) {
		const li = document.createElement("li");

		const player1Item = document.createElement("button");
		player1Item.innerText = `${_player1._name} Wins`;
		player1Item.addEventListener("click", () => {
			finishMatch(tournament, _player1._name);
			showDetails(tournament);
		})
		const drawItem = document.createElement("button");
		drawItem.innerText = "Draw"
		drawItem.addEventListener("click", () => {
			finishMatch(tournament, _player1._name, true);
			showDetails(tournament);
		})
		const player2Item = document.createElement("button");
		player2Item.innerText = `${_player2._name} Wins`;
		player2Item.addEventListener("click", () => {
			finishMatch(tournament, _player2._name);
			showDetails(tournament);
		})

		li.appendChild(player1Item);
		li.appendChild(drawItem);
		li.appendChild(player2Item);

		ul.appendChild(li);
	}

	const container = document.querySelector("#matches");
	container.innerHTML = "";
	container.appendChild(ul);

	return ul;
}
