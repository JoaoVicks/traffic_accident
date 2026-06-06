from transformers.prf.city_transform import transform_city

def run_city_pipeline(df):
    df = transform_city(df)
    return df