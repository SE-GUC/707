import React from "react";
import axios from "axios";
import Cookies from "universal-cookie";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import productStyle from "assets/jss/material-kit-react/views/landingPageSections/productStyle.jsx";
// @material-ui/icons
import People from "@material-ui/icons/People";
import Description from "@material-ui/icons/Description";
import Work from "@material-ui/icons/Work";
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
import InputAdornment from "@material-ui/core/InputAdornment";
import Modal from "@material-ui/core/Modal";
class SectionPartner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flag: false,
      name: "",
      description: "",
      requiredSkills: ""
    };
  }
  toggleModal = state => {
    const cookies = new Cookies();
    const token = cookies.get("token");
    const usertype = cookies.get("usertype");
    if (token !== "null") {
      if (usertype !== "partner") {
        alert("Only partners are allowed to submit new projects!");
        window.location.replace("/");
      } else {
        this.setState({
          [state]: !this.state[state]
        });
      }
    } else {
      alert("You need to register first!");
      window.location.replace("/register-page");
    }
  };
  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };
  handleChangeMultiple = prop => event => {
    this.setState({ [prop]: event.target.value.split(",") });
  };
  onSubmit() {
    const cookies = new Cookies();
    const token = cookies.get("token");
    axios
      .post(
        "http://localhost:5000/api/partners/project",
        {
          name: this.state.name,
          description: this.state.description,
          requiredSkills: this.state.requiredSkills
        },
        {
          headers: {
            Authorization: token
          }
        }
      )
      .then(
        this.setState({
          name: "",
          description: "",
          requiredSkills: ""
        })
      );
    window.location.replace("/");
    alert("You have submitted the project successfully!");
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.sections}>
        <div id="project">
          <GridContainer justify="center">
            <h2 className={classes.title}>Try it out right now!</h2>
          </GridContainer>
          <GridContainer justify="center">
            <Button
              color="info"
              size="lg"
              onClick={() => this.toggleModal("flag")}
            >
              Submit your first project
            </Button>
            <Modal open={this.state.flag}>
              <GridContainer justify="center">
                <GridItem xs={12} sm={12} md={4}>
                  <Card>
                    <form className={classes.form}>
                      <CardHeader color="info" className={classes.cardHeader}>
                        <div className={classes.title}>
                          <h2>Project information</h2>
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
                          <InputLabel>Description</InputLabel>
                          <Input
                            id="description"
                            type="description"
                            value={this.state.description}
                            onChange={this.handleChange("description")}
                            endAdornment={
                              <InputAdornment position="end">
                                <Description
                                  className={classes.inputIconsColor}
                                />
                              </InputAdornment>
                            }
                          />
                        </FormControl>
                        <FormControl className={classes.form} fullWidth={true}>
                          <InputLabel>Required Skills</InputLabel>
                          <Input
                            id="requiredSkills"
                            type="requiredSkills"
                            value={this.state.requiredSkills}
                            onChange={this.handleChangeMultiple(
                              "requiredSkills"
                            )}
                            endAdornment={
                              <InputAdornment position="end">
                                <Work className={classes.inputIconsColor} />
                              </InputAdornment>
                            }
                          />
                        </FormControl>
                      </CardBody>
                      <CardFooter className={classes.cardFooter}>
                        <Button
                          color="info"
                          size="lg"
                          onClick={() => this.onSubmit()}
                        >
                          Submit
                        </Button>
                        <Button
                          simple
                          color="info"
                          size="lg"
                          onClick={() => this.toggleModal("flag")}
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
export default withStyles(productStyle)(SectionPartner);
