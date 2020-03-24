class MyDB {
    constructor(models) {
        this.models = models;
        this.logOn = true;
        this.Op = models.Sequelize.Op;
    }

    findUser({email, password}) {
        return this.models.User.findOne({
            where: {
                email: {
                    [this.Op.eq]: email
                }, 
                password: {
                    [this.Op.eq]: password
                }
            }
        });
    }

    allUsers({limit = 10}) {
        return this.models.User.findAll({
            attributes: [
                'id', 'nick_name', 'type', 'login'
            ],
            limit
        });
    }

    addUser({email, login, password}) {
        return this.models.User.create({
            nick_name: email,
            type: 'user',
            email,
            login,
            password
        });
    }

    getStories({limit, type}) {
        const where = !type ? undefined : {
            type: {
                [this.Op.eq]: type
            }
        };
        return this.models.Story.findAll({
            where,
            order: [
                ['created_at', 'DESC']
            ],
            limit: limit || 10,
            include: [
                {
                    model: this.models.User,
                    attributes: ['id', 'nick_name', 'type', 'login'],
                    through: { attributes: [] }
                }
            ]
        }).then((result) => {
            return result.map((itm) => {
                const {Users, ...others} = itm.toJSON();
                return {
                    ...others,
                    authors: Users
                };
            });
        });
    }

    addStory({title, abstract/*, authorID, visibility, comments*/}) {
        return this.models.Story.create({
            title,
            abstract,
        });
    }

    updateStory({id, title, abstract/*, authorID, visibility, comments*/}) {
        return this.models.Story.update(
            {
                title,
                abstract
            },
            {
                where: {
                    id: {
                        [this.Op.eq]: id
                    }
                }
            });
    }

    addAuthors(storyID, users) {
        const rows = users.map((id) => ({user_id: id, story_id: storyID}));
        return this.models.Authors.bulkCreate(rows);
    }

    getParagraph({storyID, limit}) {
        return this.models.Paragraph.findAll({
            where: {
                story_id: {
                    [this.Op.eq]: storyID
                }
            },
            order: [
                ['id', 'ASC']
            ],
            limit: limit || 10,
            include: [
                {
                    model: this.models.Comment,
                    attributes: ['id', 'text'],
                    include: [
                        {
                            model: this.models.User,
                            attributes: ['id', 'nick_name', 'type', 'login'],
                        }
                    ],
                }
            ],
        });
    }

    freezeParagraph({ freeze = true, storyID, authorID}) {
        return this.models.Paragraph.update(
            {
                freeze
            },
            {
                where: {
                    author_id: {
                        [this.Op.eq]: authorID
                    },
                    story_id: {
                        [this.Op.eq]: storyID
                    },
                }
            });
    }

    saveParagraph({ text, storyID, authorID}) {
        return this.models.Paragraph.create({
            text,
            author_id: authorID,
            story_id: storyID,
        });
    }

    updateParagraph({ id, text}) {
        return this.models.Paragraph.update({
            text,
        },
        {
            where: {
                id: {
                    [this.Op.eq]: id
                }
            }
        });
    }
}

module.exports = {
    MyDB
};
