
import pandas as pd


def extract_relation_tags(df: pd.DataFrame) -> pd.DataFrame:
    df = df.copy()

    for column in ["name", "ref", "type", "route"]:
        df[column] = df["tags"].apply(
            lambda tags: tags.get(column)
            if isinstance(tags, dict)
            else None
        )

    return df


def filter_road_relations(df: pd.DataFrame) -> pd.DataFrame:
    return df[
        (df["type"] == "route") &
        (df["route"] == "road")
    ].copy()


def extract_federal_references(df: pd.DataFrame) -> pd.DataFrame:
    df = df.copy()

    df["highway_ref"] = df["ref"].str.findall(
        r"BR-\d+"
    )

    return df


def expand_federal_references(df: pd.DataFrame) -> pd.DataFrame:
    df = df.explode("highway_ref")

    return df[
        df["highway_ref"].notna()
    ].copy()


def transform_highway_names(df: pd.DataFrame) -> pd.DataFrame:
    df = df.copy()

    df["name"] = df["name"].str.strip()

    return df[
        df["name"].notna() &
        (df["name"] != "")
    ].copy()


def add_source_information(df: pd.DataFrame) -> pd.DataFrame:
    df = df.copy()

    df["name_type"] = "UNCLASSIFIED"
    df["source_name"] = "OpenStreetMap"

    return df


def rename_osm_columns(df: pd.DataFrame) -> pd.DataFrame:
    return df.rename(
        columns={
            "osm_id": "source_relation_id"
        }
    )


def remove_duplicate_names(df: pd.DataFrame) -> pd.DataFrame:
    return df.drop_duplicates(
        subset=[
            "highway_ref",
            "name",
            "name_type",
            "source_name"
        ]
    )


def split_highway_reference(df: pd.DataFrame) -> pd.DataFrame:
    df = df.copy()

    df[["road_prefix", "road_code"]] = (
        df["highway_ref"].str.split(
            "-",
            n=1,
            expand=True
        )
    )

    return df


def select_road_name_columns(df: pd.DataFrame) -> pd.DataFrame:
    return df[
        [
            "source_relation_id",
            "highway_ref",
            "name",
            "name_type",
            "source_name",
            "road_prefix",
            "road_code"
        ]
    ].copy()


def validate_road_names(df: pd.DataFrame) -> pd.DataFrame:
    required_columns = [
        "source_relation_id",
        "highway_ref",
        "name",
        "name_type",
        "source_name",
        "road_prefix",
        "road_code"
    ]

    if df[required_columns].isna().any().any():
        raise ValueError(
            "Road names transformation contains missing values."
        )

    if not df["highway_ref"].str.fullmatch(
        r"BR-\d+"
    ).all():
        raise ValueError(
            "Invalid federal highway reference found."
        )

    return df


def transform_osm_road_names(
    df: pd.DataFrame
) -> pd.DataFrame:

    df = extract_relation_tags(df)
    df = filter_road_relations(df)
    df = extract_federal_references(df)
    df = expand_federal_references(df)
    df = transform_highway_names(df)
    df = add_source_information(df)
    df = rename_osm_columns(df)
    df = remove_duplicate_names(df)
    df = split_highway_reference(df)
    df = select_road_name_columns(df)
    df = validate_road_names(df)

    return df
