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
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import productStyle from "assets/jss/material-kit-react/views/landingPageSections/productStyle.jsx";
class SectionConsultancyInformation extends React.Component {
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
      establishmentDate: "",
      profession: "",
      yearsOfExperience: "",
      contactNumbers: "",
      interests: "",
      skills: "",
      contractSigned: "",
      credits: ""
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
          contractSigned: res.data.data.contractSigned,
          contactNumbers: res.data.data.contactNumbers,
          interests: res.data.data.interests,
          credits: res.data.data.credits,
          establishmentDate: res.data.data.establishmentDate,
          profession: res.data.data.profession,
          yearsOfExperience: res.data.data.yearsOfExperience,
          skills: res.data.data.skills
        })
      );
  }
  onUpdate = () => {
    if (!window.confirm("ARE YOU SURE?")) return;
    let updated = {};
    if (!(this.state.name === ""))
      updated = { ...updated, name: this.state.name };
    if (!(this.state.email === ""))
      updated = { ...updated, email: this.state.email };
    if (!(this.state.password === ""))
      updated = { ...updated, password: this.state.password };
    updated = {
      ...updated,
      address: this.state.address,
      contractSigned: this.state.contractSigned,
      contactNumbers: this.state.contactNumbers,
      interests: this.state.interests,
      establishmentDate: this.state.establishmentDate,
      profession: this.state.profession,
      yearsOfExperience: this.state.yearsOfExperience
    };
    const cookies = new Cookies();
    const token = cookies.get("token");
    axios
      .put("http://localhost:5000/api/profiles/consultancy", updated, {
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
          contractSigned: res.data.data.contractSigned,
          contactNumbers: res.data.data.contactNumbers,
          interests: res.data.data.interests,
          credits: res.data.data.credits,
          establishmentDate: res.data.data.establishmentDate,
          profession: res.data.data.profession,
          yearsOfExperience: res.data.data.yearsOfExperience,
          skills: res.data.data.skills
        })
      );
    window.location.replace("/profile-page");
    alert("Your profile information are updated successuflly");
  };
  onDelete = () => {
    if (!window.confirm("ARE YOU SURE?")) return;
    const cookies = new Cookies();
    const token = cookies.get("token");
    axios
      .delete("http://localhost:5000/api/profiles/consultancy", {
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
          establishmentDate: "",
          profession: "",
          yearsOfExperience: "",
          contactNumbers: "",
          interests: "",
          skills: "",
          contractSigned: "",
          credits: ""
        })
      );
    cookies.set("token", undefined);
    cookies.set("usertype", undefined);
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
                        <DialogActions>
                          <Button
                            simple
                            color="info"
                            onClick={() => this.toggle("dialog")}
                          >
                            View
                          </Button>
                        </DialogActions>
                        <Dialog open={this.state.dialog} scroll={"body"}>
                          <DialogContent>
                            <FormControl
                              className={classes.form}
                              fullWidth={true}
                            >
                              <InputLabel>Name</InputLabel>
                              <Input
                                id="name"
                                type="name"
                                value={this.state.name}
                                onChange={this.handleChange("name")}
                                endAdornment={
                                  <InputAdornment position="end">
                                    <People
                                      className={classes.inputIconsColor}
                                    />
                                  </InputAdornment>
                                }
                              />
                            </FormControl>
                            <FormControl
                              className={classes.form}
                              fullWidth={true}
                            >
                              <InputLabel>Email</InputLabel>
                              <Input
                                id="email"
                                type="email"
                                value={this.state.email}
                                onChange={this.handleChange("email")}
                                endAdornment={
                                  <InputAdornment position="end">
                                    <Email
                                      className={classes.inputIconsColor}
                                    />
                                  </InputAdornment>
                                }
                              />
                            </FormControl>
                            <FormControl
                              className={classes.form}
                              fullWidth={true}
                            >
                              <InputLabel>Password</InputLabel>
                              <Input
                                id="password"
                                type={
                                  this.state.showPassword ? "text" : "password"
                                }
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
                            <FormControl
                              className={classes.form}
                              fullWidth={true}
                            >
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
                            <FormControl
                              className={classes.form}
                              fullWidth={true}
                            >
                              <InputLabel>Establishment Date</InputLabel>
                              <Input
                                id="establishmentDate"
                                type="establishmentDate"
                                value={this.state.establishmentDate}
                                onChange={this.handleChange(
                                  "establishmentDate"
                                )}
                                endAdornment={
                                  <InputAdornment position="end">
                                    <DateRange
                                      className={classes.inputIconsColor}
                                    />
                                  </InputAdornment>
                                }
                              />
                            </FormControl>
                            <FormControl
                              className={classes.form}
                              fullWidth={true}
                            >
                              <InputLabel>Profession</InputLabel>
                              <Input
                                id="profession"
                                type="profession"
                                value={this.state.profession}
                                onChange={this.handleChange("profession")}
                                endAdornment={
                                  <InputAdornment position="end">
                                    <Work className={classes.inputIconsColor} />
                                  </InputAdornment>
                                }
                              />
                            </FormControl>
                            <FormControl
                              className={classes.form}
                              fullWidth={true}
                            >
                              <InputLabel>Years of Experience</InputLabel>
                              <Input
                                id="yearsOfExperience"
                                type="yearsOfExperience"
                                value={this.state.yearsOfExperience}
                                onChange={this.handleChange(
                                  "yearsOfExperience"
                                )}
                                endAdornment={
                                  <InputAdornment position="end">
                                    <DateRange
                                      className={classes.inputIconsColor}
                                    />
                                  </InputAdornment>
                                }
                              />
                            </FormControl>
                            <FormControl
                              className={classes.form}
                              fullWidth={true}
                            >
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
                            <FormControl
                              className={classes.form}
                              fullWidth={true}
                            >
                              <InputLabel>Skills</InputLabel>
                              <Input
                                id="skills"
                                type="skills"
                                value={this.state.skills}
                                onChange={this.handleChangeMultiple("skills")}
                                disabled={true}
                                endAdornment={
                                  <InputAdornment position="end">
                                    <Work className={classes.inputIconsColor} />
                                  </InputAdornment>
                                }
                              />
                            </FormControl>
                            <FormControl
                              className={classes.form}
                              fullWidth={true}
                            >
                              <InputLabel>Interests</InputLabel>
                              <Input
                                id="interests"
                                type="interests"
                                value={this.state.interests}
                                onChange={this.handleChangeMultiple(
                                  "interests"
                                )}
                                endAdornment={
                                  <InputAdornment position="end">
                                    <Favorite
                                      className={classes.inputIconsColor}
                                    />
                                  </InputAdornment>
                                }
                              />
                            </FormControl>
                            <FormControl
                              className={classes.form}
                              fullWidth={true}
                            >
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
                            <FormControl
                              className={classes.form}
                              fullWidth={true}
                            >
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
                            <Button
                              simple
                              color="info"
                              onClick={() => this.toggle("dialog")}
                            >
                              Close
                            </Button>
                          </DialogContent>
                        </Dialog>
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
export default withStyles(productStyle)(SectionConsultancyInformation);
