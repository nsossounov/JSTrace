import pandas as pd
import numpy as np

# Placeholder function for simulateword
def simulateword(word):
    # Run the simulation and return the data
    # This function should be implemented according to your specific needs
    pass

# Function to get the max slice for each word
def get_max_slice(df, word):
    max_slice_index = 0
    max_activation = -float('inf')

    for i in range(100):
        slice_data = df[word + '_' + str(i)]
        activation = np.max(slice_data)

        if activation > max_activation:
            max_activation = activation
            max_slice_index = i

    return df[word + '_' + str(max_slice_index)]

# Function to analyze simulation data
def analyze_sim_data(simdata, target):
    # For each word, get the max slice and put it in dfmaxes
    dfmaxes = pd.DataFrame()

    for word in words:
        max_slice = get_max_slice(simdata, word)
        dfmaxes[word + '_{:02d}'.format(max_slice.index)] = max_slice.values

    # Get the top 10 max slices excluding the target
    dfmaxes_top10 = dfmaxes.drop(columns=target).head(10)

    # Write dfmaxes_top10 to a file
    dfmaxes_top10.to_csv(target + '_TRG_top10.csv')

    # Create df_item_type and remove target data from dfmaxes
    df_item_type = dfmaxes[target]
    dfmaxes = dfmaxes.drop(columns=target)

    # Classify each word and calculate the average for each class
    cohort_data = np.full(100, np.nan)
    rhyme_data = np.full(100, np.nan)
    unrelated_data = np.full(100, np.nan)

    for word in words:
        data = dfmaxes[word]

        if word.startswith(target[:2]):  # Cohort
            cohort_data = np.nanmean(np.vstack((cohort_data, data)), axis=0)
        elif word.endswith(target[1:]):  # Rhyme
            rhyme_data = np.nanmean(np.vstack((rhyme_data, data)), axis=0)
        else:  # Unrelated
            unrelated_data = np.nanmean(np.vstack((unrelated_data, data)), axis=0)

    # Save the results
    df_item_type.to_csv(target + '_TRG_type.csv')

# Simulate and analyze each word
for word in words:
    simdata = simulateword(word)
    analyze_sim_data(simdata, word)
