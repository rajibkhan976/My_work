import React, { Fragment } from "react";
import translate from "redux-polyglot/translate";
import moment from "moment";
import { Overlay, Popover } from "react-bootstrap";
import EmploymentCardCaseButtons from "./EmploymentCardCaseButtons";

class EmploymentCardMain extends React.Component {
    constructor(props) {
        super(props);

        this.popoverContainer = [];
        this.popoverContainer[`Ref`] = null;
        this.employmentDetails = this.employmentDetails.bind(this);
        this.popoverTitle = this.popoverTitle.bind(this);
        this.processSocialSecurityNumber = this.processSocialSecurityNumber.bind(this);
    }

    employmentDetails(redirectToUrl, event) {
        event.stopPropagation();
        window.location.href = redirectToUrl;
    }

    popoverTitle() {
        const employments = this.props.employments;
        const { p } = this.props;
        return (
            <div>
                <span className="slidebox-title">{`${p.t("employment_employmentcard_popovertitle")} ${
                    employments.fullName
                }`}</span>
                <span
                    className="closing-icon"
                    onClick={event => this.props.poppingIndex.includes(this.props.employmentsIndex, event)}
                >
                    <i className="fa fa-times slidebox-close"></i>
                </span>
            </div>
        );
    }

    processSocialSecurityNumber(socialSecurityNumber) {
        if (socialSecurityNumber.includes("-")) {
            return socialSecurityNumber;
        } else {
            return socialSecurityNumber
                .slice(0, socialSecurityNumber.length - 4)
                .concat("-", socialSecurityNumber.slice(socialSecurityNumber.length - 4, socialSecurityNumber.length));
        }
    }

