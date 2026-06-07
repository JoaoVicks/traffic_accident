import pandas as pd 


def rename_city_columns(df: pd.DataFrame) -> pd.DataFrame:
    return df.rename(
        columns={
            "municipio": "city_name",
            "uf": "state_code"
        }
    )

def drop_city_columns(df: pd.DataFrame) -> pd.DataFrame:
    return df.drop(
        columns=[
            col for col in df.columns
            if col != "city_name" and col != "state_code"
        ]
    )

def transform_city(df):
    df = rename_city_columns(df)
    df = drop_city_columns(df)
    return df.drop_duplicates(subset=["city_name", "state_code"], ignore_index=True)