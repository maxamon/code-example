import * as React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { List, ListItemText, ListItem } from '@material-ui/core';
import {Link} from 'react-router-dom';
import {StoryListProps} from '../interfaces'

const useStyle = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            backgroundColor: theme.palette.background.paper
        },
        first_column: {
            width: '200px'
        },
        title: {
            textAlign: 'center'
        }
    })
);

export const StoryList = ({list = [], title = '' }: StoryListProps = {list: [], title: ''}) => {
    const classes = useStyle({});
    const items = list.map(({title, author, id, abstract, finish_date}) => (
        <ListItem key={id} divider={true} button={true} component={Link} to={`/story/${id}`}>
            <ListItemText className={classes.first_column} primary={title} secondary={abstract}/><ListItemText primary={author} secondary={finish_date}/>
        </ListItem>
    ));

    return (
        <>
            {title && <h1 className={classes.title} >{title}</h1>}
            <List className={classes.root} component={'nav'} aria-label={'secondary mailbox folders'}>
                {items}
            </List>
        </>
    );
};
