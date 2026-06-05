
import pandas as pd 


def transform_road_code(df):
    df['codigo_rodovia'] = df['codigo_rodovia'].fillna('Ignorado')
    return df

def rename_road_columns(df: pd.DataFrame) -> pd.DataFrame:
    return df.rename(
        columns={
            "br": "road_code",
        }
    )

def drop_road_columns(df: pd.DataFrame) -> pd.DataFrame:
    return df.drop(
        columns=[
            col for col in df.columns
            if col != "road_code"
        ]
    )

def transform_road(df):
    df = transform_road_code(df)
    df = rename_road_columns(df)
    df = drop_road_columns(df)
    return df

