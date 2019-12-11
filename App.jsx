import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { reduxStore as store } from "../../index";
import * as translationService from "../../Services/Translation/translationService";
import EmploymentCardPage from "./EmploymentCardPage";

// Until we implement React router we will have to check if element exist.
let element = document.getElementById("employment-card-view");
if (element) {
    // Early loading
    store.dispatch(translationService.loadTranslations("employment.card")).then(() => {

        render(
            <Provider store={store}>
                <EmploymentCardPage />
            </Provider>,
            element
        );
    });
}
