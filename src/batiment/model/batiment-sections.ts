import { TableEnum, type TypeTableEnum } from "./batiment-dropdown";

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

const Definition: Section = {
  commentaire: "Définition",
  columns: {
    coordonnees: {
      commentaire: "Usage",
      type: TableType.GEOPOINT,
      validation: {
        required: true,
        maxlength: 40,
      },
    },
    nomBatiment: {
      commentaire: "Nom du bâtiment",
      type: TableType.STRING,
    },
  },
};

const InformationsGenerales: Section = {
  commentaire: "Informations générales",
  columns: {
    usageBatiment: {
      commentaire: "Usage",
      type: TableEnum.UsageBatiment,
    },
    usageBatimentInfos: {
      commentaire: "Infos sur l'usage du bâtiment",
      type: TableType.TEXTAREA,
    },
    cout: {
      commentaire: "Coût (€)",
      type: TableType.NUMBER,
    },
    surfacePlancher: {
      commentaire: "Surface de plancher (m²)",
      type: TableType.NUMBER,
    },
    niveaux: {
      commentaire:
        "Nombre de niveaux du bâtiment (ex: RDC = 1, 1 étage = 2 niveau, sous-sol non compté)",
      type: TableType.NATURAL_NUMBER,
    },
  },
};

const Photo: Section = {
  commentaire: "Photo",
  columns: {
    photoPrincipale: {
      commentaire: "Photo",
      type: TableType.IMAGE,
    },
    photoPrincipaleLegende: {
      commentaire: "Photo principale légende",
      type: TableType.STRING,
      validation: {
        maxlength: 30,
      },
    },
    photoPrincipaleDescription: {
      commentaire: "Photo principale description",
      type: TableType.TEXTAREA,
    },
    photo1: {
      commentaire: "Photo",
      type: TableType.IMAGE,
    },
    photo1Legende: {
      commentaire: "Photo 1 légende",
      type: TableType.STRING,
      validation: {
        maxlength: 30,
      },
    },
    photo1Description: {
      commentaire: "Photo 1 description",
      type: TableType.TEXTAREA,
    },
    photo2: {
      commentaire: "Photo",
      type: TableType.IMAGE,
    },
    photo2Legende: {
      commentaire: "Photo 2 légende",
      type: TableType.STRING,
      validation: {
        maxlength: 30,
      },
    },
    photo2Description: {
      commentaire: "Photo 2 description",
      type: TableType.TEXTAREA,
    },
    photo3: {
      commentaire: "Photo",
      type: TableType.IMAGE,
    },
    photo3Legende: {
      commentaire: "Photo 3 légende",
      type: TableType.STRING,
      validation: {
        maxlength: 30,
      },
    },
    photo3Description: {
      commentaire: "Photo 3 description",
      type: TableType.TEXTAREA,
    },
    photo4: {
      commentaire: "Photo",
      type: TableType.IMAGE,
    },
    photo4Legende: {
      commentaire: "Photo 4 légende",
      type: TableType.STRING,
      validation: {
        maxlength: 30,
      },
    },
    photo4Description: {
      commentaire: "Photo 4 description",
      type: TableType.TEXTAREA,
    },
    photo5: {
      commentaire: "Photo",
      type: TableType.IMAGE,
    },
    photo5Legende: {
      commentaire: "Photo 5 légende",
      type: TableType.STRING,
      validation: {
        maxlength: 30,
      },
    },
    photo5Description: {
      commentaire: "Photo 5 description",
      type: TableType.TEXTAREA,
    },
  },
};

const NatureDesTravaux: Section = {
  commentaire: "Nature des travaux",
  columns: {
    travauxNeuf: {
      commentaire: "Neuf",
      type: TableType.BOOLEAN,
    },
    travauxExtension: {
      commentaire: "Extension",
      type: TableType.BOOLEAN,
    },
    travauxRenov: {
      commentaire: "Rénovation",
      type: TableType.BOOLEAN,
    },
    travauxIte: {
      commentaire: "Isolation thermique par l'extérieur",
      type: TableType.BOOLEAN,
    },
    travauxIti: {
      commentaire: "Isolation thermique par l'intérieur",
      type: TableType.BOOLEAN,
    },
  },
};

const Chronologie: Section = {
  commentaire: "Chronologie",
  columns: {
    constructionDebut: {
      commentaire: "Début de construction",
      type: TableType.DATE,
    },
    constructionFin: {
      commentaire: "Achèvement",
      type: TableType.DATE,
    },
  },
};

const BotteDePaille: Section = {
  commentaire: "Botte de paille",
  columns: {
    bottesTaille: {
      commentaire: "Taille des bottes",
      type: TableEnum.TaillesBottes,
    },
    bottesTailleInfos: {
      commentaire: "Infos sur la taille des bottes",
      type: TableType.TEXTAREA,
    },
    bottesDensite: {
      commentaire: "Densité sur base sèche (kg/m³)",
      type: TableType.NUMBER,
    },
    bottesCereale: {
      commentaire: "Céréale",
      type: TableEnum.Cereale,
    },
    distanceApprovisionnement: {
      commentaire: "Distance d'approvisionnement (km)",
      type: TableType.NUMBER,
    },
  },
};

