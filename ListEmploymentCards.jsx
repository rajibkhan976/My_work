import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import translate from "redux-polyglot/translate";
import EmploymentCardMain from "./EmploymentCardMain";
import * as employmentCardActions from "../../Actions/Employment/employmentCardActions";

class ListEmploymentCards extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props.employmentCards);
        return (
            <div className="grid-row list-component-container">
                <div className="grid-column-12">
                    <div className="container-fluid employment-card-container">
                        <div className="row">
                            <div className="col-lg-12">
                                {(this.props.employmentCards.length !== 0) ?
                                    this.props.employmentCards.map((employments, index) => {
                                        return <EmploymentCardMain employments={employments} key={index} />;
                                    })
                                    :
                                    null
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

ListEmploymentCards.propTypes = {
    employmentCards: PropTypes.array
};

function mapDispatchToProps(dispatch) {
    return {
        employmentCardActions: bindActionCreators(employmentCardActions, dispatch)
    };
}

function mapStateToProps(state) {
    return {
        employmentCards: state.employments.employmentCards
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(translate(ListEmploymentCards));