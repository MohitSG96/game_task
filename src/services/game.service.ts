import { Op, Sequelize } from "sequelize";
import { filter, isEmpty, split } from "lodash";
import { IGameFields, IGamesAdd } from "../interfaces/games.interface";
import { Game, GameModel } from "../models/game.model";
export default class UserService {
  async addGame(game: IGamesAdd) {
    return Game.create(game).then((g) => g.toJSON() as GameModel);
  }

  async getGameById(id: number) {
    return Game.findByPk(id).then((g) => g?.toJSON() as GameModel | null);
  }

  async updateGameById(id: number, fields: IGameFields) {
    return Game.update(fields, { where: { id: id } });
  }

  async deleteGameById(id: number) {
    return Game.destroy({ where: { id: id } });
  }

  async getGames(filters?: IGameFields) {
    let where: {
      title?: any;
      platform?: any;
      score?: any;
      genre?: any;
      editorsChoice?: any;
      userId?: any;
    } | null = null;
    if (filters) {
      where = {};
      if (filters.title) {
        where.title = Sequelize.where(
          Sequelize.fn("LOWER", Sequelize.col("title")),
          "LIKE",
          "%" + filters.title.trim() + "%"
        );
      }
      if (filters.platform) {
        where.platform = {
          [Op.in]: split(filters.platform, ",").map((platform) =>
            platform.trim()
          ),
        };
      }
      if (filters.genre) {
        where.genre = {
          [Op.in]: split(filters.genre, ",").map((genre) => genre.trim()),
        };
      }
      if (filters.editorsChoice) {
        where.editorsChoice = filters.editorsChoice.toUpperCase();
      }
      if (filters.score) {
        where.score = { [Op.eq]: filters.score };
      }
      if (filters.userId) {
        switch (typeof filters.userId) {
          case "number":
            where.userId = filters.userId;
            break;
          case "object":
            where.userId = {
              [Op.in]: filters.userId,
            };
            break;
          case "string":
            where.userId = {
              [Op.in]: split(filters.userId, ",").map((u) =>
                parseInt(u.trim())
              ),
            };
            break;
        }
      }
    }
    return Game.findAll({ where: where ?? {} }).then((g) =>
      g.map((game) => game.toJSON() as GameModel)
    );
  }

  // async getNameByTitle(keyword: string) {
  //   return Game.findAll({
  //     where: {
  //       title: Sequelize.where(
  //         Sequelize.fn("LOWER", Sequelize.col("title")),
  //         "LIKE",
  //         "%" + keyword.trim() + "%"
  //       ),
  //     },
  //   }).then((g) => g.map((g) => g.toJSON() as GameModel));
  // }
}
