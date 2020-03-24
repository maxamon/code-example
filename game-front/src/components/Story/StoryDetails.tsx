import {createStyles, makeStyles, Theme, Button, ButtonBase, Grid, Paper, Typography, Chip} from '@material-ui/core';
import React = require('react');
import {Story} from '../../interfaces';

interface Props {
    readStory: () => void;
    editStory: () => void;
    currentStory: Story;
};

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1
        },
        paper: {
            padding: theme.spacing(2),
            margin: 'auto',
            maxWidth: 500,
        },
        image: {
            width: 128,
            height: 128,
        },
        img: {
            margin: 'auto',
            display: 'block',
            maxWidth: '100%',
            maxHeight: '100%',
        },
        buttons: {
            padding: "8px"
        }
    }),
);

export const StoryDetails = (props: Props) => {
    const classes = useStyles({});
    const readStory = (_: React.MouseEvent<HTMLButtonElement, MouseEvent>) => props.readStory();
    const editStory = (_: React.MouseEvent<HTMLButtonElement, MouseEvent>) => props.editStory();
    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Grid container={true} spacing={2}>
                    <Grid item={true}>
                        <ButtonBase className={classes.image}>
                            <img className={classes.img} alt="complex" src="/book.jpg" />
                        </ButtonBase>
                    </Grid>
                    <Grid item={true} xs={12} sm={true} container={true}>
                        <Grid item={true} xs={true} container={true} direction="column" spacing={2}>
                            <Grid item={true} xs={true}>
                                <Typography gutterBottom={true} variant="subtitle1">
                                    {props.currentStory.title}
                                </Typography>
                                <Typography variant="body2" gutterBottom={true}>
                                    {props.currentStory.abstract}
                                </Typography>
                                <div>
                                    {props.currentStory.authors.map((itm:any) => <Chip key={itm.id} label={itm.nick_name} variant="outlined" />)}
                                </div>
                                <Typography variant="body2" color="textSecondary">
                                    Date creation: {props.currentStory.created_at}
                                </Typography>
                            </Grid>
                            <Grid container={true} spacing={2} direction={'row'} className={classes.buttons}>
                                <Grid item={true}>
                                    <Button variant="contained" onClick={readStory}>
                                        Read
                                    </Button>
                                </Grid>
                                <Grid item={true}>
                                    <Button variant="contained" onClick={editStory}>
                                        Edit
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
};
