from transformers.prf.accident_transform import transform_accidents
from utils.map_helper import create_mapping_dict
from utils.uuid_helper import add_uuid_column
import pandas as pd

def run_accident_pipeline(df: pd.DataFrame, road_map: dict) -> tuple[pd.DataFrame, dict]:
    accident_df = transform_accidents(df)
    accident_df = add_uuid_column(accident_df)
    accident_df["road_id"] = accident_df["road_code"].map(road_map)
    accident_map = create_mapping_dict(
        accident_df["source_accident_id"], accident_df["id"]
    )
    accident_df = accident_df.drop(columns=["road_code", "source_accident_id"])

    return accident_df, accident_map


