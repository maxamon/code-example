import * as React from 'react';
import { connect } from 'react-redux';
import { StoreProps } from '../store';
import {login} from '../store/actions/index';
import {Paper} from '@material-ui/core';
import {Formik} from 'formik';
import {LoginForm, useStyles, validationScheme} from '../components/LoginForm';
import {AUTH} from '../interfaces';

interface DispatchProps {
    onLogin: (referer: string) => (data: LoginFormData) => void
}
interface StateProps {
    auth: AUTH;
    referer: string;
}
export interface LoginFormData {
    email: string;
    password: string;
    referer: string;
}

type Props = StateProps & DispatchProps

export const LoginPage = (props: Props) => {
    const classes = useStyles({});
    return (
        <Paper className={classes.container} >
            <Formik render={LoginForm(classes)} onSubmit={props.onLogin(props.referer)} validationSchema={validationScheme} initialValues={{email: '', password: ''}} />
        </Paper>
    );
};


const mapDispatchToProps = (dispatch: React.Dispatch<any>): DispatchProps => {
    return {
        onLogin: (referer: string) => (data: LoginFormData) => {
            dispatch(login({...data, referer}))
        },
    }
};

const mapStateToProps = (state: StoreProps): StateProps => {
    return {
        auth: state.setLogin,
        referer: state.referer
    }
};

export const LoginPageContainer = connect<StateProps, DispatchProps, StateProps>(mapStateToProps, mapDispatchToProps)(LoginPage);

