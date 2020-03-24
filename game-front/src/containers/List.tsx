import * as React from 'react';
import {connect} from 'react-redux';
import {StoryList as StoryListComponent} from '../components/StoryList';
import {StoreProps} from '../store';
import {Story} from '../interfaces';

interface StateProps {
    list: Story[];
}

interface OwnProps {
    filter?: string;
    title?: string;
    limit?: number;
}
type Props = StateProps & OwnProps;

export const ListComponent = (props: Props) => {
    return (
        <StoryListComponent {...props}/>
    );
};

const mapStateToProps = (state: StoreProps, ownProps: OwnProps): StateProps => {
    const props = {
        ...ownProps,
        list: state.stories
    };
    return props;
};

export const StoryListContainer = connect<StateProps, {}, OwnProps>(mapStateToProps)(ListComponent);
