import { TableEnum } from "./batiment-dropdown";
import {
  Column,
  ColumnsGroup,
  Section,
  TableType,
  Validation,
} from "./Section";
import Parse from "parse/dist/parse.min.js";

export default class BatimentSection {
  private _definition = new Section({
    commentaire: "Définition",
    columnsGroups: {
      objectIdGroup: new ColumnsGroup({
        commentaire: null,
        columns: {
          objectId: new Column({
            commentaire: "Identifiant",
            type: TableType.STRING,
            generatedByBack: true,
            cssClass: "display-none",
          }),
        },
      }),
      latitudeLongitudeGroup: new ColumnsGroup({
        commentaire: null,
        columns: {
          latitudeLongitude: new Column({
            commentaire: "Latitude et longitude",
            type: TableType.GEOPOINT,
            validation: new Validation({ required: true }),
          }),
        },
      }),
      nomBatimentGroup: new ColumnsGroup({
        commentaire: null,
        columns: {
          nomBatiment: new Column({
            commentaire: "Nom du bâtiment",
            type: TableType.STRING,
          }),
        },
      }),
      ownerGroup: new ColumnsGroup({
        commentaire: null,
        columns: {
          owner: new Column({
            commentaire: "Droits modification & suppression",
            type: TableType.USER,
            generatedByBack: true,
            cssClass: "display-none",
          }),
        },
      }),
    },
  });

  private _informationsGenerales = new Section({
    commentaire: "Informations générales",
    columnsGroups: {
      usageBatimentGroup: new ColumnsGroup({
        commentaire: null,
        columns: {
          usageBatiment: new Column({
            commentaire: "Usage",
            type: TableEnum.UsageBatiment,
          }),
          usageBatimentInfos: new Column({
            commentaire: "Infos sur l'usage du bâtiment",
            type: TableType.TEXTAREA,
          }),
        },
      }),
      coutTravauxTTCGroup: new ColumnsGroup({
        commentaire: null,
        columns: {
          coutTravauxTTC: new Column({
            commentaire: "Coût travaux TTC (hors études) (€)",
            type: TableType.NUMBER,
          }),
        },
      }),
      surfacePlancherGroup: new ColumnsGroup({
        commentaire: null,
        columns: {
          surfacePlancher: new Column({
            commentaire: "Surface de plancher (m²)",
            type: TableType.NUMBER,
          }),
        },
      }),
      niveauxGroup: new ColumnsGroup({
        commentaire: null,
        columns: {
          niveaux: new Column({
            commentaire:
              "Nombre de niveaux du bâtiment (ex: RDC = 1, 1 étage = 2 niveau, sous-sol non compté)",
            type: TableType.NATURAL_NUMBER,
          }),
        },
      }),
    },
  });

  private _photo = new Section({
    commentaire: "Photos",
    columnsGroups: {
      photoPrincipaleGroup: new ColumnsGroup({
        commentaire: "Photo principale",
        columns: {
          photoPrincipale: new Column({
            commentaire: null,
            type: TableType.IMAGE,
          }),
          photoPrincipaleLegende: new Column({
            commentaire: "légende",
            type: TableType.STRING,
            validation: new Validation({
              maxlength: 30,
            }),
          }),
          photoPrincipaleDescription: new Column({
            commentaire: "description",
            type: TableType.TEXTAREA,
          }),
        },
      }),
      photo1Group: new ColumnsGroup({
        commentaire: "Photo 1",
        columns: {
          photo1: new Column({
            commentaire: null,
            type: TableType.IMAGE,
          }),
          photo1Legende: new Column({
            commentaire: "légende",
            type: TableType.STRING,
            validation: new Validation({
              maxlength: 30,
            }),
          }),
          photo1Description: new Column({
            commentaire: "description",
            type: TableType.TEXTAREA,
          }),
        },
      }),
      photo2Group: new ColumnsGroup({
        commentaire: "Photo 2",
        columns: {
          photo2: new Column({
            commentaire: null,
            type: TableType.IMAGE,
          }),
          photo2Legende: new Column({
            commentaire: "légende",
            type: TableType.STRING,
            validation: new Validation({
              maxlength: 30,
            }),
          }),
          photo2Description: new Column({
            commentaire: "description",
            type: TableType.TEXTAREA,
          }),
        },
      }),
      photo3Group: new ColumnsGroup({
        commentaire: "Photo 3",
        columns: {
          photo3: new Column({
            commentaire: null,
            type: TableType.IMAGE,
          }),
          photo3Legende: new Column({
            commentaire: "légende",
            type: TableType.STRING,
            validation: new Validation({
              maxlength: 30,
            }),
          }),
          photo3Description: new Column({
            commentaire: "description",
            type: TableType.TEXTAREA,
          }),
        },
      }),
      photo4Group: new ColumnsGroup({
        commentaire: "Photo 4",
        columns: {
          photo4: new Column({
            commentaire: null,
            type: TableType.IMAGE,
          }),
          photo4Legende: new Column({
            commentaire: "légende",
            type: TableType.STRING,
            validation: new Validation({
              maxlength: 30,
            }),
          }),
          photo4Description: new Column({
            commentaire: "description",
            type: TableType.TEXTAREA,
          }),
        },
      }),
      photo5Group: new ColumnsGroup({
        commentaire: "Photo 5",
        columns: {
          photo5: new Column({
            commentaire: null,
            type: TableType.IMAGE,
          }),
          photo5Legende: new Column({
            commentaire: "légende",
            type: TableType.STRING,
            validation: new Validation({
              maxlength: 30,
            }),
          }),
          photo5Description: new Column({
            commentaire: "description",
            type: TableType.TEXTAREA,
          }),
        },
      }),
    },
  });

