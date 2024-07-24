import { where, Op } from "sequelize";
import { HashtagEntity } from "../entities/Hashtags.entity.js";
import { ProjectEntity } from "../entities/Project.entity.js";
import { Project_HashtagEntity } from "../entities/Project_Hashtags.entity.js";
import { UserEntity } from "../entities/User.entity.js";

export class ProjectService {
  async CreateProjectService(
    id_user,
    title,
    text,
    difficultLevel,
    hashtags,
    postColor
  ) {
    try {
      await UserEntity.sync();
      await ProjectEntity.sync();
      await Project_HashtagEntity.sync();

      const newProject = await ProjectEntity.create({
        id_user,
        title,
        text,
        difficultLevel,
        postColor,
      });

      const id_project = newProject.dataValues.id;

      if (newProject) {
        await Promise.all(
          hashtags.map(async (hashtag) => {
            let currentHashtag = await HashtagEntity.findOne({
              where: {
                hashtag,
              },
            });

            let id_hashtag = await currentHashtag.dataValues.hashtag;

            await Project_HashtagEntity.create({
              projectId: id_project,
              hashtagHashtag: id_hashtag,
            });
          })
        );
      }

      const completeNewProject = await ProjectEntity.findOne({
        where: {
          id: id_project,
        },

        attributes: {
          exclude: ["id_user", "isValid"],
        },

        include: [
          {
            model: UserEntity,
            attributes: ["name"],
          },
          {
            model: HashtagEntity,
            through: {
              model: Project_HashtagEntity,
            },
            as: "hashtags",
            attributes: ["hashtag"],
            through: { attributes: [] },
          },
        ],
      });

      return completeNewProject;
    } catch (error) {
      throw error;
    }
  }

  async CheckHashtagService(hashtags) {
    try {
      await HashtagEntity.sync();

      await Promise.all(
        hashtags.map(async (hashtag) => {
          const hashtagExists = await HashtagEntity.findOne({
            where: {
              hashtag,
            },
          });

          if (!hashtagExists) {
            await HashtagEntity.create({ hashtag });
          }
        })
      );
    } catch (error) {
      throw error;
    }
  }

  async CountProjectsNumber() {
    try {
      await ProjectEntity.sync();

      const projectNumber = await ProjectEntity.count({
        where: {
          isValid: true,
        },
      });

      return projectNumber;
    } catch (error) {
      next(error);
    }
  }

  async ShowProjectsService(limit, offset) {
    try {
      await UserEntity.sync();
      await ProjectEntity.sync();
      await HashtagEntity.sync();
      await Project_HashtagEntity.sync();

      const AllProjects = await ProjectEntity.findAll({
        where: {
          isValid: true,
        },

        offset: offset,
        limit: limit,
        order: [["updatedAt", "DESC"]],

        attributes: {
          exclude: ["id_user", "isValid"],
        },

        include: [
          {
            model: UserEntity,
            attributes: ["name"],
          },

          {
            model: HashtagEntity,
            through: {
              model: Project_HashtagEntity,
            },
            as: "hashtags",
            attributes: ["hashtag"],
            through: { attributes: [] },
          },
        ],
      });

      if (!AllProjects.length) {
        return "nenhum projeto encontrado";
      }

      return AllProjects;
    } catch (error) {
      throw error;
    }
  }

  async ShowMyProjectsService(id, limit, offset) {
    try {
      await UserEntity.sync();
      await ProjectEntity.sync();
      await HashtagEntity.sync();
      await Project_HashtagEntity.sync();

      const AllProjects = await ProjectEntity.findAll({
        where: {
          id_user: id,
          isValid: true,
        },

        offset: offset,
        limit: limit,
        order: [["updatedAt", "DESC"]],

        attributes: {
          exclude: ["id_user", "isValid"],
        },

        include: [
          {
            model: UserEntity,
            attributes: ["name"],
          },
          {
            model: HashtagEntity,
            through: {
              model: Project_HashtagEntity,
            },
            as: "hashtags",
            attributes: ["hashtag"],
            through: { attributes: [] },
          },
        ],
      });

      if (!AllProjects.length) {
        return "nenhum projeto encontrado";
      }

      const count = await ProjectEntity.count({
        where: {
          id_user: id,
          isValid: true,
        },
      });

      return { projects: AllProjects, number: count };
    } catch (error) {
      throw error;
    }
  }

