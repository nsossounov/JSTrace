export enum TracePhoneRole {
  NORMAL = 1,
  AMBIG,
  ALLOPHONE,
  OTHER,
}

/**
 * POW, VOC, DIF, ACU, GRD, VOI, BR
 */
export const CONTINUA_PER_FEATURE = 3
//export const NUM_FEATURES = 9
export const NUM_FEATURES = 30
export interface TracePhone {
  label: string
  features: number[]
  durationScalar: number[]
  phonologicalRole: TracePhoneRole
}

export interface TraceWord {
  phon: string
  label?: string
  freq: number
  prime: number
  valid?: boolean
}

export interface Decay {
  F?: number
  P?: number
  W?: number
}

export interface Rest {
  F?: number
  P?: number
  W?: number
}

export interface Alpha {
  IF?: number
  FP?: number
  PW?: number
  WP?: number
  PF?: number
}

export interface Gamma {
  F?: number
  P?: number
  W?: number
}

export interface RdlNode {
  RDL_rest_s: number // = 0.06
  RDL_rest_c: number // = 1.0

  /**
   * ph->wd connection frequency effect:
   *   phoneme-to-word transmission is scaled by frequency values.
   */
  RDL_wt_s: number // = 0.13
  RDL_wt_c: number // = 1.0

  /**
   * post-perceptual frequenct effect:
   *   LCR analysis calculation scales word responce probabilities by freq values.
   */
  //RDL_post_s: number //purposely left out of specification
  RDL_post_c: number // = 15.0
}

export interface TraceAllophoneRelation {
  phon1: string
  phon2: string
}

export default interface TraceConfig {
  user?: string
  dateTime?: string
  comment?: string
  modelInput: string
  spread: number[]
  spreadScale: number[]
  min: number
  max: number
  /**
   * how many cycles should trace do in each step;
   * nreps can seriously affect the rate at which perceptual affects seem to take effect
   * versus how recently the input was presented.  with a high nreps value, an input will
   * be presented but words may seem to take relatively long time to become active.
   */
  nreps: number
  /** tracenet will put a new phoneme/word unit every slicesPerPhon fslices */
  slicesPerPhon: number
  /** number of feature slices */
  fSlices: number
  /** rate at which F P W layers dacay */
  decay: Decay
  /** resting level at F P W layers. */
  rest: Rest
  /** strength of excitatory connections between following layer pairs?: IF FP PF PW WP  */
  alpha: Alpha
  /** strength of inhibitory connections at F P W layers */
  gamma: Gamma
  /** current lexicon */
  lexicon: TraceWord[]
  /*
  private TraceFunctionList functionList;*/
  /** input a new feature every deltaInput slices, similar to PEAKp(i) calculation */
  deltaInput: number
  /** amount of input noise */
  noiseSD: number
  /** amount of processing noise */
  stochasticitySD: number

  //attention, phoneme learning rate params (cf. Mirman et al. 2005)
  atten: number
  bias: number
  learningrate: number
  /** length normalization?: binary */
  lengthNormalization: number

  /** lexical frequency parameters. stores variables for three type of lexical frequency effects */
  freqNode: RdlNode
  /** priming parameters. stores variables for three type of lexical priming */
  primeNode: RdlNode
  /** ambiguous phoneme continuum parameters. three character mnemonic specify the current phoneme continuum. */
  continuumSpec: string
  phonology: TracePhone[]
  allophoneRelations: TraceAllophoneRelation[]
}

export const createDefaultPhoneme = (): TracePhone => ({
  label: '',
  features: Array(NUM_FEATURES * CONTINUA_PER_FEATURE).fill(0),
  durationScalar: Array(CONTINUA_PER_FEATURE).fill(1),
  phonologicalRole: TracePhoneRole.NORMAL,
})

/**
 * Creates a TraceConfig object with default values. Uses a function
 * instead of a const to prevent reference from getting mutated.
 */
