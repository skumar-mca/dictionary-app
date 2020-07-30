import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import React, { Suspense } from 'react';
import { Switch } from "react-router";
import { HashRouter, Redirect, Route } from "react-router-dom";
import AppLayout from './components/layout-component/index';
import CustomLoader from './components/loader-component/index';
import HomeComponent from './modules/home/containers/home.container';
import InfoComponent from './modules/info/index';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
}));


export const AppRoutes = (props) => {
    const classes = useStyles();
    return (
        <HashRouter>
            <Switch>
                <Redirect exact from="/" to="/home/search" />
                <div>
                    <CssBaseline />
                    <AppLayout />
                    <main className="main-content">
                        <div className={classes.appBarSpacer} />
                        <Grid container>
                            <Grid item xs={12} md={12} lg={12}>
                                <Suspense fallback={<CustomLoader />}>
                                    <Route exact path="/home/search" component={HomeComponent} />
                                    <Route exact path="/home/search/:searchTerm" component={HomeComponent} />
                                    <Route path="/info" component={InfoComponent} />

                                </Suspense>
                            </Grid>
                        </Grid>
                    </main>
                </div>
            </Switch>
        </HashRouter>
    )
}

export default AppRoutes;