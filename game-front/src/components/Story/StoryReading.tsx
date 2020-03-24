import * as React from 'react';
import { connect } from 'react-redux';
import { StoreProps } from '../../store';
import {createStyles, makeStyles, Theme, Paper, CircularProgress, Container} from '@material-ui/core';
import {Paging} from '../Paging';
import {StoryPage} from './StoryPage';
import {Paragraph, StateProps} from '../../interfaces';
import {fetchParagraphs, fetchStories, login, logout} from '../../store/actions';

import { RouteComponentProps} from "react-router-dom";

type TParams = {
    id: string;
}
type OwnProps = RouteComponentProps<TParams>
type Props = StoryProps & DispatchProps & OwnProps;

interface DispatchProps {
    getParagraphs: (storyID: number) => void
}

interface StoryProps extends StateProps {
    paragraphs: Paragraph[];
}


export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            marginTop: '20px',
            paddingBottom: '20px'
        },
        containerLoading: {
            marginTop: '20px',
            height: '600px',
            display: 'flex',
            justifyContent: 'center'
        },
        loader: {
            alignSelf: 'center'
        },
        page: {
            display: 'flex',
            flexDirection: 'column'
        }
    }),
);

type Classes = Record<'containerLoading' | 'loader' | 'page' | 'container', string>
const StoryLoaderComponent = (classes: Classes) => (props: Props) => (
    <Paper className={classes.containerLoading} >
        <CircularProgress className={classes.loader}/>
    </Paper>
);
const StoryPaperComponent = (classes: Classes) => (props: Props) => (
    <Paper className={classes.container} >
        <StoryPage paragraphs={props.paragraphs} />
    </Paper>
);

export const StoryReading = (props: Props) => {
    const classes = useStyles({});
    const StoryPaper = StoryPaperComponent(classes);
    const StoryLoader = StoryLoaderComponent(classes);
    React.useEffect(() => {
        const { id } = props.match.params;
        props.getParagraphs(Number.parseInt(id, 10));
    }, []);
    return (
        <div className={classes.page}>
            <Paging />
            {props.paragraphs.length ? <StoryPaper {...props} /> : <StoryLoader  {...props}/>}
            <Paging />
        </div>
    );
};

const mapDispatchToProps = (dispatch: React.Dispatch<any>): DispatchProps => {
    return {
        getParagraphs: (storyID: number) => dispatch(fetchParagraphs({id: storyID, page: 1}))
    }
};

const mapStateToProps = (state: StoreProps): StoryProps => {
    return {
        auth: state.setLogin,
        paragraphs: state.paragraphs
    }
};

export const StoryPageContainer = connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(StoryReading);

