from transformers.prf.vehicle_trasnform import transform_vehicle

def run_vehicle_pipeline(df):
    df = transform_vehicle(df)
    return df