import * as React from 'react';
import {ReactNode} from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import {Button, IconButton, Menu, MenuItem, Toolbar, Typography} from '@material-ui/core';
import {Menu as MenuIcon} from '@material-ui/icons';
import {Link} from 'react-router-dom';
import {StoreProps} from '../store';
import {connect} from 'react-redux';
import {AUTH, StateProps} from '../interfaces';
import {fetchAuth, fetchLogout} from '../store/actions';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            marginBottom: '20px'
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
    }),
);

interface LeftMenuProps {
    classes: Classes;
    anchorEl: HTMLElement;
    handleClose: () => void;
    handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
interface LoginProps {
    to: string;
    children: ReactNode;
}
interface DispatchProps {
    logout: () => void;
    isAuth: () => void;
}

type Classes = Record<'root' | 'menuButton' | 'title', string>;

type Props = StateProps & LeftMenuProps & DispatchProps;

const LeftMenu = (props: Props) => {
    const { auth, classes, handleClick, handleClose, anchorEl } = props;
    const logout = () => {
        props.logout();
        handleClose();
    };
    return (
        <>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={handleClick}>
                <MenuIcon />
            </IconButton>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted={true}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem component={Link} to={'/'} onClick={handleClose}>Main Page</MenuItem>
                <MenuItem component={Link} to={'/story/create'} onClick={handleClose}>Create new story</MenuItem>
                {auth == AUTH.IS_AUTH && <MenuItem component={Link} to={'/story/list/my'} onClick={handleClose}>My stories</MenuItem>}
                {auth == AUTH.IS_AUTH && <MenuItem component={Link} to={'/profile'} onClick={handleClose}>Profile</MenuItem>}
                {auth == AUTH.IS_AUTH && <MenuItem onClick={logout}>Logout</MenuItem>}
                {auth != AUTH.IS_AUTH && <MenuItem component={Link} to={'/login'} onClick={handleClose}>Login</MenuItem>}
            </Menu>
        </>
    )
};

export const Header = ({ auth, pathname, logout, isAuth } : StateProps & DispatchProps) => {
    const classes = useStyles({});
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    React.useEffect(() => {
        isAuth();
    }, []);

    function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
        setAnchorEl(event.currentTarget);
    }

    function handleClose() {
        setAnchorEl(null);
    }
    const headerTitle = pathname || 'Home';

    const link = React.useMemo(() => {
        return React.forwardRef<Link, LoginProps>((itemProps, ref) => <Link {...itemProps} ref={ref} />);
    }, []);

    const props = {
        handleClick,
        handleClose,
        logout,
        isAuth,
        anchorEl,
        auth,
        classes
    };
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <LeftMenu {...props} />
                    <Typography variant="h6" className={classes.title}>
                        {headerTitle}
                    </Typography>
                    {auth === AUTH.NOT_AUTH && <Button color="inherit" component={link} to={'/login'}>Login</Button>}
                </Toolbar>
            </AppBar>
        </div>
    );
};

const mapDispatchToProps = (dispatch: React.Dispatch<any>): DispatchProps => {
    return {
        logout: () => dispatch(fetchLogout()),
        isAuth: () => dispatch(fetchAuth())
    }
};
const mapStateToProps = (state: StoreProps): StateProps => {
    return {
        auth: state.setLogin,
        pathname: state.router.location.pathname.slice(1)
    }
};

export const HeaderContainer = connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(Header);
