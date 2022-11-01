import type { IUser } from "@/model/IUser";
import Parse from "parse/dist/parse.min.js";

const retrieveAllUsers = async (querySelect: string[]): Promise<IUser[]> => {
  try {
    const query = new Parse.Query(Parse.Object.extend("users"));
    query.limit(10000);
    query.select(...querySelect);
    const results = await query.find();
    return results.map((aResult): IUser => {
      return {
        id: aResult.id,
        pseudo: aResult.get("pseudo"),
      };
    });
  } catch (error: any) {
    alert("Error while fetching user (see console)");
    console.error(error);
  }
  return [];
};

export default {
  retrieveAllUsers,
};
