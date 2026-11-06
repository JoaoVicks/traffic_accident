import pandas as pd


def _road_code_to_string(value) -> str:
    if pd.isna(value):
        return "Ignorado"
    if isinstance(value, float) and value.is_integer():
        value = int(value)
    return str(value)


def transform_road_code(df: pd.DataFrame) -> pd.DataFrame:
    df["br"] = df["br"].map(_road_code_to_string)
    return df


def transform_road(df: pd.DataFrame) -> pd.DataFrame:
    df = transform_road_code(df)

    df["road_prefix"] = "BR"
    
    df = df.rename(
        columns={
            "br": "road_code",
        }
    )

    return (
        df[
            [
                "road_prefix",
                "road_code",
            ]
        ]
        .drop_duplicates(ignore_index=True)
    )


def transform_road_city(df: pd.DataFrame) -> pd.DataFrame:
    df = transform_road_code(df)

    df = df.rename(
        columns={
            "br": "road_code",
            "municipio": "city_name",
            "uf": "state_code",
        }
    )

    return (
        df[
            [
                "road_prefix",
                "road_code",
                "city_name",
                "state_code",
            ]
        ]
        .drop_duplicates(ignore_index=True)
    )