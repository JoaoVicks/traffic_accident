import pandas as pd


def transform_road_code(df: pd.DataFrame) -> pd.DataFrame:
    df["br"] = df["br"].fillna("Ignorado")
    return df


def transform_road(df: pd.DataFrame) -> pd.DataFrame:
    df = transform_road_code(df)

    df = df.rename(
        columns={
            "br": "road_code",
        }
    )

    return (
        df[
            [
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
                "road_code",
                "city_name",
                "state_code",
            ]
        ]
        .drop_duplicates(ignore_index=True)
    )