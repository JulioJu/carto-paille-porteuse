import environment from "@/environment";
import Parse from "parse/dist/parse.min.js";

// Copy environment.example.ts to environment.ts and follow
// https://www.back4app.com/docs/get-started/parse-sdk
const initializeParse = () => {
  Parse.initialize(
    environment.parsePlatform.app_id,
    environment.parsePlatform.js_key
  );
  Parse.serverURL = environment.parsePlatform.serverURL;
};

export default {
  initializeParse,
};