export const createDefaultConfig = (): TraceConfig => ({
  modelInput: '-^br^pt-',
  spread: [6, 6, 6, 6, 6, 6, 6],
  spreadScale: [1, 1, 1, 1, 1, 1, 1],
  min: -0.3,
  max: 1.0,
  nreps: 1,
  slicesPerPhon: 3,
  fSlices: 99,
  decay: {
    F: 0.01,
    P: 0.02,
    W: 0.04,
  },
  rest: {
    F: -0.1,
    P: -0.1,
    W: -0.01,
  },
  alpha: {
    IF: 1.0,
    FP: 0.04,
    PW: 0.05,
    WP: 0.01,
    PF: 0.0,
  },
  gamma: {
    F: 0.02,
    P: 0.04,
    W: 0.03,
  },
  deltaInput: 6,
  noiseSD: 0,
  stochasticitySD: 0,
  atten: 1.0,
  bias: 0.0,
  learningrate: 0.0,
  lengthNormalization: 0,
  phonology: [

    {
label: 'p',
features: [
   1, /*UNVOICE*/
   0, /*VOICE*/
   0, /*SONORANT*/
   1, /*NONSONORANT*/
   0, /*LIQUID*/
   0, /*SEMI-GLIDE*/
   0, /*VOCALIC*/
   1, /*STOP*/
   0, /*NASAL*/
   0.0, /*FRICATIVE*/
   0.0, /*AFFRICATE*/
   0.0, /*APPROXIMANT*/
   0.0, /*LATERAL*/
   0.7, /*BILABIAL*/
   0.2, /*LABIODENTAL*/
   0.1, /*DENTAL*/
   0.0, /*ALVEROLAR*/
   0.0, /*POSTALVEOLAR*/
   0.0, /*PALATAL*/
   0.0, /*VELAR*/
   0.0, /*GLOTTAL*/
   0.0, /*FB1A*/
   0.0, /*FB2A*/
   0.0, /*FB3A*/
   0.0, /*FB4A*/
   0.0, /*FB5A*/
   0.0, /*HL1A*/
   0.0, /*HL2A*/
   0.0, /*HL3A*/
   0.0, /*HL4A*/
   0.0, /*HL5A*/
   0.0, /*HL6A*/
   0.0, /*FB1B*/
   0.0, /*FB2B*/
   0.0, /*FB3B*/
   0.0, /*FB4B*/
   0.0, /*FB5B*/
   0.0, /*HL1B*/
   0.0, /*HL2B*/
   0.0, /*HL3B*/
   0.0, /*HL4B*/
   0.0, /*HL5B*/
   0.0, /*HL6B*/
   0, /*SIL1*/
   0, /*SIL2*/
   0, /*SIL3*/
   0, /*SIL4*/
],
durationScalar: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
phonologicalRole: TracePhoneRole.NORMAL,
    },

    {
label: 'b',
features: [
   0, /*UNVOICE*/
   1, /*VOICE*/
   0, /*SONORANT*/
   1, /*NONSONORANT*/
   0, /*LIQUID*/
   0, /*SEMI-GLIDE*/
   0, /*VOCALIC*/
   1, /*STOP*/
   0, /*NASAL*/
   0.0, /*FRICATIVE*/
   0.0, /*AFFRICATE*/
   0.0, /*APPROXIMANT*/
   0.0, /*LATERAL*/
   0.7, /*BILABIAL*/
   0.2, /*LABIODENTAL*/
   0.1, /*DENTAL*/
   0.0, /*ALVEROLAR*/
   0.0, /*POSTALVEOLAR*/
   0.0, /*PALATAL*/
   0.0, /*VELAR*/
   0.0, /*GLOTTAL*/
   0.0, /*FB1A*/
   0.0, /*FB2A*/
   0.0, /*FB3A*/
   0.0, /*FB4A*/
   0.0, /*FB5A*/
   0.0, /*HL1A*/
   0.0, /*HL2A*/
   0.0, /*HL3A*/
   0.0, /*HL4A*/
   0.0, /*HL5A*/
   0.0, /*HL6A*/
   0.0, /*FB1B*/
   0.0, /*FB2B*/
   0.0, /*FB3B*/
   0.0, /*FB4B*/
   0.0, /*FB5B*/
   0.0, /*HL1B*/
   0.0, /*HL2B*/
   0.0, /*HL3B*/
   0.0, /*HL4B*/
   0.0, /*HL5B*/
   0.0, /*HL6B*/
   0, /*SIL1*/
   0, /*SIL2*/
   0, /*SIL3*/
   0, /*SIL4*/
],
durationScalar: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
phonologicalRole: TracePhoneRole.NORMAL,
    },

    {
label: 't',
features: [
   1, /*UNVOICE*/
   0, /*VOICE*/
   0, /*SONORANT*/
   1, /*NONSONORANT*/
   0, /*LIQUID*/
   0, /*SEMI-GLIDE*/
   0, /*VOCALIC*/
   1, /*STOP*/
   0, /*NASAL*/
   0.0, /*FRICATIVE*/
   0.0, /*AFFRICATE*/
   0.0, /*APPROXIMANT*/
   0.0, /*LATERAL*/
   0.0, /*BILABIAL*/
   0.05, /*LABIODENTAL*/
   0.1, /*DENTAL*/
   0.7, /*ALVEROLAR*/
   0.1, /*POSTALVEOLAR*/
   0.05, /*PALATAL*/
   0.0, /*VELAR*/
   0.0, /*GLOTTAL*/
   0.0, /*FB1A*/
   0.0, /*FB2A*/
   0.0, /*FB3A*/
   0.0, /*FB4A*/
   0.0, /*FB5A*/
   0.0, /*HL1A*/
   0.0, /*HL2A*/
   0.0, /*HL3A*/
   0.0, /*HL4A*/
   0.0, /*HL5A*/
   0.0, /*HL6A*/
   0.0, /*FB1B*/
   0.0, /*FB2B*/
   0.0, /*FB3B*/
   0.0, /*FB4B*/
   0.0, /*FB5B*/
   0.0, /*HL1B*/
   0.0, /*HL2B*/
   0.0, /*HL3B*/
   0.0, /*HL4B*/
   0.0, /*HL5B*/
   0.0, /*HL6B*/
   0, /*SIL1*/
   0, /*SIL2*/
   0, /*SIL3*/
   0, /*SIL4*/
],
durationScalar: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
phonologicalRole: TracePhoneRole.NORMAL,
    },

    {
label: 'd',
features: [
   0, /*UNVOICE*/
   1, /*VOICE*/
   0, /*SONORANT*/
   1, /*NONSONORANT*/
   0, /*LIQUID*/
   0, /*SEMI-GLIDE*/
   0, /*VOCALIC*/
   1, /*STOP*/
   0, /*NASAL*/
   0.0, /*FRICATIVE*/
   0.0, /*AFFRICATE*/
   0.0, /*APPROXIMANT*/
   0.0, /*LATERAL*/
   0.0, /*BILABIAL*/
   0.05, /*LABIODENTAL*/
   0.1, /*DENTAL*/
   0.7, /*ALVEROLAR*/
   0.1, /*POSTALVEOLAR*/
   0.05, /*PALATAL*/
   0.0, /*VELAR*/
   0.0, /*GLOTTAL*/
   0.0, /*FB1A*/
   0.0, /*FB2A*/
   0.0, /*FB3A*/
   0.0, /*FB4A*/
   0.0, /*FB5A*/
   0.0, /*HL1A*/
   0.0, /*HL2A*/
   0.0, /*HL3A*/
   0.0, /*HL4A*/
   0.0, /*HL5A*/
   0.0, /*HL6A*/
   0.0, /*FB1B*/
   0.0, /*FB2B*/
   0.0, /*FB3B*/
   0.0, /*FB4B*/
   0.0, /*FB5B*/
   0.0, /*HL1B*/
   0.0, /*HL2B*/
   0.0, /*HL3B*/
   0.0, /*HL4B*/
   0.0, /*HL5B*/
   0.0, /*HL6B*/
   0, /*SIL1*/
   0, /*SIL2*/
   0, /*SIL3*/
   0, /*SIL4*/
],
durationScalar: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
phonologicalRole: TracePhoneRole.NORMAL,
    },

    {
label: 'k',
features: [
   1, /*UNVOICE*/
   0, /*VOICE*/
   0, /*SONORANT*/
   1, /*NONSONORANT*/
   0, /*LIQUID*/
   0, /*SEMI-GLIDE*/
   0, /*VOCALIC*/
   1, /*STOP*/
   0, /*NASAL*/
   0.0, /*FRICATIVE*/
   0.0, /*AFFRICATE*/
   0.0, /*APPROXIMANT*/
   0.0, /*LATERAL*/
   0.0, /*BILABIAL*/
   0.0, /*LABIODENTAL*/
   0.0, /*DENTAL*/
   0.0, /*ALVEROLAR*/
   0.05, /*POSTALVEOLAR*/
   0.1, /*PALATAL*/
   0.7, /*VELAR*/
   0.15, /*GLOTTAL*/
   0.0, /*FB1A*/
   0.0, /*FB2A*/
   0.0, /*FB3A*/
   0.0, /*FB4A*/
   0.0, /*FB5A*/
   0.0, /*HL1A*/
   0.0, /*HL2A*/
   0.0, /*HL3A*/
   0.0, /*HL4A*/
   0.0, /*HL5A*/
   0.0, /*HL6A*/
   0.0, /*FB1B*/
   0.0, /*FB2B*/
   0.0, /*FB3B*/
   0.0, /*FB4B*/
   0.0, /*FB5B*/
   0.0, /*HL1B*/
   0.0, /*HL2B*/
   0.0, /*HL3B*/
   0.0, /*HL4B*/
   0.0, /*HL5B*/
   0.0, /*HL6B*/
   0, /*SIL1*/
   0, /*SIL2*/
   0, /*SIL3*/
   0, /*SIL4*/
],
durationScalar: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
phonologicalRole: TracePhoneRole.NORMAL,
    },

    {
label: 'g',
features: [
   0, /*UNVOICE*/
   1, /*VOICE*/
   0, /*SONORANT*/
   1, /*NONSONORANT*/
   0, /*LIQUID*/
   0, /*SEMI-GLIDE*/
   0, /*VOCALIC*/
   1, /*STOP*/
   0, /*NASAL*/
   0.0, /*FRICATIVE*/
   0.0, /*AFFRICATE*/
   0.0, /*APPROXIMANT*/
   0.0, /*LATERAL*/
   0.0, /*BILABIAL*/
   0.0, /*LABIODENTAL*/
   0.0, /*DENTAL*/
   0.0, /*ALVEROLAR*/
   0.05, /*POSTALVEOLAR*/
   0.1, /*PALATAL*/
   0.7, /*VELAR*/
   0.15, /*GLOTTAL*/
   0.0, /*FB1A*/
   0.0, /*FB2A*/
   0.0, /*FB3A*/
   0.0, /*FB4A*/
   0.0, /*FB5A*/
   0.0, /*HL1A*/
   0.0, /*HL2A*/
   0.0, /*HL3A*/
   0.0, /*HL4A*/
   0.0, /*HL5A*/
   0.0, /*HL6A*/
   0.0, /*FB1B*/
   0.0, /*FB2B*/
   0.0, /*FB3B*/
   0.0, /*FB4B*/
   0.0, /*FB5B*/
   0.0, /*HL1B*/
   0.0, /*HL2B*/
   0.0, /*HL3B*/
   0.0, /*HL4B*/
   0.0, /*HL5B*/
   0.0, /*HL6B*/
   0, /*SIL1*/
   0, /*SIL2*/
   0, /*SIL3*/
   0, /*SIL4*/
],
durationScalar: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
phonologicalRole: TracePhoneRole.NORMAL,
    },

    {
label: 'H',
features: [
   1, /*UNVOICE*/
   0, /*VOICE*/
   0, /*SONORANT*/
   1, /*NONSONORANT*/
   0, /*LIQUID*/
   0, /*SEMI-GLIDE*/
   0, /*VOCALIC*/
   1, /*STOP*/
   0, /*NASAL*/
   0.0, /*FRICATIVE*/
   0.0, /*AFFRICATE*/
   0.0, /*APPROXIMANT*/
   0.0, /*LATERAL*/
   0.0, /*BILABIAL*/
   0.0, /*LABIODENTAL*/
   0.0, /*DENTAL*/
   0.0, /*ALVEROLAR*/
   0.0, /*POSTALVEOLAR*/
   0.1, /*PALATAL*/
   0.2, /*VELAR*/
   0.7, /*GLOTTAL*/
   0.0, /*FB1A*/
   0.0, /*FB2A*/
   0.0, /*FB3A*/
   0.0, /*FB4A*/
   0.0, /*FB5A*/
   0.0, /*HL1A*/
   0.0, /*HL2A*/
   0.0, /*HL3A*/
   0.0, /*HL4A*/
   0.0, /*HL5A*/
   0.0, /*HL6A*/
   0.0, /*FB1B*/
   0.0, /*FB2B*/
   0.0, /*FB3B*/
   0.0, /*FB4B*/
   0.0, /*FB5B*/
   0.0, /*HL1B*/
   0.0, /*HL2B*/
   0.0, /*HL3B*/
   0.0, /*HL4B*/
   0.0, /*HL5B*/
   0.0, /*HL6B*/
   0, /*SIL1*/
   0, /*SIL2*/
   0, /*SIL3*/
   0, /*SIL4*/
],
durationScalar: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
phonologicalRole: TracePhoneRole.NORMAL,
    },

    {
label: 'm',
features: [
   0, /*UNVOICE*/
   1, /*VOICE*/
   1, /*SONORANT*/
   0, /*NONSONORANT*/
   0, /*LIQUID*/
   0, /*SEMI-GLIDE*/
   0, /*VOCALIC*/
   0, /*STOP*/
   1, /*NASAL*/
   0.0, /*FRICATIVE*/
   0.0, /*AFFRICATE*/
   0.0, /*APPROXIMANT*/
   0.0, /*LATERAL*/
   0.7, /*BILABIAL*/
   0.2, /*LABIODENTAL*/
   0.1, /*DENTAL*/
   0.0, /*ALVEROLAR*/
   0.0, /*POSTALVEOLAR*/
   0.0, /*PALATAL*/
   0.0, /*VELAR*/
   0.0, /*GLOTTAL*/
   0.0, /*FB1A*/
   0.0, /*FB2A*/
   0.0, /*FB3A*/
   0.0, /*FB4A*/
   0.0, /*FB5A*/
   0.0, /*HL1A*/
   0.0, /*HL2A*/
   0.0, /*HL3A*/
   0.0, /*HL4A*/
   0.0, /*HL5A*/
   0.0, /*HL6A*/
   0.0, /*FB1B*/
   0.0, /*FB2B*/
   0.0, /*FB3B*/
   0.0, /*FB4B*/
   0.0, /*FB5B*/
   0.0, /*HL1B*/
   0.0, /*HL2B*/
   0.0, /*HL3B*/
   0.0, /*HL4B*/
   0.0, /*HL5B*/
   0.0, /*HL6B*/
   0, /*SIL1*/
   0, /*SIL2*/
   0, /*SIL3*/
   0, /*SIL4*/
],
durationScalar: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
phonologicalRole: TracePhoneRole.NORMAL,
    },

    {
label: 'n',
features: [
   0, /*UNVOICE*/
   1, /*VOICE*/
   1, /*SONORANT*/
   0, /*NONSONORANT*/
   0, /*LIQUID*/
   0, /*SEMI-GLIDE*/
   0, /*VOCALIC*/
   0, /*STOP*/
   1, /*NASAL*/
   0.0, /*FRICATIVE*/
   0.0, /*AFFRICATE*/
   0.0, /*APPROXIMANT*/
   0.0, /*LATERAL*/
   0.0, /*BILABIAL*/
   0.05, /*LABIODENTAL*/
   0.1, /*DENTAL*/
   0.7, /*ALVEROLAR*/
   0.1, /*POSTALVEOLAR*/
   0.05, /*PALATAL*/
   0.0, /*VELAR*/
   0.0, /*GLOTTAL*/
   0.0, /*FB1A*/
   0.0, /*FB2A*/
   0.0, /*FB3A*/
   0.0, /*FB4A*/
   0.0, /*FB5A*/
   0.0, /*HL1A*/
   0.0, /*HL2A*/
   0.0, /*HL3A*/
   0.0, /*HL4A*/
   0.0, /*HL5A*/
   0.0, /*HL6A*/
   0.0, /*FB1B*/
   0.0, /*FB2B*/
   0.0, /*FB3B*/
   0.0, /*FB4B*/
   0.0, /*FB5B*/
   0.0, /*HL1B*/
   0.0, /*HL2B*/
   0.0, /*HL3B*/
   0.0, /*HL4B*/
   0.0, /*HL5B*/
   0.0, /*HL6B*/
   0, /*SIL1*/
   0, /*SIL2*/
   0, /*SIL3*/
   0, /*SIL4*/
],
durationScalar: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
phonologicalRole: TracePhoneRole.NORMAL,
    },

    {
label: 'G',
features: [
   0, /*UNVOICE*/
   1, /*VOICE*/
   1, /*SONORANT*/
   0, /*NONSONORANT*/
   0, /*LIQUID*/
   0, /*SEMI-GLIDE*/
   0, /*VOCALIC*/
   0, /*STOP*/
   1, /*NASAL*/
   0.0, /*FRICATIVE*/
   0.0, /*AFFRICATE*/
   0.0, /*APPROXIMANT*/
   0.0, /*LATERAL*/
   0.0, /*BILABIAL*/
   0.0, /*LABIODENTAL*/
   0.0, /*DENTAL*/
   0.05, /*ALVEROLAR*/
   0.1, /*POSTALVEOLAR*/
   0.7, /*PALATAL*/
   0.1, /*VELAR*/
   0.05, /*GLOTTAL*/
   0.0, /*FB1A*/
   0.0, /*FB2A*/
   0.0, /*FB3A*/
   0.0, /*FB4A*/
   0.0, /*FB5A*/
   0.0, /*HL1A*/
   0.0, /*HL2A*/
   0.0, /*HL3A*/
   0.0, /*HL4A*/
   0.0, /*HL5A*/
   0.0, /*HL6A*/
   0.0, /*FB1B*/
   0.0, /*FB2B*/
   0.0, /*FB3B*/
   0.0, /*FB4B*/
   0.0, /*FB5B*/
   0.0, /*HL1B*/
   0.0, /*HL2B*/
   0.0, /*HL3B*/
   0.0, /*HL4B*/
   0.0, /*HL5B*/
   0.0, /*HL6B*/
   0, /*SIL1*/
   0, /*SIL2*/
   0, /*SIL3*/
   0, /*SIL4*/
],
durationScalar: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
phonologicalRole: TracePhoneRole.NORMAL,
    },

    {
label: 'f',
features: [
   1, /*UNVOICE*/
   0, /*VOICE*/
   0, /*SONORANT*/
   1, /*NONSONORANT*/
   0, /*LIQUID*/
   0, /*SEMI-GLIDE*/
   0, /*VOCALIC*/
   0, /*STOP*/
   0, /*NASAL*/
   0.8, /*FRICATIVE*/
   0.2, /*AFFRICATE*/
   0.0, /*APPROXIMANT*/
   0.0, /*LATERAL*/
   0.15, /*BILABIAL*/
   0.7, /*LABIODENTAL*/
   0.1, /*DENTAL*/
   0.05, /*ALVEROLAR*/
   0.0, /*POSTALVEOLAR*/
   0.0, /*PALATAL*/
   0.0, /*VELAR*/
   0.0, /*GLOTTAL*/
   0.0, /*FB1A*/
   0.0, /*FB2A*/
   0.0, /*FB3A*/
   0.0, /*FB4A*/
   0.0, /*FB5A*/
   0.0, /*HL1A*/
   0.0, /*HL2A*/
   0.0, /*HL3A*/
   0.0, /*HL4A*/
   0.0, /*HL5A*/
   0.0, /*HL6A*/
   0.0, /*FB1B*/
   0.0, /*FB2B*/
   0.0, /*FB3B*/
   0.0, /*FB4B*/
   0.0, /*FB5B*/
   0.0, /*HL1B*/
   0.0, /*HL2B*/
   0.0, /*HL3B*/
   0.0, /*HL4B*/
   0.0, /*HL5B*/
   0.0, /*HL6B*/
   0, /*SIL1*/
   0, /*SIL2*/
   0, /*SIL3*/
   0, /*SIL4*/
],
durationScalar: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
phonologicalRole: TracePhoneRole.NORMAL,
    },

    {
label: 'v',
features: [
   0, /*UNVOICE*/
   1, /*VOICE*/
   0, /*SONORANT*/
   1, /*NONSONORANT*/
   0, /*LIQUID*/
   0, /*SEMI-GLIDE*/
   0, /*VOCALIC*/
   0, /*STOP*/
   0, /*NASAL*/
   0.8, /*FRICATIVE*/
   0.2, /*AFFRICATE*/
   0.0, /*APPROXIMANT*/
   0.0, /*LATERAL*/
   0.15, /*BILABIAL*/
   0.7, /*LABIODENTAL*/
   0.1, /*DENTAL*/
   0.05, /*ALVEROLAR*/
   0.0, /*POSTALVEOLAR*/
   0.0, /*PALATAL*/
   0.0, /*VELAR*/
   0.0, /*GLOTTAL*/
   0.0, /*FB1A*/
   0.0, /*FB2A*/
   0.0, /*FB3A*/
   0.0, /*FB4A*/
   0.0, /*FB5A*/
   0.0, /*HL1A*/
   0.0, /*HL2A*/
   0.0, /*HL3A*/
   0.0, /*HL4A*/
   0.0, /*HL5A*/
   0.0, /*HL6A*/
   0.0, /*FB1B*/
   0.0, /*FB2B*/
   0.0, /*FB3B*/
   0.0, /*FB4B*/
   0.0, /*FB5B*/
   0.0, /*HL1B*/
   0.0, /*HL2B*/
   0.0, /*HL3B*/
   0.0, /*HL4B*/
   0.0, /*HL5B*/
   0.0, /*HL6B*/
   0, /*SIL1*/
   0, /*SIL2*/
   0, /*SIL3*/
   0, /*SIL4*/
],
durationScalar: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
phonologicalRole: TracePhoneRole.NORMAL,
    },

    {
label: 'T',
features: [
   1, /*UNVOICE*/
   0, /*VOICE*/
   0, /*SONORANT*/
   1, /*NONSONORANT*/
   0, /*LIQUID*/
   0, /*SEMI-GLIDE*/
   0, /*VOCALIC*/
   0, /*STOP*/
   0, /*NASAL*/
   0.8, /*FRICATIVE*/
   0.2, /*AFFRICATE*/
   0.0, /*APPROXIMANT*/
   0.0, /*LATERAL*/
   0.05, /*BILABIAL*/
   0.1, /*LABIODENTAL*/
   0.7, /*DENTAL*/
   0.1, /*ALVEROLAR*/
   0.05, /*POSTALVEOLAR*/
   0.0, /*PALATAL*/
   0.0, /*VELAR*/
   0.0, /*GLOTTAL*/
   0.0, /*FB1A*/
   0.0, /*FB2A*/
   0.0, /*FB3A*/
   0.0, /*FB4A*/
   0.0, /*FB5A*/
   0.0, /*HL1A*/
   0.0, /*HL2A*/
   0.0, /*HL3A*/
   0.0, /*HL4A*/
   0.0, /*HL5A*/
   0.0, /*HL6A*/
   0.0, /*FB1B*/
   0.0, /*FB2B*/
   0.0, /*FB3B*/
   0.0, /*FB4B*/
   0.0, /*FB5B*/
   0.0, /*HL1B*/
   0.0, /*HL2B*/
   0.0, /*HL3B*/
   0.0, /*HL4B*/
   0.0, /*HL5B*/
   0.0, /*HL6B*/
   0, /*SIL1*/
   0, /*SIL2*/
   0, /*SIL3*/
   0, /*SIL4*/
],
durationScalar: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
phonologicalRole: TracePhoneRole.NORMAL,
    },

    {
label: 'D',
features: [
   0, /*UNVOICE*/
   1, /*VOICE*/
   0, /*SONORANT*/
   1, /*NONSONORANT*/
   0, /*LIQUID*/
   0, /*SEMI-GLIDE*/
   0, /*VOCALIC*/
   0, /*STOP*/
   0, /*NASAL*/
   0.8, /*FRICATIVE*/
   0.2, /*AFFRICATE*/
   0.0, /*APPROXIMANT*/
   0.0, /*LATERAL*/
   0.05, /*BILABIAL*/
   0.1, /*LABIODENTAL*/
   0.7, /*DENTAL*/
   0.1, /*ALVEROLAR*/
   0.05, /*POSTALVEOLAR*/
   0.0, /*PALATAL*/
   0.0, /*VELAR*/
   0.0, /*GLOTTAL*/
   0.0, /*FB1A*/
   0.0, /*FB2A*/
   0.0, /*FB3A*/
   0.0, /*FB4A*/
   0.0, /*FB5A*/
   0.0, /*HL1A*/
   0.0, /*HL2A*/
   0.0, /*HL3A*/
   0.0, /*HL4A*/
   0.0, /*HL5A*/
   0.0, /*HL6A*/
   0.0, /*FB1B*/
   0.0, /*FB2B*/
   0.0, /*FB3B*/
   0.0, /*FB4B*/
   0.0, /*FB5B*/
   0.0, /*HL1B*/
   0.0, /*HL2B*/
   0.0, /*HL3B*/
   0.0, /*HL4B*/
   0.0, /*HL5B*/
   0.0, /*HL6B*/
   0, /*SIL1*/
   0, /*SIL2*/
   0, /*SIL3*/
   0, /*SIL4*/
],
durationScalar: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
phonologicalRole: TracePhoneRole.NORMAL,
    },

    {
label: 's',
features: [
   1, /*UNVOICE*/
   0, /*VOICE*/
   0, /*SONORANT*/
   1, /*NONSONORANT*/
   0, /*LIQUID*/
   0, /*SEMI-GLIDE*/
   0, /*VOCALIC*/
   0, /*STOP*/
   0, /*NASAL*/
   0.8, /*FRICATIVE*/
   0.2, /*AFFRICATE*/
   0.0, /*APPROXIMANT*/
   0.0, /*LATERAL*/
   0.0, /*BILABIAL*/
   0.05, /*LABIODENTAL*/
   0.1, /*DENTAL*/
   0.7, /*ALVEROLAR*/
   0.1, /*POSTALVEOLAR*/
   0.05, /*PALATAL*/
   0.0, /*VELAR*/
   0.0, /*GLOTTAL*/
   0.0, /*FB1A*/
   0.0, /*FB2A*/
   0.0, /*FB3A*/
   0.0, /*FB4A*/
   0.0, /*FB5A*/
   0.0, /*HL1A*/
   0.0, /*HL2A*/
   0.0, /*HL3A*/
   0.0, /*HL4A*/
   0.0, /*HL5A*/
   0.0, /*HL6A*/
   0.0, /*FB1B*/
   0.0, /*FB2B*/
   0.0, /*FB3B*/
   0.0, /*FB4B*/
   0.0, /*FB5B*/
   0.0, /*HL1B*/
   0.0, /*HL2B*/
   0.0, /*HL3B*/
   0.0, /*HL4B*/
   0.0, /*HL5B*/
   0.0, /*HL6B*/
   0, /*SIL1*/
   0, /*SIL2*/
   0, /*SIL3*/
   0, /*SIL4*/
],
durationScalar: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
phonologicalRole: TracePhoneRole.NORMAL,
    },

    {
label: 'z',
features: [
   0, /*UNVOICE*/
   1, /*VOICE*/
   0, /*SONORANT*/
   1, /*NONSONORANT*/
   0, /*LIQUID*/
   0, /*SEMI-GLIDE*/
   0, /*VOCALIC*/
   0, /*STOP*/
   0, /*NASAL*/
   0.8, /*FRICATIVE*/
   0.2, /*AFFRICATE*/
   0.0, /*APPROXIMANT*/
   0.0, /*LATERAL*/
   0.0, /*BILABIAL*/
   0.05, /*LABIODENTAL*/
   0.1, /*DENTAL*/
   0.7, /*ALVEROLAR*/
   0.1, /*POSTALVEOLAR*/
   0.05, /*PALATAL*/
   0.0, /*VELAR*/
   0.0, /*GLOTTAL*/
   0.0, /*FB1A*/
   0.0, /*FB2A*/
   0.0, /*FB3A*/
   0.0, /*FB4A*/
   0.0, /*FB5A*/
   0.0, /*HL1A*/
   0.0, /*HL2A*/
   0.0, /*HL3A*/
   0.0, /*HL4A*/
   0.0, /*HL5A*/
   0.0, /*HL6A*/
   0.0, /*FB1B*/
   0.0, /*FB2B*/
   0.0, /*FB3B*/
   0.0, /*FB4B*/
   0.0, /*FB5B*/
   0.0, /*HL1B*/
   0.0, /*HL2B*/
   0.0, /*HL3B*/
   0.0, /*HL4B*/
   0.0, /*HL5B*/
   0.0, /*HL6B*/
   0, /*SIL1*/
   0, /*SIL2*/
   0, /*SIL3*/
   0, /*SIL4*/
],
durationScalar: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
phonologicalRole: TracePhoneRole.NORMAL,
    },

    {
label: 'S',
features: [
   1, /*UNVOICE*/
   0, /*VOICE*/
   0, /*SONORANT*/
   1, /*NONSONORANT*/
   0, /*LIQUID*/
   0, /*SEMI-GLIDE*/
   0, /*VOCALIC*/
   0, /*STOP*/
   0, /*NASAL*/
   0.8, /*FRICATIVE*/
   0.2, /*AFFRICATE*/
   0.0, /*APPROXIMANT*/
   0.0, /*LATERAL*/
   0.0, /*BILABIAL*/
   0.0, /*LABIODENTAL*/
   0.05, /*DENTAL*/
   0.1, /*ALVEROLAR*/
   0.7, /*POSTALVEOLAR*/
   0.1, /*PALATAL*/
   0.05, /*VELAR*/
   0.0, /*GLOTTAL*/
   0.0, /*FB1A*/
   0.0, /*FB2A*/
   0.0, /*FB3A*/
   0.0, /*FB4A*/
   0.0, /*FB5A*/
   0.0, /*HL1A*/
   0.0, /*HL2A*/
   0.0, /*HL3A*/
   0.0, /*HL4A*/
   0.0, /*HL5A*/
   0.0, /*HL6A*/
   0.0, /*FB1B*/
   0.0, /*FB2B*/
   0.0, /*FB3B*/
   0.0, /*FB4B*/
   0.0, /*FB5B*/
   0.0, /*HL1B*/
   0.0, /*HL2B*/
   0.0, /*HL3B*/
   0.0, /*HL4B*/
   0.0, /*HL5B*/
   0.0, /*HL6B*/
   0, /*SIL1*/
   0, /*SIL2*/
   0, /*SIL3*/
   0, /*SIL4*/
],
durationScalar: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
phonologicalRole: TracePhoneRole.NORMAL,
    },

    {
label: 'Z',
features: [
   0, /*UNVOICE*/
   1, /*VOICE*/
   0, /*SONORANT*/
   1, /*NONSONORANT*/
   0, /*LIQUID*/
   0, /*SEMI-GLIDE*/
   0, /*VOCALIC*/
   0, /*STOP*/
   0, /*NASAL*/
   0.8, /*FRICATIVE*/
   0.2, /*AFFRICATE*/
   0.0, /*APPROXIMANT*/
   0.0, /*LATERAL*/
   0.0, /*BILABIAL*/
   0.0, /*LABIODENTAL*/
   0.05, /*DENTAL*/
   0.1, /*ALVEROLAR*/
   0.7, /*POSTALVEOLAR*/
   0.1, /*PALATAL*/
   0.05, /*VELAR*/
   0.0, /*GLOTTAL*/
   0.0, /*FB1A*/
   0.0, /*FB2A*/
   0.0, /*FB3A*/
   0.0, /*FB4A*/
   0.0, /*FB5A*/
   0.0, /*HL1A*/
   0.0, /*HL2A*/
   0.0, /*HL3A*/
   0.0, /*HL4A*/
   0.0, /*HL5A*/
   0.0, /*HL6A*/
   0.0, /*FB1B*/
   0.0, /*FB2B*/
   0.0, /*FB3B*/
   0.0, /*FB4B*/
   0.0, /*FB5B*/
   0.0, /*HL1B*/
   0.0, /*HL2B*/
   0.0, /*HL3B*/
   0.0, /*HL4B*/
   0.0, /*HL5B*/
   0.0, /*HL6B*/
   0, /*SIL1*/
   0, /*SIL2*/
   0, /*SIL3*/
   0, /*SIL4*/
],
durationScalar: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
phonologicalRole: TracePhoneRole.NORMAL,
    },

    {
label: 'h',
features: [
   1, /*UNVOICE*/
   0, /*VOICE*/
   0, /*SONORANT*/
   1, /*NONSONORANT*/
   0, /*LIQUID*/
   0, /*SEMI-GLIDE*/
   0, /*VOCALIC*/
   0, /*STOP*/
   0, /*NASAL*/
   0.8, /*FRICATIVE*/
   0.2, /*AFFRICATE*/
   0.0, /*APPROXIMANT*/
   0.0, /*LATERAL*/
   0.0, /*BILABIAL*/
   0.0, /*LABIODENTAL*/
   0.0, /*DENTAL*/
   0.0, /*ALVEROLAR*/
   0.0, /*POSTALVEOLAR*/
   0.1, /*PALATAL*/
   0.2, /*VELAR*/
   0.7, /*GLOTTAL*/
   0.0, /*FB1A*/
   0.0, /*FB2A*/
   0.0, /*FB3A*/
   0.0, /*FB4A*/
   0.0, /*FB5A*/
   0.0, /*HL1A*/
   0.0, /*HL2A*/
   0.0, /*HL3A*/
   0.0, /*HL4A*/
   0.0, /*HL5A*/
   0.0, /*HL6A*/
   0.0, /*FB1B*/
   0.0, /*FB2B*/
   0.0, /*FB3B*/
   0.0, /*FB4B*/
   0.0, /*FB5B*/
   0.0, /*HL1B*/
   0.0, /*HL2B*/
   0.0, /*HL3B*/
   0.0, /*HL4B*/
   0.0, /*HL5B*/
   0.0, /*HL6B*/
   0, /*SIL1*/
   0, /*SIL2*/
   0, /*SIL3*/
   0, /*SIL4*/
],
durationScalar: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
phonologicalRole: TracePhoneRole.NORMAL,
    },

    {
label: 'C',
features: [
   1, /*UNVOICE*/
   0, /*VOICE*/
   0, /*SONORANT*/
   1, /*NONSONORANT*/
   0, /*LIQUID*/
   0, /*SEMI-GLIDE*/
   0, /*VOCALIC*/
   0, /*STOP*/
   0, /*NASAL*/
   0.2, /*FRICATIVE*/
   0.8, /*AFFRICATE*/
   0.0, /*APPROXIMANT*/
   0.0, /*LATERAL*/
   0.0, /*BILABIAL*/
   0.0, /*LABIODENTAL*/
   0.05, /*DENTAL*/
   0.1, /*ALVEROLAR*/
   0.7, /*POSTALVEOLAR*/
   0.1, /*PALATAL*/
   0.05, /*VELAR*/
   0.0, /*GLOTTAL*/
   0.0, /*FB1A*/
   0.0, /*FB2A*/
   0.0, /*FB3A*/
   0.0, /*FB4A*/
   0.0, /*FB5A*/
   0.0, /*HL1A*/
   0.0, /*HL2A*/
   0.0, /*HL3A*/
   0.0, /*HL4A*/
   0.0, /*HL5A*/
   0.0, /*HL6A*/
   0.0, /*FB1B*/
   0.0, /*FB2B*/
   0.0, /*FB3B*/
   0.0, /*FB4B*/
   0.0, /*FB5B*/
   0.0, /*HL1B*/
   0.0, /*HL2B*/
   0.0, /*HL3B*/
   0.0, /*HL4B*/
   0.0, /*HL5B*/
   0.0, /*HL6B*/
   0, /*SIL1*/
   0, /*SIL2*/
   0, /*SIL3*/
   0, /*SIL4*/
],
durationScalar: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
phonologicalRole: TracePhoneRole.NORMAL,
    },

    {
label: 'J',
features: [
   0, /*UNVOICE*/
   1, /*VOICE*/
   0, /*SONORANT*/
   1, /*NONSONORANT*/
   0, /*LIQUID*/
   0, /*SEMI-GLIDE*/
   0, /*VOCALIC*/
   0, /*STOP*/
   0, /*NASAL*/
   0.2, /*FRICATIVE*/
   0.8, /*AFFRICATE*/
   0.0, /*APPROXIMANT*/
   0.0, /*LATERAL*/
   0.0, /*BILABIAL*/
   0.0, /*LABIODENTAL*/
   0.05, /*DENTAL*/
   0.1, /*ALVEROLAR*/
   0.7, /*POSTALVEOLAR*/
   0.1, /*PALATAL*/
   0.05, /*VELAR*/
   0.0, /*GLOTTAL*/
   0.0, /*FB1A*/
   0.0, /*FB2A*/
   0.0, /*FB3A*/
   0.0, /*FB4A*/
   0.0, /*FB5A*/
   0.0, /*HL1A*/
   0.0, /*HL2A*/
   0.0, /*HL3A*/
   0.0, /*HL4A*/
   0.0, /*HL5A*/
   0.0, /*HL6A*/
   0.0, /*FB1B*/
   0.0, /*FB2B*/
   0.0, /*FB3B*/
   0.0, /*FB4B*/
   0.0, /*FB5B*/
   0.0, /*HL1B*/
   0.0, /*HL2B*/
   0.0, /*HL3B*/
   0.0, /*HL4B*/
   0.0, /*HL5B*/
   0.0, /*HL6B*/
   0, /*SIL1*/
   0, /*SIL2*/
   0, /*SIL3*/
   0, /*SIL4*/
],
durationScalar: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
phonologicalRole: TracePhoneRole.NORMAL,
    },

    {
label: 'r',
features: [
   0, /*UNVOICE*/
   0, /*VOICE*/
   1, /*SONORANT*/
   0, /*NONSONORANT*/
   1, /*LIQUID*/
   0, /*SEMI-GLIDE*/
   0, /*VOCALIC*/
   0, /*STOP*/
   0, /*NASAL*/
   0.0, /*FRICATIVE*/
   0.0, /*AFFRICATE*/
   0.9, /*APPROXIMANT*/
   0.1, /*LATERAL*/
   0.0, /*BILABIAL*/
   0.05, /*LABIODENTAL*/
   0.1, /*DENTAL*/
   0.7, /*ALVEROLAR*/
   0.1, /*POSTALVEOLAR*/
   0.05, /*PALATAL*/
   0.0, /*VELAR*/
   0.0, /*GLOTTAL*/
   0.0, /*FB1A*/
   0.0, /*FB2A*/
   0.0, /*FB3A*/
   0.0, /*FB4A*/
   0.0, /*FB5A*/
   0.0, /*HL1A*/
   0.0, /*HL2A*/
   0.0, /*HL3A*/
   0.0, /*HL4A*/
   0.0, /*HL5A*/
   0.0, /*HL6A*/
   0.0, /*FB1B*/
   0.0, /*FB2B*/
   0.0, /*FB3B*/
   0.0, /*FB4B*/
   0.0, /*FB5B*/
   0.0, /*HL1B*/
   0.0, /*HL2B*/
   0.0, /*HL3B*/
   0.0, /*HL4B*/
   0.0, /*HL5B*/
   0.0, /*HL6B*/
   0, /*SIL1*/
   0, /*SIL2*/
   0, /*SIL3*/
   0, /*SIL4*/
],
durationScalar: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
phonologicalRole: TracePhoneRole.NORMAL,
    },

    {
label: 'y',
features: [
   0, /*UNVOICE*/
   0, /*VOICE*/
   1, /*SONORANT*/
   0, /*NONSONORANT*/
   0, /*LIQUID*/
   1, /*SEMI-GLIDE*/
   0, /*VOCALIC*/
   0, /*STOP*/
   0, /*NASAL*/
   0.0, /*FRICATIVE*/
   0.0, /*AFFRICATE*/
   1.0, /*APPROXIMANT*/
   0.0, /*LATERAL*/
   0.0, /*BILABIAL*/
   0.0, /*LABIODENTAL*/
   0.0, /*DENTAL*/
   0.05, /*ALVEROLAR*/
   0.1, /*POSTALVEOLAR*/
   0.7, /*PALATAL*/
   0.1, /*VELAR*/
   0.05, /*GLOTTAL*/
   0.0, /*FB1A*/
   0.0, /*FB2A*/
   0.0, /*FB3A*/
   0.0, /*FB4A*/
   0.0, /*FB5A*/
   0.0, /*HL1A*/
   0.0, /*HL2A*/
   0.0, /*HL3A*/
   0.0, /*HL4A*/
   0.0, /*HL5A*/
   0.0, /*HL6A*/
   0.0, /*FB1B*/
   0.0, /*FB2B*/
   0.0, /*FB3B*/
   0.0, /*FB4B*/
   0.0, /*FB5B*/
   0.0, /*HL1B*/
   0.0, /*HL2B*/
   0.0, /*HL3B*/
   0.0, /*HL4B*/
   0.0, /*HL5B*/
   0.0, /*HL6B*/
   0, /*SIL1*/
   0, /*SIL2*/
   0, /*SIL3*/
   0, /*SIL4*/
],
durationScalar: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
phonologicalRole: TracePhoneRole.NORMAL,
    },

    {
label: 'w',
features: [
   0, /*UNVOICE*/
   0, /*VOICE*/
   1, /*SONORANT*/
   0, /*NONSONORANT*/
   0, /*LIQUID*/
   1, /*SEMI-GLIDE*/
   0, /*VOCALIC*/
   0, /*STOP*/
   0, /*NASAL*/
   0.0, /*FRICATIVE*/
   0.0, /*AFFRICATE*/
   1.0, /*APPROXIMANT*/
   0.0, /*LATERAL*/
   0.0, /*BILABIAL*/
   0.0, /*LABIODENTAL*/
   0.0, /*DENTAL*/
   0.0, /*ALVEROLAR*/
   0.05, /*POSTALVEOLAR*/
   0.1, /*PALATAL*/
   0.7, /*VELAR*/
   0.15, /*GLOTTAL*/
   0.0, /*FB1A*/
   0.0, /*FB2A*/
   0.0, /*FB3A*/
   0.0, /*FB4A*/
   0.0, /*FB5A*/
   0.0, /*HL1A*/
   0.0, /*HL2A*/
   0.0, /*HL3A*/
   0.0, /*HL4A*/
   0.0, /*HL5A*/
   0.0, /*HL6A*/
   0.0, /*FB1B*/
   0.0, /*FB2B*/
   0.0, /*FB3B*/
   0.0, /*FB4B*/
   0.0, /*FB5B*/
   0.0, /*HL1B*/
   0.0, /*HL2B*/
   0.0, /*HL3B*/
   0.0, /*HL4B*/
   0.0, /*HL5B*/
   0.0, /*HL6B*/
   0, /*SIL1*/
   0, /*SIL2*/
   0, /*SIL3*/
   0, /*SIL4*/
],
durationScalar: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
phonologicalRole: TracePhoneRole.NORMAL,
    },

    {
label: 'l',
features: [
   0, /*UNVOICE*/
   0, /*VOICE*/
   1, /*SONORANT*/
   0, /*NONSONORANT*/
   1, /*LIQUID*/
   0, /*SEMI-GLIDE*/
   0, /*VOCALIC*/
   0, /*STOP*/
   0, /*NASAL*/
   0.0, /*FRICATIVE*/
   0.0, /*AFFRICATE*/
   0.2, /*APPROXIMANT*/
   0.8, /*LATERAL*/
   0.0, /*BILABIAL*/
   0.05, /*LABIODENTAL*/
   0.1, /*DENTAL*/
   0.7, /*ALVEROLAR*/
   0.1, /*POSTALVEOLAR*/
   0.05, /*PALATAL*/
   0.0, /*VELAR*/
   0.0, /*GLOTTAL*/
   0.0, /*FB1A*/
   0.0, /*FB2A*/
   0.0, /*FB3A*/
   0.0, /*FB4A*/
   0.0, /*FB5A*/
   0.0, /*HL1A*/
   0.0, /*HL2A*/
   0.0, /*HL3A*/
   0.0, /*HL4A*/
   0.0, /*HL5A*/
   0.0, /*HL6A*/
   0.0, /*FB1B*/
   0.0, /*FB2B*/
   0.0, /*FB3B*/
   0.0, /*FB4B*/
   0.0, /*FB5B*/
   0.0, /*HL1B*/
   0.0, /*HL2B*/
   0.0, /*HL3B*/
   0.0, /*HL4B*/
   0.0, /*HL5B*/
   0.0, /*HL6B*/
   0, /*SIL1*/
   0, /*SIL2*/
   0, /*SIL3*/
   0, /*SIL4*/
],
durationScalar: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
phonologicalRole: TracePhoneRole.NORMAL,
    },

    {
label: 'i',
features: [
   0, /*UNVOICE*/
   0, /*VOICE*/
   1, /*SONORANT*/
   0, /*NONSONORANT*/
   0, /*LIQUID*/
   0, /*SEMI-GLIDE*/
   1, /*VOCALIC*/
   0, /*STOP*/
   0, /*NASAL*/
   0.0, /*FRICATIVE*/
   0.0, /*AFFRICATE*/
   0.0, /*APPROXIMANT*/
   0.0, /*LATERAL*/
   0.0, /*BILABIAL*/
   0.0, /*LABIODENTAL*/
   0.0, /*DENTAL*/
   0.0, /*ALVEROLAR*/
   0.0, /*POSTALVEOLAR*/
   0.0, /*PALATAL*/
   0.0, /*VELAR*/
   0.0, /*GLOTTAL*/
   0.4, /*FB1A*/
   0.1, /*FB2A*/
   0.0, /*FB3A*/
   0.0, /*FB4A*/
   0.0, /*FB5A*/
   0.4, /*HL1A*/
   0.1, /*HL2A*/
   0.0, /*HL3A*/
   0.0, /*HL4A*/
   0.0, /*HL5A*/
   0.0, /*HL6A*/
   0.4, /*FB1B*/
   0.1, /*FB2B*/
   0.0, /*FB3B*/
   0.0, /*FB4B*/
   0.0, /*FB5B*/
   0.4, /*HL1B*/
   0.1, /*HL2B*/
   0.0, /*HL3B*/
   0.0, /*HL4B*/
   0.0, /*HL5B*/
   0.0, /*HL6B*/
   0, /*SIL1*/
   0, /*SIL2*/
   0, /*SIL3*/
   0, /*SIL4*/
],
durationScalar: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
phonologicalRole: TracePhoneRole.NORMAL,
    },

    {
label: 'I',
features: [
   0, /*UNVOICE*/
   0, /*VOICE*/
   1, /*SONORANT*/
   0, /*NONSONORANT*/
   0, /*LIQUID*/
   0, /*SEMI-GLIDE*/
   1, /*VOCALIC*/
   0, /*STOP*/
   0, /*NASAL*/
   0.0, /*FRICATIVE*/
   0.0, /*AFFRICATE*/
   0.0, /*APPROXIMANT*/
   0.0, /*LATERAL*/
   0.0, /*BILABIAL*/
   0.0, /*LABIODENTAL*/
   0.0, /*DENTAL*/
   0.0, /*ALVEROLAR*/
   0.0, /*POSTALVEOLAR*/
   0.0, /*PALATAL*/
   0.0, /*VELAR*/
   0.0, /*GLOTTAL*/
   0.4, /*FB1A*/
   0.1, /*FB2A*/
   0.0, /*FB3A*/
   0.0, /*FB4A*/
   0.0, /*FB5A*/
   0.05, /*HL1A*/
   0.4, /*HL2A*/
   0.05, /*HL3A*/
   0.0, /*HL4A*/
   0.0, /*HL5A*/
   0.0, /*HL6A*/
   0.4, /*FB1B*/
   0.1, /*FB2B*/
   0.0, /*FB3B*/
   0.0, /*FB4B*/
   0.0, /*FB5B*/
   0.05, /*HL1B*/
   0.4, /*HL2B*/
   0.05, /*HL3B*/
   0.0, /*HL4B*/
   0.0, /*HL5B*/
   0.0, /*HL6B*/
   0, /*SIL1*/
   0, /*SIL2*/
   0, /*SIL3*/
   0, /*SIL4*/
],
durationScalar: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
phonologicalRole: TracePhoneRole.NORMAL,
    },

    {
label: 'e',
features: [
   0, /*UNVOICE*/
   0, /*VOICE*/
   1, /*SONORANT*/
   0, /*NONSONORANT*/
   0, /*LIQUID*/
   0, /*SEMI-GLIDE*/
   1, /*VOCALIC*/
   0, /*STOP*/
   0, /*NASAL*/
   0.0, /*FRICATIVE*/
   0.0, /*AFFRICATE*/
   0.0, /*APPROXIMANT*/
   0.0, /*LATERAL*/
   0.0, /*BILABIAL*/
   0.0, /*LABIODENTAL*/
   0.0, /*DENTAL*/
   0.0, /*ALVEROLAR*/
   0.0, /*POSTALVEOLAR*/
   0.0, /*PALATAL*/
   0.0, /*VELAR*/
   0.0, /*GLOTTAL*/
   0.4, /*FB1A*/
   0.1, /*FB2A*/
   0.0, /*FB3A*/
   0.0, /*FB4A*/
   0.0, /*FB5A*/
   0.0, /*HL1A*/
   0.05, /*HL2A*/
   0.4, /*HL3A*/
   0.05, /*HL4A*/
   0.0, /*HL5A*/
   0.0, /*HL6A*/
   0.4, /*FB1B*/
   0.1, /*FB2B*/
   0.0, /*FB3B*/
   0.0, /*FB4B*/
   0.0, /*FB5B*/
   0.0, /*HL1B*/
   0.05, /*HL2B*/
   0.4, /*HL3B*/
   0.05, /*HL4B*/
   0.0, /*HL5B*/
   0.0, /*HL6B*/
   0, /*SIL1*/
   0, /*SIL2*/
   0, /*SIL3*/
   0, /*SIL4*/
],
durationScalar: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
phonologicalRole: TracePhoneRole.NORMAL,
    },

    {
label: 'E',
features: [
   0, /*UNVOICE*/
   0, /*VOICE*/
   1, /*SONORANT*/
   0, /*NONSONORANT*/
   0, /*LIQUID*/
   0, /*SEMI-GLIDE*/
   1, /*VOCALIC*/
   0, /*STOP*/
   0, /*NASAL*/
   0.0, /*FRICATIVE*/
   0.0, /*AFFRICATE*/
   0.0, /*APPROXIMANT*/
   0.0, /*LATERAL*/
   0.0, /*BILABIAL*/
   0.0, /*LABIODENTAL*/
   0.0, /*DENTAL*/
   0.0, /*ALVEROLAR*/
   0.0, /*POSTALVEOLAR*/
   0.0, /*PALATAL*/
   0.0, /*VELAR*/
   0.0, /*GLOTTAL*/
   0.4, /*FB1A*/
   0.1, /*FB2A*/
   0.0, /*FB3A*/
   0.0, /*FB4A*/
   0.0, /*FB5A*/
   0.0, /*HL1A*/
   0.0, /*HL2A*/
   0.0, /*HL3A*/
   0.05, /*HL4A*/
   0.4, /*HL5A*/
   0.05, /*HL6A*/
   0.4, /*FB1B*/
   0.1, /*FB2B*/
   0.0, /*FB3B*/
   0.0, /*FB4B*/
   0.0, /*FB5B*/
   0.0, /*HL1B*/
   0.0, /*HL2B*/
   0.0, /*HL3B*/
   0.05, /*HL4B*/
   0.4, /*HL5B*/
   0.05, /*HL6B*/
   0, /*SIL1*/
   0, /*SIL2*/
   0, /*SIL3*/
   0, /*SIL4*/
],
durationScalar: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
phonologicalRole: TracePhoneRole.NORMAL,
    },

    {
label: 'A',
features: [
   0, /*UNVOICE*/
   0, /*VOICE*/
   1, /*SONORANT*/
   0, /*NONSONORANT*/
   0, /*LIQUID*/
   0, /*SEMI-GLIDE*/
   1, /*VOCALIC*/
   0, /*STOP*/
   0, /*NASAL*/
   0.0, /*FRICATIVE*/
   0.0, /*AFFRICATE*/
   0.0, /*APPROXIMANT*/
   0.0, /*LATERAL*/
   0.0, /*BILABIAL*/
   0.0, /*LABIODENTAL*/
   0.0, /*DENTAL*/
   0.0, /*ALVEROLAR*/
   0.0, /*POSTALVEOLAR*/
   0.0, /*PALATAL*/
   0.0, /*VELAR*/
   0.0, /*GLOTTAL*/
   0.4, /*FB1A*/
   0.1, /*FB2A*/
   0.0, /*FB3A*/
   0.0, /*FB4A*/
   0.0, /*FB5A*/
   0.0, /*HL1A*/
   0.0, /*HL2A*/
   0.0, /*HL3A*/
   0.05, /*HL4A*/
   0.4, /*HL5A*/
   0.05, /*HL6A*/
   0.4, /*FB1B*/
   0.1, /*FB2B*/
   0.0, /*FB3B*/
   0.0, /*FB4B*/
   0.0, /*FB5B*/
   0.0, /*HL1B*/
   0.0, /*HL2B*/
   0.0, /*HL3B*/
   0.0, /*HL4B*/
   0.1, /*HL5B*/
   0.4, /*HL6B*/
   0, /*SIL1*/
   0, /*SIL2*/
   0, /*SIL3*/
   0, /*SIL4*/
],
durationScalar: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
phonologicalRole: TracePhoneRole.NORMAL,
    },

    {
label: 'x',
features: [
   0, /*UNVOICE*/
   0, /*VOICE*/
   1, /*SONORANT*/
   0, /*NONSONORANT*/
   0, /*LIQUID*/
   0, /*SEMI-GLIDE*/
   1, /*VOCALIC*/
   0, /*STOP*/
   0, /*NASAL*/
   0.0, /*FRICATIVE*/
   0.0, /*AFFRICATE*/
   0.0, /*APPROXIMANT*/
   0.0, /*LATERAL*/
   0.0, /*BILABIAL*/
   0.0, /*LABIODENTAL*/
   0.0, /*DENTAL*/
   0.0, /*ALVEROLAR*/
   0.0, /*POSTALVEOLAR*/
   0.0, /*PALATAL*/
   0.0, /*VELAR*/
   0.0, /*GLOTTAL*/
   0.0, /*FB1A*/
   0.05, /*FB2A*/
   0.4, /*FB3A*/
   0.05, /*FB4A*/
   0.0, /*FB5A*/
   0.0, /*HL1A*/
   0.0, /*HL2A*/
   0.0, /*HL3A*/
   0.05, /*HL4A*/
   0.4, /*HL5A*/
   0.05, /*HL6A*/
   0.0, /*FB1B*/
   0.05, /*FB2B*/
   0.4, /*FB3B*/
   0.05, /*FB4B*/
   0.0, /*FB5B*/
   0.0, /*HL1B*/
   0.0, /*HL2B*/
   0.0, /*HL3B*/
   0.05, /*HL4B*/
   0.4, /*HL5B*/
   0.05, /*HL6B*/
   0, /*SIL1*/
   0, /*SIL2*/
   0, /*SIL3*/
   0, /*SIL4*/
],
durationScalar: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
phonologicalRole: TracePhoneRole.NORMAL,
    },

    {
label: 'u',
features: [
   0, /*UNVOICE*/
   0, /*VOICE*/
   1, /*SONORANT*/
   0, /*NONSONORANT*/
   0, /*LIQUID*/
   0, /*SEMI-GLIDE*/
   1, /*VOCALIC*/
   0, /*STOP*/
   0, /*NASAL*/
   0.0, /*FRICATIVE*/
   0.0, /*AFFRICATE*/
   0.0, /*APPROXIMANT*/
   0.0, /*LATERAL*/
   0.0, /*BILABIAL*/
   0.0, /*LABIODENTAL*/
   0.0, /*DENTAL*/
   0.0, /*ALVEROLAR*/
   0.0, /*POSTALVEOLAR*/
   0.0, /*PALATAL*/
   0.0, /*VELAR*/
   0.0, /*GLOTTAL*/
   0.0, /*FB1A*/
   0.0, /*FB2A*/
   0.0, /*FB3A*/
   0.1, /*FB4A*/
   0.4, /*FB5A*/
   0.4, /*HL1A*/
   0.1, /*HL2A*/
   0.0, /*HL3A*/
   0.0, /*HL4A*/
   0.0, /*HL5A*/
   0.0, /*HL6A*/
   0.0, /*FB1B*/
   0.0, /*FB2B*/
   0.0, /*FB3B*/
   0.1, /*FB4B*/
   0.4, /*FB5B*/
   0.4, /*HL1B*/
   0.1, /*HL2B*/
   0.0, /*HL3B*/
   0.0, /*HL4B*/
   0.0, /*HL5B*/
   0.0, /*HL6B*/
   0, /*SIL1*/
   0, /*SIL2*/
   0, /*SIL3*/
   0, /*SIL4*/
],
durationScalar: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
phonologicalRole: TracePhoneRole.NORMAL,
    },

    {
label: 'U',
features: [
   0, /*UNVOICE*/
   0, /*VOICE*/
   1, /*SONORANT*/
   0, /*NONSONORANT*/
   0, /*LIQUID*/
   0, /*SEMI-GLIDE*/
   1, /*VOCALIC*/
   0, /*STOP*/
   0, /*NASAL*/
   0.0, /*FRICATIVE*/
   0.0, /*AFFRICATE*/
   0.0, /*APPROXIMANT*/
   0.0, /*LATERAL*/
   0.0, /*BILABIAL*/
   0.0, /*LABIODENTAL*/
   0.0, /*DENTAL*/
   0.0, /*ALVEROLAR*/
   0.0, /*POSTALVEOLAR*/
   0.0, /*PALATAL*/
   0.0, /*VELAR*/
   0.0, /*GLOTTAL*/
   0.0, /*FB1A*/
   0.0, /*FB2A*/
   0.05, /*FB3A*/
   0.4, /*FB4A*/
   0.05, /*FB5A*/
   0.05, /*HL1A*/
   0.4, /*HL2A*/
   0.05, /*HL3A*/
   0.0, /*HL4A*/
   0.0, /*HL5A*/
   0.0, /*HL6A*/
   0.0, /*FB1B*/
   0.0, /*FB2B*/
   0.1, /*FB3B*/
   0.4, /*FB4B*/
   0.0, /*FB5B*/
   0.05, /*HL1B*/
   0.4, /*HL2B*/
   0.05, /*HL3B*/
   0.0, /*HL4B*/
   0.0, /*HL5B*/
   0.0, /*HL6B*/
   0, /*SIL1*/
   0, /*SIL2*/
   0, /*SIL3*/
   0, /*SIL4*/
],
durationScalar: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
phonologicalRole: TracePhoneRole.NORMAL,
    },

    {
label: 'o',
features: [
   0, /*UNVOICE*/
   0, /*VOICE*/
   1, /*SONORANT*/
   0, /*NONSONORANT*/
   0, /*LIQUID*/
   0, /*SEMI-GLIDE*/
   1, /*VOCALIC*/
   0, /*STOP*/
   0, /*NASAL*/
   0.0, /*FRICATIVE*/
   0.0, /*AFFRICATE*/
   0.0, /*APPROXIMANT*/
   0.0, /*LATERAL*/
   0.0, /*BILABIAL*/
   0.0, /*LABIODENTAL*/
   0.0, /*DENTAL*/
   0.0, /*ALVEROLAR*/
   0.0, /*POSTALVEOLAR*/
   0.0, /*PALATAL*/
   0.0, /*VELAR*/
   0.0, /*GLOTTAL*/
   0.0, /*FB1A*/
   0.0, /*FB2A*/
   0.0, /*FB3A*/
   0.1, /*FB4A*/
   0.4, /*FB5A*/
   0.0, /*HL1A*/
   0.05, /*HL2A*/
   0.4, /*HL3A*/
   0.05, /*HL4A*/
   0.0, /*HL5A*/
   0.0, /*HL6A*/
   0.0, /*FB1B*/
   0.0, /*FB2B*/
   0.0, /*FB3B*/
   0.1, /*FB4B*/
   0.4, /*FB5B*/
   0.0, /*HL1B*/
   0.05, /*HL2B*/
   0.4, /*HL3B*/
   0.05, /*HL4B*/
   0.0, /*HL5B*/
   0.0, /*HL6B*/
   0, /*SIL1*/
   0, /*SIL2*/
   0, /*SIL3*/
   0, /*SIL4*/
],
durationScalar: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
phonologicalRole: TracePhoneRole.NORMAL,
    },

    {
label: 'c',
features: [
   0, /*UNVOICE*/
   0, /*VOICE*/
   1, /*SONORANT*/
   0, /*NONSONORANT*/
   0, /*LIQUID*/
   0, /*SEMI-GLIDE*/
   1, /*VOCALIC*/
   0, /*STOP*/
   0, /*NASAL*/
   0.0, /*FRICATIVE*/
   0.0, /*AFFRICATE*/
   0.0, /*APPROXIMANT*/
   0.0, /*LATERAL*/
   0.0, /*BILABIAL*/
   0.0, /*LABIODENTAL*/
   0.0, /*DENTAL*/
   0.0, /*ALVEROLAR*/
   0.0, /*POSTALVEOLAR*/
   0.0, /*PALATAL*/
   0.0, /*VELAR*/
   0.0, /*GLOTTAL*/
   0.0, /*FB1A*/
   0.0, /*FB2A*/
   0.0, /*FB3A*/
   0.1, /*FB4A*/
   0.4, /*FB5A*/
   0.0, /*HL1A*/
   0.0, /*HL2A*/
   0.0, /*HL3A*/
   0.05, /*HL4A*/
   0.4, /*HL5A*/
   0.05, /*HL6A*/
   0.0, /*FB1B*/
   0.0, /*FB2B*/
   0.0, /*FB3B*/
   0.1, /*FB4B*/
   0.4, /*FB5B*/
   0.0, /*HL1B*/
   0.0, /*HL2B*/
   0.0, /*HL3B*/
   0.05, /*HL4B*/
   0.4, /*HL5B*/
   0.05, /*HL6B*/
   0, /*SIL1*/
   0, /*SIL2*/
   0, /*SIL3*/
   0, /*SIL4*/
],
durationScalar: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
phonologicalRole: TracePhoneRole.NORMAL,
    },

    {
label: 'a',
features: [
   0, /*UNVOICE*/
   0, /*VOICE*/
   1, /*SONORANT*/
   0, /*NONSONORANT*/
   0, /*LIQUID*/
   0, /*SEMI-GLIDE*/
   1, /*VOCALIC*/
   0, /*STOP*/
   0, /*NASAL*/
   0.0, /*FRICATIVE*/
   0.0, /*AFFRICATE*/
   0.0, /*APPROXIMANT*/
   0.0, /*LATERAL*/
   0.0, /*BILABIAL*/
   0.0, /*LABIODENTAL*/
   0.0, /*DENTAL*/
   0.0, /*ALVEROLAR*/
   0.0, /*POSTALVEOLAR*/
   0.0, /*PALATAL*/
   0.0, /*VELAR*/
   0.0, /*GLOTTAL*/
   0.0, /*FB1A*/
   0.0, /*FB2A*/
   0.0, /*FB3A*/
   0.1, /*FB4A*/
   0.4, /*FB5A*/
   0.0, /*HL1A*/
   0.0, /*HL2A*/
   0.0, /*HL3A*/
   0.0, /*HL4A*/
   0.1, /*HL5A*/
   0.4, /*HL6A*/
   0.0, /*FB1B*/
   0.0, /*FB2B*/
   0.0, /*FB3B*/
   0.1, /*FB4B*/
   0.4, /*FB5B*/
   0.0, /*HL1B*/
   0.0, /*HL2B*/
   0.0, /*HL3B*/
   0.0, /*HL4B*/
   0.1, /*HL5B*/
   0.4, /*HL6B*/
   0, /*SIL1*/
   0, /*SIL2*/
   0, /*SIL3*/
   0, /*SIL4*/
],
durationScalar: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
phonologicalRole: TracePhoneRole.NORMAL,
    },

    {
label: 'Y',
features: [
   0, /*UNVOICE*/
   0, /*VOICE*/
   1, /*SONORANT*/
   0, /*NONSONORANT*/
   0, /*LIQUID*/
   0, /*SEMI-GLIDE*/
   1, /*VOCALIC*/
   0, /*STOP*/
   0, /*NASAL*/
   0.0, /*FRICATIVE*/
   0.0, /*AFFRICATE*/
   0.0, /*APPROXIMANT*/
   0.0, /*LATERAL*/
   0.0, /*BILABIAL*/
   0.0, /*LABIODENTAL*/
   0.0, /*DENTAL*/
   0.0, /*ALVEROLAR*/
   0.0, /*POSTALVEOLAR*/
   0.0, /*PALATAL*/
   0.0, /*VELAR*/
   0.0, /*GLOTTAL*/
   0.05, /*FB1A*/
   0.4, /*FB2A*/
   0.05, /*FB3A*/
   0.0, /*FB4A*/
   0.0, /*FB5A*/
   0.0, /*HL1A*/
   0.0, /*HL2A*/
   0.0, /*HL3A*/
   0.05, /*HL4A*/
   0.4, /*HL5A*/
   0.05, /*HL6A*/
   0.4, /*FB1B*/
   0.1, /*FB2B*/
   0.0, /*FB3B*/
   0.0, /*FB4B*/
   0.0, /*FB5B*/
   0.05, /*HL1B*/
   0.4, /*HL2B*/
   0.05, /*HL3B*/
   0.0, /*HL4B*/
   0.0, /*HL5B*/
   0.0, /*HL6B*/
   0, /*SIL1*/
   0, /*SIL2*/
   0, /*SIL3*/
   0, /*SIL4*/
],
durationScalar: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
phonologicalRole: TracePhoneRole.NORMAL,
    },

    {
label: 'O',
features: [
   0, /*UNVOICE*/
   0, /*VOICE*/
   1, /*SONORANT*/
   0, /*NONSONORANT*/
   0, /*LIQUID*/
   0, /*SEMI-GLIDE*/
   1, /*VOCALIC*/
   0, /*STOP*/
   0, /*NASAL*/
   0.0, /*FRICATIVE*/
   0.0, /*AFFRICATE*/
   0.0, /*APPROXIMANT*/
   0.0, /*LATERAL*/
   0.0, /*BILABIAL*/
   0.0, /*LABIODENTAL*/
   0.0, /*DENTAL*/
   0.0, /*ALVEROLAR*/
   0.0, /*POSTALVEOLAR*/
   0.0, /*PALATAL*/
   0.0, /*VELAR*/
   0.0, /*GLOTTAL*/
   0.0, /*FB1A*/
   0.0, /*FB2A*/
   0.0, /*FB3A*/
   0.1, /*FB4A*/
   0.4, /*FB5A*/
   0.0, /*HL1A*/
   0.0, /*HL2A*/
   0.0, /*HL3A*/
   0.05, /*HL4A*/
   0.4, /*HL5A*/
   0.05, /*HL6A*/
   0.4, /*FB1B*/
   0.1, /*FB2B*/
   0.0, /*FB3B*/
   0.0, /*FB4B*/
   0.0, /*FB5B*/
   0.05, /*HL1B*/
   0.4, /*HL2B*/
   0.05, /*HL3B*/
   0.0, /*HL4B*/
   0.0, /*HL5B*/
   0.0, /*HL6B*/
   0, /*SIL1*/
   0, /*SIL2*/
   0, /*SIL3*/
   0, /*SIL4*/
],
durationScalar: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
phonologicalRole: TracePhoneRole.NORMAL,
    },

    {
label: 'W',
features: [
   0, /*UNVOICE*/
   0, /*VOICE*/
   1, /*SONORANT*/
   0, /*NONSONORANT*/
   0, /*LIQUID*/
   0, /*SEMI-GLIDE*/
   1, /*VOCALIC*/
   0, /*STOP*/
   0, /*NASAL*/
   0.0, /*FRICATIVE*/
   0.0, /*AFFRICATE*/
   0.0, /*APPROXIMANT*/
   0.0, /*LATERAL*/
   0.0, /*BILABIAL*/
   0.0, /*LABIODENTAL*/
   0.0, /*DENTAL*/
   0.0, /*ALVEROLAR*/
   0.0, /*POSTALVEOLAR*/
   0.0, /*PALATAL*/
   0.0, /*VELAR*/
   0.0, /*GLOTTAL*/
   0.05, /*FB1A*/
   0.4, /*FB2A*/
   0.05, /*FB3A*/
   0.0, /*FB4A*/
   0.0, /*FB5A*/
   0.0, /*HL1A*/
   0.0, /*HL2A*/
   0.0, /*HL3A*/
   0.05, /*HL4A*/
   0.4, /*HL5A*/
   0.05, /*HL6A*/
   0.0, /*FB1B*/
   0.0, /*FB2B*/
   0.05, /*FB3B*/
   0.4, /*FB4B*/
   0.05, /*FB5B*/
   0.05, /*HL1B*/
   0.4, /*HL2B*/
   0.05, /*HL3B*/
   0.0, /*HL4B*/
   0.0, /*HL5B*/
   0.0, /*HL6B*/
   0, /*SIL1*/
   0, /*SIL2*/
   0, /*SIL3*/
   0, /*SIL4*/
],
durationScalar: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
phonologicalRole: TracePhoneRole.NORMAL,
    },

    {
label: '-',
features: [
   0, /*UNVOICE*/
   0, /*VOICE*/
   0, /*SONORANT*/
   0, /*NONSONORANT*/
   0, /*LIQUID*/
   0, /*SEMI-GLIDE*/
   0, /*VOCALIC*/
   0, /*STOP*/
   0, /*NASAL*/
   0.0, /*FRICATIVE*/
   0.0, /*AFFRICATE*/
   0.0, /*APPROXIMANT*/
   0.0, /*LATERAL*/
   0.0, /*BILABIAL*/
   0.0, /*LABIODENTAL*/
   0.0, /*DENTAL*/
   0.0, /*ALVEROLAR*/
   0.0, /*POSTALVEOLAR*/
   0.0, /*PALATAL*/
   0.0, /*VELAR*/
   0.0, /*GLOTTAL*/
   0.0, /*FB1A*/
   0.0, /*FB2A*/
   0.0, /*FB3A*/
   0.0, /*FB4A*/
   0.0, /*FB5A*/
   0.0, /*HL1A*/
   0.0, /*HL2A*/
   0.0, /*HL3A*/
   0.0, /*HL4A*/
   0.0, /*HL5A*/
   0.0, /*HL6A*/
   0.0, /*FB1B*/
   0.0, /*FB2B*/
   0.0, /*FB3B*/
   0.0, /*FB4B*/
   0.0, /*FB5B*/
   0.0, /*HL1B*/
   0.0, /*HL2B*/
   0.0, /*HL3B*/
   0.0, /*HL4B*/
   0.0, /*HL5B*/
   0.0, /*HL6B*/
   1, /*SIL1*/
   1, /*SIL2*/
   1, /*SIL3*/
   1, /*SIL4*/
],
durationScalar: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
phonologicalRole: TracePhoneRole.NORMAL,
    },
  ],
    lexicon: [
  /*{ phon: '^br^pt', freq: 0, prime: 0 },
    { phon: '^dapt', freq: 0, prime: 0 },
    { phon: '^d^lt', freq: 0, prime: 0 },
    { phon: '^gri', freq: 0, prime: 0 },
    { phon: '^lat', freq: 0, prime: 0 },
    { phon: '^part', freq: 0, prime: 0 },
    { phon: '^pil', freq: 0, prime: 0 },
    { phon: 'ark', freq: 0, prime: 0 },
    { phon: 'ar', freq: 0, prime: 0 },
    { phon: 'art', freq: 0, prime: 0 },
    { phon: 'art^st', freq: 0, prime: 0 },
    { phon: '^slip', freq: 0, prime: 0 },
    { phon: 'bar', freq: 0, prime: 0 },
    { phon: 'bark', freq: 0, prime: 0 },
    { phon: 'bi', freq: 0, prime: 0 },
    { phon: 'bit', freq: 0, prime: 0 },
    { phon: 'bist', freq: 0, prime: 0 },
    { phon: 'blak', freq: 0, prime: 0 },
    { phon: 'bl^d', freq: 0, prime: 0 },
    { phon: 'blu', freq: 0, prime: 0 },
    { phon: '-', freq: 0, prime: 0 }*/
    // { phon: 'plxg', freq: 23248, prime: 0 },

// 1000lex!
     { phon: 'pxrC', freq: 1, prime: 0 },
    { phon: 'pYpIG', freq: 1, prime: 0 },
    { phon: 'EmbrOdxri', freq: 1, prime: 0 },
    { phon: 'Wt', freq: 1, prime: 0 },
    { phon: 'testlIs', freq: 1, prime: 0 },
    { phon: 'Epxk', freq: 1, prime: 0 },
    { phon: 'TEft', freq: 1, prime: 0 },
    { phon: 'baroIG', freq: 1, prime: 0 },
    { phon: 'rIfxl', freq: 1, prime: 0 },
    { phon: 'dxvxlJ', freq: 1, prime: 0 },
    { phon: 'swICbled', freq: 1, prime: 0 },
    { phon: 'tOlIt', freq: 1, prime: 0 },
    { phon: 'krAkxr', freq: 1, prime: 0 },
    { phon: 'menlxnd', freq: 1, prime: 0 },
    { phon: 'hYd', freq: 1, prime: 0 },
    { phon: 'peCEk', freq: 1, prime: 0 },
    { phon: 'farDxr', freq: 1, prime: 0 },
    { phon: 'IntEstIn', freq: 1, prime: 0 },
    { phon: 'hUre', freq: 1, prime: 0 },
    { phon: 'lxnCIn', freq: 1, prime: 0 },
    { phon: 'revIG', freq: 1, prime: 0 },
    { phon: 'skim', freq: 1, prime: 0 },
    { phon: 'vAlxd', freq: 1, prime: 0 },
    { phon: 'tEkst', freq: 1, prime: 0 },
    { phon: 'YsxsYxnet', freq: 1, prime: 0 },
    { phon: 'sImfanIk', freq: 1, prime: 0 },
    { phon: 'krakt', freq: 1, prime: 0 },
    { phon: 'ncr', freq: 1, prime: 0 },
    { phon: 'AlfxbEtIkxl', freq: 1, prime: 0 },
    { phon: 'pxfi', freq: 1, prime: 0 },
    { phon: 'txrnxp', freq: 1, prime: 0 },
    { phon: 'xglutxnIn', freq: 1, prime: 0 },
    { phon: 'AknalIJ', freq: 1, prime: 0 },
    { phon: 'wIzxrd', freq: 1, prime: 0 },
    { phon: 'sEkyxlxrIst', freq: 1, prime: 0 },
    { phon: 'sutxbIlIti', freq: 1, prime: 0 },
    { phon: 'lEgIG', freq: 1, prime: 0 },
    { phon: 'gretkot', freq: 1, prime: 0 },
    { phon: 'sclvxnsi', freq: 1, prime: 0 },
    { phon: 'CEn', freq: 1, prime: 0 },
    { phon: 'kxrIJ', freq: 1, prime: 0 },
    { phon: 'kohIrxnt', freq: 1, prime: 0 },
    { phon: 'byutixs', freq: 1, prime: 0 },
    { phon: 'sxbstItut', freq: 1, prime: 0 },
    { phon: 'xtrIbyutxbxl', freq: 1, prime: 0 },
    { phon: 'dxmakrIsi', freq: 1, prime: 0 },
    { phon: 'skrutxnYz', freq: 1, prime: 0 },
    { phon: 'bYplen', freq: 1, prime: 0 },
    { phon: 'trizxnxs', freq: 1, prime: 0 },
    { phon: 'wEtnxs', freq: 1, prime: 0 },
    { phon: 'pxtAsixm', freq: 1, prime: 0 },
    { phon: 'sYkoAnxlxst', freq: 1, prime: 0 },
    { phon: 'pAso', freq: 1, prime: 0 },
    { phon: 'wYli', freq: 1, prime: 0 },
    { phon: 'spIl', freq: 1, prime: 0 },
    { phon: 'xbrxpt', freq: 1, prime: 0 },
    { phon: 'rEzxnxnt', freq: 1, prime: 0 },
    { phon: 'kxlCxr', freq: 1, prime: 0 },
    { phon: 'kxmyutxr', freq: 1, prime: 0 },
    { phon: 'dUreSIn', freq: 1, prime: 0 },
    { phon: 'dIskwYItIG', freq: 1, prime: 0 },
    { phon: 'ApxTi', freq: 1, prime: 0 },
    { phon: 'grAslAnd', freq: 1, prime: 0 },
    { phon: 'hAGIG', freq: 1, prime: 0 },
    { phon: 'dIlIGkwxnt', freq: 1, prime: 0 },
    { phon: 'breZxr', freq: 1, prime: 0 },
    { phon: 'frEnd', freq: 1, prime: 0 },
    { phon: 'fornalIJ', freq: 1, prime: 0 },
    { phon: 'tckxr', freq: 1, prime: 0 },
    { phon: 'grAJuxl', freq: 1, prime: 0 },
    { phon: 'tcni', freq: 1, prime: 0 },
    { phon: 'dUrxbxl', freq: 1, prime: 0 },
    { phon: 'laJIk', freq: 1, prime: 0 },
    { phon: 'mEdIk', freq: 1, prime: 0 },
    { phon: 'hoz', freq: 1, prime: 0 },
    { phon: 'Jxrmxnxl', freq: 1, prime: 0 },
    { phon: 'bEnd', freq: 1, prime: 0 },
    { phon: 'lud', freq: 1, prime: 0 },
    { phon: 'stcrm', freq: 1, prime: 0 },
    { phon: 'trus', freq: 1, prime: 0 },
    { phon: 'dIstxrbxns', freq: 1, prime: 0 },
    { phon: 'dIk', freq: 1, prime: 0 },
    { phon: 'byuten', freq: 1, prime: 0 },
    { phon: 'lxlIbY', freq: 1, prime: 0 },
    { phon: 'letIst', freq: 1, prime: 0 },
    { phon: 'most', freq: 1, prime: 0 },
    { phon: 'stretfcrwxrd', freq: 1, prime: 0 },
    { phon: 'mxmbxl', freq: 1, prime: 0 },
    { phon: 'gIvxr', freq: 1, prime: 0 },
    { phon: 'hxrxken', freq: 1, prime: 0 },
    { phon: 'skArxfY', freq: 1, prime: 0 },
    { phon: 'skcld', freq: 1, prime: 0 },
    { phon: 'lEfti', freq: 1, prime: 0 },
    { phon: 'sYkxl', freq: 1, prime: 0 },
    { phon: 'vamxt', freq: 1, prime: 0 },
    { phon: 'pErxkit', freq: 1, prime: 0 },
    { phon: 'brWnIS', freq: 1, prime: 0 },
    { phon: 'spxrn', freq: 1, prime: 0 },
    { phon: 'xsYn', freq: 1, prime: 0 },
    { phon: 'InkxpAsxtet', freq: 1, prime: 0 },
    { phon: 'lAC', freq: 1, prime: 0 },
    { phon: 'madxfY', freq: 1, prime: 0 },
    { phon: 'Cembxrmed', freq: 1, prime: 0 },
    { phon: 'vAlyueSIn', freq: 1, prime: 0 },
    { phon: 'Intek', freq: 1, prime: 0 },
    { phon: 'pxnUrixs', freq: 1, prime: 0 },
    { phon: 'Alvixlxr', freq: 1, prime: 0 },
    { phon: 'brYtxst', freq: 1, prime: 0 },
    { phon: 'hEksxgan', freq: 1, prime: 0 },
    { phon: 'bcdi', freq: 1, prime: 0 },
    { phon: 'lIlxpyuSxn', freq: 1, prime: 0 },
    { phon: 'bUkkipIG', freq: 1, prime: 0 },
    { phon: 'divixnt', freq: 1, prime: 0 },
    { phon: 'rIflEktIv', freq: 1, prime: 0 },
    { phon: 'trxndxl', freq: 1, prime: 0 },
    { phon: 'SitIG', freq: 1, prime: 0 },
    { phon: 'bxrdi', freq: 1, prime: 0 },
    { phon: 'tEmpxr', freq: 1, prime: 0 },
    { phon: 'rIkOlxs', freq: 1, prime: 0 },
    { phon: 'krcswck', freq: 1, prime: 0 },
    { phon: 'ycl', freq: 1, prime: 0 },
    { phon: 'koxlEs', freq: 1, prime: 0 },
    { phon: 'sxrvYvxlIst', freq: 1, prime: 0 },
    { phon: 'kamIntEri', freq: 1, prime: 0 },
    { phon: 'rIvxrsxbxl', freq: 1, prime: 0 },
    { phon: 'Cak', freq: 1, prime: 0 },
    { phon: 'glxt', freq: 1, prime: 0 },
    { phon: 'kxpAsItxns', freq: 1, prime: 0 },
    { phon: 'plAnIG', freq: 1, prime: 0 },
    { phon: 'trio', freq: 1, prime: 0 },
    { phon: 'strAgxl', freq: 1, prime: 0 },
    { phon: 'blxdhWnd', freq: 1, prime: 0 },
    { phon: 'xnkxmftxbxl', freq: 1, prime: 0 },
    { phon: 'pyUrIti', freq: 1, prime: 0 },
    { phon: 'yUnik', freq: 1, prime: 0 },
    { phon: 'navxl', freq: 1, prime: 0 },
    { phon: 'dElxkIt', freq: 1, prime: 0 },
    { phon: 'rif', freq: 1, prime: 0 },
    { phon: 'skwablIG', freq: 1, prime: 0 },
    { phon: 'pxlut', freq: 1, prime: 0 },
    { phon: 'rIprxdus', freq: 1, prime: 0 },
    { phon: 'ImpxrfEkSIn', freq: 1, prime: 0 },
    { phon: 'fAd', freq: 1, prime: 0 },
    { phon: 'cdIbxl', freq: 1, prime: 0 },
    { phon: 'dISwctxr', freq: 1, prime: 0 },
    { phon: 'stEdi', freq: 1, prime: 0 },
    { phon: 'scrt', freq: 1, prime: 0 },
    { phon: 'kambIneSIn', freq: 1, prime: 0 },
    { phon: 'vYxbxl', freq: 1, prime: 0 },
    { phon: 'vEntxleSIn', freq: 1, prime: 0 },
    { phon: 'volISIn', freq: 1, prime: 0 },
    { phon: 'dIm', freq: 1, prime: 0 },
    { phon: 'Sol', freq: 1, prime: 0 },
    { phon: 'kwIl', freq: 1, prime: 0 },
    { phon: 'sEntrxfyuJ', freq: 1, prime: 0 },
    { phon: 'klArxfY', freq: 1, prime: 0 },
    { phon: 'brEvxti', freq: 1, prime: 0 },
    { phon: 'IkstEnsIv', freq: 1, prime: 0 },
    { phon: 'huEvxr', freq: 1, prime: 0 },
    { phon: 'vItrialIk', freq: 1, prime: 0 },
    { phon: 'lxrnxr', freq: 1, prime: 0 },
    { phon: 'gUrme', freq: 1, prime: 0 },
    { phon: 'kAp', freq: 1, prime: 0 },
    { phon: 'bIt', freq: 1, prime: 0 },
    { phon: 'frAGknIs', freq: 1, prime: 0 },
    { phon: 'tiC', freq: 1, prime: 0 },
    { phon: 'bIgIt', freq: 1, prime: 0 },
    { phon: 'Indaktrxnet', freq: 1, prime: 0 },
    { phon: 'pAlxs', freq: 1, prime: 0 },
    { phon: 'xnCartId', freq: 1, prime: 0 },
    { phon: 'kazmalxJi', freq: 1, prime: 0 },
    { phon: 'stAns', freq: 1, prime: 0 },
    { phon: 'trYbxl', freq: 1, prime: 0 },
    { phon: 'IkstEnsxr', freq: 1, prime: 0 },
    { phon: 'truT', freq: 1, prime: 0 },
    { phon: 'krAGk', freq: 1, prime: 0 },
    { phon: 'fudstxf', freq: 1, prime: 0 },
    { phon: 'sxplYxr', freq: 1, prime: 0 },
    { phon: 'trAkt', freq: 1, prime: 0 },
    { phon: 'brcdnIG', freq: 1, prime: 0 },
    { phon: 'pxtit', freq: 1, prime: 0 },
    { phon: 'hAGovxr', freq: 1, prime: 0 },
    { phon: 'fasfxrEsxnt', freq: 1, prime: 0 },
    { phon: 'kort', freq: 1, prime: 0 },
    { phon: 'mcsxlixm', freq: 1, prime: 0 },
    { phon: 'xnpAk', freq: 1, prime: 0 },
    { phon: 'kxnsIstxnt', freq: 1, prime: 0 },
    { phon: 'mIksIG', freq: 1, prime: 0 },
    { phon: 'igo', freq: 1, prime: 0 },
    { phon: 'rixlti', freq: 1, prime: 0 },
    { phon: 'xkxstxm', freq: 1, prime: 0 },
    { phon: 'wEpxnri', freq: 1, prime: 0 },
    { phon: 'lEst', freq: 1, prime: 0 },
    { phon: 'artxfISiAlIti', freq: 1, prime: 0 },
    { phon: 'klAmxr', freq: 1, prime: 0 },
    { phon: 'sit', freq: 1, prime: 0 },
    { phon: 'frAgmxnteSxn', freq: 1, prime: 0 },
    { phon: 'fxrDxr', freq: 1, prime: 0 },
    { phon: 'sYfxr', freq: 1, prime: 0 },
    { phon: 'sElf', freq: 1, prime: 0 },
    { phon: 'walo', freq: 1, prime: 0 },
    { phon: 'sxrvYvxbIlIti', freq: 1, prime: 0 },
    { phon: 'bIlyxrd', freq: 1, prime: 0 },
    { phon: 'mxg', freq: 1, prime: 0 },
    { phon: 'hAt', freq: 1, prime: 0 },
    { phon: 'EgzclteSIn', freq: 1, prime: 0 },
    { phon: 'rivyuxr', freq: 1, prime: 0 },
    { phon: 'pIriadIk', freq: 1, prime: 0 },
    { phon: 'rIpcrtIG', freq: 1, prime: 0 },
    { phon: 'sIkYxtrIst', freq: 1, prime: 0 },
    { phon: 'rIJOs', freq: 1, prime: 0 },
    { phon: 'sAndwIC', freq: 1, prime: 0 },
    { phon: 'brcdkAstIG', freq: 1, prime: 0 },
    { phon: 'pemxnt', freq: 1, prime: 0 },
    { phon: 'hcrxbxl', freq: 1, prime: 0 },
    { phon: 'xnIksplend', freq: 1, prime: 0 },
    { phon: 'petriarki', freq: 1, prime: 0 },
    { phon: 'hIs', freq: 1, prime: 0 },
    { phon: 'cbxrn', freq: 1, prime: 0 },
    { phon: 'hIpstxr', freq: 1, prime: 0 },
    { phon: 'CYnx', freq: 1, prime: 0 },
    { phon: 'rIzIst', freq: 1, prime: 0 },
    { phon: 'strEnyuxs', freq: 1, prime: 0 },
    { phon: 'rEprizEnt', freq: 1, prime: 0 },
    { phon: 'bAksYd', freq: 1, prime: 0 },
    { phon: 'sxgJEstId', freq: 1, prime: 0 },
    { phon: 'grAnstAnd', freq: 1, prime: 0 },
    { phon: 'steplIG', freq: 1, prime: 0 },
    { phon: 'EksEntrIsIti', freq: 1, prime: 0 },
    { phon: 'prIkasIti', freq: 1, prime: 0 },
    { phon: 'blYnd', freq: 1, prime: 0 },
    { phon: 'sxbmIt', freq: 1, prime: 0 },
    { phon: 'mxJcrIti', freq: 1, prime: 0 },
    { phon: 'InvInsxbxl', freq: 1, prime: 0 },
    { phon: 'timmet', freq: 1, prime: 0 },
    { phon: 'mxrJxr', freq: 1, prime: 0 },
    { phon: 'riInforsmxnt', freq: 1, prime: 0 },
    { phon: 'stuxrdSIp', freq: 1, prime: 0 },
    { phon: 'xnyuzd', freq: 1, prime: 0 },
    { phon: 'flxkCueSIn', freq: 1, prime: 0 },
    { phon: 'dxski', freq: 1, prime: 0 },
    { phon: 'pAtrxnIJ', freq: 1, prime: 0 },
    { phon: 'xnIkspEktId', freq: 1, prime: 0 },
    { phon: 'bIhold', freq: 1, prime: 0 },
    { phon: 'Intxrlud', freq: 1, prime: 0 },
    { phon: 'sEptIk', freq: 1, prime: 0 },
    { phon: 'donet', freq: 1, prime: 0 },
    { phon: 'hElp', freq: 1, prime: 0 },
    { phon: 'tapxl', freq: 1, prime: 0 },
    { phon: 'fACuxs', freq: 1, prime: 0 },
    { phon: 'bAsxnEt', freq: 1, prime: 0 },
    { phon: 'niDxr', freq: 1, prime: 0 },
    { phon: 'gxrli', freq: 1, prime: 0 },
    { phon: 'fagi', freq: 1, prime: 0 },
    { phon: 'vEnxmxs', freq: 1, prime: 0 },
    { phon: 'patbOlxr', freq: 1, prime: 0 },
    { phon: 'InkyUrxbxl', freq: 1, prime: 0 },
    { phon: 'InISiet', freq: 1, prime: 0 },
    { phon: 'pYrIsi', freq: 1, prime: 0 },
    { phon: 'sxrv', freq: 1, prime: 0 },
    { phon: 'pxzlIG', freq: 1, prime: 0 },
    { phon: 'ISuxns', freq: 1, prime: 0 },
    { phon: 'trYxmfxnt', freq: 1, prime: 0 },
    { phon: 'kepxbIlIti', freq: 1, prime: 0 },
    { phon: 'pradxktIvxti', freq: 1, prime: 0 },
    { phon: 'skwElC', freq: 1, prime: 0 },
    { phon: 'spIrICxwxli', freq: 1, prime: 0 },
    { phon: 'Ivok', freq: 1, prime: 0 },
    { phon: 'sxfxketIG', freq: 1, prime: 0 },
    { phon: 'AntAgInIzxm', freq: 1, prime: 0 },
    { phon: 'dIfInItIv', freq: 1, prime: 0 },
    { phon: 'hetrId', freq: 1, prime: 0 },
    { phon: 'hElpmet', freq: 1, prime: 0 },
    { phon: 'gxlxbIlIti', freq: 1, prime: 0 },
    { phon: 'pxrfxGktxri', freq: 1, prime: 0 },
    { phon: 'klosxp', freq: 1, prime: 0 },
    { phon: 'mitxr', freq: 1, prime: 0 },
    { phon: 'fomIG', freq: 1, prime: 0 },
    { phon: 'IntrAktxbxl', freq: 1, prime: 0 },
    { phon: 'absxlEsxnt', freq: 1, prime: 0 },
    { phon: 'dIfcrmxti', freq: 1, prime: 0 },
    { phon: 'krcsIG', freq: 1, prime: 0 },
    { phon: 'AdvxrtYz', freq: 1, prime: 0 },
    { phon: 'lxnC', freq: 1, prime: 0 },
    { phon: 'vYbret', freq: 1, prime: 0 },
    { phon: 'bxrdxnsxm', freq: 1, prime: 0 },
    { phon: 'bab', freq: 1, prime: 0 },
    { phon: 'por', freq: 1, prime: 0 },
    { phon: 'belfxl', freq: 1, prime: 0 },
    { phon: 'sadxr', freq: 1, prime: 0 },
    { phon: 'rizxnxbli', freq: 1, prime: 0 },
    { phon: 'sElIbret', freq: 1, prime: 0 },
    { phon: 'kyupan', freq: 1, prime: 0 },
    { phon: 'Intxrvyu', freq: 1, prime: 0 },
    { phon: 'krWC', freq: 1, prime: 0 },
    { phon: 'dIsxntEri', freq: 1, prime: 0 },
    { phon: 'kxmpyut', freq: 1, prime: 0 },
    { phon: 'CInlxs', freq: 1, prime: 0 },
    { phon: 'bIzixst', freq: 1, prime: 0 },
    { phon: 'xnimIk', freq: 1, prime: 0 },
    { phon: 'kxnu', freq: 1, prime: 0 },
    { phon: 'be', freq: 1, prime: 0 },
    { phon: 'xnxkxmpxnid', freq: 1, prime: 0 },
    { phon: 'strimlYnxr', freq: 1, prime: 0 },
    { phon: 'Ived', freq: 1, prime: 0 },
    { phon: 'cTxrSIp', freq: 1, prime: 0 },
    { phon: 'bambAstIk', freq: 1, prime: 0 },
    { phon: 'stErixfanIk', freq: 1, prime: 0 },
    { phon: 'supxrstrxkCxr', freq: 1, prime: 0 },
    { phon: 'kazmEtIk', freq: 1, prime: 0 },
    { phon: 'InkrIdulIti', freq: 1, prime: 0 },
    { phon: 'armCEr', freq: 1, prime: 0 },
    { phon: 'rOxl', freq: 1, prime: 0 },
    { phon: 'xrWzxl', freq: 1, prime: 0 },
    { phon: 'ImpavxrISt', freq: 1, prime: 0 },
    { phon: 'stEpmxDxr', freq: 1, prime: 0 },
    { phon: 'frxntIJ', freq: 1, prime: 0 },
    { phon: 'fEstxr', freq: 1, prime: 0 },
    { phon: 'spuf', freq: 1, prime: 0 },
    { phon: 'mYk', freq: 1, prime: 0 },
    { phon: 'artIzIn', freq: 1, prime: 0 },
    { phon: 'IndIstIGt', freq: 1, prime: 0 },
    { phon: 'EJUketxr', freq: 1, prime: 0 },
    { phon: 'skalxrli', freq: 1, prime: 0 },
    { phon: 'tcrCxr', freq: 1, prime: 0 },
    { phon: 'pEnIsIlIn', freq: 1, prime: 0 },
    { phon: 'xnxmoSxnxl', freq: 1, prime: 0 },
    { phon: 'nEst', freq: 1, prime: 0 },
    { phon: 'hark', freq: 1, prime: 0 },
    { phon: 'spAr', freq: 1, prime: 0 },
    { phon: 'kambo', freq: 1, prime: 0 },
    { phon: 'kxstxmEri', freq: 1, prime: 0 },
    { phon: 'tYprYtxr', freq: 1, prime: 0 },
    { phon: 'flAksid', freq: 1, prime: 0 },
    { phon: 'IndEksIG', freq: 1, prime: 0 },
    { phon: 'tEnd', freq: 1, prime: 0 },
    { phon: 'krxnC', freq: 1, prime: 0 },
    { phon: 'Juxlxr', freq: 1, prime: 0 },
    { phon: 'pAdIG', freq: 1, prime: 0 },
    { phon: 'sambx', freq: 1, prime: 0 },
    { phon: 'kxntEndxr', freq: 1, prime: 0 },
    { phon: 'plAtxnxm', freq: 1, prime: 0 },
    { phon: 'ditUr', freq: 1, prime: 0 },
    { phon: 'Insxrt', freq: 1, prime: 0 },
    { phon: 'AnsEstxr', freq: 1, prime: 0 },
    { phon: 'hxrmEtIk', freq: 1, prime: 0 },
    { phon: 'rEdnEk', freq: 1, prime: 0 },
    { phon: 'xpclIG', freq: 1, prime: 0 },
    { phon: 'stAndpOnt', freq: 1, prime: 0 },
    { phon: 'kxndISxnIG', freq: 1, prime: 0 },
    { phon: 'bandzmxn', freq: 1, prime: 0 },
    { phon: 'Juxlri', freq: 1, prime: 0 },
    { phon: 'bubi', freq: 1, prime: 0 },
    { phon: 'sAlyuteSIn', freq: 1, prime: 0 },
    { phon: 'wcrxn', freq: 1, prime: 0 },
    { phon: 'ImpEkxbli', freq: 1, prime: 0 },
    { phon: 'rEzIgneSIn', freq: 1, prime: 0 },
    { phon: 'xmId', freq: 1, prime: 0 },
    { phon: 'pxrpxl', freq: 1, prime: 0 },
    { phon: 'pxrEnixl', freq: 1, prime: 0 },
    { phon: 'kxmxr', freq: 1, prime: 0 },
    { phon: 'kxnsxrnIG', freq: 1, prime: 0 },
    { phon: 'mxtxr', freq: 1, prime: 0 },
    { phon: 'sIloEt', freq: 1, prime: 0 },
    { phon: 'kwcrxl', freq: 1, prime: 0 },
    { phon: 'xltxmxtli', freq: 1, prime: 0 },
    { phon: 'vAlyUbxl', freq: 1, prime: 0 },
    { phon: 'EnzxmAtIk', freq: 1, prime: 0 },
    { phon: 'gxm', freq: 1, prime: 0 },
    { phon: 'hxrdIG', freq: 1, prime: 0 },
    { phon: 'kranxlaJIkxl', freq: 1, prime: 0 },
    { phon: 'rItrivxr', freq: 1, prime: 0 },
    { phon: 'EtxmxlaJIkxl', freq: 1, prime: 0 },
    { phon: 'xndxrsEkrItEri', freq: 1, prime: 0 },
    { phon: 'xbyuz', freq: 1, prime: 0 },
    { phon: 'mxrTlIs', freq: 1, prime: 0 },
    { phon: 'snIpi', freq: 1, prime: 0 },
    { phon: 'xnvel', freq: 1, prime: 0 },
    { phon: 'prxfxndIti', freq: 1, prime: 0 },
    { phon: 'kanvEnt', freq: 1, prime: 0 },
    { phon: 'fAktxri', freq: 1, prime: 0 },
    { phon: 'pUSIG', freq: 1, prime: 0 },
    { phon: 'kxnsEpSIn', freq: 1, prime: 0 },
    { phon: 'YtInxrEri', freq: 1, prime: 0 },
    { phon: 'dxlxr', freq: 1, prime: 0 },
    { phon: 'krap', freq: 1, prime: 0 },
    { phon: 'sAGktxmonixs', freq: 1, prime: 0 },
    { phon: 'xpror', freq: 1, prime: 0 },
    { phon: 'AnIsTiZx', freq: 1, prime: 0 },
    { phon: 'dxlIGkwxnsi', freq: 1, prime: 0 },
    { phon: 'kantxnuIti', freq: 1, prime: 0 },
    { phon: 'flWxrIG', freq: 1, prime: 0 },
    { phon: 'lAb', freq: 1, prime: 0 },
    { phon: 'IksklusIvli', freq: 1, prime: 0 },
    { phon: 'trIplIt', freq: 1, prime: 0 },
    { phon: 'gArxlxs', freq: 1, prime: 0 },
    { phon: 'dIvxrt', freq: 1, prime: 0 },
    { phon: 'mErIt', freq: 1, prime: 0 },
    { phon: 'YdEntIfIkeSIn', freq: 1, prime: 0 },
    { phon: 'skxf', freq: 1, prime: 0 },
    { phon: 'kxntAmxnet', freq: 1, prime: 0 },
    { phon: 'spWz', freq: 1, prime: 0 },
    { phon: 'trYbyunxl', freq: 1, prime: 0 },
    { phon: 'proxbISIn', freq: 1, prime: 0 },
    { phon: 'IkskriSxn', freq: 1, prime: 0 },
    { phon: 'sxfIstIketId', freq: 1, prime: 0 },
    { phon: 'InfIrixr', freq: 1, prime: 0 },
    { phon: 'Ilusxri', freq: 1, prime: 0 },
    { phon: 'rAGgxl', freq: 1, prime: 0 },
    { phon: 'bArxl', freq: 1, prime: 0 },
    { phon: 'rodxdEndrxn', freq: 1, prime: 0 },
    { phon: 'Jxkstxpoz', freq: 1, prime: 0 },
    { phon: 'dIstIlxr', freq: 1, prime: 0 },
    { phon: 'pxrt', freq: 1, prime: 0 },
    { phon: 'xnkxndISxnd', freq: 1, prime: 0 },
    { phon: 'bErxst', freq: 1, prime: 0 },
    { phon: 'fxGkSIn', freq: 1, prime: 0 },
    { phon: 'grasixs', freq: 1, prime: 0 },
    { phon: 'mxrAkyUlxs', freq: 1, prime: 0 },
    { phon: 'lEJIsleCxr', freq: 1, prime: 0 },
    { phon: 'med', freq: 1, prime: 0 },
    { phon: 'stoxsIzxm', freq: 1, prime: 0 },
    { phon: 'sxp', freq: 1, prime: 0 },
    { phon: 'xfISxl', freq: 1, prime: 0 },
    { phon: 'dIJEnxret', freq: 1, prime: 0 },
    { phon: 'xwet', freq: 1, prime: 0 },
    { phon: 'SAk', freq: 1, prime: 0 },
    { phon: 'AkSIn', freq: 1, prime: 0 },
    { phon: 'barnyard', freq: 1, prime: 0 },
    { phon: 'lYlxk', freq: 1, prime: 0 },
    { phon: 'dIsJOnt', freq: 1, prime: 0 },
    { phon: 'sElIbreSIn', freq: 1, prime: 0 },
    { phon: 'ovxrkanfIdxnt', freq: 1, prime: 0 },
    { phon: 'fAtxn', freq: 1, prime: 0 },
    { phon: 'bekxr', freq: 1, prime: 0 },
    { phon: 'Embadimxnt', freq: 1, prime: 0 },
    { phon: 'AsbEstxs', freq: 1, prime: 0 },
    { phon: 'lIGgwIstIk', freq: 1, prime: 0 },
    { phon: 'ctxmobil', freq: 1, prime: 0 },
    { phon: 'xbrivieSIn', freq: 1, prime: 0 },
    { phon: 'xbod', freq: 1, prime: 0 },
    { phon: 'xnikwxld', freq: 1, prime: 0 },
    { phon: 'stInt', freq: 1, prime: 0 },
    { phon: 'ribIld', freq: 1, prime: 0 },
    { phon: 'kAntxlop', freq: 1, prime: 0 },
    { phon: 'AdvYzxr', freq: 1, prime: 0 },
    { phon: 'rAbY', freq: 1, prime: 0 },
    { phon: 'dEdxn', freq: 1, prime: 0 },
    { phon: 'ridEfxnISxn', freq: 1, prime: 0 },
    { phon: 'brIzIr', freq: 1, prime: 0 },
    { phon: 'spre', freq: 1, prime: 0 },
    { phon: 'xvOd', freq: 1, prime: 0 },
    { phon: 'sxbsYd', freq: 1, prime: 0 },
    { phon: 'mAltrit', freq: 1, prime: 0 },
    { phon: 'sxnatx', freq: 1, prime: 0 },
    { phon: 'sYAtIkx', freq: 1, prime: 0 },
    { phon: 'xdAptxr', freq: 1, prime: 0 },
    { phon: 'slek', freq: 1, prime: 0 },
    { phon: 'nxrvxsnxs', freq: 1, prime: 0 },
    { phon: 'fAntxm', freq: 1, prime: 0 },
    { phon: 'smcg', freq: 1, prime: 0 },
    { phon: 'snAC', freq: 1, prime: 0 },
    { phon: 'rIbcld', freq: 1, prime: 0 },
    { phon: 'pxrswesIv', freq: 1, prime: 0 },
    { phon: 'kxnCErto', freq: 1, prime: 0 },
    { phon: 'sofx', freq: 1, prime: 0 },
    { phon: 'AksElxret', freq: 1, prime: 0 },
    { phon: 'kxntrApSIn', freq: 1, prime: 0 },
    { phon: 'boldnxs', freq: 1, prime: 0 },
    { phon: 'sIGgxlnIs', freq: 1, prime: 0 },
    { phon: 'simIGli', freq: 1, prime: 0 },
    { phon: 'krez', freq: 1, prime: 0 },
    { phon: 'rImadxl', freq: 1, prime: 0 },
    { phon: 'grImxr', freq: 1, prime: 0 },
    { phon: 'vAnIS', freq: 1, prime: 0 },
    { phon: 'pAlxr', freq: 1, prime: 0 },
    { phon: 'kAnxpi', freq: 1, prime: 0 },
    { phon: 'dIsprxporSxnIt', freq: 1, prime: 0 },
    { phon: 'grImxs', freq: 1, prime: 0 },
    { phon: 'krxS', freq: 1, prime: 0 },
    { phon: 'stup', freq: 1, prime: 0 },
    { phon: 'Intxrrxpt', freq: 1, prime: 0 },
    { phon: 'haspxtAlIti', freq: 1, prime: 0 },
    { phon: 'kwcrtxrli', freq: 1, prime: 0 },
    { phon: 'CArIti', freq: 1, prime: 0 },
    { phon: 'gleSxr', freq: 1, prime: 0 },
    { phon: 'yutopixn', freq: 1, prime: 0 },
    { phon: 'blxdstrim', freq: 1, prime: 0 },
    { phon: 'sIspISIn', freq: 1, prime: 0 },
    { phon: 'xnkoapxrxtIv', freq: 1, prime: 0 },
    { phon: 'IndIsIZIn', freq: 1, prime: 0 },
    { phon: 'vYv', freq: 1, prime: 0 },
    { phon: 'blxdstend', freq: 1, prime: 0 },
    { phon: 'krAg', freq: 1, prime: 0 },
    { phon: 'trxdISIn', freq: 1, prime: 0 },
    { phon: 'suIJ', freq: 1, prime: 0 },
    { phon: 'Indisxnt', freq: 1, prime: 0 },
    { phon: 'frezIG', freq: 1, prime: 0 },
    { phon: 'ridxr', freq: 1, prime: 0 },
    { phon: 'ncrDxrnmost', freq: 1, prime: 0 },
    { phon: 'sxrkxl', freq: 1, prime: 0 },
    { phon: 'dEdli', freq: 1, prime: 0 },
    { phon: 'hWswxrk', freq: 1, prime: 0 },
    { phon: 'barbEl', freq: 1, prime: 0 },
    { phon: 'sEntxmitxr', freq: 1, prime: 0 },
    { phon: 'dxbetIG', freq: 1, prime: 0 },
    { phon: 'InvEstmxnt', freq: 1, prime: 0 },
    { phon: 'hxrYzxn', freq: 1, prime: 0 },
    { phon: 'frAkSIn', freq: 1, prime: 0 },
    { phon: 'rEstfxl', freq: 1, prime: 0 },
    { phon: 'pAtxntIG', freq: 1, prime: 0 },
    { phon: 'twEnti', freq: 1, prime: 0 },
    { phon: 'bxlcG', freq: 1, prime: 0 },
    { phon: 'xlYnmxnt', freq: 1, prime: 0 },
    { phon: 'rEkIJ', freq: 1, prime: 0 },
    { phon: 'Imbargo', freq: 1, prime: 0 },
    { phon: 'Cxtni', freq: 1, prime: 0 },
    { phon: 'strAtIJi', freq: 1, prime: 0 },
    { phon: 'garnIt', freq: 1, prime: 0 },
    { phon: 'hclt', freq: 1, prime: 0 },
    { phon: 'lokxl', freq: 1, prime: 0 },
    { phon: 'fimel', freq: 1, prime: 0 },
    { phon: 'Cxbi', freq: 1, prime: 0 },
    { phon: 'proskrYb', freq: 1, prime: 0 },
    { phon: 'lYbrEri', freq: 1, prime: 0 },
    { phon: 'privyu', freq: 1, prime: 0 },
    { phon: 'xsxmSIn', freq: 1, prime: 0 },
    { phon: 'vIktxri', freq: 1, prime: 0 },
    { phon: 'rxsti', freq: 1, prime: 0 },
    { phon: 'mIsIv', freq: 1, prime: 0 },
    { phon: 'glAdnxs', freq: 1, prime: 0 },
    { phon: 'prEJIdIs', freq: 1, prime: 0 },
    { phon: 'mIrxr', freq: 1, prime: 0 },
    { phon: 'xlYv', freq: 1, prime: 0 },
    { phon: 'Ignxrxnt', freq: 1, prime: 0 },
    { phon: 'IntxrkxnEktIdnIs', freq: 1, prime: 0 },
    { phon: 'bAbIt', freq: 1, prime: 0 },
    { phon: 'blxnt', freq: 1, prime: 0 },
    { phon: 'kantEst', freq: 1, prime: 0 },
    { phon: 'hwErxpcn', freq: 1, prime: 0 },
    { phon: 'mxrsIfxl', freq: 1, prime: 0 },
    { phon: 'dIskIntEnt', freq: 1, prime: 0 },
    { phon: 'twYlYt', freq: 1, prime: 0 },
    { phon: 'WtstAndIGli', freq: 1, prime: 0 },
    { phon: 'bamIG', freq: 1, prime: 0 },
    { phon: 'dItAC', freq: 1, prime: 0 },
    { phon: 'pUsi', freq: 1, prime: 0 },
    { phon: 'sYkoTErxpi', freq: 1, prime: 0 },
    { phon: 'kabxlston', freq: 1, prime: 0 },
    { phon: 'stACu', freq: 1, prime: 0 },
    { phon: 'hivIG', freq: 1, prime: 0 },
    { phon: 'dIbet', freq: 1, prime: 0 },
    { phon: 'dIsEnCIn', freq: 1, prime: 0 },
    { phon: 'vxlnxrxbxl', freq: 1, prime: 0 },
    { phon: 'bol', freq: 1, prime: 0 },
    { phon: 'frIJId', freq: 1, prime: 0 },
    { phon: 'kanJIgIt', freq: 1, prime: 0 },
    { phon: 'kxbxrd', freq: 1, prime: 0 },
    { phon: 'letxr', freq: 1, prime: 0 },
    { phon: 'markItples', freq: 1, prime: 0 },
    { phon: 'IkspErxmEntxl', freq: 1, prime: 0 },
    { phon: 'supxrsIlixs', freq: 1, prime: 0 },
    { phon: 'InhIbxt', freq: 1, prime: 0 },
    { phon: 'mAnsxrvxnt', freq: 1, prime: 0 },
    { phon: 'Insxlet', freq: 1, prime: 0 },
    { phon: 'trxstIG', freq: 1, prime: 0 },
    { phon: 'hxrtxl', freq: 1, prime: 0 },
    { phon: 'dIpriSieSxn', freq: 1, prime: 0 },
    { phon: 'EdItorixl', freq: 1, prime: 0 },
    { phon: 'bAGIG', freq: 1, prime: 0 },
    { phon: 'sxrlOn', freq: 1, prime: 0 },
    { phon: 'brxSIG', freq: 1, prime: 0 },
    { phon: 'prxvel', freq: 1, prime: 0 },
    { phon: 'prItEnCIs', freq: 1, prime: 0 },
    { phon: 'menten', freq: 1, prime: 0 },
    { phon: 'fcrtItud', freq: 1, prime: 0 },
    { phon: 'Cap', freq: 1, prime: 0 },
    { phon: 'bxGkxr', freq: 1, prime: 0 },
    { phon: 'rigrup', freq: 1, prime: 0 },
    { phon: 'dakyUmxnteSIn', freq: 1, prime: 0 },
    { phon: 'xntEnxbxl', freq: 1, prime: 0 },
    { phon: 'dIrenJmxnt', freq: 1, prime: 0 },
    { phon: 'xCiv', freq: 1, prime: 0 },
    { phon: 'InsxfISxntli', freq: 1, prime: 0 },
    { phon: 'trAGkwxl', freq: 1, prime: 0 },
    { phon: 'pxnC', freq: 1, prime: 0 },
    { phon: 'ardxr', freq: 1, prime: 0 },
    { phon: 'JIpsxm', freq: 1, prime: 0 },
    { phon: 'stIfxr', freq: 1, prime: 0 },
    { phon: 'xtAlIk', freq: 1, prime: 0 },
    { phon: 'kohIrxns', freq: 1, prime: 0 },
    { phon: 'dEltOd', freq: 1, prime: 0 },
    { phon: 'noSIn', freq: 1, prime: 0 },
    { phon: 'frEnlinIs', freq: 1, prime: 0 },
    { phon: 'rakIt', freq: 1, prime: 0 },
    { phon: 'pUt', freq: 1, prime: 0 },
    { phon: 'stetsmxn', freq: 1, prime: 0 },
    { phon: 'dEntxl', freq: 1, prime: 0 },
    { phon: 'lInolixm', freq: 1, prime: 0 },
    { phon: 'kIsIG', freq: 1, prime: 0 },
    { phon: 'Imprxmatxr', freq: 1, prime: 0 },
    { phon: 'damxnIns', freq: 1, prime: 0 },
    { phon: 'kcrkxr', freq: 1, prime: 0 },
    { phon: 'sEnslxs', freq: 1, prime: 0 },
    { phon: 'pAstEl', freq: 1, prime: 0 },
    { phon: 'sxrvYv', freq: 1, prime: 0 },
    { phon: 'rom', freq: 1, prime: 0 },
    { phon: 'stark', freq: 1, prime: 0 },
    { phon: 'wIndolxs', freq: 1, prime: 0 },
    { phon: 'spxrt', freq: 1, prime: 0 },
    { phon: 'sAGkSIn', freq: 1, prime: 0 },
    { phon: 'kxmbxsCxn', freq: 1, prime: 0 },
    { phon: 'fAnsixr', freq: 1, prime: 0 },
    { phon: 'lokeSIn', freq: 1, prime: 0 },
    { phon: 'zYlxfon', freq: 1, prime: 0 },
    { phon: 'trxstiSIp', freq: 1, prime: 0 },
    { phon: 'tird', freq: 1, prime: 0 },
    { phon: 'InEptnIs', freq: 1, prime: 0 },
    { phon: 'rInuxl', freq: 1, prime: 0 },
    { phon: 'kwcrts', freq: 1, prime: 0 },
    { phon: 'piAno', freq: 1, prime: 0 },
    { phon: 'mYndlIs', freq: 1, prime: 0 },
    { phon: 'klad', freq: 1, prime: 0 },
    { phon: 'bxlun', freq: 1, prime: 0 },
    { phon: 'kxlonixl', freq: 1, prime: 0 },
    { phon: 'manItEri', freq: 1, prime: 0 },
    { phon: 'dxktwxrk', freq: 1, prime: 0 },
    { phon: 'Jed', freq: 1, prime: 0 },
    { phon: 'kibcrd', freq: 1, prime: 0 },
    { phon: 'AnxlYz', freq: 1, prime: 0 },
    { phon: 'nanpemxnt', freq: 1, prime: 0 },
    { phon: 'stebxl', freq: 1, prime: 0 },
    { phon: 'bxtAnIkxl', freq: 1, prime: 0 },
    { phon: 'renJxr', freq: 1, prime: 0 },
    { phon: 'mIl', freq: 1, prime: 0 },
    { phon: 'fAntIsi', freq: 1, prime: 0 },
    { phon: 'ovxrsImplIfY', freq: 1, prime: 0 },
    { phon: 'xfEkSIn', freq: 1, prime: 0 },
    { phon: 'krIb', freq: 1, prime: 0 },
    { phon: 'parle', freq: 1, prime: 0 },
    { phon: 'skYskrepxr', freq: 1, prime: 0 },
    { phon: 'xnwEd', freq: 1, prime: 0 },
    { phon: 'liZxrli', freq: 1, prime: 0 },
    { phon: 'eti', freq: 1, prime: 0 },
    { phon: 'pArxlEl', freq: 1, prime: 0 },
    { phon: 'wYzxr', freq: 1, prime: 0 },
    { phon: 'EtsEtxrx', freq: 1, prime: 0 },
    { phon: 'trAnspArxnt', freq: 1, prime: 0 },
    { phon: 'dIspYz', freq: 1, prime: 0 },
    { phon: 'rElxvxns', freq: 1, prime: 0 },
    { phon: 'xkAdxmi', freq: 1, prime: 0 },
    { phon: 'pYk', freq: 1, prime: 0 },
    { phon: 'EkspieSIn', freq: 1, prime: 0 },
    { phon: 'pOzxn', freq: 1, prime: 0 },
    { phon: 'brutxl', freq: 1, prime: 0 },
    { phon: 'rYvxl', freq: 1, prime: 0 },
    { phon: 'smclpaks', freq: 1, prime: 0 },
    { phon: 'gxlp', freq: 1, prime: 0 },
    { phon: 'lYflxs', freq: 1, prime: 0 },
    { phon: 'poC', freq: 1, prime: 0 },
    { phon: 'vAksxneSxn', freq: 1, prime: 0 },
    { phon: 'rev', freq: 1, prime: 0 },
    { phon: 'bxrnIG', freq: 1, prime: 0 },
    { phon: 'AkrxbAt', freq: 1, prime: 0 },
    { phon: 'gxn', freq: 1, prime: 0 },
    { phon: 'mxtIriEl', freq: 1, prime: 0 },
    { phon: 'kArixr', freq: 1, prime: 0 },
    { phon: 'fotogrAf', freq: 1, prime: 0 },
    { phon: 'bUl', freq: 1, prime: 0 },
    { phon: 'dalxr', freq: 1, prime: 0 },
    { phon: 'bAtxlfild', freq: 1, prime: 0 },
    { phon: 'lxki', freq: 1, prime: 0 },
    { phon: 'lor', freq: 1, prime: 0 },
    { phon: 'IkwIvxkxl', freq: 1, prime: 0 },
    { phon: 'hxlusxneSIn', freq: 1, prime: 0 },
    { phon: 'dIskwYxt', freq: 1, prime: 0 },
    { phon: 'prifIks', freq: 1, prime: 0 },
    { phon: 'pErIwIGkxl', freq: 1, prime: 0 },
    { phon: 'mxlEnixm', freq: 1, prime: 0 },
    { phon: 'xselxnt', freq: 1, prime: 0 },
    { phon: 'rIsYt', freq: 1, prime: 0 },
    { phon: 'sImptxm', freq: 1, prime: 0 },
    { phon: 'hIrIG', freq: 1, prime: 0 },
    { phon: 'farfECt', freq: 1, prime: 0 },
    { phon: 'dilIG', freq: 1, prime: 0 },
    { phon: 'risxrJxns', freq: 1, prime: 0 },
    { phon: 'prist', freq: 1, prime: 0 },
    { phon: 'sIklIkxl', freq: 1, prime: 0 },
    { phon: 'mxrAl', freq: 1, prime: 0 },
    { phon: 'xlEktIv', freq: 1, prime: 0 },
    { phon: 'sEks', freq: 1, prime: 0 },
    { phon: 'kaGgrIgeSIn', freq: 1, prime: 0 },
    { phon: 'ncrTwEst', freq: 1, prime: 0 },
    { phon: 'prEsIG', freq: 1, prime: 0 },
    { phon: 'rIstcrxr', freq: 1, prime: 0 },
    { phon: 'sxportxr', freq: 1, prime: 0 },
    { phon: 'kyUriasIti', freq: 1, prime: 0 },
    { phon: 'rIsInd', freq: 1, prime: 0 },
    { phon: 'sxfxkeSIn', freq: 1, prime: 0 },
    { phon: 'dIsEmxnet', freq: 1, prime: 0 },
    { phon: 'kcrtEks', freq: 1, prime: 0 },
    { phon: 'AnxmasIti', freq: 1, prime: 0 },
    { phon: 'tAdpol', freq: 1, prime: 0 },
    { phon: 'asixs', freq: 1, prime: 0 },
    { phon: 'bYxr', freq: 1, prime: 0 },
    { phon: 'kAptIv', freq: 1, prime: 0 },
    { phon: 'trxstfxl', freq: 1, prime: 0 },
    { phon: 'Ikstrim', freq: 1, prime: 0 },
    { phon: 'prEzIdInt', freq: 1, prime: 0 },
    { phon: 'gredixnt', freq: 1, prime: 0 },
    { phon: 'sIgnxCUr', freq: 1, prime: 0 },
    { phon: 'vErixns', freq: 1, prime: 0 },
    { phon: 'mEsi', freq: 1, prime: 0 },
    { phon: 'frAnJxpAni', freq: 1, prime: 0 },
    { phon: 'wIDdrcxl', freq: 1, prime: 0 },
    { phon: 'SIlIG', freq: 1, prime: 0 },
    { phon: 'dxgWt', freq: 1, prime: 0 },
    { phon: 'IkstrcrdxnErxli', freq: 1, prime: 0 },
    { phon: 'sxbsIkwxnt', freq: 1, prime: 0 },
    { phon: 'pxrJIG', freq: 1, prime: 0 },
    { phon: 'pentbrxS', freq: 1, prime: 0 },
    { phon: 'ycn', freq: 1, prime: 0 },
    { phon: 'Sed', freq: 1, prime: 0 },
    { phon: 'vIlx', freq: 1, prime: 0 },
    { phon: 'portIko', freq: 1, prime: 0 },
    { phon: 'riAktxvet', freq: 1, prime: 0 },
    { phon: 'petxr', freq: 1, prime: 0 },
    { phon: 'sxtIrIk', freq: 1, prime: 0 },
    { phon: 'storrum', freq: 1, prime: 0 },
    { phon: 'kxmyunyxn', freq: 1, prime: 0 },
    { phon: 'klArxti', freq: 1, prime: 0 },
    { phon: 'xtEntIv', freq: 1, prime: 0 },
    { phon: 'IntxrJEkt', freq: 1, prime: 0 },
    { phon: 'tanIk', freq: 1, prime: 0 },
    { phon: 'nalIJ', freq: 1, prime: 0 },
    { phon: 'sIgnxfY', freq: 1, prime: 0 },
    { phon: 'mIldu', freq: 1, prime: 0 },
    { phon: 'grAnyUlxr', freq: 1, prime: 0 },
    { phon: 'TIn', freq: 1, prime: 0 },
    { phon: 'dIsEnfrAnCIzmxnt', freq: 1, prime: 0 },
    { phon: 'mxtAbxlIzxm', freq: 1, prime: 0 },
    { phon: 'fYrbxg', freq: 1, prime: 0 },
    { phon: 'Sin', freq: 1, prime: 0 },
    { phon: 'smuDnxs', freq: 1, prime: 0 },
    { phon: 'dIspArxti', freq: 1, prime: 0 },
    { phon: 'bYmxnTli', freq: 1, prime: 0 },
    { phon: 'kris', freq: 1, prime: 0 },
    { phon: 'prxvYzo', freq: 1, prime: 0 },
    { phon: 'mIsstEp', freq: 1, prime: 0 },
    { phon: 'Enklev', freq: 1, prime: 0 },
    { phon: 'florIst', freq: 1, prime: 0 },
    { phon: 'CEkbUk', freq: 1, prime: 0 },
    { phon: 'EnvYrxnmxnt', freq: 1, prime: 0 },
    { phon: 'bliCxr', freq: 1, prime: 0 },
    { phon: 'kwcrtxrmAstxr', freq: 1, prime: 0 },
    { phon: 'xstranxmi', freq: 1, prime: 0 },
    { phon: 'vOs', freq: 1, prime: 0 },
    { phon: 'nom', freq: 1, prime: 0 },
    { phon: 'vInIgxr', freq: 1, prime: 0 },
    { phon: 'scftxr', freq: 1, prime: 0 },
    { phon: 'InklusIv', freq: 1, prime: 0 },
    { phon: 'blxdsten', freq: 1, prime: 0 },
    { phon: 'xprEsxr', freq: 1, prime: 0 },
    { phon: 'rxvin', freq: 1, prime: 0 },
    { phon: 'cgzIlyxri', freq: 1, prime: 0 },
    { phon: 'mElIn', freq: 1, prime: 0 },
    { phon: 'win', freq: 1, prime: 0 },
    { phon: 'fIlxr', freq: 1, prime: 0 },
    { phon: 'sxvIrli', freq: 1, prime: 0 },
    { phon: 'Eldxr', freq: 1, prime: 0 },
    { phon: 'nEt', freq: 1, prime: 0 },
    { phon: 'IkspAndxbxl', freq: 1, prime: 0 },
    { phon: 'prxprYxtxr', freq: 1, prime: 0 },
    { phon: 'AntIdot', freq: 1, prime: 0 },
    { phon: 'brekxwe', freq: 1, prime: 0 },
    { phon: 'prEzxrveSIn', freq: 1, prime: 0 },
    { phon: 'kxnEktIv', freq: 1, prime: 0 },
    { phon: 'nEtxl', freq: 1, prime: 0 },
    { phon: 'pasCxlxt', freq: 1, prime: 0 },
    { phon: 'IndEfxnIt', freq: 1, prime: 0 },
    { phon: 'wcrnIG', freq: 1, prime: 0 },
    { phon: 'sxlEmnIti', freq: 1, prime: 0 },
    { phon: 'kAmxflaZ', freq: 1, prime: 0 },
    { phon: 'plentIv', freq: 1, prime: 0 },
    { phon: 'Ydlxr', freq: 1, prime: 0 },
    { phon: 'kAtxstrafIkxli', freq: 1, prime: 0 },
    { phon: 'IntElIJIns', freq: 1, prime: 0 },
    { phon: 'lYxnIs', freq: 1, prime: 0 },
    { phon: 'SWtIG', freq: 1, prime: 0 },
    { phon: 'kAki', freq: 1, prime: 0 },
    { phon: 'kansxl', freq: 1, prime: 0 },
    { phon: 'partIsxpet', freq: 1, prime: 0 },
    { phon: 'manxlcg', freq: 1, prime: 0 },
    { phon: 'bIspik', freq: 1, prime: 0 },
    { phon: 'mxlx', freq: 1, prime: 0 },
    { phon: 'kwIksIlvxr', freq: 1, prime: 0 },
    { phon: 'kxnEkSxn', freq: 1, prime: 0 },
    { phon: 'bEkxnIG', freq: 1, prime: 0 },
    { phon: 'farmxsi', freq: 1, prime: 0 },
    { phon: 'xnridimd', freq: 1, prime: 0 },
    { phon: 'vxlIdIti', freq: 1, prime: 0 },
    { phon: 'zIGk', freq: 1, prime: 0 },
    { phon: 'hAftYm', freq: 1, prime: 0 },
    { phon: 'SepIG', freq: 1, prime: 0 },
    { phon: 'koEd', freq: 1, prime: 0 },
    { phon: 'totAlItErixn', freq: 1, prime: 0 },
    { phon: 'xprIvxr', freq: 1, prime: 0 },
    { phon: 'xnAlIsIs', freq: 1, prime: 0 },
    { phon: 'postmAstxr', freq: 1, prime: 0 },
    { phon: 'mArxnet', freq: 1, prime: 0 },
    { phon: 'klozIG', freq: 1, prime: 0 },
    { phon: 'splaC', freq: 1, prime: 0 },
    { phon: 'lYf', freq: 1, prime: 0 },
    { phon: 'blAkbxrd', freq: 1, prime: 0 },
    { phon: 'port', freq: 1, prime: 0 },
    { phon: 'kcrps', freq: 1, prime: 0 },
    { phon: 'cdISIn', freq: 1, prime: 0 },
    { phon: 'Indxlxns', freq: 1, prime: 0 },
    { phon: 'x', freq: 1, prime: 0 },
    { phon: 'kxmfxrtxbxl', freq: 1, prime: 0 },
    { phon: 'mIsCIf', freq: 1, prime: 0 },
    { phon: 'brEd', freq: 1, prime: 0 },
    { phon: 'IrElxvxnt', freq: 1, prime: 0 },
    { phon: 'klAp', freq: 1, prime: 0 },
    { phon: 'dWnkAst', freq: 1, prime: 0 },
    { phon: 'liJIn', freq: 1, prime: 0 },
    { phon: 'sIkxr', freq: 1, prime: 0 },
    { phon: 'IksklusIvnEs', freq: 1, prime: 0 },
    { phon: 'Ingridixnt', freq: 1, prime: 0 },
    { phon: 'slAk', freq: 1, prime: 0 },
    { phon: 'kranIklxr', freq: 1, prime: 0 },
    { phon: 'bcg', freq: 1, prime: 0 },
    { phon: 'starbxrd', freq: 1, prime: 0 },
    { phon: 'pantIfIket', freq: 1, prime: 0 },
    { phon: 'sxsEptxbIlxti', freq: 1, prime: 0 },
    { phon: 'JxJIG', freq: 1, prime: 0 },
    { phon: 'kxmplEks', freq: 1, prime: 0 },
    { phon: 'bEdbxg', freq: 1, prime: 0 },
    { phon: 'wITholdIG', freq: 1, prime: 0 },
    { phon: 'IstrenJmxnt', freq: 1, prime: 0 },
    { phon: 'tAktIkxl', freq: 1, prime: 0 },
    { phon: 'IntrospEktIv', freq: 1, prime: 0 },
    { phon: 'dInJi', freq: 1, prime: 0 },
    { phon: 'mACmekIG', freq: 1, prime: 0 },
    { phon: 'klArxfxkeSIn', freq: 1, prime: 0 },
    { phon: 'bxlif', freq: 1, prime: 0 },
    { phon: 'tAbu', freq: 1, prime: 0 },
    { phon: 'mAnIJ', freq: 1, prime: 0 },
    { phon: 'pyuk', freq: 1, prime: 0 },
    { phon: 'rAbxl', freq: 1, prime: 0 },
    { phon: 'bAlxd', freq: 1, prime: 0 },
    { phon: 'klEvxr', freq: 1, prime: 0 },
    { phon: 'spik', freq: 1, prime: 0 },
    { phon: 'InsIpId', freq: 1, prime: 0 },
    { phon: 'kAni', freq: 1, prime: 0 },
    { phon: 'kxnEtIk', freq: 1, prime: 0 },
    { phon: 'wIntxrtYm', freq: 1, prime: 0 },
    { phon: 'trAJIk', freq: 1, prime: 0 },
    { phon: 'kxmyunxkeSxnxl', freq: 1, prime: 0 },
    { phon: 'kowxrkxr', freq: 1, prime: 0 },
    { phon: 'Impxrsxnet', freq: 1, prime: 0 },
    { phon: 'tuT', freq: 1, prime: 0 },
    { phon: 'skwadrxn', freq: 1, prime: 0 },
    { phon: 'AmbAsxdxr', freq: 1, prime: 0 },
    { phon: 'rAr', freq: 1, prime: 0 },
    { phon: 'tErixr', freq: 1, prime: 0 },
    { phon: 'JAz', freq: 1, prime: 0 },
    { phon: 'ImprIsario', freq: 1, prime: 0 },
    { phon: 'IntxrkxnEkt', freq: 1, prime: 0 },
    { phon: 'fizxbxl', freq: 1, prime: 0 },
    { phon: 'liZxr', freq: 1, prime: 0 },
    { phon: 'stipxl', freq: 1, prime: 0 },
    { phon: 'dxk', freq: 1, prime: 0 },
    { phon: 'wcntxn', freq: 1, prime: 0 },
    { phon: 'nxrCxr', freq: 1, prime: 0 },
    { phon: 'frut', freq: 1, prime: 0 },
    { phon: 'tYtxst', freq: 1, prime: 0 },
    { phon: 'brEdT', freq: 1, prime: 0 },
    { phon: 'kov', freq: 1, prime: 0 },
    { phon: 'pEnyxri', freq: 1, prime: 0 },
    { phon: 'not', freq: 1, prime: 0 },
    { phon: 'IncdIbxl', freq: 1, prime: 0 },
    { phon: 'skrutIni', freq: 1, prime: 0 },
    { phon: 'hApi', freq: 1, prime: 0 },
    { phon: 'wInsxm', freq: 1, prime: 0 },
    { phon: 'AnJElxkx', freq: 1, prime: 0 },
    { phon: 'kxnkluZIn', freq: 1, prime: 0 },
    { phon: 'EgzYl', freq: 1, prime: 0 },
    { phon: 'xbICuEri', freq: 1, prime: 0 },
    { phon: 'IfISxnsi', freq: 1, prime: 0 },
    { phon: 'gcnt', freq: 1, prime: 0 },
    { phon: 'truTfxlnxs', freq: 1, prime: 0 },
    { phon: 'dorstEp', freq: 1, prime: 0 },
    { phon: 'wxrs', freq: 1, prime: 0 },
    { phon: 'falIG', freq: 1, prime: 0 },
    { phon: 'pItixs', freq: 1, prime: 0 },
    { phon: 'sIdxktIv', freq: 1, prime: 0 },
    { phon: 'pxnstxr', freq: 1, prime: 0 },
    { phon: 'mEmbxr', freq: 1, prime: 0 },
    { phon: 'wesYd', freq: 1, prime: 0 },
    { phon: 'risxrCxr', freq: 1, prime: 0 },
    { phon: 'nansEnsIkxl', freq: 1, prime: 0 },
    { phon: 'genfxl', freq: 1, prime: 0 },
    { phon: 'fxlAnTrxpIst', freq: 1, prime: 0 },
    { phon: 'krAp', freq: 1, prime: 0 },
    { phon: 'botEl', freq: 1, prime: 0 },
    { phon: 'sfIrIkxl', freq: 1, prime: 0 },
    { phon: 'tebxl', freq: 1, prime: 0 },
    { phon: 'pemAstxr', freq: 1, prime: 0 },
    { phon: 'pcnCi', freq: 1, prime: 0 },
    { phon: 'wcSbesxn', freq: 1, prime: 0 },
    { phon: 'kwcrt', freq: 1, prime: 0 },
    { phon: 'rxfixn', freq: 1, prime: 0 },
    { phon: 'antxlaJIkxl', freq: 1, prime: 0 },
    { phon: 'txn', freq: 1, prime: 0 },
    { phon: 'CIr', freq: 1, prime: 0 },
    { phon: 'IntEnCInxl', freq: 1, prime: 0 },
    { phon: 'rYtIst', freq: 1, prime: 0 },
    { phon: 'IlEktxrxl', freq: 1, prime: 0 },
    { phon: 'rIpriv', freq: 1, prime: 0 },
    { phon: 'vEnIsIn', freq: 1, prime: 0 },
    { phon: 'EnslevIG', freq: 1, prime: 0 },
    { phon: 'flxd', freq: 1, prime: 0 },
    { phon: 'fYri', freq: 1, prime: 0 },
    { phon: 'fcrfIt', freq: 1, prime: 0 },
    { phon: 'glAd', freq: 1, prime: 0 },
    { phon: 'CenJxbxl', freq: 1, prime: 0 },
    { phon: 'enJxl', freq: 1, prime: 0 },
    { phon: 'marJxnxl', freq: 1, prime: 0 },
    { phon: 'bIlxvId', freq: 1, prime: 0 },
    { phon: 'kxntInyuxns', freq: 1, prime: 0 },
    { phon: 'JEl', freq: 1, prime: 0 },
    { phon: 'IvEnCuxli', freq: 1, prime: 0 },
    { phon: 'kxnstren', freq: 1, prime: 0 },
    { phon: 'kAmp', freq: 1, prime: 0 },
    { phon: 'ImprInt', freq: 1, prime: 0 },
    { phon: 'tEri', freq: 1, prime: 0 },
    { phon: 'EldIst', freq: 1, prime: 0 },
    { phon: 'wIndSild', freq: 1, prime: 0 },
    { phon: 'dIsgresfxl', freq: 1, prime: 0 },
    { phon: 'SIkenxri', freq: 1, prime: 0 },
    { phon: 'EnTuziAst', freq: 1, prime: 0 },
    { phon: 'bOxnsi', freq: 1, prime: 0 },
    { phon: 'pinxlYz', freq: 1, prime: 0 },
    { phon: 'sInfxl', freq: 1, prime: 0 },
    { phon: 'hxl', freq: 1, prime: 0 },
    { phon: 'bcrdIGhWs', freq: 1, prime: 0 },
    { phon: 'nEbyUlx', freq: 1, prime: 0 },
    { phon: 'Ali', freq: 1, prime: 0 },
    { phon: 'hWsbot', freq: 1, prime: 0 },
    { phon: 'kxrxnsi', freq: 1, prime: 0 },
    { phon: 'mYxkardixl', freq: 1, prime: 0 },
    { phon: 'sIlxkon', freq: 1, prime: 0 },
    { phon: 'bYxs', freq: 1, prime: 0 },
    { phon: 'sAlxri', freq: 1, prime: 0 },
    { phon: 'swIS', freq: 1, prime: 0 },
    { phon: 'AdvxrsIti', freq: 1, prime: 0 },
    { phon: 'forfaDxr', freq: 1, prime: 0 },
    { phon: 'EkstrApxleSxn', freq: 1, prime: 0 },
    { phon: 'pram', freq: 1, prime: 0 },
    { phon: 'InJxGtIv', freq: 1, prime: 0 },
    { phon: 'truIst', freq: 1, prime: 0 },
    { phon: 'blWs', freq: 1, prime: 0 },
    { phon: 'pramIsIG', freq: 1, prime: 0 },
    { phon: 'soSxlIzxm', freq: 1, prime: 0 },
    { phon: 'trAnslusxns', freq: 1, prime: 0 },
    { phon: 'duxr', freq: 1, prime: 0 },
    { phon: 'bElbO', freq: 1, prime: 0 },
    { phon: 'wxrkxbxl', freq: 1, prime: 0 },
    { phon: 'naC', freq: 1, prime: 0 },
    { phon: 'hxrs', freq: 1, prime: 0 },
    { phon: 'klInCxr', freq: 1, prime: 0 },
    { phon: 'dIsxntxr', freq: 1, prime: 0 },
    { phon: 'Instrxkt', freq: 1, prime: 0 },
    { phon: 'sAmxvar', freq: 1, prime: 0 },
    { phon: 'plum', freq: 1, prime: 0 },
    { phon: 'xndxrgrAJuIt', freq: 1, prime: 0 },
    { phon: 'slxm', freq: 1, prime: 0 },
    { phon: 'holselxr', freq: 1, prime: 0 },
    { phon: 'tUr', freq: 1, prime: 0 },
    { phon: 'xfYr', freq: 1, prime: 0 },
    { phon: 'InvalIntEri', freq: 1, prime: 0 },
    { phon: 'fild', freq: 1, prime: 0 },
    { phon: 'dIskors', freq: 1, prime: 0 },
    { phon: 'sIgnIfIkxntli', freq: 1, prime: 0 },
    { phon: 'pipxl', freq: 1, prime: 0 },
    { phon: 'fxndxmEntxlIzxm', freq: 1, prime: 0 },
    { phon: 'Cck', freq: 1, prime: 0 },
    { phon: 'prxgrEsIv', freq: 1, prime: 0 },
    { phon: 'fIlIbxstxr', freq: 1, prime: 0 },
    { phon: 'wEDxrpruf', freq: 1, prime: 0 },
    { phon: 'rinxl', freq: 1, prime: 0 },
    { phon: 'beslIs', freq: 1, prime: 0 },
    { phon: 'truxr', freq: 1, prime: 0 },
    { phon: 'hwImzIkxl', freq: 1, prime: 0 },
    { phon: 'rIvEnJ', freq: 1, prime: 0 },
    { phon: 'tEnInsi', freq: 1, prime: 0 },
    { phon: 'tcrpxr', freq: 1, prime: 0 },
    { phon: 'sxgJEsCxn', freq: 1, prime: 0 },
    { phon: 'sIksT', freq: 1, prime: 0 },
    { phon: '-', freq: 1000, prime: 0 },
    ],
    freqNode: {
  RDL_rest_s: 0.0,
  RDL_rest_c: 1.0,
  RDL_wt_s: 0.0,
  RDL_wt_c: 1.0,
  RDL_post_c: 0.0,
    },
    primeNode: {
  RDL_rest_s: 0.0,
  RDL_rest_c: 1.0,
  RDL_wt_s: 0.0,
  RDL_wt_c: 1.0,
  RDL_post_c: 0.0,
    },
    continuumSpec: '',
    allophoneRelations: [],
})
