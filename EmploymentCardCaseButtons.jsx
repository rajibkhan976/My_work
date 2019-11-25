import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import translate from "redux-polyglot/translate";
import * as caseTypes from "./const";
import * as employmentCardActions from "../../Actions/Employment/employmentCardActions";

class EmploymentCardCaseButtons extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            editEmploymentButtons: [],
            newEmploymentButtons: [],
            functionalButtons: []
        };

        this.getCaseType = this.getCaseType.bind(this);

        this.processCaseButtons = this.processCaseButtons.bind(this);

        this.sortCaseButtons = this.sortCaseButtons.bind(this);
    }

    componentDidMount() {
        if (this.props.caseButtons.length !== 0) {
            this.props.caseButtons.map((value, index) => {
                if (value.caseDefinitionType === 1 && value.isPreProcessUrl) {
                    this.setState({
                        newEmploymentButtons: this.props.caseButtons.filter((value, index) => { return (value.caseDefinitionType === 1 && value.isPreProcessUrl); })
                    });
                } else if (value.caseDefinitionType === 2 && !value.isPreProcessUrl) {
                    this.setState({
                        editEmploymentButtons: this.props.caseButtons.filter((value, index) => { return (value.caseDefinitionType === 2 && !value.isPreProcessUrl); })
                    });
                } else {
                    this.setState({
                        functionalButtons: this.props.caseButtons.filter((value, index) => { return (value.caseDefinitionType !== 1 && value.caseDefinitionType !== 2); })
                    });
                }
            });
        }
    }

    getCaseType(caseTypeIndex) {
        if (this.props.caseButtons.length !== 0) {
            for (var c = 0; c < caseTypes.CaseType.length; c++) {
                if (caseTypes.CaseType[c].caseTypeKey !== caseTypeIndex) {
                    continue;
                } else {
                    return caseTypes.CaseType[c].caseTypeValue;
                }
            }
        }
    }

    processCaseButtons(caseButtons) {
        if (caseButtons.length !== 0) {
            let processedCaseButtons = [];
            let beginIndex = 0;
            let endIndex = 0;
            let numOfButtons = caseButtons.length;
            let columnNumber = 3;
            for (var i = 0; i < caseTypes.caseButtonColumns.length; i++) {
                let division = numOfButtons / columnNumber;
                endIndex += Math.ceil(division);
                processedCaseButtons.push(this.sortCaseButtons(caseButtons).slice(beginIndex, endIndex));
                beginIndex += Math.ceil(division);
                numOfButtons -= Math.ceil(division);
                columnNumber--;
            }
            return processedCaseButtons;
        }
    }

    sortCaseButtons(caseButtons) {
        return caseButtons.sort(function (firstElement, secondElement) {
                var descriptionOne = firstElement.description.toUpperCase();
                var descriptionTwo = secondElement.description.toUpperCase();

                if (descriptionOne < descriptionTwo) {
                        return -1;
                    }

                if (descriptionOne > descriptionTwo) {
                        return 1;
                    }

                return 0;
        })
    }

    render() {
        console.log(this.state.editEmploymentButtons);
        console.log(this.state.newEmploymentButtons);
        console.log(this.sortCaseButtons(this.state.newEmploymentButtons));
        return (
            <div>
                <div className="casebuttons-sec-title">Nytt ärende för {this.props.employeeName}</div>
                <h5>Ändra anställning</h5>
                <div className="case-buttons casemenu">
                {(this.state.editEmploymentButtons.length !== 0) ?
                    caseTypes.caseButtonColumns.map((caseButtonColumnValue, caseButtonColumnIndex) => {
                        return this.processCaseButtons(this.state.editEmploymentButtons).map((editEmploymentCaseButtons, processedCaseButtonIndex) => {
                            if (caseButtonColumnIndex === processedCaseButtonIndex) {
                                return <div className={`${caseButtonColumnValue.columnClass} column-dialog`} key={caseButtonColumnIndex}>
                                            {
                                                editEmploymentCaseButtons.map((caseButtons, caseButtonsIndex) => {
                                                    return <a className="button casemenu-button create-case button-card-view" href={`${caseButtons.url}/${this.props.employmentId}?caseDefinitionId=${caseButtons.id}`} key={caseButtonsIndex} data-select-casegroup-url={`/Employment/Employment/GetEmploymentGroups/${this.props.employmentId}?caseType=${this.getCaseType(caseButtons.caseType)}`} >
                                                                <span className="casebutton-text">
                                                                    <i className="fa fa-briefcase"></i>
                                                                    &nbsp;{caseButtons.description}
                                                                </span>
                                                            </a>;
                                                })
                                            }
                                </div>;
                            }
                        })
                    })
                    :
                    null
                }
                </div>
                <h5>Ny anställning</h5>
                <div className="case-buttons casemenu">
                {(this.state.newEmploymentButtons.length !== 0) ? 
                    caseTypes.caseButtonColumns.map((caseButtonColumnValue, caseButtonColumnIndex) => {
                        return this.processCaseButtons(this.state.newEmploymentButtons).map((newEmploymentCaseButtons, processedCaseButtonIndex) => {
                            if (caseButtonColumnIndex === processedCaseButtonIndex) {
                                return <div className={`${caseButtonColumnValue.columnClass} column-dialog`} key={caseButtonColumnIndex}>
                                    {
                                        newEmploymentCaseButtons.map((caseButtons, caseButtonsIndex) => {
                                            return <a className="button casemenu-button create-case button-card-view" href={`${caseButtons.url}/${this.props.employmentId}?caseDefinitionId=${caseButtons.id}`} key={caseButtonsIndex} data-lightbox data-lightboxwidth="910px" data-createnewemployment="" >
                                                        <span className="casebutton-text">
                                                            <i className="fa fa-briefcase"></i>
                                                            &nbsp;{caseButtons.description}
                                                        </span>
                                                   </a>;
                                        })
                                    }
                                </div>;
                            }
                        })
                    })
                    :
                    null
                }
                </div>
            </div>
        );
    }
}

export default translate(EmploymentCardCaseButtons);