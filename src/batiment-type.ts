const Cereale: TypeTableEnum = {
  name: "Cereale",
  commentaire: "Céréales",
  enum: {
    BLE: "Blé",
    ORGE: "Orge",
    AVOINE: "Avoine",
    SEIGLE: "Seigle",
    TRITICALE: "Triticale",
    RIZ: "Riz",
    AUTRE: "Autre",
  },
};

const IntegBaie: TypeTableEnum = {
  name: "IntegBaie",
  commentaire: "Intégration des baies",
  enum: {
    PRE_CADRE_FLOTTANT: "Pré-cadre flottant",
    COULISSANT: "Élément coulissant",
    FIXE: "Élément fixe (poteau, montant, …}",
    AUTRE: "Autre",
  },
};

const RevetementInterieur: TypeTableEnum = {
  name: "RevetementInterieur",
  commentaire: "Revêtement intérieur",
  enum: {
    PLAQUE_DE_PLATRE: "Plaque de plâtre",
    LAMBRIS: "Lambris",
    ENDUIT_TERRE: "Enduit terre",
    ENDUIT_CHAUX: "Enduit chaux",
    ENDUIT_TERRE_ET_CHAUX: "Enduit terre et chaux",
    ENDUIT_PLATRE: "Enduit plâtre",
    AUTRE: "Autre",
  },
};

const RevetementExterieur: TypeTableEnum = {
  name: "RevetementExterieur",
  commentaire: "Revêtement extérieur",
  enum: {
    BARDAGE_VENTILE: "Bardage ventilé",
    ENDUIT_TERRE: "Enduit terre",
    ENDUIT_CHAUX: "Enduit chaux",
    ENDUIT_TERRE_ET_CHAUX: "Enduit terre et chaux",
    ENDUIT_PLATRE: "Enduit plâtre",
    ENDUIT_PANNEAU: "Panneau",
    AUTRE: "Autre",
  },
};

const StructureComplementaire: TypeTableEnum = {
  name: "StructureComplementaire",
  commentaire: "Nature support complémentaire",
  enum: {
    BOIS: "Bois",
    BETON_ARME: "Béton armé",
    METAL: "Métal",
    MACONNERIE: "Maçonnerie (brique, parpaing, pierre, …)",
    AUTRE: "Autre",
  },
};

const SupportAncrage: TypeTableEnum = {
  name: "SupportAncrage",
  commentaire: "Nature du support d'ancrage",
  enum: {
    BOIS: "Bois",
    BETON_ARME: "Béton armé",
    METAL: "Métal",
    MACONNERIE: "Maçonnerie (brique, parpaing, pierre, …)",
    AUTRE: "Autre",
  },
};

const TaillesBottes: TypeTableEnum = {
  name: "TaillesBottes",
  commentaire: "Taille des bottes",
  enum: {
    T_70_X_120_X_230_CM: "70 x 120 x 230",
    T_50_X_80_X_110_a_200_CM: "50 x 80 x 110 à 200",
    T_36_X_46_X_70_a_120_CM: "36 x 46 x 70 à 120",
  },
};

const UsageBatiment: TypeTableEnum = {
  name: "UsageBatiment",
  commentaire: "Usage bâtiment",
  enum: {
    LOGEMENT_COLLECTIF: "Logement collectif",
    LOGEMENT_INDIVIDUEL: "Logement individuel",
    LOGEMENT_INDIVIDUEL_GROUPE: "Logement individuel groupé",
    BATIMENT_ADMINISTRATIF: "Bâtiment administratif",
    BATIMENT_COMMERCIAL: "Bâtiment commercial",
    BATIMENT_INDUSTRIEL: "Bâtiment industriel",
    BATIMENT_DE_LOISIRS: "Bâtiment de loisirs",
    BATIMENT_DE_SANTE: "Bâtiment de santé",
    BATIMENT_DE_RETRAITE: "Bâtiment de retraite",
    BATIMENT_EDUCATIF: "Bâtiment éducatif",
    BATIMENT_SOCIO_CULTUREL: "Bâtiment socio-culturel",
    BATIMENT_AGRICOLE: "Bâtiment agricole",
    OUVRAGE_EXCEPTIONNEL: "Ouvrage exceptionnel",
    AUTRE: "Autre",
  },
};

const YesNoPartial: TypeTableEnum = {
  name: "YesNoPartial",
  commentaire: "Oui, non ou partiel",
  enum: {
    OUI: "Oui",
    NON: "Non",
    PARTIEL: "Partiel",
  },
};

export type TypeTableEnum = {
  name: string;
  commentaire: string;
  enum: { [key: string]: string };
};

export type Section = {
  commentaire: string;
  columns: {
    [key: string]: {
      commentaire: string;
      type: TableType | TypeTableEnum;
      validation?: {
        required?: boolean;
        maxlength?: number;
      };
    };
  };
};

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

export const TableEnum = {
  Cereale,
  IntegBaie,
  RevetementInterieur,
  RevetementExterieur,
  StructureComplementaire,
  SupportAncrage,
  TaillesBottes,
  UsageBatiment,
  YesNoPartial,
};
