import * as React from 'react';
import {connect} from 'react-redux';
import {StoreProps} from '../store';
import {AUTH, StateProps} from '../interfaces';
import {Redirect} from 'react-router';
import {fetchAuth, saveReferrer} from '../store/actions';
import {RouteComponentProps} from 'react-router-dom';
import {CircularProgress, createStyles, makeStyles, Theme} from '@material-ui/core';

interface DispatchProps {
    saveReferrer: (ref: string) => void;
    isAuth: () => void;
}

type TParams = {
    url: string;
}
type OwnProps = RouteComponentProps<TParams>
type Props = StateProps & DispatchProps & OwnProps;

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
export const UserGuard = (WrappedComponent: typeof React.Component) => (props: Props) => {
    switch (props.auth) {
        case AUTH.IS_AUTH:
            return <WrappedComponent {...props}/>;
        case AUTH.NOT_AUTH:
            return  <Redirect to={'/login'}/>;
        default:
            props.saveReferrer(props.match.url);
            // props.isAuth();
    }
    // console.log(props.match.url);
    const classes = useStyles({});
    return  (
        <div className={classes.containerLoading} >
            <CircularProgress className={classes.loader}/>
        </div>
    );
};

const mapStateToProps = (state: StoreProps): StateProps => {
    return {
        auth: state.setLogin
    }
};

const mapDispatchToProps = (dispatch: React.Dispatch<any>, ownProps: any): DispatchProps => {
    return {
        saveReferrer: (ref: string) => dispatch(saveReferrer(ref)),
        isAuth: () => dispatch(fetchAuth())
    }
};

export const UserRouteGuard = (WrappedComponent: typeof React.Component) => connect<StateProps, DispatchProps, OwnProps>(mapStateToProps, mapDispatchToProps)(UserGuard(WrappedComponent));

