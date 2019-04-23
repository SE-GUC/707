/*eslint-disable*/
import React from "react";
import Cookies from "universal-cookie";
// react components for routing our app without refresh
import { Link } from "react-router-dom";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";
import Email from "@material-ui/icons/Email";
// core components
import Button from "components/CustomButtons/Button.jsx";
import headerLinksStyle from "assets/jss/material-kit-react/components/headerLinksStyle.jsx";
function HeaderLinks({ ...props }) {
  const { classes } = props;
  const cookies = new Cookies();
  const token = cookies.get("token");
  if (token === "null")
    return (
      <List className={classes.list}>
        <ListItem className={classes.listItem}>
          <Tooltip
            id="register"
            title="Register"
            placement={window.innerWidth > 959 ? "top" : "left"}
            classes={{ tooltip: classes.tooltip }}
          >
            <Link to={"/register-page"} style={{ color: "#FFF" }}>
              <Button
                color="transparent"
                target="_blank"
                className={classes.navLink}
              >
                <i class="fas fa-registered" />
              </Button>
            </Link>
          </Tooltip>
        </ListItem>
        <ListItem className={classes.listItem}>
          <Tooltip
            id="login"
            title="Login"
            placement={window.innerWidth > 959 ? "top" : "left"}
            classes={{ tooltip: classes.tooltip }}
          >
            <Link to={"/login-page"} style={{ color: "#FFF" }}>
              <Button
                color="transparent"
                target="_blank"
                className={classes.navLink}
              >
                <i className={"fas fa-sign-in-alt"} />
              </Button>
            </Link>
          </Tooltip>
        </ListItem>
      </List>
    );
  else
    return (
      <List className={classes.list}>
        <ListItem className={classes.listItem}>
          <Tooltip
            id="logout"
            title="logout"
            placement={window.innerWidth > 959 ? "top" : "left"}
            classes={{ tooltip: classes.tooltip }}
          >
            <Button
              color="transparent"
              target="_blank"
              className={classes.navLink}
              onClick={() => {
                const cookies = new Cookies();
                cookies.set("token", null);
                cookies.set("usertype", null);
                alert("You have successfully logged out!");
                window.location.replace("/");
              }}
            >
              <i className={"fas fa-sign-out-alt"} />
            </Button>
          </Tooltip>
        </ListItem>
        <ListItem className={classes.listItem}>
          <Tooltip
            id="profile"
            title="Profile"
            placement={window.innerWidth > 959 ? "top" : "left"}
            classes={{ tooltip: classes.tooltip }}
          >
            <Link to={"/profile-page"} style={{ color: "#FFF" }}>
              <Button
                color="transparent"
                target="_blank"
                className={classes.navLink}
              >
                <i className="fas fa-user" />
              </Button>
            </Link>
          </Tooltip>
        </ListItem>
        <ListItem className={classes.listItem}>
          <Tooltip
            id="email"
            title="Emails"
            placement={window.innerWidth > 959 ? "top" : "left"}
            classes={{ tooltip: classes.tooltip }}
          >
            <Link to={"/email-page"} style={{ color: "#FFF" }}>
              <Button
                color="transparent"
                target="_blank"
                className={classes.navLink}
              >
                <Email className={classes.icons} />
              </Button>
            </Link>
          </Tooltip>
        </ListItem>
      </List>
    );
}
export default withStyles(headerLinksStyle)(HeaderLinks);
