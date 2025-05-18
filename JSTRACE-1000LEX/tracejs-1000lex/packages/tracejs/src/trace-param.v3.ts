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
    P: 0.03,
    W: 0.05,
  },
  rest: {
    F: -0.1,
    P: -0.1,
    W: -0.01,
  },
  alpha: {
    IF: 1.0,
    FP: 0.02,
    PW: 0.05,
    WP: 0.03,
    PF: 0.0,
  },
  gamma: {
    F: 0.04,
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
   0.0, /*FRONT-BACK*/
   0.0, /*CENTRAL*/
   0.0, /*BACK*/
   0.0, /*CLOSE*/
   0.0, /*MID*/
   0.0, /*OPEN*/
   0, /*SIL1*/
   0, /*SIL2*/
   0, /*SIL3*/
],
durationScalar: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
phonologicalRole: TracePhoneRole.NORMAL,
    },

    {
label: 'b',
features: [
   0, /*UNVOICE*/
   1, /*VOICE*/
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
   0.0, /*FRONT-BACK*/
   0.0, /*CENTRAL*/
   0.0, /*BACK*/
   0.0, /*CLOSE*/
   0.0, /*MID*/
   0.0, /*OPEN*/
   0, /*SIL1*/
   0, /*SIL2*/
   0, /*SIL3*/
],
durationScalar: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
phonologicalRole: TracePhoneRole.NORMAL,
    },

    {
label: 't',
features: [
   1, /*UNVOICE*/
   0, /*VOICE*/
   1, /*STOP*/
   0, /*NASAL*/
   0.0, /*FRICATIVE*/
   0.0, /*AFFRICATE*/
   0.0, /*APPROXIMANT*/
   0.0, /*LATERAL*/
   0.0, /*BILABIAL*/
   0, /*LABIODENTAL*/
   0.2, /*DENTAL*/
   0.5, /*ALVEROLAR*/
   0.2, /*POSTALVEOLAR*/
   0.1, /*PALATAL*/
   0.0, /*VELAR*/
   0.0, /*GLOTTAL*/
   0.0, /*FRONT-BACK*/
   0.0, /*CENTRAL*/
   0.0, /*BACK*/
   0.0, /*CLOSE*/
   0.0, /*MID*/
   0.0, /*OPEN*/
   0, /*SIL1*/
   0, /*SIL2*/
   0, /*SIL3*/
],
durationScalar: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
phonologicalRole: TracePhoneRole.NORMAL,
    },

    {
label: 'd',
features: [
   0, /*UNVOICE*/
   1, /*VOICE*/
   1, /*STOP*/
   0, /*NASAL*/
   0.0, /*FRICATIVE*/
   0.0, /*AFFRICATE*/
   0.0, /*APPROXIMANT*/
   0.0, /*LATERAL*/
   0.0, /*BILABIAL*/
   0, /*LABIODENTAL*/
   0.2, /*DENTAL*/
   0.5, /*ALVEROLAR*/
   0.2, /*POSTALVEOLAR*/
   0.1, /*PALATAL*/
   0.0, /*VELAR*/
   0.0, /*GLOTTAL*/
   0.0, /*FRONT-BACK*/
   0.0, /*CENTRAL*/
   0.0, /*BACK*/
   0.0, /*CLOSE*/
   0.0, /*MID*/
   0.0, /*OPEN*/
   0, /*SIL1*/
   0, /*SIL2*/
   0, /*SIL3*/
],
durationScalar: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
phonologicalRole: TracePhoneRole.NORMAL,
    },

    {
label: 'k',
features: [
   1, /*UNVOICE*/
   0, /*VOICE*/
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
   0, /*POSTALVEOLAR*/
   0.2, /*PALATAL*/
   0.6, /*VELAR*/
   0.2, /*GLOTTAL*/
   0.0, /*FRONT-BACK*/
   0.0, /*CENTRAL*/
   0.0, /*BACK*/
   0.0, /*CLOSE*/
   0.0, /*MID*/
   0.0, /*OPEN*/
   0, /*SIL1*/
   0, /*SIL2*/
   0, /*SIL3*/
],
durationScalar: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
phonologicalRole: TracePhoneRole.NORMAL,
    },

    {
label: 'g',
features: [
   0, /*UNVOICE*/
   1, /*VOICE*/
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
   0, /*POSTALVEOLAR*/
   0.2, /*PALATAL*/
   0.6, /*VELAR*/
   0.2, /*GLOTTAL*/
   0.0, /*FRONT-BACK*/
   0.0, /*CENTRAL*/
   0.0, /*BACK*/
   0.0, /*CLOSE*/
   0.0, /*MID*/
   0.0, /*OPEN*/
   0, /*SIL1*/
   0, /*SIL2*/
   0, /*SIL3*/
],
durationScalar: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
phonologicalRole: TracePhoneRole.NORMAL,
    },

    {
label: 'm',
features: [
   0, /*UNVOICE*/
   1, /*VOICE*/
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
   0.0, /*FRONT-BACK*/
   0.0, /*CENTRAL*/
   0.0, /*BACK*/
   0.0, /*CLOSE*/
   0.0, /*MID*/
   0.0, /*OPEN*/
   0, /*SIL1*/
   0, /*SIL2*/
   0, /*SIL3*/
],
durationScalar: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
phonologicalRole: TracePhoneRole.NORMAL,
    },

    {
label: 'n',
features: [
   0, /*UNVOICE*/
   1, /*VOICE*/
   0, /*STOP*/
   1, /*NASAL*/
   0.0, /*FRICATIVE*/
   0.0, /*AFFRICATE*/
   0.0, /*APPROXIMANT*/
   0.0, /*LATERAL*/
   0.0, /*BILABIAL*/
   0.1, /*LABIODENTAL*/
   0.2, /*DENTAL*/
   0.4, /*ALVEROLAR*/
   0.2, /*POSTALVEOLAR*/
   0.1, /*PALATAL*/
   0.0, /*VELAR*/
   0.0, /*GLOTTAL*/
   0.0, /*FRONT-BACK*/
   0.0, /*CENTRAL*/
   0.0, /*BACK*/
   0.0, /*CLOSE*/
   0.0, /*MID*/
   0.0, /*OPEN*/
   0, /*SIL1*/
   0, /*SIL2*/
   0, /*SIL3*/
],
durationScalar: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
phonologicalRole: TracePhoneRole.NORMAL,
    },

    {
label: 'G',
features: [
   0, /*UNVOICE*/
   1, /*VOICE*/
   0, /*STOP*/
   1, /*NASAL*/
   0.0, /*FRICATIVE*/
   0.0, /*AFFRICATE*/
   0.0, /*APPROXIMANT*/
   0.0, /*LATERAL*/
   0.0, /*BILABIAL*/
   0.0, /*LABIODENTAL*/
   0.0, /*DENTAL*/
   0.0, /*ALVEROLAR*/
   0.1, /*POSTALVEOLAR*/
   0.2, /*PALATAL*/
   0.5, /*VELAR*/
   0.2, /*GLOTTAL*/
   0.0, /*FRONT-BACK*/
   0.0, /*CENTRAL*/
   0.0, /*BACK*/
   0.0, /*CLOSE*/
   0.0, /*MID*/
   0.0, /*OPEN*/
   0, /*SIL1*/
   0, /*SIL2*/
   0, /*SIL3*/
],
durationScalar: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
phonologicalRole: TracePhoneRole.NORMAL,
    },

    {
label: 'f',
features: [
   1, /*UNVOICE*/
   0, /*VOICE*/
   0, /*STOP*/
   0, /*NASAL*/
   0.8, /*FRICATIVE*/
   0.2, /*AFFRICATE*/
   0.0, /*APPROXIMANT*/
   0.0, /*LATERAL*/
   0.2, /*BILABIAL*/
   0.5, /*LABIODENTAL*/
   0.2, /*DENTAL*/
   0.1, /*ALVEROLAR*/
   0.0, /*POSTALVEOLAR*/
   0.0, /*PALATAL*/
   0.0, /*VELAR*/
   0.0, /*GLOTTAL*/
   0.0, /*FRONT-BACK*/
   0.0, /*CENTRAL*/
   0.0, /*BACK*/
   0.0, /*CLOSE*/
   0.0, /*MID*/
   0.0, /*OPEN*/
   0, /*SIL1*/
   0, /*SIL2*/
   0, /*SIL3*/
],
durationScalar: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
phonologicalRole: TracePhoneRole.NORMAL,
    },

    {
label: 'v',
features: [
   0, /*UNVOICE*/
   1, /*VOICE*/
   0, /*STOP*/
   0, /*NASAL*/
   0.8, /*FRICATIVE*/
   0.2, /*AFFRICATE*/
   0.0, /*APPROXIMANT*/
   0.0, /*LATERAL*/
   0.2, /*BILABIAL*/
   0.5, /*LABIODENTAL*/
   0.2, /*DENTAL*/
   0.1, /*ALVEROLAR*/
   0.0, /*POSTALVEOLAR*/
   0.0, /*PALATAL*/
   0.0, /*VELAR*/
   0.0, /*GLOTTAL*/
   0.0, /*FRONT-BACK*/
   0.0, /*CENTRAL*/
   0.0, /*BACK*/
   0.0, /*CLOSE*/
   0.0, /*MID*/
   0.0, /*OPEN*/
   0, /*SIL1*/
   0, /*SIL2*/
   0, /*SIL3*/
],
durationScalar: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
phonologicalRole: TracePhoneRole.NORMAL,
    },

    {
label: 'T',
features: [
   1, /*UNVOICE*/
   0, /*VOICE*/
   0, /*STOP*/
   0, /*NASAL*/
   0.8, /*FRICATIVE*/
   0.2, /*AFFRICATE*/
   0.0, /*APPROXIMANT*/
   0.0, /*LATERAL*/
   0.1, /*BILABIAL*/
   0.2, /*LABIODENTAL*/
   0.4, /*DENTAL*/
   0.2, /*ALVEROLAR*/
   0.1, /*POSTALVEOLAR*/
   0.0, /*PALATAL*/
   0.0, /*VELAR*/
   0.0, /*GLOTTAL*/
   0.0, /*FRONT-BACK*/
   0.0, /*CENTRAL*/
   0.0, /*BACK*/
   0.0, /*CLOSE*/
   0.0, /*MID*/
   0.0, /*OPEN*/
   0, /*SIL1*/
   0, /*SIL2*/
   0, /*SIL3*/
],
durationScalar: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
phonologicalRole: TracePhoneRole.NORMAL,
    },

    {
label: 'D',
features: [
   0, /*UNVOICE*/
   1, /*VOICE*/
   0, /*STOP*/
   0, /*NASAL*/
   0.8, /*FRICATIVE*/
   0.2, /*AFFRICATE*/
   0.0, /*APPROXIMANT*/
   0.0, /*LATERAL*/
   0.1, /*BILABIAL*/
   0.2, /*LABIODENTAL*/
   0.4, /*DENTAL*/
   0.2, /*ALVEROLAR*/
   0.1, /*POSTALVEOLAR*/
   0.0, /*PALATAL*/
   0.0, /*VELAR*/
   0.0, /*GLOTTAL*/
   0.0, /*FRONT-BACK*/
   0.0, /*CENTRAL*/
   0.0, /*BACK*/
   0.0, /*CLOSE*/
   0.0, /*MID*/
   0.0, /*OPEN*/
   0, /*SIL1*/
   0, /*SIL2*/
   0, /*SIL3*/
],
durationScalar: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
phonologicalRole: TracePhoneRole.NORMAL,
    },

    {
label: 's',
features: [
   1, /*UNVOICE*/
   0, /*VOICE*/
   0, /*STOP*/
   0, /*NASAL*/
   0.8, /*FRICATIVE*/
   0.2, /*AFFRICATE*/
   0.0, /*APPROXIMANT*/
   0.0, /*LATERAL*/
   0.0, /*BILABIAL*/
   0.1, /*LABIODENTAL*/
   0.2, /*DENTAL*/
   0.5, /*ALVEROLAR*/
   0.2, /*POSTALVEOLAR*/
   0, /*PALATAL*/
   0.0, /*VELAR*/
   0.0, /*GLOTTAL*/
   0.0, /*FRONT-BACK*/
   0.0, /*CENTRAL*/
   0.0, /*BACK*/
   0.0, /*CLOSE*/
   0.0, /*MID*/
   0.0, /*OPEN*/
   0, /*SIL1*/
   0, /*SIL2*/
   0, /*SIL3*/
],
durationScalar: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
phonologicalRole: TracePhoneRole.NORMAL,
    },

    {
label: 'z',
features: [
   0, /*UNVOICE*/
   1, /*VOICE*/
   0, /*STOP*/
   0, /*NASAL*/
   0.8, /*FRICATIVE*/
   0.2, /*AFFRICATE*/
   0.0, /*APPROXIMANT*/
   0.0, /*LATERAL*/
   0.0, /*BILABIAL*/
   0.1, /*LABIODENTAL*/
   0.2, /*DENTAL*/
   0.4, /*ALVEROLAR*/
   0.2, /*POSTALVEOLAR*/
   0.1, /*PALATAL*/
   0.0, /*VELAR*/
   0.0, /*GLOTTAL*/
   0.0, /*FRONT-BACK*/
   0.0, /*CENTRAL*/
   0.0, /*BACK*/
   0.0, /*CLOSE*/
   0.0, /*MID*/
   0.0, /*OPEN*/
   0, /*SIL1*/
   0, /*SIL2*/
   0, /*SIL3*/
],
durationScalar: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
phonologicalRole: TracePhoneRole.NORMAL,
    },

    {
label: 'S',
features: [
   1, /*UNVOICE*/
   0, /*VOICE*/
   0, /*STOP*/
   0, /*NASAL*/
   0.8, /*FRICATIVE*/
   0.2, /*AFFRICATE*/
   0.0, /*APPROXIMANT*/
   0.0, /*LATERAL*/
   0.0, /*BILABIAL*/
   0.0, /*LABIODENTAL*/
   0, /*DENTAL*/
   0.2, /*ALVEROLAR*/
   0.5, /*POSTALVEOLAR*/
   0.2, /*PALATAL*/
   0.1, /*VELAR*/
   0.0, /*GLOTTAL*/
   0.0, /*FRONT-BACK*/
   0.0, /*CENTRAL*/
   0.0, /*BACK*/
   0.0, /*CLOSE*/
   0.0, /*MID*/
   0.0, /*OPEN*/
   0, /*SIL1*/
   0, /*SIL2*/
   0, /*SIL3*/
],
durationScalar: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
phonologicalRole: TracePhoneRole.NORMAL,
    },

    {
label: 'Z',
features: [
   0, /*UNVOICE*/
   1, /*VOICE*/
   0, /*STOP*/
   0, /*NASAL*/
   0.8, /*FRICATIVE*/
   0.2, /*AFFRICATE*/
   0.0, /*APPROXIMANT*/
   0.0, /*LATERAL*/
   0.0, /*BILABIAL*/
   0.0, /*LABIODENTAL*/
   0.1, /*DENTAL*/
   0.2, /*ALVEROLAR*/
   0.4, /*POSTALVEOLAR*/
   0.2, /*PALATAL*/
   0.1, /*VELAR*/
   0.0, /*GLOTTAL*/
   0.0, /*FRONT-BACK*/
   0.0, /*CENTRAL*/
   0.0, /*BACK*/
   0.0, /*CLOSE*/
   0.0, /*MID*/
   0.0, /*OPEN*/
   0, /*SIL1*/
   0, /*SIL2*/
   0, /*SIL3*/
],
durationScalar: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
phonologicalRole: TracePhoneRole.NORMAL,
    },

    {
label: 'h',
features: [
   1, /*UNVOICE*/
   0, /*VOICE*/
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
   0.0, /*FRONT-BACK*/
   0.0, /*CENTRAL*/
   0.0, /*BACK*/
   0.0, /*CLOSE*/
   0.0, /*MID*/
   0.0, /*OPEN*/
   0, /*SIL1*/
   0, /*SIL2*/
   0, /*SIL3*/
],
durationScalar: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
phonologicalRole: TracePhoneRole.NORMAL,
    },

    {
label: 'C',
features: [
   1, /*UNVOICE*/
   0, /*VOICE*/
   0, /*STOP*/
   0, /*NASAL*/
   0.2, /*FRICATIVE*/
   0.8, /*AFFRICATE*/
   0.0, /*APPROXIMANT*/
   0.0, /*LATERAL*/
   0.0, /*BILABIAL*/
   0.0, /*LABIODENTAL*/
   0.1, /*DENTAL*/
   0.2, /*ALVEROLAR*/
   0.4, /*POSTALVEOLAR*/
   0.2, /*PALATAL*/
   0.1, /*VELAR*/
   0.0, /*GLOTTAL*/
   0.0, /*FRONT-BACK*/
   0.0, /*CENTRAL*/
   0.0, /*BACK*/
   0.0, /*CLOSE*/
   0.0, /*MID*/
   0.0, /*OPEN*/
   0, /*SIL1*/
   0, /*SIL2*/
   0, /*SIL3*/
],
durationScalar: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
phonologicalRole: TracePhoneRole.NORMAL,
    },

    {
label: 'J',
features: [
   0, /*UNVOICE*/
   1, /*VOICE*/
   0, /*STOP*/
   0, /*NASAL*/
   0.2, /*FRICATIVE*/
   0.8, /*AFFRICATE*/
   0.0, /*APPROXIMANT*/
   0.0, /*LATERAL*/
   0.0, /*BILABIAL*/
   0.0, /*LABIODENTAL*/
   0.1, /*DENTAL*/
   0.2, /*ALVEROLAR*/
   0.4, /*POSTALVEOLAR*/
   0.2, /*PALATAL*/
   0.1, /*VELAR*/
   0.0, /*GLOTTAL*/
   0.0, /*FRONT-BACK*/
   0.0, /*CENTRAL*/
   0.0, /*BACK*/
   0.0, /*CLOSE*/
   0.0, /*MID*/
   0.0, /*OPEN*/
   0, /*SIL1*/
   0, /*SIL2*/
   0, /*SIL3*/
],
durationScalar: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
phonologicalRole: TracePhoneRole.NORMAL,
    },

    {
label: 'r',
features: [
   0, /*UNVOICE*/
   1, /*VOICE*/
   0, /*STOP*/
   0, /*NASAL*/
   0.0, /*FRICATIVE*/
   0.0, /*AFFRICATE*/
   1.0, /*APPROXIMANT*/
   0.0, /*LATERAL*/
   0.0, /*BILABIAL*/
   0.1, /*LABIODENTAL*/
   0.2, /*DENTAL*/
   0.4, /*ALVEROLAR*/
   0.2, /*POSTALVEOLAR*/
   0.1, /*PALATAL*/
   0.0, /*VELAR*/
   0.0, /*GLOTTAL*/
   0.0, /*FRONT-BACK*/
   0.0, /*CENTRAL*/
   0.0, /*BACK*/
   0.0, /*CLOSE*/
   0.0, /*MID*/
   0.0, /*OPEN*/
   0, /*SIL1*/
   0, /*SIL2*/
   0, /*SIL3*/
],
durationScalar: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
phonologicalRole: TracePhoneRole.NORMAL,
    },

    {
label: 'y',
features: [
   0, /*UNVOICE*/
   1, /*VOICE*/
   0, /*STOP*/
   0, /*NASAL*/
   0.0, /*FRICATIVE*/
   0.0, /*AFFRICATE*/
   1.0, /*APPROXIMANT*/
   0.0, /*LATERAL*/
   0.0, /*BILABIAL*/
   0.0, /*LABIODENTAL*/
   0.0, /*DENTAL*/
   0.1, /*ALVEROLAR*/
   0.2, /*POSTALVEOLAR*/
   0.4, /*PALATAL*/
   0.2, /*VELAR*/
   0.1, /*GLOTTAL*/
   0.0, /*FRONT-BACK*/
   0.0, /*CENTRAL*/
   0.0, /*BACK*/
   0.0, /*CLOSE*/
   0.0, /*MID*/
   0.0, /*OPEN*/
   0, /*SIL1*/
   0, /*SIL2*/
   0, /*SIL3*/
],
durationScalar: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
phonologicalRole: TracePhoneRole.NORMAL,
    },

    {
label: 'w',
features: [
   0, /*UNVOICE*/
   1, /*VOICE*/
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
   0.1, /*POSTALVEOLAR*/
   0.2, /*PALATAL*/
   0.5, /*VELAR*/
   0.2, /*GLOTTAL*/
   0.0, /*FRONT-BACK*/
   0.0, /*CENTRAL*/
   0.0, /*BACK*/
   0.0, /*CLOSE*/
   0.0, /*MID*/
   0.0, /*OPEN*/
   0, /*SIL1*/
   0, /*SIL2*/
   0, /*SIL3*/
],
durationScalar: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
phonologicalRole: TracePhoneRole.NORMAL,
    },

    {
label: 'l',
features: [
   0, /*UNVOICE*/
   1, /*VOICE*/
   0, /*STOP*/
   0, /*NASAL*/
   0.0, /*FRICATIVE*/
   0.0, /*AFFRICATE*/
   0.2, /*APPROXIMANT*/
   0.8, /*LATERAL*/
   0.0, /*BILABIAL*/
   0.1, /*LABIODENTAL*/
   0.2, /*DENTAL*/
   0.4, /*ALVEROLAR*/
   0.2, /*POSTALVEOLAR*/
   0.1, /*PALATAL*/
   0.0, /*VELAR*/
   0.0, /*GLOTTAL*/
   0.0, /*FRONT-BACK*/
   0.0, /*CENTRAL*/
   0.0, /*BACK*/
   0.0, /*CLOSE*/
   0.0, /*MID*/
   0.0, /*OPEN*/
   0, /*SIL1*/
   0, /*SIL2*/
   0, /*SIL3*/
],
durationScalar: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
phonologicalRole: TracePhoneRole.NORMAL,
    },

    {
label: 'i',
features: [
   0, /*UNVOICE*/
   1, /*VOICE*/
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
   0.7, /*FRONT-BACK*/
   0.2, /*CENTRAL*/
   0.1, /*BACK*/
   0.7, /*CLOSE*/
   0.2, /*MID*/
   0.1, /*OPEN*/
   0, /*SIL1*/
   0, /*SIL2*/
   0, /*SIL3*/
],
durationScalar: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
phonologicalRole: TracePhoneRole.NORMAL,
    },

    {
label: 'I',
features: [
   0, /*UNVOICE*/
   1, /*VOICE*/
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
   0.7, /*FRONT-BACK*/
   0.2, /*CENTRAL*/
   0.1, /*BACK*/
   0.5, /*CLOSE*/
   0.4, /*MID*/
   0.1, /*OPEN*/
   0, /*SIL1*/
   0, /*SIL2*/
   0, /*SIL3*/
],
durationScalar: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
phonologicalRole: TracePhoneRole.NORMAL,
    },

    {
label: 'e',
features: [
   0, /*UNVOICE*/
   1, /*VOICE*/
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
   0.7, /*FRONT-BACK*/
   0.2, /*CENTRAL*/
   0.1, /*BACK*/
   0.1, /*CLOSE*/
   0.8, /*MID*/
   0.1, /*OPEN*/
   0, /*SIL1*/
   0, /*SIL2*/
   0, /*SIL3*/
],
durationScalar: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
phonologicalRole: TracePhoneRole.NORMAL,
    },

    {
label: 'E',
features: [
   0, /*UNVOICE*/
   1, /*VOICE*/
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
   0.7, /*FRONT-BACK*/
   0.2, /*CENTRAL*/
   0.1, /*BACK*/
   0.1, /*CLOSE*/
   0.4, /*MID*/
   0.5, /*OPEN*/
   0, /*SIL1*/
   0, /*SIL2*/
   0, /*SIL3*/
],
durationScalar: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
phonologicalRole: TracePhoneRole.NORMAL,
    },

    {
label: 'A',
features: [
   0, /*UNVOICE*/
   1, /*VOICE*/
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
   0.7, /*FRONT-BACK*/
   0.2, /*CENTRAL*/
   0.1, /*BACK*/
   0.1, /*CLOSE*/
   0.2, /*MID*/
   0.7, /*OPEN*/
   0, /*SIL1*/
   0, /*SIL2*/
   0, /*SIL3*/
],
durationScalar: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
phonologicalRole: TracePhoneRole.NORMAL,
    },

    {
label: 'x',
features: [
   0, /*UNVOICE*/
   1, /*VOICE*/
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
   0.1, /*FRONT-BACK*/
   0.8, /*CENTRAL*/
   0.1, /*BACK*/
   0.1, /*CLOSE*/
   0.8, /*MID*/
   0.1, /*OPEN*/
   0, /*SIL1*/
   0, /*SIL2*/
   0, /*SIL3*/
],
durationScalar: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
phonologicalRole: TracePhoneRole.NORMAL,
    },

    {
label: 'u',
features: [
   0, /*UNVOICE*/
   1, /*VOICE*/
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
   0.1, /*FRONT-BACK*/
   0.2, /*CENTRAL*/
   0.7, /*BACK*/
   0.7, /*CLOSE*/
   0.2, /*MID*/
   0.1, /*OPEN*/
   0, /*SIL1*/
   0, /*SIL2*/
   0, /*SIL3*/
],
durationScalar: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
phonologicalRole: TracePhoneRole.NORMAL,
    },

    {
label: 'U',
features: [
   0, /*UNVOICE*/
   1, /*VOICE*/
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
   0.1, /*FRONT-BACK*/
   0.2, /*CENTRAL*/
   0.7, /*BACK*/
   0.5, /*CLOSE*/
   0.4, /*MID*/
   0.1, /*OPEN*/
   0, /*SIL1*/
   0, /*SIL2*/
   0, /*SIL3*/
],
durationScalar: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
phonologicalRole: TracePhoneRole.NORMAL,
    },

    {
label: 'o',
features: [
   0, /*UNVOICE*/
   1, /*VOICE*/
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
   0.1, /*FRONT-BACK*/
   0.2, /*CENTRAL*/
   0.7, /*BACK*/
   0.1, /*CLOSE*/
   0.8, /*MID*/
   0.1, /*OPEN*/
   0, /*SIL1*/
   0, /*SIL2*/
   0, /*SIL3*/
],
durationScalar: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
phonologicalRole: TracePhoneRole.NORMAL,
    },

    {
label: 'c',
features: [
   0, /*UNVOICE*/
   1, /*VOICE*/
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
   0.1, /*FRONT-BACK*/
   0.2, /*CENTRAL*/
   0.7, /*BACK*/
   0.1, /*CLOSE*/
   0.4, /*MID*/
   0.5, /*OPEN*/
   0, /*SIL1*/
   0, /*SIL2*/
   0, /*SIL3*/
],
durationScalar: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
phonologicalRole: TracePhoneRole.NORMAL,
    },

    {
label: 'a',
features: [
   0, /*UNVOICE*/
   1, /*VOICE*/
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
   0.1, /*FRONT-BACK*/
   0.2, /*CENTRAL*/
   0.7, /*BACK*/
   0.1, /*CLOSE*/
   0.2, /*MID*/
   0.7, /*OPEN*/
   0, /*SIL1*/
   0, /*SIL2*/
   0, /*SIL3*/
],
durationScalar: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
phonologicalRole: TracePhoneRole.NORMAL,
    },

    {
label: 'Y',
features: [
   0, /*UNVOICE*/
   1, /*VOICE*/
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
   0.4, /*FRONT-BACK*/
   0.2, /*CENTRAL*/
   0.4, /*BACK*/
   0.3, /*CLOSE*/
   0.3, /*MID*/
   0.4, /*OPEN*/
   0, /*SIL1*/
   0, /*SIL2*/
   0, /*SIL3*/
],
durationScalar: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
phonologicalRole: TracePhoneRole.NORMAL,
    },

    {
label: 'O',
features: [
   0, /*UNVOICE*/
   1, /*VOICE*/
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
   0.4, /*FRONT-BACK*/
   0.2, /*CENTRAL*/
   0.4, /*BACK*/
   0.3, /*CLOSE*/
   0.4, /*MID*/
   0.3, /*OPEN*/
   0, /*SIL1*/
   0, /*SIL2*/
   0, /*SIL3*/
],
durationScalar: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
phonologicalRole: TracePhoneRole.NORMAL,
    },

    {
label: 'W',
features: [
   0, /*UNVOICE*/
   1, /*VOICE*/
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
   0.1, /*FRONT-BACK*/
   0.2, /*CENTRAL*/
   0.7, /*BACK*/
   0.3, /*CLOSE*/
   0.3, /*MID*/
   0.4, /*OPEN*/
   0, /*SIL1*/
   0, /*SIL2*/
   0, /*SIL3*/
],
durationScalar: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
phonologicalRole: TracePhoneRole.NORMAL,
    },

    {
label: '-',
features: [
   0, /*UNVOICE*/
   0, /*VOICE*/
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
   0.0, /*FRONT-BACK*/
   0.0, /*CENTRAL*/
   0.0, /*BACK*/
   0.0, /*CLOSE*/
   0.0, /*MID*/
   0.0, /*OPEN*/
   1, /*SIL1*/
   1, /*SIL2*/
   1, /*SIL3*/
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
  { phon: 'x', freq: 23248, prime: 0 },
  { phon: 'xbrxpt', freq: 37, prime: 0 },
  { phon: 'xdApt', freq: 71, prime: 0 },
  { phon: 'xdxlt', freq: 50, prime: 0 },
  { phon: 'xgri', freq: 264, prime: 0 },
  { phon: 'xlat', freq: 50, prime: 0 },
  { phon: 'xpart', freq: 57, prime: 0 },
  { phon: 'xpil', freq: 108, prime: 0 },
  { phon: 'ark', freq: 50, prime: 0 },
  { phon: 'ar', freq: 4406, prime: 0 },
  { phon: 'art', freq: 274, prime: 0 },
  { phon: 'artxst', freq: 112, prime: 0 },
  { phon: 'xslip', freq: 29, prime: 0 },
  { phon: 'bar', freq: 125, prime: 0 },
  { phon: 'bark', freq: 125, prime: 0 },
  { phon: 'bi', freq: 6382, prime: 0 },
  { phon: 'bit', freq: 87, prime: 0 },
  { phon: 'bist', freq: 50, prime: 0 },
  { phon: 'blAk', freq: 118, prime: 0 },
  { phon: 'blxd', freq: 122, prime: 0 },
  { phon: 'blu', freq: 143, prime: 0 },
  { phon: 'bab', freq: 45, prime: 0 },
  { phon: 'babi', freq: 23, prime: 0 },
  { phon: 'badi', freq: 341, prime: 0 },
  { phon: 'bust', freq: 23, prime: 0 },
  { phon: 'but', freq: 34, prime: 0 },
  { phon: 'bAtxl', freq: 95, prime: 0 },
  { phon: 'baks', freq: 87, prime: 0 },
  { phon: 'brid', freq: 25, prime: 0 },
  { phon: 'brud', freq: 26, prime: 0 },
  { phon: 'brxS', freq: 77, prime: 0 },
  { phon: 'bxbxl', freq: 32, prime: 0 },
  { phon: 'bxk', freq: 31, prime: 0 },
  { phon: 'bxs', freq: 34, prime: 0 },
  { phon: 'bxt', freq: 4382, prime: 0 },
  { phon: 'kar', freq: 386, prime: 0 },
  { phon: 'kard', freq: 62, prime: 0 },
  { phon: 'karpxt', freq: 22, prime: 0 },
  { phon: 'siz', freq: 34, prime: 0 },
  { phon: 'klak', freq: 30, prime: 0 },
  { phon: 'klxb', freq: 171, prime: 0 },
  { phon: 'klu', freq: 25, prime: 0 },
  { phon: 'kalig', freq: 32, prime: 0 },
  { phon: 'kul', freq: 149, prime: 0 },
  { phon: 'kAp', freq: 32, prime: 0 },
  { phon: 'kapi', freq: 61, prime: 0 },
  { phon: 'kxpxl', freq: 164, prime: 0 },
  { phon: 'krip', freq: 23, prime: 0 },
  { phon: 'kru', freq: 38, prime: 0 },
  { phon: 'krAp', freq: 44, prime: 0 },
  { phon: 'kruSxl', freq: 31, prime: 0 },
  { phon: 'krul', freq: 20, prime: 0 },
  { phon: 'krxS', freq: 23, prime: 0 },
  { phon: 'kxp', freq: 63, prime: 0 },
  { phon: 'kxt', freq: 223, prime: 0 },
  { phon: 'dark', freq: 234, prime: 0 },
  { phon: 'dart', freq: 20, prime: 0 },
  { phon: 'dil', freq: 157, prime: 0 },
  { phon: 'did', freq: 21, prime: 0 },
  { phon: 'dip', freq: 199, prime: 0 },
  { phon: 'du', freq: 1366, prime: 0 },
  { phon: 'dal', freq: 23, prime: 0 },
  { phon: 'dat', freq: 28, prime: 0 },
  { phon: 'dxbxl', freq: 83, prime: 0 },
  { phon: 'dru', freq: 69, prime: 0 },
  { phon: 'drap', freq: 196, prime: 0 },
  { phon: 'drxg', freq: 58, prime: 0 },
  { phon: 'dxk', freq: 21, prime: 0 },
  { phon: 'dxl', freq: 36, prime: 0 },
  { phon: 'dxst', freq: 78, prime: 0 },
  { phon: 'dyuti', freq: 95, prime: 0 },
  { phon: 'ist', freq: 183, prime: 0 },
  { phon: 'it', freq: 300, prime: 0 },
  { phon: 'glu', freq: 28, prime: 0 },
  { phon: 'gad', freq: 332, prime: 0 },
  { phon: 'gat', freq: 482, prime: 0 },
  { phon: 'grik', freq: 66, prime: 0 },
  { phon: 'grit', freq: 38, prime: 0 },
  { phon: 'gru', freq: 64, prime: 0 },
  { phon: 'grup', freq: 545, prime: 0 },
  { phon: 'gard', freq: 82, prime: 0 },
  { phon: 'gItar', freq: 24, prime: 0 },
  { phon: 'kip', freq: 348, prime: 0 },
  { phon: 'ki', freq: 125, prime: 0 },
  { phon: 'lid', freq: 517, prime: 0 },
  { phon: 'lig', freq: 83, prime: 0 },
  { phon: 'lip', freq: 38, prime: 0 },
  { phon: 'list', freq: 343, prime: 0 },
  { phon: 'ligxl', freq: 77, prime: 0 },
  { phon: 'labi', freq: 22, prime: 0 },
  { phon: 'lAk', freq: 109, prime: 0 },
  { phon: 'lup', freq: 23, prime: 0 },
  { phon: 'lus', freq: 68, prime: 0 },
  { phon: 'lat', freq: 169, prime: 0 },
  { phon: 'lxk', freq: 49, prime: 0 },
  { phon: 'lxki', freq: 25, prime: 0 },
  { phon: 'lxgZxri', freq: 24, prime: 0 },
  { phon: 'Ad', freq: 53, prime: 0 },
  { phon: 'papx', freq: 40, prime: 0 },
  { phon: 'park', freq: 242, prime: 0 },
  { phon: 'part', freq: 625, prime: 0 },
  { phon: 'parSxl', freq: 25, prime: 0 },
  { phon: 'partli', freq: 49, prime: 0 },
  { phon: 'parti', freq: 275, prime: 0 },
  { phon: 'par', freq: 10, prime: 0 },
  { phon: 'pi', freq: 24, prime: 0 },
  { phon: 'pik', freq: 24, prime: 0 },
  { phon: 'pipxl', freq: 887, prime: 0 },
  { phon: 'pis', freq: 221, prime: 0 },
  { phon: 'plat', freq: 57, prime: 0 },
  { phon: 'plxg', freq: 28, prime: 0 },
  { phon: 'plxs', freq: 72, prime: 0 },
  { phon: 'pakxt', freq: 64, prime: 0 },
  { phon: 'pxlis', freq: 159, prime: 0 },
  { phon: 'palxsi', freq: 290, prime: 0 },
  { phon: 'pUl', freq: 129, prime: 0 },
  { phon: 'pap', freq: 31, prime: 0 },
  { phon: 'pasxbxl', freq: 373, prime: 0 },
  { phon: 'pasxbli', freq: 61, prime: 0 },
  { phon: 'pat', freq: 37, prime: 0 },
  { phon: 'prist', freq: 33, prime: 0 },
  { phon: 'prabxbxl', freq: 24, prime: 0 },
  { phon: 'prabxbli', freq: 261, prime: 0 },
  { phon: 'prxdus', freq: 256, prime: 0 },
  { phon: 'pradxkt', freq: 195, prime: 0 },
  { phon: 'proUgrEs', freq: 141, prime: 0 },
  { phon: 'pxt', freq: 63, prime: 0 },
  { phon: 'rid', freq: 273, prime: 0 },
  { phon: 'ril', freq: 261, prime: 0 },
  { phon: 'rili', freq: 275, prime: 0 },
  { phon: 'rab', freq: 40, prime: 0 },
  { phon: 'rak', freq: 121, prime: 0 },
  { phon: 'rakxt', freq: 20, prime: 0 },
  { phon: 'rad', freq: 29, prime: 0 },
  { phon: 'rut', freq: 69, prime: 0 },
  { phon: 'rxb', freq: 35, prime: 0 },
  { phon: 'rxgxd', freq: 20, prime: 0 },
  { phon: 'rul', freq: 215, prime: 0 },
  { phon: 'rupi', freq: 20, prime: 0 },
  { phon: 'rxS', freq: 60, prime: 0 },
  { phon: 'rxsxl', freq: 21, prime: 0 },
  { phon: 'skar', freq: 22, prime: 0 },
  { phon: 'skxl', freq: 694, prime: 0 },
  { phon: 'skru', freq: 45, prime: 0 },
  { phon: 'sil', freq: 40, prime: 0 },
  { phon: 'sit', freq: 99, prime: 0 },
  { phon: 'sikrxt', freq: 105, prime: 0 },
  { phon: 'si', freq: 809, prime: 0 },
  { phon: 'sid', freq: 84, prime: 0 },
  { phon: 'sik', freq: 128, prime: 0 },
  { phon: 'Sarp', freq: 115, prime: 0 },
  { phon: 'Si', freq: 2860, prime: 0 },
  { phon: 'Sip', freq: 23, prime: 0 },
  { phon: 'Sit', freq: 77, prime: 0 },
  { phon: 'Sild', freq: 21, prime: 0 },
  { phon: 'SAk', freq: 66, prime: 0 },
  { phon: 'Sut', freq: 81, prime: 0 },
  { phon: 'Sap', freq: 108, prime: 0 },
  { phon: 'Sat', freq: 142, prime: 0 },
  { phon: 'Srxg', freq: 22, prime: 0 },
  { phon: 'Sxt', freq: 50, prime: 0 },
  { phon: 'slip', freq: 109, prime: 0 },
  { phon: 'slit', freq: 10, prime: 0 },
  { phon: 'slxg', freq: 24, prime: 0 },
  { phon: 'sAlxd', freq: 90, prime: 0 },
  { phon: 'sari', freq: 49, prime: 0 },
  { phon: 'spark', freq: 20, prime: 0 },
  { phon: 'spik', freq: 259, prime: 0 },
  { phon: 'spid', freq: 104, prime: 0 },
  { phon: 'spat', freq: 110, prime: 0 },
  { phon: 'star', freq: 58, prime: 0 },
  { phon: 'start', freq: 450, prime: 0 },
  { phon: 'startxl', freq: 22, prime: 0 },
  { phon: 'stil', freq: 51, prime: 0 },
  { phon: 'stip', freq: 22, prime: 0 },
  { phon: 'stak', freq: 165, prime: 0 },
  { phon: 'stap', freq: 273, prime: 0 },
  { phon: 'strik', freq: 20, prime: 0 },
  { phon: 'strit', freq: 307, prime: 0 },
  { phon: 'strxk', freq: 59, prime: 0 },
  { phon: 'strxgxl', freq: 93, prime: 0 },
  { phon: 'stxdid', freq: 79, prime: 0 },
  { phon: 'stxdi', freq: 391, prime: 0 },
  { phon: 'stupxd', freq: 25, prime: 0 },
  { phon: 'sxbstxtut', freq: 46, prime: 0 },
  { phon: 'sxtxl', freq: 26, prime: 0 },
  { phon: 'sxksid', freq: 62, prime: 0 },
  { phon: 'sxk', freq: 20, prime: 0 },
  { phon: 'su', freq: 39, prime: 0 },
  { phon: 'sut', freq: 73, prime: 0 },
  { phon: 'sutxbxl', freq: 37, prime: 0 },
  { phon: 'tar', freq: 20, prime: 0 },
  { phon: 'targxt', freq: 67, prime: 0 },
  { phon: 'ti', freq: 29, prime: 0 },
  { phon: 'tu', freq: 26162, prime: 0 },
  { phon: 'tul', freq: 79, prime: 0 },
  { phon: 'tap', freq: 212, prime: 0 },
  { phon: 'trit', freq: 127, prime: 0 },
  { phon: 'triti', freq: 24, prime: 0 },
  { phon: 'tri', freq: 161, prime: 0 },
  { phon: 'trup', freq: 82, prime: 0 },
  { phon: 'trat', freq: 20, prime: 0 },
  { phon: 'trxbxl', freq: 189, prime: 0 },
  { phon: 'trxk', freq: 84, prime: 0 },
  { phon: 'tru', freq: 237, prime: 0 },
  { phon: 'truli', freq: 237, prime: 0 },
  { phon: 'trxst', freq: 76, prime: 0 },
  { phon: 'trxsti', freq: 35, prime: 0 },
  { phon: 'tyub', freq: 55, prime: 0 },
  { phon: 'xgli', freq: 30, prime: 0 },
  { phon: 'xp', freq: 1903, prime: 0 },
  { phon: 'xs', freq: 672, prime: 0 },
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
