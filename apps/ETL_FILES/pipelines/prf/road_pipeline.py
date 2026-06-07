from transformers.prf.road_transform import (
    transform_road,
    transform_road_city,
)

from utils.uuid_helper import add_uuid_column
from utils.map_helper import create_mapping_dict


def run_road_pipeline(
    df,
    city_map,
) -> tuple:

    road_df = transform_road(df)

    road_df = add_uuid_column(road_df)

    road_map = create_mapping_dict(
        road_df["road_code"],
        road_df["id"],
    )

    road_city_df = transform_road_city(df)

    road_city_df["roadId"] = (
        road_city_df["road_code"]
        .map(road_map)
    )

    road_city_df["cityId"] = road_city_df.apply(
        lambda row: city_map[
            (
                row["city_name"],
                row["state_code"],
            )
        ],
        axis=1,
    )

    road_city_df = road_city_df[
        [
            "roadId",
            "cityId",
        ]
    ]

    return road_df, road_city_df, road_map