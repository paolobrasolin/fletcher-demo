import { Application } from "@hotwired/stimulus";
import MainController from "./controllers/main_controller";
import "./index.css";

const application = Application.start();
application.register("main", MainController);
application.debug = true;
