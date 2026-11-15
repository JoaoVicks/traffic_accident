import pandas as pd 
from config.paths import OSM_EXTRACTED_RELATIONS_FILE

def extractRoadRelations():
    return pd.read_json(
        OSM_EXTRACTED_RELATIONS_FILE,
        lines=True
    )

    

    