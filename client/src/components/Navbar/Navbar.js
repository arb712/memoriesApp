import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import memories from "../../images/memories.png";
import { AppBar, Avatar, Toolbar, Typography, Button } from "@material-ui/core";

import useStyles from "./styles";

const Navbar = () => {
  const classes = useStyles();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const logout = () => {
    dispatch({ type: "LOGOUT" });

    history.push("/");

    setUser(null);
  };
  useEffect(() => {
    const token = user?.token;

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);
  return (
    <>
      <AppBar className={classes.appBar} position="static" color="inherit">
        <div className={classes.brandContainer}>
          <Typography
            className={classes.heading}
            component={Link}
            to="/"
            variant="h2"
            align="center"
          >
            Memories
          </Typography>
          <img
            className={classes.image}
            src={memories}
            alt="memories"
            height="60"
          />
          <Toolbar className={classes.toolbar}>
            {user ? (
              <div className={classes.profile}>
                <Avatar
                  className={classes.purple}
                  alt={user.res.profileObj.name}
                  src={user.res.profileObj.imageUrl}
                >
                  {user.res.profileObj.name.charAt(0)}
                </Avatar>
                <Typography className={classes.userName} variant="h6">
                  {user.res.profileObj.name}
                </Typography>
                <Button
                  variant="contained"
                  className={classes.logout}
                  color="secondary"
                  onClick={logout}
                >
                  Logout
                </Button>
              </div>
            ) : (
              <Button
                component={Link}
                to="/auth"
                variant="contained"
                color="primary"
              >
                Sign In
              </Button>
            )}
          </Toolbar>
        </div>
      </AppBar>
    </>
  );
};

export default Navbar;
