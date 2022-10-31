import { TableEnum } from "./batiment-dropdown";
import { Column, Section, TableType, Validation } from "./Section";

export default class BatimentSection {
  private _definition = new Section({
    commentaire: "Définition",
    columnsGroup: {
      latitudeLongitude: {
        latitudeLongitude: new Column({
          commentaire: "Latitude et longitude",
          type: TableType.GEOPOINT,
          validation: new Validation({ required: true }),
        }),
      },
      nomBatiment: {
        nomBatiment: new Column({
          commentaire: "Nom du bâtiment",
          type: TableType.STRING,
        }),
      },
    },
  });

  private _informationsGenerales = new Section({
    commentaire: "Informations générales",
    columnsGroup: {
      usageBatiment: {
        usageBatiment: new Column({
          commentaire: "Usage",
          type: TableEnum.UsageBatiment,
        }),
        usageBatimentInfos: new Column({
          commentaire: "Infos sur l'usage du bâtiment",
          type: TableType.TEXTAREA,
        }),
      },
      coutTravauxTTC: {
        coutTravauxTTC: new Column({
          commentaire: "Coût travaux TTC (hors études) (€)",
          type: TableType.NUMBER,
        }),
      },
      surfacePlancher: {
        surfacePlancher: new Column({
          commentaire: "Surface de plancher (m²)",
          type: TableType.NUMBER,
        }),
      },
      niveaux: {
        niveaux: new Column({
          commentaire:
            "Nombre de niveaux du bâtiment (ex: RDC = 1, 1 étage = 2 niveau, sous-sol non compté)",
          type: TableType.NATURAL_NUMBER,
        }),
      },
    },
  });

  private _photo = new Section({
    commentaire: "Photo",
    columnsGroup: {
      photoPrincipale: {
        photoPrincipale: new Column({
          commentaire: "Photo",
          type: TableType.IMAGE,
        }),
        photoPrincipaleLegende: new Column({
          commentaire: "Photo principale légende",
          type: TableType.STRING,
          validation: new Validation({
            maxlength: 30,
          }),
        }),
        photoPrincipaleDescription: new Column({
          commentaire: "Photo principale description",
          type: TableType.TEXTAREA,
        }),
      },
      photo1: {
        photo1: new Column({
          commentaire: "Photo",
          type: TableType.IMAGE,
        }),
        photo1Legende: new Column({
          commentaire: "Photo 1 légende",
          type: TableType.STRING,
          validation: new Validation({
            maxlength: 30,
          }),
        }),
        photo1Description: new Column({
          commentaire: "Photo 1 description",
          type: TableType.TEXTAREA,
        }),
      },
      photo2: {
        photo2: new Column({
          commentaire: "Photo",
          type: TableType.IMAGE,
        }),
        photo2Legende: new Column({
          commentaire: "Photo 2 légende",
          type: TableType.STRING,
          validation: new Validation({
            maxlength: 30,
          }),
        }),
        photo2Description: new Column({
          commentaire: "Photo 2 description",
          type: TableType.TEXTAREA,
        }),
      },
      photo3: {
        photo3: new Column({
          commentaire: "Photo",
          type: TableType.IMAGE,
        }),
        photo3Legende: new Column({
          commentaire: "Photo 3 légende",
          type: TableType.STRING,
          validation: new Validation({
            maxlength: 30,
          }),
        }),
        photo3Description: new Column({
          commentaire: "Photo 3 description",
          type: TableType.TEXTAREA,
        }),
      },
      photo4: {
        photo4: new Column({
          commentaire: "Photo",
          type: TableType.IMAGE,
        }),
        photo4Legende: new Column({
          commentaire: "Photo 4 légende",
          type: TableType.STRING,
          validation: new Validation({
            maxlength: 30,
          }),
        }),
        photo4Description: new Column({
          commentaire: "Photo 4 description",
          type: TableType.TEXTAREA,
        }),
      },
      photo5: {
        photo5: new Column({
          commentaire: "Photo",
          type: TableType.IMAGE,
        }),
        photo5Legende: new Column({
          commentaire: "Photo 5 légende",
          type: TableType.STRING,
          validation: new Validation({
            maxlength: 30,
          }),
        }),
        photo5Description: new Column({
          commentaire: "Photo 5 description",
          type: TableType.TEXTAREA,
        }),
      },
    },
  });

