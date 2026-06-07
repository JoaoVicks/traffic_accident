import pandas as pd

def transform_gender(df: pd.DataFrame) -> pd.DataFrame:
    df['sexo'] = df['sexo'].map({
        'Masculino': 'MALE',
        'Feminino': 'FEMALE',
        'Não Informado': 'UNKNOWN',
        'Ignorado': 'IGNORED'
    }).fillna('UNKNOWN')
    return df

def transform_age(df: pd.DataFrame) -> pd.DataFrame:
    df['idade'] = pd.to_numeric(df['idade'], errors='coerce')

    df.loc[
        (df['idade'] < 0) | (df['idade'] > 130),
        'idade'
    ] = None

    return df

def transform_condition(df: pd.DataFrame) -> pd.DataFrame:
    df['estado_fisico'] = df['estado_fisico'].map({
        'Ileso': 'UNHARMED',
        'Lesões Leves': 'LIGHT_INJURY',
        'Lesões Graves': 'GRAVE_INJURY',
        'Óbito': 'FATAL',
        'Não Informado': 'UNKNOWN',
    }).fillna('UNKNOWN')
    return df

def transform_participant_type(df: pd.DataFrame) -> pd.DataFrame:
    df['tipo_envolvido'] = df['tipo_envolvido'].map({
        'Condutor': 'DRIVER',
        'Passageiro': 'PASSENGER',
        'Pedestre': 'PEDESTRIAN',
        'Não Informado': 'UNKNOWN',
        'Testemunha': 'WITNESS',
        'Cavaleiro': 'RIDER',
    }).fillna('UNKNOWN')
    return df

def drop_participant_columns(df: pd.DataFrame) -> pd.DataFrame:
    return df.drop(
        columns=[
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
            "tipo_veiculo",
            "marca",
            "ano_fabricacao_veiculo",
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


def rename_participant_columns(df: pd.DataFrame) -> pd.DataFrame:
    return df.rename(
        columns={
            "pesid": "source_participant_id",
            "idade": "age",
            "sexo": "gender",
            "estado_fisico": "condition",
            "tipo_envolvido": "participant_type",
            "id_veiculo": "source_vehicle_id",
            "id": "source_accident_id",
        }
    )

def transform_participants(df: pd.DataFrame) -> pd.DataFrame:
    df = transform_condition(df)
    df = transform_gender(df)
    df = transform_age(df)
    df = transform_participant_type(df) 
    df = rename_participant_columns(df)
    df = drop_participant_columns(df)
    return df