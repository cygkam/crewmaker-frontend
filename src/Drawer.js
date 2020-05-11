import React from "react";
import { Header } from "semantic-ui-react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import SearchIcon from "@material-ui/icons/Search";
import Group from "@material-ui/icons/Group";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import PersonIcon from "@material-ui/icons/Person";
import ReactLogo from "./logo.svg";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    background: "white",
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  logo: {
    margin: "auto",
    textAlign: "center",
    width: 50,
    height: 50,
    alignSelf: "center",
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
    [theme.breakpoints.down("sm")]: {
      width: 0,
      display: "none",
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));



  

export default function MiniDrawer(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root} style={{ paddingTop: 64 }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="orange"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <img src={ReactLogo} className={classes.logo} alt="logo" />
          <Header as="h1" color="orange" textAlign="center">
            CrewMaker
          </Header>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem
            button
            key={"Mój profil"}
            component={Link}
            to={`/mainProfilePage/${props.currentUser.username}`}
          >
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary={"Mój profil"} />
          </ListItem>
          <ListItem
            button
            key={"Wyszukaj"}
            component={Link}
            to={`/searchPannel`}
          >
            <ListItemIcon>
              <SearchIcon />
            </ListItemIcon>
            <ListItemText primary={"Wyszukaj"} />
          </ListItem>
          <ListItem
            button
            key={"Wyloguj"}
            component={Link}
            onClick={props.onLogout}
          >
            <ListItemIcon>
              <MeetingRoomIcon />
            </ListItemIcon>
            <ListItemText primary={"Wyloguj"} />
          </ListItem>
          <ListItem
            button
            key={"Wydarzenie"}
            component={Link}
            to={`/eventView`}
          >
            <ListItemIcon>
              <Group/>
            </ListItemIcon>
            <ListItemText primary={"Wydarzenie"} />
          </ListItem>
        </List>
        <Divider />
      </Drawer>
    </div>
  );
}
