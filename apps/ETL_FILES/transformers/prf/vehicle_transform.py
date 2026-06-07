import pandas as pd

def rename_vehicle_columns(df: pd.DataFrame) -> pd.DataFrame:
    return df.rename(
        columns={
            "marca": "brand_vehicle",
            "ano_fabricacao_veiculo": "fabrication_year",
            "tipo_veiculo": "vehicle_type",
            "id_veiculo": "source_vehicle_id",
            "id": "source_accident_id",
        }
    )

def drop_vehicle_columns(df: pd.DataFrame) -> pd.DataFrame:
    return df.drop(
        columns=[
            "pesid",
            "data_inversa",
            "dia_semana",
            "horario",
            "uf",
            "br",
            "km",
            "municipio",
            "causa_acidente",
            "tipo_acidente",
            "classificacao_acidente",
            "fase_dia",
            "sentido_via",
            "condicao_metereologica",
            "tipo_pista",
            "tracado_via",
            "uso_solo",
            "tipo_envolvido",
            "estado_fisico",
            "idade",
            "sexo",
            "ilesos",
            "feridos_leves",
            "feridos_graves",
            "mortos",
            "latitude",
            "longitude",
            "regional",
            "delegacia",
            "uop",

        ],
        errors="ignore",
    )

def transform_vehicle(df):
    df = rename_vehicle_columns(df)
    df['vehicle_type'] = df['vehicle_type'].fillna('NOT_INFORMED')
    df = drop_vehicle_columns(df)
    return df