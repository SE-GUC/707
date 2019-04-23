import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import Timeline from "@material-ui/icons/Timeline";
import Dashboard from "@material-ui/icons/Dashboard";
import Work from "@material-ui/icons/Work";
import Subject from "@material-ui/icons/Subject";
import Tab from "@material-ui/icons/Tab";
import TurnedIn from "@material-ui/icons/TurnedIn";
import ViewQuilt from "@material-ui/icons/ViewQuilt";
import ViewModule from "@material-ui/icons/ViewModule";
import ViewList from "@material-ui/icons/ViewList";
import ViewHeadline from "@material-ui/icons/ViewHeadline";
import ViewColumn from "@material-ui/icons/ViewColumn";
// import ViewCarousel from "@material-ui/icons/ViewCarousel";
// import ViewAgenda from "@material-ui/icons/ViewAgenda";
// import ViewStream from "@material-ui/icons/ViewStream";
// import VerticalSplit from "@material-ui/icons/VerticalSplit";
// import ViewDay from "@material-ui/icons/ViewDay";
// import ViewWeek from "@material-ui/icons/ViewWeek";
// react components for routing our app without refresh
import { Link } from "react-router-dom";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import NavPills from "components/NavPills/NavPills.jsx";
import profilePageStyle from "assets/jss/material-kit-react/views/profilePage.jsx";
class SectionConsultancyWorkflow extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={8} className={classes.navWrapper}>
            <NavPills
              alignCenter
              color="info"
              tabs={[
                {
                  tabButton: "TAB NAME",
                  tabIcon: Timeline,
                  tabContent: <GridContainer justify="center" />
                },
                {
                  tabButton: "TAB NAME",
                  tabIcon: Dashboard,
                  tabContent: <GridContainer justify="center" />
                },
                {
                  tabButton: "TAB NAME",
                  tabIcon: Work,
                  tabContent: <GridContainer justify="center" />
                },
                {
                  tabButton: "TAB NAME",
                  tabIcon: Subject,
                  tabContent: <GridContainer justify="center" />
                },
                {
                  tabButton: "TAB NAME",
                  tabIcon: Tab,
                  tabContent: <GridContainer justify="center" />
                },
                {
                  tabButton: "TAB NAME",
                  tabIcon: TurnedIn,
                  tabContent: <GridContainer justify="center" />
                },
                {
                  tabButton: "TAB NAME",
                  tabIcon: ViewQuilt,
                  tabContent: <GridContainer justify="center" />
                },
                {
                  tabButton: "TAB NAME",
                  tabIcon: ViewModule,
                  tabContent: <GridContainer justify="center" />
                },
                {
                  tabButton: "TAB NAME",
                  tabIcon: ViewList,
                  tabContent: <GridContainer justify="center" />
                },
                {
                  tabButton: "TAB NAME",
                  tabIcon: ViewHeadline,
                  tabContent: <GridContainer justify="center" />
                },
                {
                  tabButton: "TAB NAME",
                  tabIcon: ViewColumn,
                  tabContent: <GridContainer justify="center" />
                }
              ]}
            />
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}
export default withStyles(profilePageStyle)(SectionConsultancyWorkflow);
