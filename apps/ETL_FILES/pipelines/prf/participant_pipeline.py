from transformers.prf.participant_transform import transform_participants
from utils.uuid_helper import add_uuid_column
import pandas as pd

def run_participant_pipeline(dfVitimas: pd.DataFrame, accident_map: dict, vehicle_map: dict) -> pd.DataFrame:
    participant_df = transform_participants(dfVitimas)
    participant_df = add_uuid_column(participant_df)
    participant_df["accident_id"] = participant_df["source_accident_id"].map(accident_map)
    participant_df["vehicle_id"] = participant_df["source_vehicle_id"].map(vehicle_map)
    participant_df = participant_df.drop(columns=["source_accident_id", "source_vehicle_id", "source_participant_id"])

    return participant_df