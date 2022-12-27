# Nikita Sossounov 2022

import pickle
import re
import sys
import pandas as pd

pd.set_option('max_colwidth', 1000)
pd.set_option('display.max_columns', None)
pd.set_option('display.max_rows', None)
pd.options.display.width = 0



indir = '/Users/nikitasossounov/thesis/jsTRACE/JSTrace-repo/scripts/pseudo-lexicon/'
outdir = './'

df = pd.read_csv(indir + 'pseudo-lexicon.csv')

df['rhymes'] = ''
df['cohorts'] = ''

print(df)

lexicon = df.Phonology.tolist()
print(lexicon)

# cohorts
for i in range(0,len(df)):
    lst = []
    if len(df['Phonology'][i]) > 1:
        for word in lexicon:
            start = df['Phonology'][i][0:2]
            if word.startswith(start) and word != df['Phonology'][i]:
                lst.append(word)
    df.at[i,'cohorts'] = lst

# rhymes
for i in range(0,len(df)):
    lst = []
    if len(df['Phonology'][i]) > 1:
        for word in lexicon:
            end = df['Phonology'][i][1:len(df['Phonology'][i])]
            if word.endswith(end) and word != df['Phonology'][i] and (len(word) == len(df['Phonology'][i]) or (len(word) == len(df['Phonology'][i]) - 1)):
                lst.append(word)
            if (len(word) == len(df['Phonology'][i]) + 1) and word[1:len(word)] == df['Phonology'][i]:
                lst.append(word)
    else:
        end = df['Phonology'][i]
        # print('end', end)
        if word.endswith(end) and word != df['Phonology'][i] and (len(word) == len(df['Phonology'][i]) or (len(word) == len(df['Phonology'][i]) - 1)):
            lst.append(word)
        if (len(word) == len(df['Phonology'][i]) + 1) and word[1:len(word)] == df['Phonology'][i]:
            lst.append(word)
    df.at[i,'rhymes'] = lst

print(df)
print(df['rhymes'])

with open(outdir+'tlex_rhymes_cohorts.pickle','wb') as f:
    pickle.dump(df, f)

sys.exit()


cohorts = dict.fromkeys(lexicon, [])
rhymes = dict.fromkeys(lexicon, [])
rhymes2 = dict.fromkeys(lexicon, [])

# print(type(cohorts['^']))
# print('cohorts ' + cohorts +'\n')

for key, value in cohorts.items():
    # print(key,value)

    cohort_list = []
    if len(key) > 1:
        for word in lexicon:
            # print('word', word)
            if len(word) > 1:
                start = key[0:2]
                # print("start", start)
                if word.startswith(start) and word != key:
                    cohort_list.append(word)

    cohorts[key] = cohort_list

print('cohorts\n', cohorts)


# print(rhymes)

for key, value in rhymes.items():
    # print("key, val", key, value)
    rhymes_list = []

    for word in lexicon:
        # print('word', word)
        if len(key) > 1:
            end = key[1:len(key)]
            # print('end', end)
            if word.endswith(end) and word != key and (len(word) == len(key) or  (len(word) == len(key) - 1)):
                rhymes_list.append(word)
            if (len(word) == len(key) + 1) and word[1:len(word)] == key:
                rhymes_list.append(word)

        else:
            end = key
            # print('end', end)
            if word.endswith(end) and word != key and (len(word) == len(key) or  (len(word) == len(key) - 1)):
                rhymes_list.append(word)
            if (len(word) == len(key) + 1) and word[1:len(word)] == key:
                    rhymes_list.append(word)
            # print("start", start)
            # if word.startswith(start) and word != key:
            #     cohort_list.append(word)

    rhymes[key] = rhymes_list

print('rhymes\n',rhymes)


with open('rhymes.pkl', 'wb') as f:
    pickle.dump(rhymes,f)

with open('cohorts.pkl', 'wb') as f:
    pickle.dump(cohorts,f)

#
# for key, value in rhymes2.items():
#     # print("key, val", key, value)
#     rhymes_list = []
#
#     for word in lexicon:
#         # print('word', word)
#         if len(key) > 1:
#             end = key[1:len(key)]
#             # print('end', end)
#             if word.endswith(end) and word != key and (len(word) == len(key) or  (len(word) == len(key) - 1) or  (len(word) == len(key) + 1)):
#                 rhymes_list.append(word)
#             # if (len(word) == len(key) + 1) and word[1:len(word)] == key:
#             #     rhymes_list.append(word)
#
#         else:
#             end = key
#             # print('end', end)
#             if word.endswith(end) and word != key and (len(word) == len(key) or  (len(word) == len(key) - 1) or  (len(word) == len(key) + 1)):
#                 rhymes_list.append(word)
#             # if (len(word) == len(key) + 1) and word[1:len(word)] == key:
#             #         rhymes_list.append(word)
#             # print("start", start)
#             # if word.startswith(start) and word != key:
#             #     cohort_list.append(word)
#
#     rhymes2[key] = rhymes_list
#
# print(rhymes2)
#     # print('word', word)
#     # print('cohorts[word]', cohorts[word])
#     # cohorts[word].append("he")
#     # print('cohorts[word] after append', cohorts[word])
# print(cohorts)
#
# myList = [
# 	{
# 		'foo':12,
# 		'bar':14
# 	},
# 	{
# 		'moo':52,
# 		'car':641
# 	},
# 	{
# 		'doo':6,
# 		'tar':84
# 	}
# ]

# print(myList[0])
