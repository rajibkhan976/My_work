import React from "react";
import { connect } from "react-redux";
import translate from "redux-polyglot/translate";
import {
    filterEmployments,
    getEmployments,
    getCaseButtons,
    getSalaryInfo,
    resetFilter
} from "../../Actions/Employment/employmentCardActions";
import EmploymentCardMain from "./EmploymentCardMain";
import debounce from "lodash/debounce";
import PropTypes from "prop-types";
import Toggle from "react-toggle";

class EmploymentCardPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cardIndex: [],
            poppingIndex: [],
            text: "",
            checked: false,
            cardLimit: 10,
            filteredCardLimit: 10
        };

        this.loadMore = this.loadMore.bind(this);
        this.loadMoreFiltered = this.loadMoreFiltered.bind(this);
        this.expandCard = this.expandCard.bind(this);
        this.toggleCaseButtonsPopup = this.toggleCaseButtonsPopup.bind(this);
        this.closeCaseButtonsPopup = this.closeCaseButtonsPopup.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.sendTextChange = debounce(this.sendTextChange, 500);
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
        this.handleClear = this.handleClear.bind(this);
        this.showCards = this.showCards.bind(this);
        this.showFilteredCards = this.showFilteredCards.bind(this);
        this.setListView = this.setListView.bind(this);
    }

    componentDidMount() {
        this.props.getEmployments();
        const goTopButton = document.getElementsByClassName("go-to-top")[0];
        const push = document.getElementsByClassName("push")[0];
        window.addEventListener("scroll", () => {
            if (window.scrollY + window.innerHeight >= document.body.scrollHeight) {
                if (this.state.text != "" && this.props.filteredEmployments.length > this.state.filteredCardLimit) {
                    this.loadMoreFiltered();
                }
                if (this.state.text === "" && this.props.employments.length > this.state.cardLimit) {
                    this.loadMore();
                }
            }

            if (window.scrollY >= 50) {
                goTopButton.classList.add("show");
                goTopButton.classList.remove("hide");
            } else {
                goTopButton.classList.add("hide");
                goTopButton.classList.remove("show");
            }
        });

        goTopButton.addEventListener("click", () => {
            scrollToTop(400);
        });

        const scrollToTop = duration => {
            var step = -window.scrollY / (duration / 15),
                interval = setInterval(() => {
                    window.scrollY != 0 ? window.scrollBy(0, step) : clearInterval(interval);
                }, 15);
        };

        push.appendChild(document.querySelectorAll("div#newEmployment")[0]);
        push.appendChild(document.getElementsByClassName("button-group")[0]);
    }

    componentWillUnmount() {
        window.removeEventListener("scroll");
        document.getElementsByClassName("go-to-top")[0].removeEventListener("click");
    }

    loadMore() {
        window.loader.show();
        this.props.resetFilter();
        this.setState({ cardLimit: this.state.cardLimit + 10 });
        window.loader.hide();
    }

    loadMoreFiltered() {
        window.loader.show();
        this.setState({ filteredCardLimit: this.state.filteredCardLimit + 10 });
        window.loader.hide();
    }

    expandCard(employmentIndex, employmentId, event) {
        event.stopPropagation();
        if (!this.state.cardIndex.includes(employmentIndex)) {
            this.setState({
                cardIndex: [employmentIndex]
            });
            this.props.getSalaryInfo(employmentId);
        } else {
            this.setState({
                cardIndex: this.state.cardIndex.filter(keepIndex => {
                    return keepIndex !== employmentIndex;
                })
            });
        }
    }

    toggleCaseButtonsPopup(poppingIndex, employmentId, fullName, event) {
        event.stopPropagation();
        if (!this.state.poppingIndex.includes(poppingIndex)) {
            this.setState({
                poppingIndex: [poppingIndex]
            });
            this.props.getCaseButtons(employmentId, fullName);
        } else {
            this.setState({
                poppingIndex: this.state.poppingIndex.filter(keepIndex => {
                    return keepIndex !== poppingIndex;
                })
            });
        }
    }

    closeCaseButtonsPopup(popupIndex) {
        if (this.state.poppingIndex.includes(popupIndex)) {
            this.setState({
                poppingIndex: this.state.poppingIndex.filter(keepIndex => {
                    return keepIndex !== popupIndex;
                })
            });
        }
    }

    handleTextChange(e) {
        this.setState({ text: e.target.value });
        this.sendTextChange(e.target.value.trim());
    }

    sendTextChange(text) {
        window.loader.show();
        this.props.resetFilter();
        this.setState({ cardIndex: [] });
        this.setState({ cardLimit: 10, filteredCardLimit: 10 });
        this.props.filterEmployments(text);
    }

    handleCheckboxChange() {
        this.props.resetFilter();
        this.setState(prevState => ({ checked: !prevState.checked }));
        this.props.getEmployments(!this.state.checked, this.state.text);
    }

    handleClear() {
        this.props.resetFilter();
        this.setState({ cardIndex: [] });
        this.setState({ text: "" });
    }

    setListView() {
        window.loader.show();
        document.cookie = "showCardView=" + false + ";expires=01 Jan 2030 00:00:00";
        var redirectLocation = window.location.href.split("?")[0];
        window.location.href = redirectLocation;
    }

    showCards() {
        const { employments } = this.props;
        return employments.slice(0, this.state.cardLimit).map((employments, index) => {
            return (
                <div key={index}>
                    <EmploymentCardMain
                        employments={employments}
                        employmentsIndex={index}
                        expandCard={this.expandCard}
                        cardIndex={this.state.cardIndex}
                        toggleCaseButtonsPopup={this.toggleCaseButtonsPopup}
                        poppingIndex={this.state.poppingIndex}
                        caseButtons={this.props.caseButtons}
                        closeCaseButtonsPopup={this.closeCaseButtonsPopup}
                        salaryInfo={this.props.salaryInfo}
                    />
                </div>
            );
        });
    }

    showFilteredCards() {
        const { filteredEmployments } = this.props;
        return filteredEmployments.slice(0, this.state.filteredCardLimit).map((filteredEmployments, index) => {
            return (
                <div key={index}>
                    <EmploymentCardMain
                        employments={filteredEmployments}
                        employmentsIndex={index}
                        expandCard={this.expandCard}
                        cardIndex={this.state.cardIndex}
                        toggleCaseButtonsPopup={this.toggleCaseButtonsPopup}
                        poppingIndex={this.state.poppingIndex}
                        caseButtons={this.props.caseButtons}
                        closeCaseButtonsPopup={this.closeCaseButtonsPopup}
                        salaryInfo={this.props.salaryInfo}
                    />
                </div>
            );
        });
    }

    render() {
        const { p } = this.props;
        return (
            <div className="container employment-card-view">
                <div className="row">
                    <div className="form-group search-group">
                        <input
                            placeholder={p.t("employment_employmentcard_placeholder")}
                            className="form-control"
                            id="form_control"
                            type="search"
                            describedby="searchBlock"
                            onChange={this.handleTextChange}
                            value={this.state.text || ""}
                            autoComplete="off"
                        />
                        <span className="search-icon" />
                        {this.state.text != "" ? <span className="fa fa-times" onClick={() => this.handleClear()} /> : null}
                        <div className="push">
                            <label style={{ marginRight: "20px" }}>
                                <div className="react-toggle-wrapper">
                                    <Toggle
                                        className="custom-toggle"
                                        defaultChecked={this.state.checked}
                                        onChange={this.handleCheckboxChange}
                                        icons={false}
                                    />
                                    <span>{p.t("employment_employmentcard_labelone")}</span>
                                </div>
                            </label>
                            <label style={{ marginRight: "15px" }}>
                                <div className="react-toggle-wrapper">
                                    <span style={{ marginRight: "5px" }}>{p.t("employment_employmentcard_labeltwo")}</span>
                                    <Toggle
                                        id="custom-toggle"
                                        className="custom-toggle"
                                        defaultChecked={true}
                                        onChange={this.setListView}
                                        icons={false}
                                    />
                                    <span>{p.t("employment_employmentcard_labelthree")}</span>
                                </div>
                            </label>
                        </div>
                    </div>
                    {this.state.text === "" ? this.showCards() : this.showFilteredCards()}
                    {this.state.text != "" && this.props.noResult ? (
                        <div className="alert alert-info" role="alert">
                            <div>
                                <span className="vismaicon vismaicon-sm vismaicon-filled vismaicon-info" aria-hidden="true" />
                                {p.t("employment_employmentcard_resulttext")}
                            </div>
                        </div>
                    ) : null}
                </div>
                <a className="go-to-top">
                    <i className="fa fa-chevron-up" />
                </a>
            </div>
        );
    }
}

EmploymentCardPage.propTypes = {
    getEmployments: PropTypes.func,
    getCaseButtons: PropTypes.func,
    getSalaryInfo: PropTypes.func,
    filterEmployments: PropTypes.func,
    resetFilter: PropTypes.func,
    employments: PropTypes.array,
    filteredEmployments: PropTypes.array,
    caseButtons: PropTypes.array,
    salaryInfo: PropTypes.object,
    noResult: PropTypes.bool
};

const mapStateToProps = state => ({
    employments: state.employment.employments,
    filteredEmployments: state.employment.filteredEmployments,
    caseButtons: state.employment.caseButtons,
    salaryInfo: state.employment.salaryInfo,
    noResult: state.employment.noResult
});

const mapDispatchToProps = {
    getEmployments,
    filterEmployments,
    resetFilter,
    getCaseButtons,
    getSalaryInfo
};

export default connect(mapStateToProps, mapDispatchToProps)(translate(EmploymentCardPage));
