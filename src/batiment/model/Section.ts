import { ref, type Ref } from "vue";
import type { TypeTableEnum } from "./batiment-dropdown";

export enum TableType {
  IMAGE,
  STRING,
  TEXTAREA,
  NUMBER,
  NATURAL_NUMBER,
  BOOLEAN,
  DATE,
  GEOPOINT,
}

export const batimentTable = "batiment";
export const userTable = "user";

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
  private _commentaire: string;
  private _type: TableType | TypeTableEnum;
  private _validation?: Validation;
  public value: Ref<string | Date | BinaryType | number | boolean | null>;

  constructor({
    commentaire,
    type,
    validation,
  }: {
    commentaire: string;
    type: TableType | TypeTableEnum;
    validation?: Validation;
  }) {
    this._commentaire = commentaire;
    this._type = type;
    this._validation = validation;
    switch (type) {
      case TableType.BOOLEAN:
        this.value = ref<boolean | null>(null);
        break;
      case TableType.DATE:
        this.value = ref<Date | null>(null);
        break;
      case TableType.IMAGE:
        this.value = ref<BinaryType | null>(null);
        break;
      case TableType.NUMBER | TableType.NATURAL_NUMBER:
        this.value = ref<number | null>(null);
        break;
      case TableType.STRING | TableType.TEXTAREA:
        this.value = ref<string | null>(null);
        break;
      case TableType.GEOPOINT:
        this.value = ref<string | null>(null);
        break;
      default:
        this.value = ref<null>(null);
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
}

export class Section {
  private _commentaire: string;
  private _columns: { [key: string]: Column };

  constructor({
    commentaire,
    columns,
  }: {
    commentaire: string;
    columns: { [key: string]: Column };
  }) {
    this._commentaire = commentaire;
    this._columns = columns;
  }

  get commentaire() {
    return this._commentaire;
  }

  get columns() {
    return this._columns;
  }
}
