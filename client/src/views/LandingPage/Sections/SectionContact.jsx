import React from "react";
import axios from "axios";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import Subject from "@material-ui/icons/Subject";
import Description from "@material-ui/icons/Description";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import InputLabel from "@material-ui/core/InputLabel";
import workStyle from "assets/jss/material-kit-react/views/landingPageSections/workStyle.jsx";
class SectionContact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subject: "",
      email: "",
      content: ""
    };
  }
  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };
  onSubmit() {
    if (
      this.state.subject === "" ||
      this.state.email === "" ||
      this.state.content === ""
    ) {
      alert("Please fill-in all fields");
      return;
    }
    axios
      .post("http://localhost:5000/api/emails/contactUS", {
        subject: this.state.subject,
        content: this.state.content,
        senderEmail: this.state.email
      })
      .then(
        this.setState({
          subject: "",
          email: "",
          content: ""
        })
      );
    window.location.replace("/");
    alert("WE ARE HAPPY SERVING YOU!");
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.section}>
        <GridContainer justify="center">
          <GridItem cs={12} sm={12} md={8}>
            <h2 className={classes.title}>Contact us</h2>
            <form className={classes.form}>
              <GridContainer>
                <GridItem xs={12} sm={20} md={6}>
                  <FormControl className={classes.form} fullWidth={true}>
                    <InputLabel>Subject...</InputLabel>
                    <Input
                      id="subject"
                      type="subject"
                      value={this.state.subject}
                      onChange={this.handleChange("subject")}
                      endAdornment={
                        <InputAdornment position="end">
                          <Subject className={classes.inputIconsColor} />
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <FormControl className={classes.form} fullWidth={true}>
                    <InputLabel>
                      Your email...
                    </InputLabel>
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
                </GridItem>
                <FormControl className={classes.form} fullWidth={true}>
                  <InputLabel>Content...</InputLabel>
                  <Input
                    id="content"
                    type="content"
                    value={this.state.content}
                    onChange={this.handleChange("content")}
                    endAdornment={
                      <InputAdornment position="end">
                        <Description className={classes.inputIconsColor} />
                      </InputAdornment>
                    }
                  />
                </FormControl>
                <GridContainer justify="center">
                  <GridItem
                    xs={12}
                    sm={12}
                    md={4}
                    className={classes.textCenter}
                  >
                    <Button
                      size="lg"
                      color="info"
                      onClick={() => this.onSubmit()}
                    >
                      Send Message
                    </Button>
                  </GridItem>
                </GridContainer>
              </GridContainer>
            </form>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}
export default withStyles(workStyle)(SectionContact);
