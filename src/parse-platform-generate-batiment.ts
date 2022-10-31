import Parse from "parse/dist/parse.min.js";
import {
  batimentTable,
  Column,
  TableType,
  userTable,
  type Section,
} from "@/batiment/model/Section";
import {
  TableEnum,
  type TypeTableEnum,
} from "@/batiment/model/batiment-dropdown";
import batimentSections from "@/batiment/model/BatimentSections";

// BIG WARNING Security.
// ====
// * This file should be execute only once. Should be executed on localhost with
//   master key set
//
// * DO NOT PUSH MASTER KEY ON LINE

// * Set correctly Class-Level Permission and Access-Level Permission on Parse
//   Platform interface
//
// * After schema creation, do not forget to forbid creation of Class for normal
//   users.
//
// * See also https://docs.parseplatform.org/js/guide/#security
//   and https://www.back4app.com/docs/security/parse-security
//
// * You should allow custom object id
// https://www.back4app.com/docs/platform/custom-parse-options

/**
 * DO NOT COMMIT FOLLOWING AND DO NOT DEPLOY ON PUBLIC APP
 */
const masterKey = "XXXXXXXXXXXXXXXXXXXXXX";

const droptablesCreated = async () => {
  const tableToDelete = Object.keys(TableEnum);
  tableToDelete.push(batimentTable);
  await Promise.all(
    tableToDelete.map(async (table: string) => {
      await new Parse.Schema(table).purge();
      await new Parse.Schema(table).delete();
    })
  );
};

const createAEnum = async (tableName: string, tableEnum: TypeTableEnum) => {
  Promise.all(
    Object.keys(tableEnum.enum).map(async (objectId: string) => {
      const table = new Parse.Object(tableName);
      table.id = objectId;
      table.set("commentaire", tableEnum.enum[objectId]);
      await table.save();
    })
  );
};

const createEnumTables = async () => {
  // eslint-disable-next-line
  // @ts-ignore
  Parse.allowCustomObjectId = true;
  await Promise.all(
    Object.entries(TableEnum).map(
      async ([tableName, tableEnum]) => await createAEnum(tableName, tableEnum)
    )
  );
  // eslint-disable-next-line
  // @ts-ignore
  Parse.allowCustomObjectId = false;
};

const createAColumn = (
  batimentSchema: Parse.Schema,
  columnName: string,
  column: Column
) => {
  if (column.generatedByBack === true) {
    return;
  }
  let columnType = column.type;
  const required = column.validation?.required
    ? { required: true }
    : { required: false };
  if (typeof columnType === "number") {
    columnType = columnType as TableType;
    switch (columnType) {
      case TableType.STRING:
      case TableType.TEXTAREA:
        batimentSchema.addString(columnName, required);
        break;
      case TableType.NUMBER:
      case TableType.NATURAL_NUMBER:
        batimentSchema.addNumber(columnName, required);
        break;
      case TableType.BOOLEAN:
        batimentSchema.addBoolean(columnName, required);
        break;
      case TableType.DATE:
        batimentSchema.addDate(columnName, required);
        break;
      case TableType.IMAGE:
        batimentSchema.addFile(columnName, required);
        break;
      case TableType.GEOPOINT:
        batimentSchema.addGeoPoint(columnName, required);
        break;
    }
  } else {
    columnType = columnType as TypeTableEnum;
    batimentSchema.addPointer(columnName, columnType.name, required);
  }
};

const createASection = (
  batimentSchema: Parse.Schema,
  columnsGroup: Section["columnsGroup"]
) => {
  Object.values(columnsGroup).forEach((columns) => {
    Object.entries(columns).forEach(([columnName, column]) => {
      createAColumn(batimentSchema, columnName, column);
    });
  });
};

/**
 * Even if we use synchrone loop (
 *  thanks for `for...in` and `await batimentSchena.update` triggered into
 * createAColumn
 * )
 * columns are not created in correct order.
 * We should order columns manually into Parse Platform Admin webpage
 */
const createBatimentTable = async () => {
  const batimentSchema = new Parse.Schema(batimentTable);
  Object.values(new batimentSections().allSections).forEach((aBatiment) => {
    createASection(batimentSchema, aBatiment.columnsGroup);
  });
  batimentSchema.addPointer("owner", userTable, { required: true });
  await batimentSchema.save();
};

const main = async () => {
  // // If Master key is not set, promise is correctly rejected. It's normal.
  Parse.masterKey = masterKey;
  await droptablesCreated();

  // Note:
  // With Pares Platform 4.5.0
  // If we un check ""Allow Client Class Creation"
  // into Parse Platform configuration website
  // Following fail, but promise is not rejected. Probably an error with Parse library?
  await createEnumTables();

  // If we try to createBatimentTable two times, Parse Platform library throw
  // correctly error.
  await createBatimentTable();
};

export default async () => {
  try {
    await main();
    alert("Tables deleted then created again with success");
  } catch (error) {
    alert(
      "Error, it's normal, master key is not corretly defined. See also JavaScript console."
    );
    console.error(error);
  }
};
