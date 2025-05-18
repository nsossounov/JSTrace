JS Trace implementation and analysis.
Phonetic feature definitions are located in data/jstrace-phonetic-features-2022-v3.csv.
~20000 word lexicon (lemmalex) is listed in data/lemmalex-with-trace-pronunciations-unique.csv, along with each word's length.
Current repository uses tlex - a 200 word "test" lexicon derived from lemmalex.

Analysis of each word's activation is done using scripts/analysis/v5_sg_analysis_jm_test_battery_flex2.py. this pipeline takes activation of each word and determines if target word has been properly recognised as top word.
Also calculates activations of rhymes and cohorts, and tracks length effects. As of 05/18/2025, I don't fully remember how exactly I implemented the tracking length effects. Might need to take a closer look.

Rhymes and cohorts within a lexicon are determined using rhymes-cohorts.py, located in /rhymes-cohorts, and are extracted into a pickle file. 
