// Import the tracejs library
const tracejs = require('tracejs');

var toType = function(obj) {
  return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}
// function for precise rounding
function epsilon_round(anum, precision){
    return Math.round((anum + Number.EPSILON) * precision) / precision
}
// initialize key variables
var irrelevant = []; // placeholder var, just ignore
// var noise = 0.0;    // won't use this here
var alpha_if = 0.0; // input-feature feedforward gain
var alpha_pf = 0.0;
var alpha_fp = 0.0;
var alpha_pw = 0.0; // phoneme-word feedforward gain
var alpha_wp = 0.0; // word-phoneme feedback gain 
var gamma_f = 0.0;
var gamma_p = 0.0;
var gamma_w = 0.0;
var decay_f = 0.01;
var decay_p = 0.03;
var decay_w = 0.05;

//var cycles = 5;   // cycles per simulation -- use this short value for prototyping
var cycles = 100;   // cycles per simulation -- reasonable number to use is at least 80

// HARD CODE THE RANGE OF PARAMS WE WILL EXPLORE;
// alpha_if = input-to-feature feedforward gain
// alpha_pw = phoneme-to-word feedforward gain
// alpha_wp = word-to-phoneme feedback gain
// rest_w   = resting level activation for words
// const alpha_if_values = [0.50, 0.75, 1.00] //  1.0  is default
// const alpha_pw_values = [0.025, 0.05]       //  0.05 is default
// const alpha_wp_values = [0.01, 0.03]       //  0.3  is default
// const rest_w_values   = [-0.3, -0.1]       // -0.3  is default

const alpha_if_values = [1] //  1.0  is default
// const alpha_pf_values = [0.0]
const alpha_fp_values = [0.02, 0.03, 0.04]		 // 0.02 is default
const alpha_pw_values = [0.03, 0.04, 0.05, 0.06, 0.07]       //  0.05 is default
const alpha_wp_values = [0.01, 0.02, 0.03, 0.04, 0.05]       //  0.03  is default
const gamma_f_values = [0.02, 0.03, 0.04]       //  0.04  is default
const gamma_p_values = [0.04, 0.05, 0.06]       //  0.04  is default
const gamma_w_values = [0.03,0.04,0.05]       //  0.03  is default
// const decay_p_values = [0.01]
// const decay_f_values = [0.01, 0.02, 0.03]       //  0.3  is default
// const decay_p_values = [0.01, 0.03, 0.05]       //  0.3  is default
// const decay_w_values = [0.01, 0.03, 0.05]       //  0.3  is default


// Load the lexicon
// const lexicon = ['bxs', 'bxt', 'bxk', 'bxbxl','bi','bit','blu','brud','brid','brxS','blxd','klAk','kru', 'klu', 'krip', 'kruxl','siz','si','sid', 'sit', 'sil', 'sik','dArk','dArt','dAl','bArk','dAt','tAr'];       // loads full lexicon
const lexicon = tracejs.loadJtLexicon('./1000lex.xml'); // take first 5 for rapid testing

// create stimulus list
var stims = [];
for (const word of lexicon) {
    stims.push(word.phon);
}

console.log(stims);
console.log(lexicon);

stims = stims.filter(function() { return true; });    

console.log(JSON.stringify(stims))

// if you want to replace ^ with x, uncomment lines below
//for (i in stims){
//    //in case we read in stims with x replacing ^
//    stims[i] = stims[i].replace(/x/g, "^");
//}

// HOW MANY TOTAL SIMULATIONS WILL WE DO?
//const simsize = reps * stims.length 
// const simsize = stims.length * alpha_if_values.length * alpha_pw_values.length * alpha_wp_values.length * rest_w_values.length
const simsize = stims.length * alpha_if_values.length * alpha_fp_values.length * alpha_pw_values.length * alpha_wp_values.length * gamma_f_values.length * gamma_p_values.length * gamma_w_values.length

// this will be the cumulative simulation number
let sims_so_far = 0; 

// need to use an async function to allow *await* to work properly; if we don't
// do this, node does the simulations so much faster than the writing that you
// can exahust memory (crashes the simulation on a mac, crashes the MACHINE in
// linux) and have weird errors with some data not getting written; await
// allows us to write data from each simulation before starting the next one

