from transformers.prf.city_transform import transform_city
from utils.uuid_helper import add_uuid_column
import pandas as pd


def run_city_pipeline(
    df: pd.DataFrame,
    state_map: dict,
) -> tuple[pd.DataFrame, dict]:

    city_df = transform_city(df)


    city_df = add_uuid_column(city_df)


    city_df["state_id"] = (
        city_df["state_code"]
        .map(state_map)
    )


    city_map = {
        (row["city_name"], row["state_code"]): row["id"]
        for _, row in city_df.iterrows()
    }


    city_df = city_df.drop(columns=["state_code"])

    return city_df, city_map