const Chantier: Section = {
  commentaire: "Chantier",
  columns: {
    autoconstruction: {
      commentaire: "Autoconstruction",
      type: TableEnum.YesNoPartial,
    },
    participatif: {
      commentaire: "Participatif",
      type: TableEnum.YesNoPartial,
    },
  },
};

const Construction: Section = {
  commentaire: "Construction",
  columns: {
    structCompl: {
      commentaire:
        "Structure complémentaire à la structure en paille porteuse (poteau, mur de refend, …)",
      type: TableType.BOOLEAN,
    },
    structComplNature: {
      commentaire: "Nature de la structure complémentaire",
      type: TableEnum.StructureComplementaire,
    },
    structComplInfos: {
      commentaire: "Longueur maximum sans mur de refend (mètre)",
      type: TableType.TEXTAREA,
    },
    longMaxSansMurRefend: {
      commentaire: "Longueur maximum sans mur de refend (mètre)",
      type: TableType.NUMBER,
    },
    noteCalcul: {
      commentaire: "Note de calcul",
      type: TableType.BOOLEAN,
    },
    nbrRangDeBottes: {
      commentaire: "Nombre de rangs de bottes",
      type: TableType.NATURAL_NUMBER,
    },
    integBaie: {
      commentaire: "Intégration des baies",
      type: TableEnum.IntegBaie,
    },
    integBaieInfos: {
      commentaire: "Infos sur l'intégration des baies",
      type: TableType.TEXTAREA,
    },
    supportAncrage: {
      commentaire: "Nature du support d'ancrage",
      type: TableEnum.SupportAncrage,
    },
    supportAncrageInfos: {
      commentaire: "Infos sur le support d'ancrage",
      type: TableType.TEXTAREA,
    },
  },
};

const Revetement: Section = {
  commentaire: "Revêtement",
  columns: {
    revetInt: {
      commentaire: "Revêtement intérieur",
      type: TableEnum.RevetementInterieur,
    },
    revetIntInfos: {
      commentaire: "Infos sur le revêtement intérieur",
      type: TableType.TEXTAREA,
    },
    revetExt: {
      commentaire: "Revêtement extérieur",
      type: TableEnum.RevetementExterieur,
    },
    revetExtInfos: {
      commentaire: "Infos sur le revêtement extérieur",
      type: TableType.TEXTAREA,
    },
  },
};

const ActricesActeurs: Section = {
  commentaire: "Actrices / acteurs",
  columns: {
    maitreDOuvrage: {
      commentaire: "Maître d'ouvrage",
      type: TableType.STRING,
    },
    maitreDOeuvre: {
      commentaire: "Maître d'œuvre",
      type: TableType.STRING,
    },
    architecte: {
      commentaire: "Architecte",
      type: TableType.STRING,
    },
    bureauDEtudeStructure: {
      commentaire: "Bureau d'étude Structure",
      type: TableType.STRING,
    },
    bureauControl: {
      commentaire: "Bureau contrôle",
      type: TableType.STRING,
    },
    entrepriseBottes: {
      commentaire: "Bureau contrôle",
      type: TableType.STRING,
    },
    entrepriseCharpente: {
      commentaire:
        "Entreprise de mise en oeuvre de la charpente, si autoconstruction le préciser",
      type: TableType.STRING,
    },
    entrepriseEnduits: {
      commentaire:
        "Entreprise de mise en oeuvre des enduits, si autoconstruction le préciser",

      type: TableType.STRING,
    },
  },
};

const Commentaire: Section = {
  commentaire: "Commentaire",
  columns: {
    descriptionProjet: {
      commentaire: "Description du projet",
      type: TableType.TEXTAREA,
    },
    difficultees: {
      commentaire: "Difficultés rencontrés",
      type: TableType.TEXTAREA,
    },
    astuces: {
      commentaire: "Trucs et astuces",
      type: TableType.TEXTAREA,
    },
    divers: {
      commentaire: "Autre commentaires",
      type: TableType.TEXTAREA,
    },
  },
};

const Contact: Section = {
  commentaire: "Contact",
  columns: {
    contactNom: {
      commentaire: "Nom",
      type: TableType.STRING,
    },
    contactMail: {
      commentaire: "Mail",
      type: TableType.STRING,
    },
    contactPhone: {
      commentaire: "Téléphone",
      type: TableType.STRING,
    },
    codePostal: {
      commentaire: "Code postal",
      type: TableType.STRING,
    },
  },
};

const Autorisation: Section = {
  commentaire: "Autorisation",
  columns: {
    conditionsLuesEtAcceptes: {
      commentaire:
        "Le propriétaire du bâtit a coché sur la case. Ce devrait être systématique, sauf pour les ajouts provenant de recensements divers (Nebreska Construction, RFCP)",
      type: TableType.STRING,
    },
  },
};

export default {
  Definition,
  InformationsGenerales,
  Photo,
  NatureDesTravaux,
  Chronologie,
  BotteDePaille,
  Chantier,
  Construction,
  Revetement,
  ActricesActeurs,
  Commentaire,
  Contact,
  Autorisation,
};
