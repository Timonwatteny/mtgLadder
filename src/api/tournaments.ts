import { Router } from "express";
import LadderSystem from "../ladderSystem/LadderSystem";
import Player from "../ladderSystem/Player";

const router = Router();

const tournaments: Map<string, LadderSystem> = new Map<string, LadderSystem>();

router.put("/", (req, res) => {
	res.send("yeet");

	const tournamentName = req.params.name;

	tournaments.set(tournamentName, new LadderSystem());
});

router.post("/:tournament/add", (req, res) => {
	const tournamentName = req.params.tournament;
	const tournament = tournaments.get(tournamentName);

	const playerName = req.params.name;

	if (tournament)
		tournament.addPlayer(new Player(playerName));
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
		res.send(tournament.matches);
	else
		res.send([]);
});

router.get("/:tournament/newRound", (req, res) => {
	const tournamentName = req.params.tournament;
	const tournament = tournaments.get(tournamentName);

	if (tournament)
		tournament.updateMatches();
});

export default router;
