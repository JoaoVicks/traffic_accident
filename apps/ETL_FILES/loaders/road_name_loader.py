
import logging
import uuid

import pandas as pd
from sqlalchemy import text


logger = logging.getLogger(__name__)


class RoadNameLoader:

    def __init__(self, postgres_loader):
        self.postgres_loader = postgres_loader

    def find_roads(self, df: pd.DataFrame) -> pd.DataFrame:
        """
        Retrieve existing roads from PostgreSQL.
        """

        query = text("""
            SELECT
                id AS road_id,
                road_prefix,
                road_code
            FROM road
        """)

        with self.postgres_loader.engine.connect() as connection:
            roads_df = pd.read_sql(query, connection)

        return roads_df

    def associate_roads(
        self,
        road_names_df: pd.DataFrame,
        roads_df: pd.DataFrame
    ) -> pd.DataFrame:
        """
        Associate each road name with its corresponding road ID.
        """

        return road_names_df.merge(
            roads_df,
            on=["road_prefix", "road_code"],
            how="inner",
            validate="many_to_one"
        )

    def remove_existing_names(
        self,
        df: pd.DataFrame
    ) -> pd.DataFrame:
        """
        Avoid inserting road names that already exist.
        """

        query = text("""
            SELECT
                road_id,
                name,
                name_type,
                source_name
            FROM road_name
        """)

        with self.postgres_loader.engine.connect() as connection:
            existing_names = pd.read_sql(query, connection)

        return (
            df.merge(
                existing_names.drop_duplicates(),
                on=["road_id", "name", "name_type", "source_name"],
                how="left",
                indicator=True
            )
            .query("_merge == 'left_only'")
            .drop(columns="_merge")
        )

    
    def load(self, df: pd.DataFrame):

        # 1. Retrieve existing roads
        roads_df = self.find_roads(df)

        # 2. Associate road names with road IDs
        matched_df = self.associate_roads(df, roads_df)

        # 3. Identify unmatched roads
        unmatched_count = len(df) - len(matched_df)

        if unmatched_count:
            logger.warning(
                "Skipped %s road names because their roads were not found.",
                unmatched_count
            )

        # 4. Remove road names that already exist
        matched_df = self.remove_existing_names(matched_df)

        # 5. Generate UUIDs
        matched_df = matched_df.copy()
        matched_df["id"] = [
            uuid.uuid4() for _ in range(len(matched_df))
        ]

        # 6. Select database columns
        matched_df = matched_df[
            [
                "id",
                "road_id",
                "name",
                "name_type",
                "source_name"
            ]
        ]

        # 7. Insert records
        if not matched_df.empty:
            self.postgres_loader.load(matched_df, "road_name")

        logger.info(
            "Inserted %s road names.",
            len(matched_df)
        )

        return matched_df
