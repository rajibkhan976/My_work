import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import translate from "redux-polyglot/translate";
import EmploymentCardCaseButtons from "./EmploymentCardCaseButtons";
import * as employmentCardActions from "../../Actions/Employment/employmentCardActions";

class EmploymentCardMain extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            cardIndex: []
        };

        this.expandCard = this.expandCard.bind(this);
    }

    expandCard(employmentIndex, employmentId, fullName) {
        if (!this.state.cardIndex.includes(employmentIndex)) {
            this.setState({
                cardIndex: [ employmentIndex ]
            });
        } else {
            this.setState({
                cardIndex: this.state.cardIndex.filter(keepIndex => { return (keepIndex !== employmentIndex) })
            });
        }

        this.props.employmentCardActions.getCaseButtons(employmentId, fullName);
        this.props.employmentCardActions.getSalary(employmentId);
        this.props.employmentCardActions.getSalaryAffecting(employmentId);
    }

    render() {
        const employments = this.props.employments;
        console.log(this.props.salary);
        console.log(this.props.salaryAffecting);
        console.log(this.props.caseButtons);
        return (
                <div>
                {employments ?
                    <div className="employment-main" key={this.props.key}>
                        <div className="employment-body">
                                <div className="employee-image">
                                {(employments.image !== null) ?
                                                    <img className="img-responsive img-circle employee-base-image" src={`data:image/png;base64,${employments.image}`} alt="Employee image" /> 
                                                    :
                                                    <span className="fa fa-user employee-image-icon"></span>
                                }
                                </div>
                                <div className="employee-name-and-designation">
                                    <div className="employee-name"><a href={`/Employment/Employment/Index/${employments.employmentId}`}>{employments.fullname}&nbsp;&#40;{employments.employmentNumber}&#41;</a></div>
                                                <br />
                                    <div className="employee-designation"><i className="fa fa-briefcase" aria-hidden="true"></i>&nbsp;&nbsp;{employments.positionName}</div>
                                            </div>
                                <div className="employee-email"><i className="fa fa-envelope-o" aria-hidden="true"></i>&nbsp;&nbsp;{employments.email ? employments.email : 'Email not available'}</div>
                                <div className="employee-phone"><i className="fa fa-phone" aria-hidden="true"></i>&nbsp;&nbsp;{employments.phone}</div>
                                <div className="employee-action">
                                    <span className="fa fa-plus" onClick={() => this.expandCard(this.props.key, employments.employmentId, employments.fullname)}></span>
                                </div>
                        </div>
                        {this.state.cardIndex.includes(this.props.key) ?
                            <div className="employment-expanded">
                                <div className="employment-expanded-left">
                                    <div className="createcase-dialog">
                                    { (this.props.caseButtons.length !== 0) ?
                                            <EmploymentCardCaseButtons caseButtons={this.props.caseButtons} employmentId={employments.employmentId} employeeName={employments.fullname} />
                                            :
                                            null
                                    }
                                    </div>
                                </div>
                                <div className="employment-expanded-right">
                                    <p className="employment-card-sec-title">Änstallningsinfo</p>
                                    <p>Arbetsgivare: {employments.employerName}</p>
                                    <p>Arbetsgivarnummer: {employments.employerCode}</p>
                                    <p>Anställning: {employments.employmentNumber}</p>
                                    <p>Arbetstagare: {employments.employeeWorkNumber}</p>
                                    <p>Personnummer: {employments.socialSecurityNumber}</p>
                                    <p>Anställningform: {employments.employmentType}</p>
                                    <p>Aktuellt avtal: {employments.currentAgreement}</p>
                                    <p>Fr.o.m.: {employments.startDate}</p>
                                    <p>T.o.m.: {employments.endDate}</p>
                                    <p>Syss. grad: {employments.employmentRate}</p>
                                    <p>Rapporteringsställen: {employments.employmentGroups}</p>
                                    <p>Avdelning: {employments.department}</p>
                                    <p>Kst: {employments.accountPart1}</p>
                                </div>
                            </div>
                    :
                    null
                }
                    </div>
                :
                null
                }
                </div>
                );
    }
}

EmploymentCardMain.propTypes = {
    salary: PropTypes.array,
    salaryAffecting: PropTypes.array,
    caseButtons: PropTypes.array
};

function mapDispatchToProps(dispatch) {
    return {
        employmentCardActions: bindActionCreators(employmentCardActions, dispatch)
    };
}

function mapStateToProps(state) {
    return {
        salary: state.employments.salary,
        salaryAffecting: state.employments.salaryAffecting,
        caseButtons: state.employments.caseButtons
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(translate(EmploymentCardMain));