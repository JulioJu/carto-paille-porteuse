import Parse from "parse/dist/parse.min.js";

import constantes from "@/constantes";

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
//
// * You should allow custom object id https://www.back4app.com/docs/platform/custom-parse-options

const batimentSchema = new Parse.Schema(constantes.table.batiment);

const droptablesCreated = async () => {
  await Promise.all(
    [
      constantes.table.batiment,
      constantes.table.cereale,
      constantes.table.integBaie,
      constantes.table.revetementInterieur,
      constantes.table.revetementExterieur,
      constantes.table.structureComplementaire,
      constantes.table.supportAncrage,
      constantes.table.taillesBottes,
      constantes.table.usageBatiment,
      constantes.table.yesNoPartial,
    ].map(async (table: string) => {
      await new Parse.Schema(table).purge();
      await new Parse.Schema(table).delete();
    })
  );
};
const general = () => {
  batimentSchema.addGeoPoint("coordonnees");
  batimentSchema.addString("nomBatiment");
};

const photos = () => {
  ["Principale", "1", "2", "3", "4", "5"].forEach((name: string) => {
    batimentSchema.addFile(`photo${name}`);
    batimentSchema.addString(`photo${name}Legende`);
    batimentSchema.addString(`photo${name}Description`);
  });
};

const informationsGenerales = async () => {
  const createUsageBAtiment = async () => {
    const usageBatiment = new Parse.Object(constantes.table.usageBatiment);
    usageBatiment.set("objectId", "LOGEMENT_COLLECTIF");
    usageBatiment.set("objectId", "LOGEMENT_INDIVIDUEL");
    usageBatiment.set("objectId", "LOGEMENT_INDIVIDUEL_GROUPE");
    usageBatiment.set("objectId", "BATIMENT_ADMINISTRATIF");
    usageBatiment.set("objectId", "BATIMENT_COMMERCIAL");
    usageBatiment.set("objectId", "BATIMENT_INDUSTRIEL");
    usageBatiment.set("objectId", "BATIMENT_DE_LOISIRS");
    usageBatiment.set("objectId", "BATIMENT_DE_SANTE");
    usageBatiment.set("objectId", "BATIMENT_DE_RETRAITE");
    usageBatiment.set("objectId", "BATIMENT_EDUCATIF");
    usageBatiment.set("objectId", "BATIMENT_SOCIO_CULTUREl");
    usageBatiment.set("objectId", "BATIMENT_AGRICOLE");
    usageBatiment.set("objectId", "OUVRAGE_EXCEPTIONNEL");
    usageBatiment.set("objectId", "AUTRE");
    await usageBatiment.save();
  };
  await createUsageBAtiment();
  batimentSchema.addPointer("usageBatiment", constantes.table.usageBatiment);
  batimentSchema.addString("usageBatimentInfos");
  // Coût [€]
  batimentSchema.addNumber("cout");
  // Surface de plancher [m²]
  batimentSchema.addNumber("surfacePlancher");
  // Nombre de niveaux du bâtiment (ex: RDC = 1, 1 étage = 2 niveau, sous-sol
  // non compté)
  batimentSchema.addNumber("niveaux");
};

const natureDesTravaux = () => {
  batimentSchema.addBoolean("travauxNeuf");
  batimentSchema.addBoolean("travauxExtension");
  batimentSchema.addBoolean("travauxRenovation");
  // Isolation thermique par l'extérieure
  batimentSchema.addBoolean("travauxIte");
  // Isolation thermique par l'intérieur
  batimentSchema.addBoolean("travauxIti");
};

const chronologie = () => {
  batimentSchema.addDate("constructionDebut");
  // Achèvement
  batimentSchema.addDate("constructionFin");
};

