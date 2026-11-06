import pandas as pd 
from config.paths import PRF_ACIDENT_FILE, PRF_VICTIMS_FILE

def extractAccident():
    return pd.read_csv(
    PRF_ACIDENT_FILE,
    sep=";",
    encoding="latin1",
    )  

def extractVictims():
    return pd.read_csv(
    PRF_VICTIMS_FILE,
    sep=";",
    encoding="latin1",
    )