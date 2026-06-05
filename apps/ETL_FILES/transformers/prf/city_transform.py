import pandas as pd 


def rename_city_columns(df: pd.DataFrame) -> pd.DataFrame:
    return df.rename(
        columns={
            "municipio": "city_name",
        }
    )

def drop_city_columns(df: pd.DataFrame) -> pd.DataFrame:
    return df.drop(
        columns=[
            col for col in df.columns
            if col != "city_name"
        ]
    )

def transform_city(df):
    df = rename_city_columns(df)
    df = drop_city_columns(df)
    return df