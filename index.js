import "react-virtualized/styles.css";
import "react-select/dist/react-select.css";
import "react-virtualized-select/styles.css";
import "slick-carousel/slick/slick.css";
import "react-datepicker/dist/react-datepicker.css";

require("expose-loader?ReactDOM!react-dom");
require("expose-loader?React!react");

/* Froala editor dependency */
require("froala-editor/js/froala_editor.pkgd.min.js");
require("froala-editor/css/froala_style.min.css");
require("froala-editor/css/froala_editor.pkgd.min.css");
require("./Utils/froala-plugins/bglink");

// global init
import * as translationService from "./Services/Translation/translationService";
import configureStore from "./Store/configureStore";

// init Redux Store
export const reduxStore = configureStore();

// init Notification Service
require("./Services/Notifications/notificationService").init();

// pre-load common translations
reduxStore.dispatch(translationService.loadTranslations("application.notifications")).then(() => {
    /* Import app hooks */
    require("./Components/Administration/BpmAuthorization/App");
    require("./Components/Administration/Users/App");
    require("./Components/Administration/ActivityLog/App");
    require("./Components/Administration/TechnicalLogs/App");
    require("./Components/Spm/PublishedArtifacts/App");
    require("./Components/Spm/Work/App");
    require("./Components/SalaryRevision/App");
    require("./Components/Administration/Authorization/App");
    require("./Components/Administration/Roles/App");
    require("./Components/PayrollJobs/App");
    require("./Components/Administration/ReportFieldsConfiguration/App");
    require("./Components/MyProfile/Account/App");
    require("./Components/Administration/ExternalPersonImportConfiguration/App");
    require("./Components/Administration/ResourceDbTool/App");
    require("./Components/Case/AtkSelection/App");
    require("./Components/Employment/App");
});