  private _natureDesTravaux = new Section({
    commentaire: "Nature des travaux",
    columnsGroup: {
      travauxNeuf: {
        travauxNeuf: new Column({
          commentaire: "Neuf",
          type: TableType.BOOLEAN,
        }),
      },
      travauxExtension: {
        travauxExtension: new Column({
          commentaire: "Extension",
          type: TableType.BOOLEAN,
        }),
      },
      travauxRenov: {
        travauxRenov: new Column({
          commentaire: "Rénovation",
          type: TableType.BOOLEAN,
        }),
      },
      travauxIte: {
        travauxIte: new Column({
          commentaire: "Isolation thermique par l'extérieur",
          type: TableType.BOOLEAN,
        }),
      },
      travauxIti: {
        travauxIti: new Column({
          commentaire: "Isolation thermique par l'intérieur",
          type: TableType.BOOLEAN,
        }),
      },
    },
  });

  private _chronologie = new Section({
    commentaire: "Chronologie",
    columnsGroup: {
      constructionDebut: {
        constructionDebut: new Column({
          commentaire: "Début de construction",
          type: TableType.DATE,
        }),
      },
      constructionFin: {
        constructionFin: new Column({
          commentaire: "Achèvement",
          type: TableType.DATE,
        }),
      },
    },
  });

  private _botteDePaille = new Section({
    commentaire: "Botte de paille",
    columnsGroup: {
      bottesTaille: {
        bottesTaille: new Column({
          commentaire: "Taille des bottes",
          type: TableEnum.TaillesBottes,
        }),
        bottesTailleInfos: new Column({
          commentaire: "Infos sur la taille des bottes",
          type: TableType.TEXTAREA,
        }),
      },
      bottesDensite: {
        bottesDensite: new Column({
          commentaire: "Bottes, densité sur base sèche (kg/m³)",
          type: TableType.NUMBER,
        }),
      },
      bottesCereale: {
        bottesCereale: new Column({
          commentaire: "Bottes, céréale",
          type: TableEnum.Cereale,
        }),
      },
      bottesDistanceApprovisionnement: {
        bottesDistanceApprovisionnement: new Column({
          commentaire: "Bottes, distance d'approvisionnement (km)",
          type: TableType.NUMBER,
        }),
      },
    },
  });

  private _chantier = new Section({
    commentaire: "Chantier",
    columnsGroup: {
      autoconstruction: {
        autoconstruction: new Column({
          commentaire: "Autoconstruction",
          type: TableEnum.YesNoPartial,
        }),
      },
      participatif: {
        participatif: new Column({
          commentaire: "Participatif",
          type: TableEnum.YesNoPartial,
        }),
      },
    },
  });

  private _construction = new Section({
    commentaire: "Construction",
    columnsGroup: {
      structCompl: {
        structCompl: new Column({
          commentaire:
            "Structure complémentaire à la structure en paille porteuse (poteau, mur de refend, …)",
          type: TableType.BOOLEAN,
        }),
        structComplNature: new Column({
          commentaire: "Nature de la structure complémentaire",
          type: TableEnum.StructureComplementaire,
        }),
        structComplInfos: new Column({
          commentaire: "Info nature de la structure complémentaire",
          type: TableType.TEXTAREA,
        }),
      },
      longMaxSansMurRefend: {
        longMaxSansMurRefend: new Column({
          commentaire: "Longueur maximum sans mur de refend (mètre)",
          type: TableType.NUMBER,
        }),
      },
      noteCalcul: {
        noteCalcul: new Column({
          commentaire: "Note de calcul",
          type: TableType.BOOLEAN,
        }),
      },
      nbrRangDeBottes: {
        nbrRangDeBottes: new Column({
          commentaire: "Nombre de rangs de bottes",
          type: TableType.NATURAL_NUMBER,
        }),
      },
      integBaie: {
        integBaie: new Column({
          commentaire: "Intégration des baies",
          type: TableEnum.IntegBaie,
        }),
        integBaieInfos: new Column({
          commentaire: "Infos sur l'intégration des baies",
          type: TableType.TEXTAREA,
        }),
      },
      supportAncrage: {
        supportAncrage: new Column({
          commentaire: "Nature du support d'ancrage",
          type: TableEnum.SupportAncrage,
        }),
        supportAncrageInfos: new Column({
          commentaire: "Infos sur le support d'ancrage",
          type: TableType.TEXTAREA,
        }),
      },
    },
  });

  private _revetement = new Section({
    commentaire: "Revêtement",
    columnsGroup: {
      revetInt: {
        revetInt: new Column({
          commentaire: "Revêtement intérieur",
          type: TableEnum.RevetementInterieur,
        }),
        revetIntInfos: new Column({
          commentaire: "Infos sur le revêtement intérieur",
          type: TableType.TEXTAREA,
        }),
      },
      revetExt: {
        revetExt: new Column({
          commentaire: "Revêtement extérieur",
          type: TableEnum.RevetementExterieur,
        }),
        revetExtInfos: new Column({
          commentaire: "Infos sur le revêtement extérieur",
          type: TableType.TEXTAREA,
        }),
      },
    },
  });

