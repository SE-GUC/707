import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Modal from "@material-ui/core/Modal";
import productStyle from "assets/jss/material-kit-react/views/landingPageSections/productStyle.jsx";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
class SectionPartner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flag: false
    };
  }
  toggleModal = state => {
    this.setState({
      [state]: !this.state[state]
    });
  };
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
                      <CardHeader
                        color="info"
                        className={classes.cardHeader}
                      >
                        <div className={classes.title}>
                          <h2>Project information</h2>
                        </div>
                      </CardHeader>
                      <CardBody>
                        <CustomInput
                          id="regular"
                          inputProps={{
                            placeholder: "Name"
                          }}
                          formControlProps={{
                            fullWidth: true
                          }}
                        />
                        <CustomInput
                          id="regular"
                          inputProps={{
                            placeholder: "Description"
                          }}
                          formControlProps={{
                            fullWidth: true
                          }}
                        />
                        <CustomInput
                          id="regular"
                          inputProps={{
                            placeholder: "Required skills"
                          }}
                          formControlProps={{
                            fullWidth: true
                          }}
                        />
                      </CardBody>
                      <CardFooter className={classes.cardFooter}>
                        <Button color="info" size="lg">
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
