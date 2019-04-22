import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// react components for routing our app without refresh
import { Link } from "react-router-dom";
// @material-ui/icons
// core components
import Header from "components/Header/Header.jsx";
import Footer from "components/Footer/Footer.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Parallax from "components/Parallax/Parallax.jsx";
// sections for this page
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import SectionProduct from "./Sections/SectionProduct.jsx";
import SectionPartner from "./Sections/SectionPartner.jsx";
import SectionTeam from "./Sections/SectionTeam.jsx";
import SectionContact from "./Sections/SectionContact.jsx";
import componentsStyle from "assets/jss/material-kit-react/views/components.jsx";

class Components extends React.Component {
  render() {
    const { classes, ...rest } = this.props;
    return (
      <div>
        <Link to={"/"} style={{ color: "#FFF" }}>
          <Header
            brand={"Home Page"}
            rightLinks={<HeaderLinks />}
            fixed
            color="transparent"
            changeColorOnScroll={{
              height: 400,
              color: "dark"
            }}
            {...rest}
          />
        </Link>
        <Parallax image={require("assets/img/bg4.jpg")}>
          <div className={classes.container}>
            <GridContainer>
              <GridItem>
                <div className={classes.brand}>
                  <h1 className={classes.title}>LirtenHub</h1>
                  <h3 className={classes.subtitle}>
                    A new free-lancing website technology.
                  </h3>
                </div>
              </GridItem>
            </GridContainer>
          </div>
        </Parallax>
        <div className={classNames(classes.main, classes.mainRaised)}>
          <SectionProduct />
          <SectionPartner />
          <SectionTeam />
          <SectionContact />
        </div>
        <Footer />
      </div>
    );
  }
}

export default withStyles(componentsStyle)(Components);
