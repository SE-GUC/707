import React from "react";
import axios from "axios";
import Cookies from "universal-cookie";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
// react components for routing our app without refresh
import { Link } from "react-router-dom";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import People from "@material-ui/icons/People";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
// core components
import Header from "components/Header/Header.jsx";
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import Footer from "components/Footer/Footer.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import loginPageStyle from "assets/jss/material-kit-react/views/loginPage.jsx";

import image from "assets/img/bg7.jpg";

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      cardAnimaton: "cardHidden",
      selectedEnabled: "",
      name: "",
      email: "",
      password: "",
      showPassword: false,
      type: ""
    };
    this.handleChangeEnabled = this.handleChangeEnabled.bind(this);
  }
  componentDidMount() {
    // we add a hidden class to the card and after 700 ms we delete it and the transition appears
    setTimeout(
      function() {
        this.setState({ cardAnimaton: "" });
      }.bind(this),
      700
    );
  }
  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };
  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };
  handleChangeEnabled(event) {
    this.setState({ selectedEnabled: event.target.value });
  }
  onSubmit() {
    if (
      this.state.email === "" ||
      this.state.password === "" ||
      this.state.type === ""
    )
      alert("Please fill-in all fields");
    axios
      .post(
        "http://localhost:5000/api/profiles/" + this.state.type + "/register",
        {
          name: this.state.name,
          email: this.state.email,
          password: this.state.password
        }
      )
      .then(res => {
        if (res.status === 200) {
          const cookies = new Cookies();
          axios
            .post("http://localhost:5000/api/login", {
              email: this.state.email,
              password: this.state.password
            })
            .then(res => {
              if (res.status === 200) {
                cookies.set("token", res.data.data.token);
                cookies.set("usertype", res.data.data.user.usertype);
                console.log(res.data.data.token);
                console.log(res.data.data.user.usertype);
                window.location.replace("/profile-page");
              }
            });
        }
      })
      .catch(alert("Email is already used"));
  }
  render() {
    const { classes, ...rest } = this.props;
    return (
      <div>
        <Link to={"/"} style={{ color: "#FFF" }}>
          <Header
            absolute
            color="transparent"
            brand="Home Page"
            rightLinks={<HeaderLinks />}
            {...rest}
          />
        </Link>
        <div
          className={classes.pageHeader}
          style={{
            backgroundImage: "url(" + image + ")",
            backgroundSize: "cover",
            backgroundPosition: "top center"
          }}
        >
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={4}>
                <Card className={classes[this.state.cardAnimaton]}>
                  <form className={classes.form}>
                    <CardHeader color="info" className={classes.cardHeader}>
                      <h3 className={classes.title}>Register</h3>
                      <h7 className={classes.title}>already a member?</h7>
                      <br />
                      <Link
                        to={"/login-page"}
                        className={classes.link}
                        underline="always"
                      >
                        Sign-in
                      </Link>
                    </CardHeader>
                    <CardBody>
                      <FormControl className={classes.form} fullWidth={true}>
                        <InputLabel>Name</InputLabel>
                        <Input
                          id="name"
                          type="name"
                          value={this.state.name}
                          onChange={this.handleChange("name")}
                          endAdornment={
                            <InputAdornment position="end">
                              <People className={classes.inputIconsColor} />
                            </InputAdornment>
                          }
                        />
                      </FormControl>
                      <FormControl className={classes.form} fullWidth={true}>
                        <InputLabel>Email</InputLabel>
                        <Input
                          id="email"
                          type="email"
                          value={this.state.email}
                          onChange={this.handleChange("email")}
                          endAdornment={
                            <InputAdornment position="end">
                              <Email className={classes.inputIconsColor} />
                            </InputAdornment>
                          }
                        />
                      </FormControl>
                      <FormControl className={classes.form} fullWidth={true}>
                        <InputLabel>Password</InputLabel>
                        <Input
                          id="adornment-password"
                          type={this.state.showPassword ? "text" : "password"}
                          value={this.state.password}
                          onChange={this.handleChange("password")}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="Toggle password visibility"
                                onClick={this.handleClickShowPassword}
                              >
                                {this.state.showPassword ? (
                                  <Visibility />
                                ) : (
                                  <VisibilityOff />
                                )}
                              </IconButton>
                            </InputAdornment>
                          }
                        />
                      </FormControl>
                    </CardBody>
                    <CardFooter className={classes.cardFooter}>
                      <div
                        className={
                          classes.checkboxAndRadio +
                          " " +
                          classes.checkboxAndRadioHorizontal
                        }
                      >
                        <FormControlLabel
                          control={
                            <Radio
                              checked={this.state.selectedEnabled === "partner"}
                              onClick={this.handleChange("type")}
                              onChange={this.handleChangeEnabled}
                              value="partner"
                              name="partner"
                              checkedIcon={
                                <FiberManualRecord
                                  className={classes.radioChecked}
                                />
                              }
                              classes={{
                                checked: classes.radio
                              }}
                            />
                          }
                          classes={{
                            label: classes.label
                          }}
                          label="Partner"
                        />
                      </div>
                      <div
                        className={
                          classes.checkboxAndRadio +
                          " " +
                          classes.checkboxAndRadioHorizontal
                        }
                      >
                        <FormControlLabel
                          control={
                            <Radio
                              checked={
                                this.state.selectedEnabled === "candidate"
                              }
                              onClick={this.handleChange("type")}
                              onChange={this.handleChangeEnabled}
                              value="candidate"
                              name="candidate"
                              checkedIcon={
                                <FiberManualRecord
                                  className={classes.radioChecked}
                                />
                              }
                              classes={{
                                checked: classes.radio
                              }}
                            />
                          }
                          classes={{
                            label: classes.label
                          }}
                          label="Candidate"
                        />
                      </div>
                      <div
                        className={
                          classes.checkboxAndRadio +
                          " " +
                          classes.checkboxAndRadioHorizontal
                        }
                      >
                        <FormControlLabel
                          control={
                            <Radio
                              checked={
                                this.state.selectedEnabled === "consultancy"
                              }
                              onClick={this.handleChange("type")}
                              onChange={this.handleChangeEnabled}
                              value="consultancy"
                              name="consultancy"
                              checkedIcon={
                                <FiberManualRecord
                                  className={classes.radioChecked}
                                />
                              }
                              classes={{
                                checked: classes.radio
                              }}
                            />
                          }
                          classes={{
                            label: classes.label
                          }}
                          label="Consultancy"
                        />
                      </div>
                    </CardFooter>
                    <Button
                      simple
                      color="info"
                      size="lg"
                      onClick={() => this.onSubmit()}
                    >
                      Get started
                    </Button>
                  </form>
                </Card>
              </GridItem>
            </GridContainer>
          </div>
          <Footer whiteFont />
        </div>
      </div>
    );
  }
}
export default withStyles(loginPageStyle)(LoginPage);
