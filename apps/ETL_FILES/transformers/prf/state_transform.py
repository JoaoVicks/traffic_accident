import pandas as pd 

def rename_state_columns(df: pd.DataFrame) -> pd.DataFrame:
    return df.rename(
        columns={
            "uf": "state_code",
        }
    )

def drop_state_columns(df: pd.DataFrame) -> pd.DataFrame:
    return df.drop(
        columns=[
            col for col in df.columns
            if col != "state_code"
        ]
    )

def transform_state(df):
    df = rename_state_columns(df)
    df = drop_state_columns(df)
    return df