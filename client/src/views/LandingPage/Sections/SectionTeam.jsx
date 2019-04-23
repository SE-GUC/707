import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import teamStyle from "assets/jss/material-kit-react/views/landingPageSections/teamStyle.jsx";
class SectionTeam extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.section}>
        <h2 className={classes.title}>Work with us!</h2>
        <div>
          <GridContainer>
            <GridItem xs={12} sm={12} md={4}>
              <Card plain>
                <h4 className={classes.cardTitle}>Task Manager</h4>
                <CardBody>
                  <p className={classes.description}>
                    You can write here details about task managers role at the
                    company and to give more details about what they do.
                  </p>
                </CardBody>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <Card plain>
                <h4 className={classes.cardTitle}>Candidate</h4>
                <CardBody>
                  <p className={classes.description}>
                    You can write here details about free-lancers role at the
                    website and to give more details about what they do.
                  </p>
                </CardBody>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <Card plain>
                <h4 className={classes.cardTitle}>Consultancy</h4>
                <CardBody>
                  <p className={classes.description}>
                    You can write here details about consultancies role at the
                    website and to give more details about what they do.
                  </p>
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    );
  }
}
export default withStyles(teamStyle)(SectionTeam);
