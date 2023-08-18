import { ref, type Ref } from "vue";
import type { TypeTableEnum } from "./batiment-dropdown";
import Parse from "parse/dist/parse.min.js";

export enum TableType {
  STRING,
  TEXTAREA,
  BOOLEAN,
  NUMBER,
  NATURAL_NUMBER,
  DATE,
  IMAGE,
  GEOPOINT,
  USER,
}

export const batimentTable = "batiment";
export const userTable = "_User";

export class Validation {
  private _required?: boolean;
  private _maxlength?: number;
  private _min?: number;
  private _max?: number;

  constructor({
    required,
    maxlength,
    min,
    max,
  }: {
    required?: boolean;
    maxlength?: number;
    min?: number;
    max?: number;
  }) {
    this._required = required;
    this._maxlength = maxlength;
    this._min = min;
    this._max = max;
  }

  get required() {
    return this._required;
  }

  get maxlength() {
    return this._maxlength;
  }

  get min() {
    return this._min;
  }

  get max() {
    return this._max;
  }
}

export class Column {
  private _commentaire: string | null;
  private _type: TableType | TypeTableEnum;
  private _validation?: Validation;
  private _cssClass?: string;
  private _genaratedByBack = false;
  public vueRef: Ref<any>;

  constructor(param: {
    commentaire: string | null;
    type: TableType | TypeTableEnum;
    validation?: Validation;
    cssClass?: string;
    generatedByBack?: boolean;
  }) {
    this._commentaire = param.commentaire;
    this._type = param.type;
    this._validation = param.validation;
    this._validation = param.validation;
    this._cssClass = param.cssClass;
    this._genaratedByBack = param.generatedByBack ? true : false;
    switch (param.type) {
      case TableType.BOOLEAN:
        this.vueRef = ref<boolean | null>(null);
        break;
      case TableType.DATE:
        this.vueRef = ref<Date | null>(null);
        break;
      case TableType.IMAGE:
        this.vueRef = ref<Parse.File | null>(null);
        break;
      case TableType.NUMBER:
      case TableType.NATURAL_NUMBER:
        this.vueRef = ref<number | null>(null);
        break;
      case TableType.STRING:
      case TableType.TEXTAREA:
        this.vueRef = ref<string | null>(null);
        break;
      case TableType.GEOPOINT:
        this.vueRef = ref<Parse.GeoPoint>(new Parse.GeoPoint());
        break;
      default:
        this.vueRef = ref<null>(null);
        break;
    }
  }

  get commentaire() {
    return this._commentaire;
  }

  get type() {
    return this._type;
  }

  get validation() {
    return this._validation;
  }

  get cssClass() {
    return this._cssClass;
  }

  get generatedByBack(): boolean {
    return this._genaratedByBack;
  }
}

export class ColumnsGroup {
  private _commentaire: string | null;
  private _columns: { [key: string]: Column };

  constructor(param: {
    commentaire: string | null;
    columns: { [key: string]: Column };
  }) {
    this._commentaire = param.commentaire;
    this._columns = param.columns;
  }

  get commentaire(): string | null {
    return this._commentaire;
  }

  get columns() {
    return this._columns;
  }
}

export class Section {
  private _commentaire: string | null;
  private _columnsGroups: { [key: string]: ColumnsGroup };

  constructor(param: {
    commentaire: string;
    columnsGroups: { [key: string]: ColumnsGroup };
  }) {
    this._commentaire = param.commentaire;
    this._columnsGroups = param.columnsGroups;
  }

  get commentaire(): string | null {
    return this._commentaire;
  }

  get columnsGroups(): { [key: string]: ColumnsGroup } {
    return this._columnsGroups;
  }
}
