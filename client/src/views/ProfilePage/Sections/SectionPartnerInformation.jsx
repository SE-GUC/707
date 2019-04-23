import React from "react";
import axios from "axios";
import Cookies from "universal-cookie";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import People from "@material-ui/icons/People";
import LocationOn from "@material-ui/icons/LocationOn";
import DateRange from "@material-ui/icons/DateRange";
import Work from "@material-ui/icons/Work";
import FormatListNumbered from "@material-ui/icons/FormatListNumbered";
import AssignmentTurnedIn from "@material-ui/icons/AssignmentTurnedIn";
import Favorite from "@material-ui/icons/Favorite";
import CreditCard from "@material-ui/icons/CreditCard";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Modal from "@material-ui/core/Modal";
import productStyle from "assets/jss/material-kit-react/views/landingPageSections/productStyle.jsx";
class SectionPartnerInformation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      dialog: false,
      name: "",
      email: "",
      password: "",
      showPassword: false,
      address: "",
      birthdate: "",
      occupation: "",
      contactNumbers: "",
      interests: "",
      credits: "",
      contractSigned: ""
    };
  }
  toggle = state => {
    this.setState({
      [state]: !this.state[state]
    });
  };
  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };
  handleChangeMultiple = prop => event => {
    this.setState({ [prop]: event.target.value.split(",") });
  };
  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };
  componentDidMount() {
    const cookies = new Cookies();
    const token = cookies.get("token");
    axios
      .get("http://localhost:5000/api/profiles", {
        headers: {
          Authorization: token
        }
      })
      .then(res =>
        this.setState({
          name: res.data.data.name,
          email: res.data.data.email,
          address: res.data.data.address,
          type: res.data.data.usertype,
          birthdate: res.data.data.birthdate,
          occupation: res.data.data.occupation,
          contractSigned: res.data.data.contractSigned,
          contactNumbers: res.data.data.contactNumbers,
          interests: res.data.data.interests,
          credits: res.data.data.credits
        })
      );
  }
  onUpdate = () => {
    var updated = {
      name: this.state.name,
      email: this.state.email,
      address: this.state.address,
      birthdate: this.state.birthdate,
      occupation: this.state.occupation,
      contractSigned: this.state.contractSigned,
      contactNumbers: this.state.contactNumbers,
      interests: this.state.interests
    };
    if (!this.state.password === "")
      updated = {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        address: this.state.address,
        birthdate: this.state.birthdate,
        occupation: this.state.occupation,
        contractSigned: this.state.contractSigned,
        contactNumbers: this.state.contactNumbers,
        interests: this.state.interests
      };
    const cookies = new Cookies();
    const token = cookies.get("token");
    axios
      .put("http://localhost:5000/api/profiles/partner", updated, {
        headers: {
          Authorization: token
        }
      })
      .then(res =>
        this.setState({
          name: res.data.data.name,
          email: res.data.data.email,
          password: "",
          address: res.data.data.address,
          type: res.data.data.usertype,
          birthdate: res.data.data.birthdate,
          occupation: res.data.data.occupation,
          contractSigned: res.data.data.contractSigned,
          contactNumbers: res.data.data.contactNumbers,
          interests: res.data.data.interests,
          credits: res.data.data.credits
        })
      );
    window.location.replace("/profile-page");
    alert("Your profile information are updated successuflly");
  };
  onDelete = () => {
    const cookies = new Cookies();
    const token = cookies.get("token");
    axios
      .delete("http://localhost:5000/api/profiles/partner", {
        headers: {
          Authorization: token
        }
      })
      .then(
        this.setState({
          name: "",
          email: "",
          password: "",
          address: "",
          birthdate: "",
          occupation: "",
          contactNumbers: "",
          interests: "",
          credits: "",
          contractSigned: ""
        })
      );
    cookies.set("token", null);
    cookies.set("usertype", null);
    window.location.replace("/");
    alert("WE ARE SORRY TO HEAR YOU GO!");
  };
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.sections}>
        <div id="project">
          <GridContainer justify="center">
            <Button color="info" size="lg" onClick={() => this.toggle("modal")}>
              Update Personal Information
            </Button>
            <Modal open={this.state.modal}>
              <GridContainer justify="center">
                <GridItem xs={12} sm={12} md={4}>
                  <Card>
                    <form className={classes.form}>
                      <CardHeader color="info" className={classes.cardHeader}>
                        <div className={classes.title}>
                          <h2>Personal Information</h2>
                        </div>
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
                            id="password"
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
                        <FormControl className={classes.form} fullWidth={true}>
                          <InputLabel>Address</InputLabel>
                          <Input
                            id="address"
                            type="address"
                            value={this.state.address}
                            onChange={this.handleChange("address")}
                            endAdornment={
                              <InputAdornment position="end">
                                <LocationOn
                                  className={classes.inputIconsColor}
                                />
                              </InputAdornment>
                            }
                          />
                        </FormControl>
                        <FormControl className={classes.form} fullWidth={true}>
                          <InputLabel>Birth Date</InputLabel>
                          <Input
                            id="birthdate"
                            type="birthdate"
                            value={this.state.birthdate}
                            onChange={this.handleChange("birthdate")}
                            endAdornment={
                              <InputAdornment position="end">
                                <DateRange
                                  className={classes.inputIconsColor}
                                />
                              </InputAdornment>
                            }
                          />
                        </FormControl>
                        <FormControl className={classes.form} fullWidth={true}>
                          <InputLabel>Occupation</InputLabel>
                          <Input
                            id="occupation"
                            type="occupation"
                            value={this.state.occupation}
                            onChange={this.handleChange("occupation")}
                            endAdornment={
                              <InputAdornment position="end">
                                <Work className={classes.inputIconsColor} />
                              </InputAdornment>
                            }
                          />
                        </FormControl>
                        <FormControl className={classes.form} fullWidth={true}>
                          <InputLabel>Contact Numbers</InputLabel>
                          <Input
                            id="contactNumbers"
                            type="contactNumbers"
                            value={this.state.contactNumbers}
                            onChange={this.handleChangeMultiple(
                              "contactNumbers"
                            )}
                            endAdornment={
                              <InputAdornment position="end">
                                <FormatListNumbered
                                  className={classes.inputIconsColor}
                                />
                              </InputAdornment>
                            }
                          />
                        </FormControl>
                        <FormControl className={classes.form} fullWidth={true}>
                          <InputLabel>Interests</InputLabel>
                          <Input
                            id="interests"
                            type="interests"
                            value={this.state.interests}
                            onChange={this.handleChangeMultiple("interests")}
                            endAdornment={
                              <InputAdornment position="end">
                                <Favorite className={classes.inputIconsColor} />
                              </InputAdornment>
                            }
                          />
                        </FormControl>
                        <FormControl className={classes.form} fullWidth={true}>
                          <InputLabel>Contract Signed</InputLabel>
                          <Input
                            id="contractSigned"
                            type="contractSigned"
                            value={this.state.contractSigned}
                            onChange={this.handleChange("contractSigned")}
                            disabled={true}
                            endAdornment={
                              <InputAdornment position="end">
                                <AssignmentTurnedIn
                                  className={classes.inputIconsColor}
                                />
                              </InputAdornment>
                            }
                          />
                        </FormControl>
                        <FormControl className={classes.form} fullWidth={true}>
                          <InputLabel>Credits</InputLabel>
                          <Input
                            id="credits"
                            type="credits"
                            value={this.state.credits}
                            onChange={this.handleChange("credits")}
                            disabled={true}
                            endAdornment={
                              <InputAdornment position="end">
                                <CreditCard
                                  className={classes.inputIconsColor}
                                />
                              </InputAdornment>
                            }
                          />
                        </FormControl>
                      </CardBody>
                      <CardFooter className={classes.cardFooter}>
                        <Button
                          color="info"
                          size="lg"
                          onClick={() => this.onUpdate()}
                        >
                          Update
                        </Button>
                        <Button
                          color="danger"
                          size="lg"
                          onClick={() => this.onDelete()}
                        >
                          Delete my profile
                        </Button>
                        <Button
                          simple
                          color="info"
                          size="lg"
                          onClick={() => this.toggle("modal")}
                        >
                          Close
                        </Button>
                      </CardFooter>
                    </form>
                  </Card>
                </GridItem>
              </GridContainer>
            </Modal>
          </GridContainer>
        </div>
      </div>
    );
  }
}
export default withStyles(productStyle)(SectionPartnerInformation);