  async ShowMyStandbyProjectssService(id, limit, offset) {
    try {
      await UserEntity.sync();
      await ProjectEntity.sync();
      await HashtagEntity.sync();
      await Project_HashtagEntity.sync();
      const rows = await ProjectEntity.findAll({
        where: {
          id_user: id,
          isValid: false,
        },

        offset: offset,
        limit: limit,
        order: [["updatedAt", "DESC"]],

        attributes: {
          exclude: ["id_user", "isValid"],
        },

        include: [
          {
            model: UserEntity,
            attributes: ["name"],
          },
          {
            model: HashtagEntity,
            through: {
              model: Project_HashtagEntity,
            },
            as: "hashtags",
            attributes: ["hashtag"],
            through: { attributes: [] },
          },
        ],
      });

      if (!rows.length) {
        return "nenhum projeto encontrado";
      }

      const count = await ProjectEntity.count({
        where: {
          id_user: id,
          isValid: false,
        },
      });

      return { projects: rows, number: count };
    } catch (error) {
      throw error;
    }
  }

  async UpdateProjectService(
    id,
    id_user,
    title,
    text,
    postColor,
    difficultLevel,
    hashtags
  ) {
    try {
      await UserEntity.sync();
      await ProjectEntity.sync();
      await HashtagEntity.sync();
      await Project_HashtagEntity.sync();

      const projectExists = await ProjectEntity.findOne({
        where: {
          id,
          id_user,
        },
      });

      if (!projectExists) {
        return "nao encontrado";
      }

      const user = await UserEntity.findByPk(id_user);

      await ProjectEntity.update(
        { title, text, postColor, difficultLevel, isValid: false },
        {
          where: {
            id,
          },
        }
      );

      if (hashtags && Array.isArray(hashtags) && hashtags.length > 0) {
        await Project_HashtagEntity.destroy({
          where: { projectId: id },
        });

        await Promise.all(
          hashtags.map(async (hashtag) => {
            let currentHashtag = await HashtagEntity.findOne({
              where: {
                hashtag,
              },
            });

            let id_hashtag = await currentHashtag.dataValues.hashtag;
            await Project_HashtagEntity.create({
              projectId: id,
              hashtagHashtag: id_hashtag,
            });
          })
        );
      }

      const updatedProject = await ProjectEntity.findByPk(id, {
        attributes: {
          exclude: ["id_user"],
        },
        include: [
          {
            model: UserEntity,
            attributes: ["name"],
          },
          {
            model: HashtagEntity,
            through: {
              model: Project_HashtagEntity,
            },
            as: "hashtags",
            attributes: ["hashtag"],
            through: { attributes: [] },
          },
        ],
      });

      const numberOfUserValidProjecst = await ProjectEntity.count({
        where: {
          isValid: true,
          id_user: id_user,
        },
      });

      await user.update({ ideasNumber: numberOfUserValidProjecst });

      return updatedProject;
    } catch (error) {
      throw error;
    }
  }

  async DeleteMyProjectService(id, id_user) {
    try {
      await UserEntity.sync();
      await ProjectEntity.sync();
      await HashtagEntity.sync();
      await Project_HashtagEntity.sync();

      const user = await UserEntity.findByPk(id_user);
      const projectExists = await ProjectEntity.findOne({
        where: {
          id,
          id_user,
        },
      });

      if (!projectExists) {
        return "nao encontrado";
      }

      await Project_HashtagEntity.destroy({
        where: {
          projectId: id,
        },
      });

      projectExists.destroy();

      const numberOfUserValidProjecst = await ProjectEntity.count({
        where: {
          isValid: true,
          id_user: id_user,
        },
      });

      await user.update({ ideasNumber: numberOfUserValidProjecst });

      return "projeto deletado";
    } catch (error) {
      throw error;
    }
  }

  async ShowProjectsSearchedService(term, limit, offset) {
    try {
      await UserEntity.sync();
      await ProjectEntity.sync();
      await HashtagEntity.sync();
      await Project_HashtagEntity.sync();
      const isHashtagSearch = term.startsWith('#');
      const isTitleAndText = isHashtagSearch ? '' : `%${term}%`;

      const projectsFounded = await ProjectEntity.findAll({
        where: {
          [Op.or]: [
            { title: { [Op.iLike]: isTitleAndText } },
            { text: { [Op.iLike]: isTitleAndText } },
          ],
          isValid: true,
        },

        offset: offset,
        limit: limit,
        order: [["updatedAt", "DESC"]],

        attributes: {
          exclude: ["id_user", "isValid"],
        },

        include: [
          {
            model: UserEntity,
            attributes: ["name"],
          },

          {
            model: HashtagEntity,
            through: {
              model: Project_HashtagEntity,
            },
            as: "hashtags",
            attributes: ["hashtag"],
            through: { attributes: [] },
            where: isHashtagSearch
              ? {
                  hashtag: { [Op.iLike]: `%${term}%` },
                }
              : {},
            required: !isHashtagSearch,
          },
        ],
      });
      if (!projectsFounded.length) {
        return {
          projectsFounded: "projeto pesquisado não encontrado",
          number: 0,
        };
      }

      const number = await ProjectEntity.count({
        where: {
          title: {
            [Op.iLike]: `%${term}%`,
          },
          isValid: true,
        },
      });

      return { projectsFounded, number };
    } catch (error) {
      throw error;
    }
  }
}
