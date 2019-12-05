import pandas as pd
import re

df_full = pd.read_csv('data/full_data.csv')
df_full = df_full[1:]

df_drugs = pd.read_csv('data/DrugViolationsBoston.csv')


def csv_to_stack_json(data):
    data_json = {}

    data.sof

    categories = data['OFFENSE_CODE_GROUP'].unique()


def consolodate(item):
    for clss in ['A', 'B', 'C', 'D', 'E']:
        if bool(re.search(f'CLASS {clss}', item)):
            return f'CLASS {clss}'
    if bool(re.search(f'SICK ASSIST', item)):
        return 'SICK ASSIST'

    return item

def skim(keep):
    def skim_item(item):
        if item in keep:
            return item
        else:
            return 'OTHER'

    return skim_item

df_drugs_clean = df_drugs.copy()

# Add to process book (consolodate) categories
df_drugs_clean.OFFENSE_DESCRIPTION = df_drugs.OFFENSE_DESCRIPTION.apply(consolodate)

# Get top vals
# top_vals = df_drugs_clean.OFFENSE_DESCRIPTION.value_counts()[:9]


classes = []
class_letters = ['A', 'B', 'C', 'D', 'E']
for c in class_letters:
    classes.append(f'CLASS {c}')

# Skim top categories
df_drugs_clean.OFFENSE_DESCRIPTION = df_drugs_clean.OFFENSE_DESCRIPTION.apply(skim(classes))

df_drugs_clean.OFFENSE_DESCRIPTION.value_counts()

df_full.head()

df_drugs_clean = df_drugs_clean[df_drugs_clean.YEAR < 2019]


df_drugs_clean['date'] = df_drugs_clean.MONTH.astype(str) + '/' + df_drugs_clean.YEAR.astype(str)

df_drugs_clean.to_csv('data/drug_data_cats.csv', index=False)

list(df_drugs_clean.DISTRICT.unique())