    render() {
        const employments = this.props.employments;
        const salaryInfo = this.props.salaryInfo;
        const { p } = this.props;
        return (
            <div>
                {employments ? (
                    <div className="employment-main" key={this.props.employmentsIndex}>
                        <div
                            className="employment-body row"
                            onClick={event => this.props.expandCard(this.props.employmentsIndex, employments.employmentId, event)}
                        >
                            <div className="employee-casecard-left col-md-0-5 no-padding">
                                <span className="employee-casecard-left-icon">
                                    <i className="fa fa-briefcase"></i>
                                </span>
                            </div>
                            <div className="employee-image col-md-1-5">
                                {employments.image !== null ? (
                                    <img
                                        className="img-responsive img-circle employee-base-image"
                                        src={`data:image/png;base64,${employments.image}`}
                                        alt="Employee image"
                                    />
                                ) : (
                                    <span className="fa fa-user employee-image-icon"></span>
                                )}
                            </div>
                            <div className="employee-name col-md-2 no-padding">
                                <div
                                    className="employee-details"
                                    onClick={event =>
                                        this.employmentDetails(`/Employment/Employment/Index/${employments.employmentId}`, event)
                                    }
                                >
                                    <a href={`/Employment/Employment/Index/${employments.employmentId}`}>
                                        {employments.fullName}
                                    </a>
                                </div>
                            </div>
                            <div className="employee-number-designation col-md-2 no-padding">
                                <div className="employment-number">
                                    <span>
                                        {p.t("employment_employmentcard_employmentnumber")} {employments.employmentNumber}
                                    </span>
                                </div>
                                <div className="employee-designation">
                                    <span>
                                        {p.t("employment_employmentcard_position")} {employments.positionName}
                                    </span>
                                </div>
                            </div>
                            <div className="employee-email col-md-3 no-padding">
                                {employments.emailWork != null ? (
                                    <Fragment>
                                        <i className="fa fa-envelope-o pull-left clearfix" aria-hidden="true"></i>
                                        <span>{p.t("employment_employmentcard_emailwork")}</span>
                                        <span title={employments.emailWork}>{employments.emailWork}</span>
                                    </Fragment>
                                ) : null}
                            </div>
                            <div className="employee-phone col-md-2 no-padding">
                                {employments.cellPhone != null ? (
                                    <Fragment>
                                        <i className="fa fa-phone pull-left clearfix" aria-hidden="true"></i>
                                        <span>{p.t("employment_employmentcard_phonework")}</span>
                                        <span>{employments.cellPhone}</span>
                                    </Fragment>
                                ) : null}
                            </div>
                            <div
                                className="employee-action col-md-0-5 no-padding"
                                ref={div => {
                                    this.popoverContainer[this.props.employmentsIndex] = div;
                                }}
                                onClick={event =>
                                    this.props.toggleCaseButtonsPopup(
                                        this.props.employmentsIndex,
                                        employments.employmentId,
                                        employments.fullName,
                                        event
                                    )
                                }
                            >
                                <span className="fa fa-plus"></span>
                                <Overlay
                                    show={this.props.poppingIndex.includes(this.props.employmentsIndex)}
                                    container={this.popoverContainer[this.props.employmentsIndex]}
                                    rootClose={true}
                                    onHide={event => this.props.closeCaseButtonsPopup(this.props.employmentsIndex, event)}
                                >
                                    <Popover id="popover-contained" title={this.popoverTitle()}>
                                        {this.props.caseButtons.length !== 0 ? (
                                            <EmploymentCardCaseButtons
                                                caseButtons={this.props.caseButtons}
                                                employmentId={employments.employmentId}
                                                fullname={employments.fullName}
                                                poppingIndex={this.props.employmentsIndex}
                                                closeCaseButtonsPopup={this.props.closeCaseButtonsPopup}
                                            />
                                        ) : null}
                                    </Popover>
                                </Overlay>
                            </div>
                        </div>
                        {this.props.cardIndex.includes(this.props.employmentsIndex) ? (
                            <div className="employment-expanded">
                                <div className="row">
                                    <div className="employee-name-person-number">
                                        {employments.fullName}&nbsp;
                                        {this.processSocialSecurityNumber(employments.socialSecurityNumber)}
                                    </div>
                                    <div className="employment-expanded-left col-sm-6 col-md-4">
                                        <div className="table-responsive">
                                            <table className="table">
                                                <tbody>
                                                    <tr>
                                                        <td>{p.t("employment_employmentcard_currentagreement")}</td>
                                                        <td>{employments.currentAgreement}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>{p.t("employment_employmentcard_position")}</td>
                                                        <td>{employments.positionName}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>{p.t("employment_employmentcard_employmenttype")}</td>
                                                        <td>{employments.employmentType}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>{p.t("employment_employmentcard_employedfrom")}</td>
                                                        <td>
                                                            {employments.startDate != null
                                                                ? moment(employments.startDate).format("YYYY-MM-DD")
                                                                : null}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>{p.t("employment_employmentcard_employedto")}</td>
                                                        <td>
                                                            {employments.endDate != null
                                                                ? moment(employments.endDate).format("YYYY-MM-DD")
                                                                : null}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>{p.t("employment_employmentcard_department")}</td>
                                                        <td>{employments.department}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>{p.t("employment_employmentcard_costingcenter")}</td>
                                                        <td>{employments.accountPart1}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div className="employment-expanded-middle col-sm-6 col-md-4">
                                        <div className="table-responsive">
                                            <table className="table">
                                                <tbody>
                                                    <tr>
                                                        <td>{p.t("employment_employmentcard_phonehome")}</td>
                                                        <td>{employments.homeTelephone}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>{p.t("employment_employmentcard_mobilephone")}</td>
                                                        <td>{employments.cellPhone}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>{p.t("employment_employmentcard_emailprivate")}</td>
                                                        <td>{employments.emailHome}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div className="employment-expanded-right col-sm-6 col-md-4">
                                        <div className="table-responsive">
                                            <table className="table">
                                                <tbody>
                                                    <tr>
                                                        <td>{p.t("employment_employmentcard_salaryfulltime")}</td>
                                                        <td>{salaryInfo.fullTimeSalary}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>{p.t("employment_employmentcard_salaryreal")}</td>
                                                        <td>{salaryInfo.actualSalary}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>{p.t("employment_employmentcard_applicablefrom")}</td>
                                                        <td>
                                                            {salaryInfo.basicSalaryStartDate != null
                                                                ? moment(salaryInfo.basicSalaryStartDate).format("YYYY-MM-DD")
                                                                : null}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>{p.t("employment_employmentcard_employmentrate")}</td>
                                                        <td>{salaryInfo.employmentRate}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>{p.t("employment_employmentcard_workinghourfull")}</td>
                                                        <td>{salaryInfo.fullTimeWorkHours}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>{p.t("employment_employmentcard_workinghourreal")}</td>
                                                        <td>{salaryInfo.actualWorkHours}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : null}
                    </div>
                ) : null}
            </div>
        );
    }
}

export default translate(EmploymentCardMain);
