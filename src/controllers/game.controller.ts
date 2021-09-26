import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { omit } from "lodash";
import { IGamesAdd } from "../interfaces/games.interface";
import { GameService } from "../services";

export class GameConroller {
  async createGame(req: Request, res: Response) {
    const gameService = new GameService();
    const errors = validationResult(req);
    if (errors && errors.array().length > 0) {
      return res.status(422).json(errors.array());
    }
    try {
      const gameData = { ...req.body } as IGamesAdd;
      //@ts-ignore
      const userId = req.user.id;
      const game = await gameService.addGame({ ...gameData, userId: userId });
      return res.json(game);
    } catch (e) {
      console.error(e);
      return res.status(409).send(e instanceof Error ? e.message : e);
    }
  }

  async getGames(req: Request, res: Response) {
    const gameService = new GameService();
    const errors = validationResult(req);
    if (errors && errors.array().length > 0) {
      return res.status(422).json(errors.array());
    }
    try {
      const filters = req.query;
      const games = await gameService.getGames(filters);
      return res.json(games);
    } catch (e) {
      return res.status(409).send(e instanceof Error ? e.message : e);
    }
  }

  async getGame(req: Request, res: Response) {
    const gameService = new GameService();
    const errors = validationResult(req);
    if (errors && errors.array().length > 0) {
      return res.status(422).json(errors.array());
    }
    try {
      const id = parseInt(req.params.id);
      const games = await gameService.getGameById(id);
      return res.json(games);
    } catch (e) {
      return res.status(409).send(e instanceof Error ? e.message : e);
    }
  }

  async updateGame(req: Request, res: Response) {
    const gameService = new GameService();
    const errors = validationResult(req);
    if (errors && errors.array().length > 0) {
      return res.status(422).json(errors.array());
    }
    try {
      const updateValues = req.body;
      const gameId = parseInt(req.params.id);
      const games = await gameService.updateGameById(gameId, updateValues);
      return res.json({ rows: games });
    } catch (e) {
      return res.status(409).send(e instanceof Error ? e.message : e);
    }
  }
}
