(async function () {
	showTournaments(await getTournamets());
	showDetails("default1")

	document.querySelector("#new-tournament").addEventListener("submit", async e => {
		e.preventDefault();
		await addTournament(e.target.name.value);
		showTournaments(await getTournamets());
	})
})()

async function showDetails(tournament) {
	// WHOAAA SHIIIIT
	document.getElementById("details").classList.remove("hide");

	showConfig(tournament);
	showMatches(await getMatches(tournament), tournament);
	showPlayers(await getPlayers(tournament));
}

function showTournaments(tournaments) {
	const ul = document.createElement("ul");

	for (const tournament of tournaments) {
		const li = document.createElement("li");
		li.classList.add("tournament")

		const text = document.createElement("span");
		text.innerText = tournament;

		const button = document.createElement("button");
		button.classList.add("btn", "btn-dark");
		button.innerText = "Details";

		button.addEventListener("click", () => showDetails(tournament));

		li.appendChild(text);
		li.appendChild(button);

		ul.appendChild(li);
	}

	const conatiner = document.querySelector("#tournaments");
	conatiner.innerHTML = "";
	conatiner.appendChild(ul);

	return ul;
}

function showConfig(tournament) {
	const config = document.createElement("div");

	const form = document.createElement("form");

	const input = document.createElement("input");
	input.type = "text";
	input.name = "name";
	input.placeholder = "name";

	const button = document.createElement("button");
	button.innerText = "Add Player";
	button.classList.add("btn", "btn-dark", "ml-2");

	form.appendChild(input);
	form.appendChild(button);
	form.addEventListener("submit", async e => {
		e.preventDefault();
		await addPlayer(tournament, e.target.name.value);
		showDetails(tournament);
	})

	config.appendChild(form);

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
		if (_isPlaying) {
			isPlayingItem.innerText = "Playing";
		} else {
			isPlayingItem.innerText = "Done";
		}


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

	const roundButton = document.createElement("button");
	roundButton.classList.add("btn", "btn-dark", "mb-2")
	roundButton.innerText = "New Round";
	roundButton.addEventListener("click", async () => {
		await newRound(tournament);
		showDetails(tournament);
	});

	const ul = document.createElement("ul");

	for (const { _player1, _player2 } of matches) {
		const li = document.createElement("li");

		const player1Item = document.createElement("button");
		player1Item.classList.add("btn", "btn-success");

		player1Item.innerText = `${_player1._name} Wins`;
		player1Item.addEventListener("click", () => {
			finishMatch(tournament, _player1._name);
			showDetails(tournament);
		})
		const drawItem = document.createElement("button");
		drawItem.classList.add("btn", "btn-warning", "m-2");
		drawItem.innerText = "Draw"
		drawItem.addEventListener("click", () => {
			finishMatch(tournament, _player1._name, true);
			showDetails(tournament);
		})
		const player2Item = document.createElement("button");
		player2Item.classList.add("btn", "btn-success");

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
	container.appendChild(roundButton);
	container.appendChild(ul);

	return ul;
}