  private _natureDesTravaux = new Section({
    commentaire: "Nature des travaux",
    columnsGroups: {
      travauxNeufGroup: new ColumnsGroup({
        commentaire: null,
        columns: {
          travauxNeuf: new Column({
            commentaire: "Neuf",
            type: TableType.BOOLEAN,
          }),
        },
      }),
      travauxExtensionGroup: new ColumnsGroup({
        commentaire: null,
        columns: {
          travauxExtension: new Column({
            commentaire: "Extension",
            type: TableType.BOOLEAN,
          }),
        },
      }),
      travauxRenovGroup: new ColumnsGroup({
        commentaire: null,
        columns: {
          travauxRenov: new Column({
            commentaire: "Rénovation",
            type: TableType.BOOLEAN,
          }),
        },
      }),
      travauxIteGroup: new ColumnsGroup({
        commentaire: null,
        columns: {
          travauxIte: new Column({
            commentaire: "Isolation thermique par l'extérieur",
            type: TableType.BOOLEAN,
          }),
        },
      }),
      travauxItiGroup: new ColumnsGroup({
        commentaire: null,
        columns: {
          travauxIti: new Column({
            commentaire: "Isolation thermique par l'intérieur",
            type: TableType.BOOLEAN,
          }),
        },
      }),
    },
  });

  private _chronologie = new Section({
    commentaire: "Chronologie",
    columnsGroups: {
      constructionDebutGroup: new ColumnsGroup({
        commentaire: null,
        columns: {
          constructionDebut: new Column({
            commentaire: "Début de construction",
            type: TableType.DATE,
          }),
        },
      }),
      constructionFinGroup: new ColumnsGroup({
        commentaire: null,
        columns: {
          constructionFin: new Column({
            commentaire: "Achèvement",
            type: TableType.DATE,
          }),
        },
      }),
    },
  });

  private _botteDePaille = new Section({
    commentaire: "Botte de paille",
    columnsGroups: {
      bottesTailleGroup: new ColumnsGroup({
        commentaire: null,
        columns: {
          bottesTaille: new Column({
            commentaire: "Taille des bottes",
            type: TableEnum.TaillesBottes,
          }),
          bottesTailleInfos: new Column({
            commentaire: "Infos sur la taille des bottes",
            type: TableType.TEXTAREA,
          }),
        },
      }),
      bottesDensiteGroup: new ColumnsGroup({
        commentaire: null,
        columns: {
          bottesDensite: new Column({
            commentaire: "Bottes, densité sur base sèche (kg/m³)",
            type: TableType.NUMBER,
          }),
        },
      }),
      bottesCerealeGroup: new ColumnsGroup({
        commentaire: null,
        columns: {
          bottesCereale: new Column({
            commentaire: "Bottes, céréale",
            type: TableEnum.Cereale,
          }),
        },
      }),
      bottesDistanceApprovisionnementGroup: new ColumnsGroup({
        commentaire: null,
        columns: {
          bottesDistanceApprovisionnement: new Column({
            commentaire: "Bottes, distance d'approvisionnement (km)",
            type: TableType.NUMBER,
          }),
        },
      }),
    },
  });

  private _chantier = new Section({
    commentaire: "Chantier",
    columnsGroups: {
      autoconstructionGroup: new ColumnsGroup({
        commentaire: null,
        columns: {
          autoconstruction: new Column({
            commentaire: "Autoconstruction",
            type: TableEnum.YesNoPartial,
          }),
        },
      }),
      participatifGroup: new ColumnsGroup({
        commentaire: null,
        columns: {
          participatif: new Column({
            commentaire: "Participatif",
            type: TableEnum.YesNoPartial,
          }),
        },
      }),
    },
  });

