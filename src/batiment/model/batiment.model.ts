import type { UsageBatiment } from "./enumerations/usage-batiment.model";
import type { TaillesBottes } from "./enumerations/tailles-bottes.model";
import type { Cereale } from "./enumerations/cereale.model";
import type { YesNoPartial } from "./enumerations/yes-no-partial.model";
import type { StructureComplementaire } from "./enumerations/structure-complementaire.model";
import type { IntegBaie } from "./enumerations/integ-baie.model";
import type { SupportAncrage } from "./enumerations/support-ancrage.model";
import type { RevetInt } from "./enumerations/revet-int.model";
import type { RevetExt } from "./enumerations/revet-ext.model";

export class Batiment {
  constructor(
    // Definition
    public id?: string,
    public latitude?: number,
    public longitude?: number,
    public nomBatiment?: string | null,

    // InformationsGenerales,
    public usageBatiment?: UsageBatiment | null,
    public usageBatimentInfos?: string | null,
    public cout?: number | null,
    public surfacePlancher?: number | null,
    public niveaux?: number | null,

    // Photo
    public photoPrincipaleContentType?: string | null,
    public photoPrincipale?: string | null,
    public photoPrincipaleLegende?: string | null,
    public photoPrincipaleDescription?: string | null,
    public photo1ContentType?: string | null,
    public photo1?: string | null,
    public photo1Legende?: string | null,
    public photo1Description?: string | null,
    public photo2ContentType?: string | null,
    public photo2?: string | null,
    public photo2Legende?: string | null,
    public photo2Description?: string | null,
    public photo3ContentType?: string | null,
    public photo3?: string | null,
    public photo3Legende?: string | null,
    public photo3Description?: string | null,
    public photo4ContentType?: string | null,
    public photo4?: string | null,
    public photo4Legende?: string | null,
    public photo4Description?: string | null,
    public photo5ContentType?: string | null,
    public photo5?: string | null,
    public photo5Legende?: string | null,
    public photo5Description?: string | null,

    // NatureDesTravaux
    public travauxNeuf?: boolean | null,
    public travauxExtension?: boolean | null,
    public travauxRenov?: boolean | null,
    public travauxIte?: boolean | null,
    public travauxIti?: boolean | null,

    // Chronologie
    public constructionDebut?: Date | null,
    public constructionFin?: Date | null,

    // BotteDePaille
    public bottesTaille?: TaillesBottes | null,
    public bottesTailleInfos?: string | null,
    public bottesDensite?: number | null,
    public bottesCereale?: Cereale | null,

    // Chantier
    public distanceAppro?: number | null,
    public autoconstruction?: YesNoPartial | null,
    public participatif?: YesNoPartial | null,

    // Construction
    public structCompl?: boolean | null,
    public structComplNature?: StructureComplementaire | null,
    public structComplInfos?: string | null,
    public longMaxSansMurRefend?: number | null,
    public noteCalcul?: boolean | null,
    public nbrRangDeBottes?: number | null,
    public integBaie?: IntegBaie | null,
    public integBaieInfos?: string | null,
    public supportAncrage?: SupportAncrage | null,
    public supportAncrageInfos?: string | null,

    // Revetement
    public revetInt?: RevetInt | null,
    public revetIntInfos?: string | null,
    public revetExt?: RevetExt | null,
    public revetExtInfos?: string | null,

    // ActricesActeurs
    public maitreDOuvrage?: string | null,
    public maitreDOeuvre?: string | null,
    public architecte?: string | null,
    public bureauDEtudeStructure?: string | null,
    public bureauControl?: string | null,
    public entrepriseBottes?: string | null,
    public entrepriseCharpente?: string | null,
    public entrepriseEnduits?: string | null,

    // Commentaire
    public descriptionProjet?: string | null,
    public difficultees?: string | null,
    public astuces?: string | null,
    public divers?: string | null,

    // Contact
    public contactNom?: string | null,
    public contactMail?: string | null,
    public contactPhone?: string | null,
    public codePostal?: string | null,

    // Autorisation
    public conditionsLuesEtAcceptes?: boolean | null,

    // Owner
    public owner?: string
  ) {
    this.travauxNeuf = this.travauxNeuf ?? false;
    this.travauxExtension = this.travauxExtension ?? false;
    this.travauxRenov = this.travauxRenov ?? false;
    this.travauxIte = this.travauxIte ?? false;
    this.travauxIti = this.travauxIti ?? false;
    this.structCompl = this.structCompl ?? false;
    this.noteCalcul = this.noteCalcul ?? false;
  }
}
