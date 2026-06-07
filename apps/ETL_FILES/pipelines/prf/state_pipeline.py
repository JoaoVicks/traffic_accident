
import pandas as pd 
from transformers.prf.state_transform import transform_state
from utils.map_helper import create_mapping_dict
from utils.uuid_helper import add_uuid_column


def run_state_pipeline(df: pd.DataFrame) -> tuple[pd.DataFrame, dict[str,str]]:
    state_df = transform_state(df)

    state_df = add_uuid_column(state_df)

    state_map = create_mapping_dict(
        state_df["state_code"],
        state_df["id"],
    )

    
    return state_df, state_map