  private _actricesActeurs = new Section({
    commentaire: "Actrices / acteurs",
    columnsGroup: {
      maitreDOuvrage: {
        maitreDOuvrage: new Column({
          commentaire: "Maître d'ouvrage",
          type: TableType.STRING,
        }),
      },
      maitreDOeuvre: {
        maitreDOeuvre: new Column({
          commentaire: "Maître d'œuvre",
          type: TableType.STRING,
        }),
      },
      architecte: {
        architecte: new Column({
          commentaire: "Architecte",
          type: TableType.STRING,
        }),
      },
      bureauDEtudeStructure: {
        bureauDEtudeStructure: new Column({
          commentaire: "Bureau d'étude Structure",
          type: TableType.STRING,
        }),
      },
      bureauControl: {
        bureauControl: new Column({
          commentaire: "Bureau contrôle",
          type: TableType.STRING,
        }),
      },
      entrepriseBottes: {
        entrepriseBottes: new Column({
          commentaire:
            "Entreprise de mise en œuvre des bottes, si autoconstruction le préciser",
          type: TableType.STRING,
        }),
      },
      entrepriseCharpente: {
        entrepriseCharpente: new Column({
          commentaire:
            "Entreprise de mise en oeuvre de la charpente, si autoconstruction le préciser",
          type: TableType.STRING,
        }),
      },
      entrepriseEnduits: {
        entrepriseEnduits: new Column({
          commentaire:
            "Entreprise de mise en oeuvre des enduits, si autoconstruction le préciser",
          type: TableType.STRING,
        }),
      },
    },
  });

  private _commentaire = new Section({
    commentaire: "Commentaire",
    columnsGroup: {
      descriptionProjet: {
        descriptionProjet: new Column({
          commentaire: "Description du projet",
          type: TableType.TEXTAREA,
        }),
      },
      difficultees: {
        difficultees: new Column({
          commentaire: "Difficultés rencontrés",
          type: TableType.TEXTAREA,
        }),
      },
      astuces: {
        astuces: new Column({
          commentaire: "Trucs et astuces",
          type: TableType.TEXTAREA,
        }),
      },
      divers: {
        divers: new Column({
          commentaire: "Autre commentaires",
          type: TableType.TEXTAREA,
        }),
      },
    },
  });

  private _contact = new Section({
    commentaire: "Contact",
    columnsGroup: {
      contactNom: {
        contactNom: new Column({
          commentaire: "Nom",
          type: TableType.STRING,
        }),
      },
      contactMail: {
        contactMail: new Column({
          commentaire: "Mail",
          type: TableType.STRING,
        }),
      },
      contactPhone: {
        contactPhone: new Column({
          commentaire: "Téléphone",
          type: TableType.STRING,
        }),
      },
      codePostal: {
        codePostal: new Column({
          commentaire: "Code postal",
          type: TableType.STRING,
        }),
      },
    },
  });

  private _autorisation = new Section({
    commentaire: "Autorisation",
    columnsGroup: {
      conditionsLuesEtAcceptes: {
        conditionsLuesEtAcceptes: new Column({
          commentaire:
            "Le propriétaire du bâtit a coché sur la case. Ce devrait être systématique, sauf pour les ajouts provenant de recensements divers (Nebreska Construction, RFCP)",
          type: TableType.BOOLEAN,
        }),
      },
    },
  });

  get allSections(): { [key: string]: Section } {
    return {
      definition: this._definition,
      informationsGenerales: this._informationsGenerales,
      photo: this._photo,
      natureDesTravaux: this._natureDesTravaux,
      chronologie: this._chronologie,
      botteDePaille: this._botteDePaille,
      chantier: this._chantier,
      construction: this._construction,
      revetement: this._revetement,
      actricesActeurs: this._actricesActeurs,
      commentaire: this._commentaire,
      contact: this._contact,
      autorisation: this._autorisation,
    };
  }

  get latitude(): number {
    return this._definition.columnsGroup.latitudeLongitude.latitudeLongitude
      .value.value.latitude;
  }

  set latitude(latitude: number) {
    if (!isNaN(latitude)) {
      this._definition.columnsGroup.latitudeLongitude.latitudeLongitude.value.value.latitude =
        Number(latitude);
    }
  }

  get longitude(): number {
    return this._definition.columnsGroup.latitudeLongitude.latitudeLongitude
      .value.value.longitude;
  }

  set longitude(longitude: number) {
    if (!isNaN(longitude)) {
      this._definition.columnsGroup.latitudeLongitude.latitudeLongitude.value.value.longitude =
        Number(longitude);
    }
  }
}