const botteDePaille = async () => {
  const createTaillesBottes = async () => {
    const taillesBottes = new Parse.Object(constantes.table.taillesBottes);
    taillesBottes.set("objectId", "T_70_X_120_X_230_CM");
    taillesBottes.set("objectId", "T_50_X_80_X_110_a_200_CM");
    taillesBottes.set("objectId", "T_36_X_46_X_70_a_120_CM");
    taillesBottes.set("objectId", "AUTRE");
    await taillesBottes.save();
  };
  const createCereale = async () => {
    const cereale = new Parse.Object(constantes.table.cereale);
    cereale.set("objectId", "BLE");
    cereale.set("objectId", "ORGE");
    cereale.set("objectId", "AVOINE");
    cereale.set("objectId", "SEIGLE");
    cereale.set("objectId", "TRITICALE");
    cereale.set("objectId", "RIZ");
    cereale.set("objectId", "AUTRE");
    await cereale.save();
  };
  await createTaillesBottes();
  batimentSchema.addPointer("bottesTaille", constantes.table.taillesBottes);
  batimentSchema.addString("bottesTailleInfos");
  // Densité sur base sèche [kg/m³]
  batimentSchema.addNumber("bottesDensiteSurBaseSeche");
  await createCereale();
  batimentSchema.addPointer("bottesCereale", constantes.table.cereale);
  // Distance d'approvisionnement [km]
  batimentSchema.addNumber("distanceApprovisionnement");
};

const chantier = async () => {
  const createYesNoPartial = async () => {
    const yesNoPartial = new Parse.Object(constantes.table.yesNoPartial);
    yesNoPartial.set("objectId", "OUI");
    yesNoPartial.set("objectId", "NON");
    yesNoPartial.set("objectId", "PARTIEL");
    await yesNoPartial.save();
  };
  await createYesNoPartial();
  batimentSchema.addPointer("autoconstruction", constantes.table.yesNoPartial);
  batimentSchema.addPointer("participatif", constantes.table.yesNoPartial);
};

const construction = async () => {
  // Structure complémentaire à la structure en paille porteuse (poteau, mur de
  // refend, …)
  const createStructureComplementaire = async () => {
    const structureComplementaire = new Parse.Object(
      constantes.table.structureComplementaire
    );
    structureComplementaire.set("objectId", "BOIS");
    structureComplementaire.set("objectId", "BETON_ARME");
    structureComplementaire.set("objectId", "METAL");
    // Maçonnerie [brique - parpaing - pierre - …]
    structureComplementaire.set("objectId", "MACONNERIE");
    structureComplementaire.set("objectId", "AUTRE");
    await structureComplementaire.save();
  };
  const createIntegBaie = async () => {
    const integBaie = new Parse.Object(constantes.table.integBaie);
    // Pré-cadre flottant
    integBaie.set("objectId", "PRE_CADRE_FLOTTANT");
    // Élément coulissant
    integBaie.set("objectId", "COULISSANT");
    // Élément fixe [poteau - montant - …]
    integBaie.set("objectId", "FIXE");
    integBaie.set("objectId", "AUTRE");
    await integBaie.save();
  };
  const createSupportAncrage = async () => {
    const supportAncrage = new Parse.Object(constantes.table.supportAncrage);
    supportAncrage.set("objectId", "BOIS");
    supportAncrage.set("objectId", "BETON_ARME");
    supportAncrage.set("objectId", "METAL");
    // Maçonnerie [brique - parpaing - pierre - …]
    supportAncrage.set("objectId", "MACONNERIE");
    supportAncrage.set("objectId", "AUTRE");
    await supportAncrage.save();
  };
  const revetement = async () => {
    const createRevetementInterieur = async () => {
      const revetementDesBaies = new Parse.Object(constantes.table.revetementInterieur);
      revetementDesBaies.set("objectId", "PLAQUE_DE_PLATRE");
      revetementDesBaies.set("objectId", "LAMBRIS");
      revetementDesBaies.set("objectId", "ENDUIT_TERRE");
      revetementDesBaies.set("objectId", "ENDUIT_CHAUX");
      revetementDesBaies.set("objectId", "ENDUIT_TERRE_ET_CHAUX");
      revetementDesBaies.set("objectId", "ENDUIT_PLATRE");
      revetementDesBaies.set("objectId", "AUTRE");
      await revetementDesBaies.save();
    };
    const createRevetementExterieur = async () => {
      const revetementExterieur = new Parse.Object(constantes.table.revetementExterieur);
      revetementExterieur.set("objectId", "BARDAGE_VENTILE");
      revetementExterieur.set("objectId", "ENDUIT_TERRE");
      revetementExterieur.set("objectId", "ENDUIT_TERRE_ET_CHAUX");
      revetementExterieur.set("objectId", "ENDUIT_PLATRE");
      revetementExterieur.set("objectId", "ENDUIT_PANNEAU");
      revetementExterieur.set("objectId", "AUTRE");
      await revetementExterieur.save();
    };
    await createRevetementInterieur();
    batimentSchema.addPointer("revetementInterieur", constantes.table.revetementInterieur);
    batimentSchema.addString("revetementInterieurInfos");
    await createRevetementExterieur();
    batimentSchema.addPointer("revetementExterieur", constantes.table.revetementExterieur);
    batimentSchema.addString("revetementExterieurInfos");
  };
  batimentSchema.addBoolean("structCompl");
  await createStructureComplementaire();
  batimentSchema.addPointer("structComplNature", constantes.table.structureComplementaire);
  batimentSchema.addString("structComplInfos");
  // Longueur maximum sans mur de refend (mètre)
  batimentSchema.addNumber("longMaxSansMurRefend");
  batimentSchema.addBoolean("noteCalcul");
  batimentSchema.addNumber("nbrRangDeBottes");
  await createIntegBaie();
  batimentSchema.addPointer("integBaie", constantes.table.integBaie);
  batimentSchema.addString("integBaieInfos");
  await createSupportAncrage();
  batimentSchema.addPointer("supportAncrage", constantes.table.supportAncrage);
  batimentSchema.addString("supportAncrageInfos");
  await revetement();
};

