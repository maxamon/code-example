import * as React from 'react';
import {connect} from 'react-redux';
import {StoreProps} from '../store';
import {StoryListContainer} from '../containers/List';
import {fetchStories} from '../store/actions/index';
import {AUTH, StateProps} from '../interfaces';

interface DispatchProps {
    getStories: () => void
}

type Props = StateProps & DispatchProps

export const MainPage = (props: Props) => {
    React.useEffect(() => {
        props.getStories();
    }, []);
    return (
        <>
            {props.auth === AUTH.IS_AUTH && <StoryListContainer filter={'favorites'} title={'Favorite stories'} limit={5}/>}
            <StoryListContainer filter={'toplist'} title={'Top stories'} limit={5}/>
            <StoryListContainer filter={'newupdates'} title={'New updates'} limit={5}/>
        </>
    );
};

const mapDispatchToProps = (dispatch: React.Dispatch<any>): DispatchProps => {
    return {
        getStories: () => dispatch(fetchStories()),
    }
};

const mapStateToProps = (state: StoreProps): StateProps => {
    return {
        auth: state.setLogin
    }
};

export const MainPageContainer = connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(MainPage);

