import { Grid } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import { red } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import React from 'react';

const useStyles = makeStyles((theme) => ({
    root: {
        marginBottom: 25
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
}));

export default function InfoComponent() {
    const classes = useStyles();
    return (
        <>
            <Typography variant="h4" gutterBottom>Tech. Stack</Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Card className={classes.root}>
                        <CardHeader
                            avatar={<Avatar src={`https://cdn.iconscout.com/icon/free/png-128/react-3-1175109.png`} />}
                            title="React Js"
                            subheader="v.16.13.1"
                        />
                        <CardContent>
                            <Typography variant="body2" color="textSecondary" component="p">
                                React is a declarative, efficient, and flexible JavaScript library for building user interfaces.
                            </Typography>

                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Card className={classes.root}>
                        <CardHeader
                            avatar={<Avatar src={`https://d2eip9sf3oo6c2.cloudfront.net/tags/images/000/000/386/square_256/redux.png`} />}
                            title="Redux"
                            subheader="v.4.0.5"
                        />
                        <CardContent>
                            <Typography variant="body2" color="textSecondary" component="p">
                                Redux is a predictable state container for JavaScript apps.
                      </Typography>

                        </CardContent>
                    </Card>
                </Grid>


                <Grid item xs={12} md={6}>
                    <Card className={classes.root}>
                        <CardHeader
                            avatar={<Avatar src={`https://material-ui.com/static/logo_raw.svg`} />}
                            title="Material UI"
                            subheader="v.4.11.0"
                        />
                        <CardContent>
                            <Typography variant="body2" color="textSecondary" component="p">
                                React components for faster and easier web development. Build your own design system, or start with Material Design.
                      </Typography>

                        </CardContent>
                    </Card>
                </Grid>




            </Grid>

            <Typography variant="h4" gutterBottom>APIs</Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Card className={classes.root}>
                        <CardHeader
                            avatar={<Avatar src={`https://owlbot.info/static/dictionary/img/owlbot.png`} />}
                            title="Owl Bot"
                            subheader="v.4"
                        />
                        <CardContent>
                            <Typography variant="body2" color="textSecondary" component="p">
                                Free Dictionary API
                            </Typography>

                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Card className={classes.root}>
                        <CardHeader
                            avatar={<Avatar src={`https://developers.giphy.com/branch/master/static/header-logo-8974b8ae658f704a5b48a2d039b8ad93.gif`} />}
                            title="GIPHY"
                            subheader="v.1"
                        />
                        <CardContent>
                            <Typography variant="body2" color="textSecondary" component="p">
                                GIPHY SDK helps you integrate the world's largest GIF library.
                      </Typography>

                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            <Typography variant="h4" gutterBottom>Developer</Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Card className={classes.root}>
                        <CardHeader
                            avatar={<Avatar src={`https://media-exp1.licdn.com/dms/image/C4D03AQFuvR5Qmllc6g/profile-displayphoto-shrink_200_200/0?e=1601510400&v=beta&t=u4aC5-_Yep5rThMSM6UdsmeIfh_1p1FS0zkuBiGY0SM`} />}
                            title="Sunil Kumar | UI Architect"
                            subheader={
                                <>
                                    <a href="https://www.linkedin.com/in/sunil-kumar-83146843/" target="_blank"><LinkedInIcon /></a>
                                    <a href="https://sunilkumar-profile.web.app/profile" target="_blank"><AccountBoxIcon /></a>
                                </>
                            }
                        />
                        <CardContent>
                            <Typography variant="body2" color="textSecondary" component="p">
                                Angular | React | Redux | Node | MongoDB | JavaScript | JSON | JQuery
                            </Typography>

                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

        </>
    );
}
