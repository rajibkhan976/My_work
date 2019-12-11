import React from "react";
import translate from "redux-polyglot/translate";
import * as caseTypes from "./const";

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
                        newEmploymentButtons: this.props.caseButtons.filter((value, index) => {
                            return value.caseDefinitionType === 1 && value.isPreProcessUrl;
                        })
                    });
                } else if (value.caseDefinitionType === 2 && !value.isPreProcessUrl) {
                    this.setState({
                        editEmploymentButtons: this.props.caseButtons.filter((value, index) => {
                            return value.caseDefinitionType === 2 && !value.isPreProcessUrl;
                        })
                    });
                } else {
                    this.setState({
                        functionalButtons: this.props.caseButtons.filter((value, index) => {
                            return value.caseDefinitionType === 0 && value.isPreProcessUrl;
                        })
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
        return caseButtons.sort(function(firstElement, secondElement) {
            var descriptionOne = firstElement.description.toUpperCase();
            var descriptionTwo = secondElement.description.toUpperCase();

            if (descriptionOne < descriptionTwo) {
                return -1;
            }

            if (descriptionOne > descriptionTwo) {
                return 1;
            }

            return 0;
        });
    }

    render() {
        const { p } = this.props;
        return (
            <div className="createcase-dialog">
                {this.state.editEmploymentButtons.length !== 0 ? (
                    <h5>{p.t("employment_employmentcard_changeemployment")}</h5>
                ) : null}
                <div className="case-buttons casemenu row">
                    {this.state.editEmploymentButtons.length !== 0
                        ? caseTypes.caseButtonColumns.map((caseButtonColumnValue, caseButtonColumnIndex) => {
                              return this.processCaseButtons(this.state.editEmploymentButtons).map(
                                  (editEmploymentCaseButtons, processedCaseButtonIndex) => {
                                      if (caseButtonColumnIndex === processedCaseButtonIndex) {
                                          return (
                                              <div
                                                  className={`${caseButtonColumnValue.columnClass} column-dialog col-md-12 col-lg-4`}
                                                  key={caseButtonColumnIndex}
                                              >
                                                  {editEmploymentCaseButtons.map((caseButtons, caseButtonsIndex) => {
                                                      return (
                                                          <a
                                                              className="button casemenu-button create-case button-card-view"
                                                              href={`${caseButtons.url}/${this.props.employmentId}?caseDefinitionId=${caseButtons.id}`}
                                                              key={caseButtonsIndex}
                                                              data-select-casegroup-url={`/Employment/Employment/GetEmploymentGroups/${
                                                                  this.props.employmentId
                                                              }?caseType=${this.getCaseType(caseButtons.caseType)}`}
                                                          >
                                                              <span className="casebutton-text">
                                                                  <i className="fa fa-briefcase"></i>
                                                                  &nbsp;{caseButtons.description}
                                                              </span>
                                                          </a>
                                                      );
                                                  })}
                                              </div>
                                          );
                                      }
                                  }
                              );
                          })
                        : null}
                </div>
                {this.state.newEmploymentButtons.length !== 0 ? <h5>{p.t("employment_employmentcard_newemployment")}</h5> : null}
                <div className="case-buttons casemenu row">
                    {this.state.newEmploymentButtons.length !== 0
                        ? caseTypes.caseButtonColumns.map((caseButtonColumnValue, caseButtonColumnIndex) => {
                              return this.processCaseButtons(this.state.newEmploymentButtons).map(
                                  (newEmploymentCaseButtons, processedCaseButtonIndex) => {
                                      if (caseButtonColumnIndex === processedCaseButtonIndex) {
                                          return (
                                              <div
                                                  className={`${caseButtonColumnValue.columnClass} column-dialog col-md-12 col-lg-4`}
                                                  key={caseButtonColumnIndex}
                                              >
                                                  {newEmploymentCaseButtons.map((caseButtons, caseButtonsIndex) => {
                                                      return (
                                                          <a
                                                              className="button casemenu-button create-case button-card-view"
                                                              href={`${caseButtons.url}/${this.props.employmentId}?caseDefinitionId=${caseButtons.id}`}
                                                              onClick={e =>
                                                                  this.props.closeCaseButtonsPopup(this.props.employmentId, e)
                                                              }
                                                              key={caseButtonsIndex}
                                                              data-lightbox
                                                              data-lightboxwidth="910px"
                                                              data-createnewemployment=""
                                                          >
                                                              <span className="casebutton-text">
                                                                  <i className="fa fa-briefcase"></i>
                                                                  &nbsp;{caseButtons.description}
                                                              </span>
                                                          </a>
                                                      );
                                                  })}
                                              </div>
                                          );
                                      }
                                  }
                              );
                          })
                        : null}
                </div>
                {this.state.functionalButtons.length !== 0 ? <h5>{p.t("employment_employmentcard_functionalbuttons")}</h5> : null}
                <div className="case-buttons casemenu row">
                    {this.state.functionalButtons.length !== 0
                        ? caseTypes.caseButtonColumns.map((caseButtonColumnValue, caseButtonColumnIndex) => {
                              return this.processCaseButtons(this.state.functionalButtons).map(
                                  (functionalCaseButtons, processedCaseButtonIndex) => {
                                      if (caseButtonColumnIndex === processedCaseButtonIndex) {
                                          return (
                                              <div
                                                  className={`${caseButtonColumnValue.columnClass} column-dialog col-md-12 col-lg-4`}
                                                  key={caseButtonColumnIndex}
                                              >
                                                  {functionalCaseButtons.map((caseButtons, caseButtonsIndex) => {
                                                      return (
                                                          <a
                                                              className="button casemenu-button create-case button-card-view"
                                                              href={`${caseButtons.url}/${this.props.employmentId}?caseDefinitionId=${caseButtons.id}`}
                                                              onClick={e =>
                                                                  this.props.closeCaseButtonsPopup(this.props.employmentId, e)
                                                              }
                                                              key={caseButtonsIndex}
                                                              data-lightbox
                                                              data-lightboxwidth="910px"
                                                              data-createnewemployment=""
                                                          >
                                                              <span className="casebutton-text">
                                                                  <i className="fa fa-briefcase"></i>
                                                                  &nbsp;{caseButtons.description}
                                                              </span>
                                                          </a>
                                                      );
                                                  })}
                                              </div>
                                          );
                                      }
                                  }
                              );
                          })
                        : null}
                </div>
            </div>
        );
    }
}

export default translate(EmploymentCardCaseButtons);
