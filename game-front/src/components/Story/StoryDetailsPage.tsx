import * as React from 'react';
import { connect } from 'react-redux';
import { StoreProps } from '../../store';
import {createStyles, makeStyles, Theme, CircularProgress, Paper} from '@material-ui/core';
import {StateProps, Story} from '../../interfaces';
import { push } from 'connected-react-router';

import { RouteComponentProps} from "react-router-dom";
import {StoryDetails} from './StoryDetails';
import {fetchStories} from '../../store/actions';

type OwnProps = RouteComponentProps<TParams>
type Props = StoryProps & DispatchProps & OwnProps;

interface DispatchProps {
    readStory: (id: number) => void;
    editStory: (id: number) => void;
    getStories: () => void;
}

interface StoryProps extends StateProps {
    stories: Story[];
}
type TParams = {
    id: string;
}

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        containerLoading: {
            marginTop: '20px',
            height: '600px',
            display: 'flex',
            justifyContent: 'center'
        },
        loader: {
            alignSelf: 'center'
        }
    }),
);

const Loader = () => {
    const classes = useStyles({});
    return (
        <Paper className={classes.containerLoading}>
            <CircularProgress className={classes.loader}/>
        </Paper>
    )
};

export const StoryDetailsPage = (props: Props) => {
    const { id } = props.match.params;
    const currentStory = props.stories.find((itm) => itm.id === Number.parseInt(id, 10));
    const readStory = () => props.readStory(Number.parseInt(id, 10));
    const editStory = () => props.editStory(Number.parseInt(id, 10));
    React.useEffect(() => {
        if(!props.stories.length) {
            props.getStories();
        }
    }, []);
    return (
        currentStory ? <StoryDetails readStory={readStory} editStory={editStory} currentStory={currentStory}/> : <Loader/>
    );
};

const mapDispatchToProps = (dispatch: React.Dispatch<any>): DispatchProps => {
    return {
        readStory: (id) => dispatch(push(`/story/${id}/read`)),
        editStory: (id) => dispatch(push(`/story/${id}/edit`)),
        getStories: () => dispatch(fetchStories()),
    }
};

const mapStateToProps = (state: StoreProps): StoryProps => {
    return {
        auth: state.setLogin,
        stories: state.stories
    }
};

export const StoryDetailsPageContainer = connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(StoryDetailsPage);

