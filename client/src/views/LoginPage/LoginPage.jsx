import React from "react";
import axios from "axios";
import Cookies from "universal-cookie";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// react components for routing our app without refresh
import { Link } from "react-router-dom";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
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
import loginPageStyle from "assets/jss/material-kit-react/views/loginPage.jsx";
import image from "assets/img/bg7.jpg";
class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      cardAnimaton: "cardHidden",
      email: "",
      password: "",
      showPassword: false
    };
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
  onSubmit() {
    if (this.state.email === "" || this.state.password === "")
      alert("Please fill-in both fields");
    const cookies = new Cookies();
    axios
      .post("http://localhost:5000/api/login", {
        email: this.state.email,
        password: this.state.password
      })
      .then(res => {
        if (res.status === 200) {
          cookies.set("token", res.data.data.token);
          if (res.data.data.user.usertype !== undefined)
            cookies.set("usertype", res.data.data.user.usertype);
          else cookies.set("usertype", "admin");
          console.log(cookies.get("token"));
          console.log(cookies.get("usertype"));
          window.location.replace("/profile-page");
        }
      })
      .catch(alert("Invalid email or password, this user is not found"));
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
                  <form className={classes.form} onSubmit={this.onSubmit}>
                    <CardHeader color="info" className={classes.cardHeader}>
                      <h3 className={classes.title}>Login</h3>
                      <h7 className={classes.title}>Not a member yet?</h7>
                      <br />
                      <Link
                        to={"/register-page"}
                        className={classes.link}
                        underline="always"
                      >
                        Sign-up Now!
                      </Link>
                    </CardHeader>
                    <CardBody>
                      <FormControl className={classes.form} fullWidth={true}>
                        <InputLabel>Email</InputLabel>
                        <Input
                          id="email"
                          type="email"
                          value={this.state.email}
                          required={true}
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
                          id="password"
                          type={this.state.showPassword ? "text" : "password"}
                          value={this.state.password}
                          onChange={this.handleChange("password")}
                          required={true}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                className={classes.inputIconsColor}
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
                      <Button
                        simple
                        color="info"
                        size="lg"
                        onClick={() => this.onSubmit()}
                      >
                        Get started
                      </Button>
                    </CardFooter>
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
