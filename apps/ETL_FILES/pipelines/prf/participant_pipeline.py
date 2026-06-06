from transformers.prf.participant_transform import transform_participants

def run_participant_pipeline(df):
    df = transform_participants(df)
    return df