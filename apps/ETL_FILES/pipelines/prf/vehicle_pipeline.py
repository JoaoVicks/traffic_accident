import pandas as pd
from transformers.prf.vehicle_transform import transform_vehicle
from utils.map_helper import create_mapping_dict
from utils.uuid_helper import add_uuid_column

def run_vehicle_pipeline(df: pd.DataFrame, accident_map: dict) -> tuple[pd.DataFrame, dict]:
    dfVehicle = transform_vehicle(df)
    dfVehicle = add_uuid_column(dfVehicle)
    dfVehicle["accident_id"] = dfVehicle["source_accident_id"].map(accident_map)
    vehicle_map = create_mapping_dict(
        dfVehicle["source_vehicle_id"], dfVehicle["id"]
    )
    dfVehicle = dfVehicle.drop(columns=["source_accident_id","source_vehicle_id"])
    return dfVehicle, vehicle_map