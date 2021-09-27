import { Router } from "express";
import { GameConroller } from "../controllers/game.controller";
import { requiresUser } from "../middlewares";

const gameRoute = Router();
const gameController = new GameConroller();

//Add new Game
gameRoute.post("/add", requiresUser, gameController.createGame);

//get games List
gameRoute.get("/", requiresUser, gameController.getGames);

// update the game
gameRoute.post("/update/:id", requiresUser, gameController.updateGame);

// get game by id
gameRoute.get("/:id", requiresUser, gameController.getGame);

// delete game by id
gameRoute.delete("/:id", requiresUser, gameController.deleteGame);

export default gameRoute;