const actricesActeurs = () => {
  batimentSchema.addString("maitreDOuvrage");
  batimentSchema.addString("maitreDOeuvre");
  batimentSchema.addString("architecte");
  batimentSchema.addString("bureauDEtudeStructure");
  batimentSchema.addString("bureauControl");
  // Entreprise de mise en oeuvre des bottes, si autoconstruction le préciser
  batimentSchema.addString("entrepriseBottes");
  // Entreprise de mise en oeuvre de la charpente, si autoconstruction le
  // préciser
  batimentSchema.addString("entrepriseCharpente");
  // Entreprise de mise en oeuvre des enduits, si autoconstruction le préciser
  batimentSchema.addString("entrepriseEnduits");
};

const commentaires = () => {
  batimentSchema.addString("descriptionProjet");
  // Difficultés rencontrés
  batimentSchema.addString("difficultees");
  // Trucs et astuces
  batimentSchema.addString("astuces");
  // Autre commentaires
  batimentSchema.addString("divers");
};

const contacts = () => {
  batimentSchema.addString("contactNom");
  batimentSchema.addString("contactMail");
  batimentSchema.addString("contactPhone");
  batimentSchema.addString("contactPostal");
};

const buildTableSchemaBatiment = async () => {
  general();
  photos();
  await informationsGenerales();
  natureDesTravaux();
  chronologie();
  await botteDePaille();
  await chantier();
  await construction();
  actricesActeurs();
  commentaires();
  contacts();
  batimentSchema.addBoolean("conditionsLuesEtAcceptes");
  batimentSchema.addPointer("owner", constantes.table.user);
  const batimentSchemaResult = await batimentSchema.save();
  console.info(batimentSchemaResult);
};

const main = async () => {
  // await droptablesCreated();
  // await buildTableSchemaBatiment();
  const gameScore = new Parse.Object("GameScore");

  gameScore.id = "1337";
  gameScore.set("toto", "1337");
  await gameScore.save();
}

export default () => {
  main().catch((error) => {
    alert("Error, see JavaScript Console");
    console.error(error);
  });
};
