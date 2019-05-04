import React from "react";
import axios from "axios";
import Cookies from "universal-cookie";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// react components for routing our app without refresh
import { Link } from "react-router-dom";
// core components
import Header from "components/Header/Header.jsx";
import Footer from "components/Footer/Footer.jsx";
import Button from "components/CustomButtons/Button.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Modal from "@material-ui/core/Modal";
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import Parallax from "components/Parallax/Parallax.jsx";
import profile from "assets/img/faces/christian.jpg";
import SectionAdminInformation from "./Sections/SectionAdminInformation.jsx";
import SectionCandidateInformation from "./Sections/SectionCandidateInformation.jsx";
import SectionConsultancyInformation from "./Sections/SectionConsultancyInformation.jsx";
import SectionPartnerInformation from "./Sections/SectionPartnerInformation.jsx";
import SectionWorkflow from "./Sections/SectionWorkflow.jsx";
import profilePageStyle from "assets/jss/material-kit-react/views/profilePage.jsx";

class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flag: false,
      name: "",
      usertype: "",
      image: {},
      url: ""
    };
  }
  toggleModal = state => {
    this.setState({
      [state]: !this.state[state]
    });
  };
  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
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
      .then(res => {
        this.setState({
          name: res.data.data.name,
          usertype:
            res.data.data.usertype === undefined
              ? "Admin"
              : res.data.data.usertype
        });
      });
  }
  render() {
    const { classes, ...rest } = this.props;
    const imageClasses = classNames(
      classes.imgRaised,
      classes.imgRoundedCircle,
      classes.imgFluid
    );
    const cookies = new Cookies();
    const usertype = cookies.get("usertype");
    return (
      <div>
        <Link to={"/"} style={{ color: "#FFF" }}>
          <Header
            color="transparent"
            brand="Home Page"
            rightLinks={<HeaderLinks />}
            fixed
            changeColorOnScroll={{
              height: 400,
              color: "dark"
            }}
            {...rest}
          />
        </Link>
        <Parallax small filter image={require("assets/img/profile-bg.jpg")} />
        <div className={classNames(classes.main, classes.mainRaised)}>
          <div>
            <div className={classes.container}>
              <GridContainer justify="center">
                <GridItem xs={12} sm={12} md={6}>
                  <div className={classes.profile}>
                    <div>
                      <img
                        src={profile}
                        alt="..."
                        className={imageClasses}
                        onClick={() => this.toggleModal("flag")}
                      />
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
                                    <h2>Profile Photo</h2>
                                  </div>
                                </CardHeader>
                                <CardBody>
                                  <FormControl
                                    className={classes.form}
                                    fullWidth={true}
                                  >
                                    <InputLabel>URL</InputLabel>
                                    <Input
                                      id="url"
                                      type="url"
                                      value={this.state.url}
                                      onChange={this.handleChange("url")}
                                    />
                                  </FormControl>
                                </CardBody>
                                <CardFooter className={classes.cardFooter}>
                                  <Button
                                    color="info"
                                    size="lg"
                                    onClick={() => this.onUpdate()}
                                  >
                                    Update photo
                                  </Button>
                                  <Button
                                    color="danger"
                                    size="lg"
                                    onClick={() => this.onDelete()}
                                  >
                                    Delete photo
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
                    </div>
                    <div className={classes.name}>
                      <h3 className={classes.title}>{this.state.name}</h3>
                      <h6>{this.state.usertype}</h6>
                      <Button
                        justIcon
                        link
                        href="https://twitter.com"
                        className={classes.margin5}
                      >
                        <i className={"fab fa-twitter"} />
                      </Button>
                      <Button
                        justIcon
                        link
                        href="https://instaram.com"
                        className={classes.margin5}
                      >
                        <i className={"fab fa-instagram"} />
                      </Button>
                      <Button
                        justIcon
                        link
                        href="https://facebook.com"
                        className={classes.margin5}
                      >
                        <i className={"fab fa-facebook"} />
                      </Button>
                    </div>
                  </div>
                </GridItem>
              </GridContainer>
              {usertype === "candidate" ? (
                <SectionCandidateInformation />
              ) : usertype === "consultancy" ? (
                <SectionConsultancyInformation />
              ) : usertype === "partner" ? (
                <SectionPartnerInformation />
              ) : (
                <SectionAdminInformation />
              )}
              <SectionWorkflow />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
export default withStyles(profilePageStyle)(ProfilePage);
