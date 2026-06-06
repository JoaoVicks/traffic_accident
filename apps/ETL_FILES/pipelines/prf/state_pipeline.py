from transformers.prf.state_transform import transform_state

def run_state_pipeline(df):
    df = transform_state(df)
    return df