const { logger } = require('../utils/logger');
const { UserNotFound } = require('../utils/UserNotFound.Error');

module.exports = class ApiRouter {
    constructor(_db, _state) {
        this.db = _db;
        this.state = _state;
    }
    getApiCall(name) {
        if(this[`api_${name}`] && !this.db.isNotInitialized) {
            return this[`api_${name}`];
        }
        throw Error(`Wrong api request: ${name}`);
    }

    async api_login({body}) {
        logger.debug('Login');
        return await this.db.findUser(body)
            .then((users) => {
                if (!users) {
                    throw new UserNotFound('Wrong login or password');
                }
                logger.debug(JSON.stringify(users));
                const { id, login, type, name } = users;
                return { id, login, type, name };
            });
    }

    async api_signin({body}) {
        const {email, login, password} = body;
        const user = await this.db.addUser({email, login, password});

        if (!user) {
            throw new UserNotFound('Wrong login or password');
        }
        logger.debug(JSON.stringify(user));
        const { id, type, name } = user;
        return { id, login, type, name, email };
    }

    async api_auth({user}) {
        logger.debug(JSON.stringify(user));
        const { type, login } = user;
        return { type, login };
    }

    async api_logout(req) {
        req.session = null;
        return { logout: true };
    }

    async api_stories_list(data) {
        const {query: {limit = 10/*, filter = ''*/}} = data;
        const stories = await this.db.getStories({limit});
        return stories;
    }

    async api_main_lists(/*data*/) {
        // const {query: {limit = 10, filter = ''}} = data;
        const stories_1 = await this.db.getStories({limit: 1, filter: 'top'});
        const stories_2 = await this.db.getStories({limit: 1, filter: 'middle'});
        const stories_3 = await this.db.getStories({limit: 1, filter: 'bottom'});
        return {stories_1, stories_2, stories_3};
    }

    async api_get_users(data) {
        const {query: {limit: _limit}} = data;
        const users = await this.db.allUsers(_limit || 10);
        return users;
    }

    async api_create_story({body}) {
        const {title, abstract, authors, visibility, comments} = body;
        const story = await this.db.addStory({title, abstract, visibility, comments});

        await this.db.addAuthors(story.get('id'), authors);

        return story;
    }

    async api_update_story({body, params}) {
        const {title, abstract, authorID, visibility, comments} = body;
        const { id } = params;
        const story = await this.db.updateStory({id, title, abstract, authorID, visibility, comments});

        logger.debug(JSON.stringify(story));
        return story;
    }

    async api_delete_story() {
        throw Error('Not implemented yet');
    }

    async api_get_paragraphs({params}) {
        const {storyID/*, page*/} = params;
        const paragraphs = await this.db.getParagraph({storyID: Number.parseInt(storyID, 10), limit: 100});
        return paragraphs;
    }

    async api_freeze_paragraphs({params, user}) {
        const {storyID} = params;
        const { id: authorID } = user;
        if (!authorID) {
            throw Error('User is wrong');
        }
        await this.db.freezeParagraph({ storyID: Number.parseInt(storyID, 10), authorID: Number.parseInt(authorID, 10)});
    }

    async api_next_move() {
        throw Error('Not implemented yet');
    }

    async api_finish_story() {
        throw Error('Not implemented yet');
    }

    async api_get_story_parts() {
        throw Error('Not implemented yet');
    }

    async api_save_story_part({body, user}) {
        const {id, storyID, text} = body;
        const { id: authorID } = user;
        if (!authorID) {
            throw Error('User is wrong');
        }
        if (id) {
            return await this.db.updateParagraph({id: Number.parseInt(id, 10), text, storyID: Number.parseInt(storyID, 10), authorID: Number.parseInt(authorID, 10)});
        }
        return await this.db.saveParagraph({text, storyID: Number.parseInt(storyID, 10), authorID: Number.parseInt(authorID, 10)});
    }

    async api_save_user() {
        throw Error('Not implemented yet');
    }

    async api_get_user() {
        throw Error('Not implemented yet');
    }

};
