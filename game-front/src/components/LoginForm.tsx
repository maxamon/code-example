import * as React from 'react';
import {TextField, Button, Breadcrumbs, Typography, Link} from '@material-ui/core';
import { FormikProps, FormikValues} from 'formik';
import * as Yup from 'yup';
import {ChangeEvent, ReactNode} from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core';
import {Link as RouteLink} from 'react-router-dom';

type Classes = Record<'textField' | 'container' | 'form' | 'submit' | 'signin', string>

const fieldWidth = '290px';
export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        textField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            maxWidth: fieldWidth,
            width: fieldWidth
        },
        container: {
            marginTop: '20px',
            paddingBottom: '20px'
        },
        form: {
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            flexDirection: 'column'
        },
        submit: {
            marginTop: '20px'
        },
        signin: {
            textAlign: 'center'
        },
        page: {
            display: 'flex',
            flexDirection: 'column'
        }
    }),
);

export const LoginForm = (classes: Classes) => (props: FormikProps<FormikValues>): ReactNode => {
    const { isValid, touched, errors, setFieldTouched, handleChange, handleSubmit } = props;
    const change = (name: string, e: ChangeEvent) => {
        e.persist();
        handleChange(e);
        setFieldTouched(name, true, false);
    };
    return (
        <form className={classes.form} noValidate={true} autoComplete="off" onSubmit={handleSubmit}>
            <Breadcrumbs aria-label="breadcrumb">
                <Typography color="textPrimary">Login</Typography>
                <Link color="inherit" to="/signin" component={RouteLink}>
                    Sign In
                </Link>
            </Breadcrumbs>
            <TextField
                id="outlined-email-input"
                label="Email"
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email ? errors.email : ''}
                className={classes.textField}
                type="email"
                name="email"
                autoComplete="email"
                margin="normal"
                variant="outlined"
                onChange={change.bind(null, 'email')}
            />
            <TextField
                id="outlined-password-input"
                label="Password"
                className={classes.textField}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password ? errors.password : ''}
                type="password"
                name="password"
                autoComplete="current-password"
                margin="normal"
                variant="outlined"
                onChange={change.bind(null, 'password')}
            />
            <Button className={classes.submit} variant="contained" color="primary" type={'submit'} disabled={!isValid}>Fake Login</Button>
        </form>
    );
};

export const validationScheme = Yup.object({
    password: Yup.string().default('')
        .min(8, "Password must contain at least 8 characters")
        .required("Enter your password"),
    email: Yup.string().default('')
        .email("Enter a valid email")
        .required("Email is required"),
});
