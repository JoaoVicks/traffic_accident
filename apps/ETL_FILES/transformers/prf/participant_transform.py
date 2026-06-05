import pandas as pd

def transform_gender(df):
    df['sexo'] = df['sexo'].map({
        'Masculino': 'MALE',
        'Feminino': 'FEMALE',
        'Não Informado': 'UNKNOWN',
        'Ignorado': 'IGNORED'
    })
    return df

def transform_condition(df):
    df['estado_fisico'] = df['estado_fisico'].map({
        'Ileso': 'UNHARMED',
        'Lesões Leves': 'LIGHT_INJURY',
        'Lesões Graves': 'GRAVE_INJURY',
        'Óbito': 'FATAL',
        'Não Informado': 'UNKNOWN',
    })  
    return df

def transform_participant_type(df):
    df['tipo_participante'] = df['tipo_participante'].map({
        'Condutor': 'DRIVER',
        'Passageiro': 'PASSENGER',
        'Pedestre': 'PEDESTRIAN',
        'Não Informado': 'UNKNOWN',
        'Testemunha': 'WITNESS',
        'CAVALEIRO': 'RIDER',
    })
    return df

def drop_participant_columns(df: pd.DataFrame) -> pd.DataFrame:
    return df.drop(
        columns=[
            "id",
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
            "id_veiculo",
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
            "idade": "age",
            "sexo": "gender",
            "estado_fisico": "condition",
            "tipo_envolvido": "participant_type",
        }
    )

def transform_participants(df):
    df = transform_condition(df)
    df = transform_gender(df)
    df = transform_participant_type(df) 
    df = rename_participant_columns(df)
    df = drop_participant_columns(df)
    return df