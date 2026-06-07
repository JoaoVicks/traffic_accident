import uuid
import pandas as pd 

def generate_uuid() -> str:
    return str(uuid.uuid8())

def add_uuid_column(df: pd.DataFrame , column_name: str = "id") -> pd.DataFrame:
    df[column_name] = [generate_uuid() for _ in range(len(df))]
    return df