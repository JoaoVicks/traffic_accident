from transformers.prf.accident_transform import transform_accidents

def run_accident_pipeline(df):
    df = transform_accidents(df)
    return df



