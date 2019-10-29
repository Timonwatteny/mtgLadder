import { Router } from "express";
import LadderSystem from "../model/ladderSystem/LadderSystem";
import Player from "../model/Player";
import MatchEndState from "../model/ladderSystem/MatchEndState";
import PointConfig from "../model/ladderSystem/PointsConfig";

const router = Router();

const tournaments = new Map<string, LadderSystem>();

// test data
const defaultGame = new LadderSystem(new PointConfig(3, 0, 1));

defaultGame.addPlayer(new Player("louis"));
defaultGame.addPlayer(new Player("timon"));
defaultGame.updateMatches();

tournaments.set("default1", defaultGame);
tournaments.set("default2", defaultGame);

// get all tournament names
router.get("/", (req, res) => {
	res.json(Array.from(tournaments.keys()));
});

// add a tournament name
router.post("/", (req, res) => {
	const tournamentName = req.body.name;

	if (
		tournamentName &&
		tournaments.get(tournamentName) === undefined &&
		tournamentName !== ""
	) {
		tournaments.set(tournamentName, new LadderSystem(new PointConfig(3, 0, 1)));

		console.log(`made new tournament ${tournamentName}`);

		res.status(200);
	} else {
		res.status(400);
	}

	res.send("");
});

// adding a player
router.post("/:tournament/add", (req, res) => {
	const tournamentName = req.params.tournament;
	const tournament = tournaments.get(tournamentName);

	const playerName = req.body.name;

	console.log(`adding new player ${playerName} to ${tournamentName}`);

	if (
		tournament &&
		playerName &&
		tournament.getPlayer(playerName) === undefined &&
		playerName !== ""
	) {
		tournament.addPlayer(new Player(playerName));
		res.status(200);
	} else {
		res.status(400);
	}
	res.send("");
});

router.get("/:tournament/players", (req, res) => {
	const tournamentName = req.params.tournament;
	const tournament = tournaments.get(tournamentName);

	if (tournament)
		res.send(tournament.playersSortedByScore());
	else
		res.send([]);
});

router.get("/:tournament/matches", (req, res) => {
	const tournamentName = req.params.tournament;
	const tournament = tournaments.get(tournamentName);

	if (tournament)
		res.send(Array.from(tournament.matches));
	else
		res.send([]);
});

router.post("/:tournament/finish", (req, res) => {
	const tournamentName = req.params.tournament;
	const tournament = tournaments.get(tournamentName);

	if (tournament) {
		const winner = req.body.winner;
		const isDraw = req.body.isDraw;

		const match = tournament.getMatch(winner);
		const player = tournament.getPlayer(winner);

		if (match && player) {
			if (isDraw)
				match.finish(new MatchEndState(undefined));
			else
				match.finish(new MatchEndState(player));
		}
	}

	res.send("");
});

router.get("/:tournament/newRound", (req, res) => {
	const tournamentName = req.params.tournament;
	const tournament = tournaments.get(tournamentName);

	if (tournament) {
		tournament.updateMatches();
		res.status(200);
	} else {
		res.status(400);
	}

	res.send("");
});

export default router;