async function simulate() {
    
    // for progress reports
    simstart = Date.now()
    
    let atword = 0;
    
    // make a label for files that specifies the values for this simulation
    label = "sim-1000lex"

    // Create file handles that we can continuously write to over the course of the
    // simulation; this is where 'label' gets used 
    
    // this line opens all file output types, but we'll do them 1-by-1 to reduce outputs
    //const files = tracejs.openFileHandles(process.cwd(), label);
    
    // Open specified output files
    // COMMENTING OUT PHONEME AND FLOW FILES TO SAVE FILESPACE 
    // SET OUTPUT DIRECTORY HERE
    var wordFile = tracejs.openFileHandle(`./sim-data/${label}-word.csv.gz`);
    //var featureFile = tracejs.openFileHandle(`./${label}-feature.csv.gz`);
    //var phonemeFile = tracejs.openFileHandle(`./${label}-phoneme.csv.gz`);
    //var levelsAndFlowFile = tracejs.openFileHandle(`./${label}-levels-and-flow.csv.gz`);

    var trial = 0;

	for (const alpha_if of alpha_if_values) { 
	    for (const alpha_pw of alpha_pw_values) { 
	    for (const alpha_fp of alpha_fp_values) { 
		for (const alpha_wp of alpha_wp_values) { 
		for (const gamma_f of gamma_f_values) { 
		for (const gamma_p of gamma_p_values) { 
		for (const gamma_w of gamma_w_values) { 
		// for (const decay_f of decay_f_values) { 
		// for (const decay_p of decay_p_values) { 
		// for (const decay_w of decay_w_values) { 
  

		    // make a label for report that specifies the values for this simulation
		    labelreport = "_if_" + alpha_if.toString() + "_fp_" +alpha_fp.toString() + "_pw_" + alpha_pw.toString() + "_wp_" + alpha_wp.toString() + "_gf_" + gamma_f.toString() + "_gp_" + gamma_p.toString() + "_gw_" + gamma_w.toString()
		    console.error(`\nLABEL: ${labelreport}`)

		   	console.log('we will be going');

		    // loop through lexicon or stimlist
		    for (const stim of stims) {
			if(stim === ''){
			    console.error(`Skipping blank stim`);
			} else {
			    // for progress reports
			    // console.log('we are going');
			    var starttime = Date.now()
			    
			    // Create a new configuration with default values
			    const config = tracejs.createDefaultConfig();
			    
			    // Set the model input of the config object to the word, the lexicon to our loaded lexicon,
			    // the word-to-phoneme feedback value, and the noise level to the current iteration's value.
			    //config.modelInput = word.phon; // word without silence prepended and appended
			    //config.modelInput = '-' + word.phon + '-'; // word with silence prepended and appended
			    //wordstring = word.phon;
			    config.modelInput = '-' + stim + '-'; // word with silence prepended and appended
			    wordstring = stim;
			    
			    // jim has a bit of a mania for not using the speical characters; uncomment to replace them
			    // Replace special characters
			    // wordstring = stim.replace(/\-/g, "Q"); // avoid using regex char - for silence
			    // wordstring = stim.replace(/S/g, "h");  // avoid using both lower and uppercase s
			    // wordstring = stim.replace(/\^/g, "x"); // avoid regex char ^ for /^/
			    
			    // Set a few more parameters
			    config.lexicon = lexicon;
			    config.alpha.IF = alpha_if;
			    config.alpha.PW = alpha_pw;
			    config.alpha.PF = alpha_pf;
			    config.alpha.FP = alpha_fp;
			    config.alpha.WP = alpha_wp;
			    config.gamma.F = gamma_f;
			    config.gamma.P = gamma_p;
			    config.gamma.W = gamma_w;
			    config.decay.P = decay_p;
			    config.decay.W = decay_w;
			    
			    // config.noiseSD = noise;
			    
			    // Run a simulation with the config for 'cycles' cycles
			    const sim = new tracejs.TraceSim(config);
			    sim.cycle(cycles);
			    
			    // Write the data to the streams, with a list of items that will
			    // be inserted into EVERY line in the CSV.gz outputs -- you can
			    // specify as many things as you like in this list

			    // NB: YOU HAVE TO KEEP TRACK OF WHAT YOU SPECIFY; NO HEADER LINE
			    //     IS CREATED; YOU COULD BUILD IT IN BY PUTTING IN A KEY STRING
			    //     ON EACH LINE (LIKE THE labelreport VARIABLE ABOVE)
		
			    await Promise.all([
				// sim.appendFeatureData(featureFile, [wordstring, alpha_if, alpha_pw, alpha_wp, gamma_f, gamma_p, gamma_w, trial]),
				// sim.appendPhonemeData(phonemeFile, [wordstring, alpha_if, alpha_pw, alpha_wp, gamma_f, gamma_p, gamma_w, trial]),
				// sim.appendWordData(wordFile, [wordstring, alpha_if, alpha_pw, alpha_pf, alpha_wp, gamma_f, gamma_p, gamma_w, decay_f, decay_p, decay_w, trial]),
				sim.appendWordData(wordFile, [wordstring, alpha_if, alpha_pw, alpha_fp, alpha_wp, gamma_f, gamma_p, gamma_w, trial]),
				// sim.appendLevelsAndFlowData(levelsAndFlowFile, [wordstring, alpha_if, alpha_pw, alpha_wp, gamma_f, gamma_p, gamma_w, trial]),
			    ]);
			    
			    // progress report
			    ++sims_so_far ;
			    ++atword ;
			    var endtime = epsilon_round(Date.now(),1000)
			    var tookseconds = epsilon_round( ((endtime - starttime) / 1000), 1000)
			    var timeperword = epsilon_round( ((endtime - simstart) / sims_so_far / 1000), 1000)
			    var timetogo = epsilon_round( ((timeperword * (simsize - sims_so_far)) / 60), 1000)
			    var wordstogo = simsize - sims_so_far
			    console.error(`${sims_so_far} ${wordstring} ${labelreport}: ` +
					  `${atword} took ${tookseconds} (${timeperword} secs/word, ` +
					  `${wordstogo} words and ` + 
					  `${timetogo} minutes remaining)       \r`)
			    
			}
		    }

	trial = trial + 1;

		// }
	 //    }
		// }
		}
		}
		}
		}
		}
		}
	}
    
    // End the file streams when we're done
    // featureFile.end();
    // phonemeFile.end();
    wordFile.end();
    // levelsAndFlowFile.end();
}


simulate();
