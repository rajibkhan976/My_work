import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { reduxStore as store } from "../../index";
import * as employmentCardActions from "../../Actions/Employment/employmentCardActions";
import * as translationService from "../../Services/Translation/translationService";
import ListEmploymentCards from "./ListEmploymentCards";

// Until we implement React router we will have to check if element exist.
let element = document.getElementById("employment-card");
if (element) {
    // Early loading
    store.dispatch(translationService.loadTranslations("employment.card")).then(() => {

        store.dispatch(employmentCardActions.getEmploymentCards());

        render(
            <Provider store={store}>
                <ListEmploymentCards />
            </Provider>,
            element
        );
    });
}