  private _construction = new Section({
    commentaire: "Construction",
    columnsGroups: {
      structComplGroup: new ColumnsGroup({
        commentaire: null,
        columns: {
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
      }),
      longMaxSansMurRefendGroup: new ColumnsGroup({
        commentaire: null,
        columns: {
          longMaxSansMurRefend: new Column({
            commentaire: "Longueur maximum sans mur de refend (mètre)",
            type: TableType.NUMBER,
          }),
        },
      }),
      noteCalculGroup: new ColumnsGroup({
        commentaire: null,
        columns: {
          noteCalcul: new Column({
            commentaire: "Note de calcul",
            type: TableType.BOOLEAN,
          }),
        },
      }),
      nbrRangDeBottesGroup: new ColumnsGroup({
        commentaire: null,
        columns: {
          nbrRangDeBottes: new Column({
            commentaire: "Nombre de rangs de bottes",
            type: TableType.NATURAL_NUMBER,
          }),
        },
      }),
      integBaieGroup: new ColumnsGroup({
        commentaire: null,
        columns: {
          integBaie: new Column({
            commentaire: "Intégration des baies",
            type: TableEnum.IntegBaie,
          }),
          integBaieInfos: new Column({
            commentaire: "Infos sur l'intégration des baies",
            type: TableType.TEXTAREA,
          }),
        },
      }),
      supportAncrageGroup: new ColumnsGroup({
        commentaire: null,
        columns: {
          supportAncrage: new Column({
            commentaire: "Nature du support d'ancrage",
            type: TableEnum.SupportAncrage,
          }),
          supportAncrageInfos: new Column({
            commentaire: "Infos sur le support d'ancrage",
            type: TableType.TEXTAREA,
          }),
        },
      }),
    },
  });

  private _revetement = new Section({
    commentaire: "Revêtement",
    columnsGroups: {
      revetIntGroup: new ColumnsGroup({
        commentaire: null,
        columns: {
          revetInt: new Column({
            commentaire: "Revêtement intérieur",
            type: TableEnum.RevetementInterieur,
          }),
          revetIntInfos: new Column({
            commentaire: "Infos sur le revêtement intérieur",
            type: TableType.TEXTAREA,
          }),
        },
      }),
      revetExtGroup: new ColumnsGroup({
        commentaire: null,
        columns: {
          revetExt: new Column({
            commentaire: "Revêtement extérieur",
            type: TableEnum.RevetementExterieur,
          }),
          revetExtInfos: new Column({
            commentaire: "Infos sur le revêtement extérieur",
            type: TableType.TEXTAREA,
          }),
        },
      }),
    },
  });

  private _actricesActeurs = new Section({
    commentaire: "Actrices / acteurs",
    columnsGroups: {
      maitreDOuvrageGroup: new ColumnsGroup({
        commentaire: null,
        columns: {
          maitreDOuvrage: new Column({
            commentaire: "Maître d'ouvrage",
            type: TableType.STRING,
          }),
        },
      }),
      maitreDOeuvreGroup: new ColumnsGroup({
        commentaire: null,
        columns: {
          maitreDOeuvre: new Column({
            commentaire: "Maître d'œuvre",
            type: TableType.STRING,
          }),
        },
      }),
      architecteGroup: new ColumnsGroup({
        commentaire: null,
        columns: {
          architecte: new Column({
            commentaire: "Architecte",
            type: TableType.STRING,
          }),
        },
      }),
      bureauDEtudeStructureGroup: new ColumnsGroup({
        commentaire: null,
        columns: {
          bureauDEtudeStructure: new Column({
            commentaire: "Bureau d'étude Structure",
            type: TableType.STRING,
          }),
        },
      }),
      bureauControlGroup: new ColumnsGroup({
        commentaire: null,
        columns: {
          bureauControl: new Column({
            commentaire: "Bureau contrôle",
            type: TableType.STRING,
          }),
        },
      }),
      entrepriseBottesGroup: new ColumnsGroup({
        commentaire: null,
        columns: {
          entrepriseBottes: new Column({
            commentaire:
              "Entreprise de mise en œuvre des bottes, si autoconstruction le préciser",
            type: TableType.STRING,
          }),
        },
      }),
      entrepriseCharpenteGroup: new ColumnsGroup({
        commentaire: null,
        columns: {
          entrepriseCharpente: new Column({
            commentaire:
              "Entreprise de mise en oeuvre de la charpente, si autoconstruction le préciser",
            type: TableType.STRING,
          }),
        },
      }),
      entrepriseEnduitsGroup: new ColumnsGroup({
        commentaire: null,
        columns: {
          entrepriseEnduits: new Column({
            commentaire:
              "Entreprise de mise en oeuvre des enduits, si autoconstruction le préciser",
            type: TableType.STRING,
          }),
        },
      }),
    },
  });

  private _commentaire = new Section({
    commentaire: "Commentaire",
    columnsGroups: {
      descriptionProjetGroup: new ColumnsGroup({
        commentaire: null,
        columns: {
          descriptionProjet: new Column({
            commentaire: "Description du projet",
            type: TableType.TEXTAREA,
          }),
        },
      }),
      difficulteesGroup: new ColumnsGroup({
        commentaire: null,
        columns: {
          difficultees: new Column({
            commentaire: "Difficultés rencontrés",
            type: TableType.TEXTAREA,
          }),
        },
      }),
      astucesGroup: new ColumnsGroup({
        commentaire: null,
        columns: {
          astuces: new Column({
            commentaire: "Trucs et astuces",
            type: TableType.TEXTAREA,
          }),
        },
      }),
      diversGroup: new ColumnsGroup({
        commentaire: null,
        columns: {
          divers: new Column({
            commentaire: "Autre commentaires",
            type: TableType.TEXTAREA,
          }),
        },
      }),
    },
  });

  private _contact = new Section({
    commentaire: "Contact",
    columnsGroups: {
      contactNomGroup: new ColumnsGroup({
        commentaire: null,
        columns: {
          contactNom: new Column({
            commentaire: "Nom",
            type: TableType.STRING,
          }),
        },
      }),
      contactMailGroup: new ColumnsGroup({
        commentaire: null,
        columns: {
          contactMail: new Column({
            commentaire: "Mail",
            type: TableType.STRING,
          }),
        },
      }),
      contactPhoneGroup: new ColumnsGroup({
        commentaire: null,
        columns: {
          contactPhone: new Column({
            commentaire: "Téléphone",
            type: TableType.STRING,
          }),
        },
      }),
      codePostalGroup: new ColumnsGroup({
        commentaire: null,
        columns: {
          codePostal: new Column({
            commentaire: "Code postal",
            type: TableType.STRING,
          }),
        },
      }),
    },
  });

  private _autorisation = new Section({
    commentaire: "Autorisation",
    columnsGroups: {
      conditionsLuesEtAcceptesGroup: new ColumnsGroup({
        commentaire: null,
        columns: {
          conditionsLuesEtAcceptes: new Column({
            commentaire:
              "Vous avez lu et vous acceptez les <a href='http://localhost/legal-info'>CGU</a>. Vous êtes avertis que les données sont publiques. Afin d'éviter tout problème, nous vous conseillons de ne pas ne pas placer votre bâtit sur la carte de manière exacte.",
            type: TableType.BOOLEAN,
          }),
        },
      }),
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

  get id(): string | null {
    return this._definition.columnsGroups.objectIdGroup.columns.objectId.vueRef
      .value;
  }

  get latitude(): number {
    return this._definition.columnsGroups.latitudeLongitudeGroup.columns
      .latitudeLongitude.vueRef.value.latitude;
  }

  set latitude(latitude: number) {
    if (!isNaN(latitude)) {
      this._definition.columnsGroups.latitudeLongitudeGroup.columns.latitudeLongitude.vueRef.value.latitude =
        Number(latitude);
    }
  }

  get longitude(): number {
    return this._definition.columnsGroups.latitudeLongitudeGroup.columns
      .latitudeLongitude.vueRef.value.longitude;
  }

  set longitude(longitude: number) {
    if (!isNaN(longitude)) {
      this._definition.columnsGroups.latitudeLongitudeGroup.columns.latitudeLongitude.vueRef.value.longitude =
        Number(longitude);
    }
  }

  get isOwner(): boolean {
    if (!Parse.User.current()?.authenticated) {
      return false;
    }
    return (
      this._definition.columnsGroups.ownerGroup.columns.owner.vueRef.value
        ?.id === Parse.User.current()?.id
    );
  }

  get autorisation(): boolean {
    return this._autorisation.columnsGroups.conditionsLuesEtAcceptesGroup
      .columns.conditionsLuesEtAcceptes.vueRef.value;
  }

  autorisationSetToFalse() {
    this._autorisation.columnsGroups.conditionsLuesEtAcceptesGroup.columns.conditionsLuesEtAcceptes.vueRef.value =
      false;
  }
}
