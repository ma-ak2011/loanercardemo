import React from 'react';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import PeopleIcon from '@material-ui/icons/SupervisedUserCircle';
import PersonIcon from '@material-ui/icons/Person';
import Motorcycle from '@material-ui/icons/Motorcycle';
import CalenderIcon from '@material-ui/icons/CalendarToday';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {Link} from "react-router-dom";
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';
import { Urls } from '../constant/url';

const drawerWidth = 240;

const styles = theme => ({
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        marginLeft: drawerWidth,
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
        },
    },
    menuButton: {
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    toolBar: {
        justifyContent: 'space-between',
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
    },
});

const HeaderForMember = ({ logout, user, currentPath, mobileOpen, toggleMenu, classes, theme, container, children}) => {

    const headers = [
        { url: Urls.Schedule, icon: <CalenderIcon/>},
        { url: Urls.Customer, icon: <PersonIcon/>},
        { url: Urls.Staff, icon: <PeopleIcon/>},
        { url: Urls.Facility, icon: <Motorcycle/>},
    ];

    const drawer = (<div>
        <div className={classes.toolbar} />
        <Divider />
        <List>
            {headers.map((h, i) =>
                <ListItem button disabled={currentPath === h.url.path} key={i}>
                    <ListItemIcon>
                        { h.icon }
                    </ListItemIcon>
                    <ListItem button component={Link} to={h.url.path}>
                        <ListItemText primary={h.url.name} />
                    </ListItem>
                </ListItem>)}
        </List>
        <Divider />
    </div>);

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar className={classes.toolBar} variant="dense">
                    <IconButton color="inherit" aria-label="Open drawer"
                        onClick={ e => toggleMenu(e)} className={classes.menuButton}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" color="inherit" noWrap>
                        {Object.values(Urls).find(u => u.path === currentPath).name}
                    </Typography>
                    <Button color="inherit" onClick={ e => logout(e) }>ログアウト</Button>
                </Toolbar>
            </AppBar>

            <nav className={classes.drawer}>
                <Hidden smUp implementation="css">
                    <Drawer container={container} variant="temporary" classes={{paper: classes.drawerPaper}}
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={ mobileOpen } onClose={ e => toggleMenu(e)}
                        ModalProps={{keepMounted: true}}>
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <Drawer classes={{ paper: classes.drawerPaper }} variant="permanent" open>
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>
            <main className={classes.content}>
                {children}
            </main>
        </div>
    );
};

export default withStyles(styles, { withTheme: true })(HeaderForMember);