import pandas as pd 
import numpy as np  

# replace
def replace_comma(df, column):
    df[column] = df[column].astype(str).str.replace(',', '.')
    return df


# conversão

def convert_to_numeric(df, column):
    df[column] = pd.to_numeric(df[column], errors='coerce')
    return df


# validação
def validate_coordinates(df):
     df['coord_valida'] = (
        df['latitude'].between(-34, 5) &
        df['longitude'].between(-74, -28)
    )
     return df


# =========================
# TRATAMENTO DE DATAS
# =========================

def process_dates(df):
     df['data_inversa'] = pd.to_datetime(
        df['data_inversa'],
        errors='coerce'

    )
     return df



# =========================
# PERÍODO DO DIA
# =========================

# transforma horario em datetime
def process_time(df):
    df['horario'] = pd.to_datetime(
        df['horario'],
        format='%H:%M:%S',
        errors='coerce'
    )
    return df


# função classificação período
def classify_period(df):
    df['hora'] = df['horario'].dt.hour
    df['periodo_dia'] = np.select(
        [
            df['hora'].between(0, 5),
            df['hora'].between(6, 11),
            df['hora'].between(12, 17),
            df['hora'].between(18, 23)
        ],
        [
            'Madrugada',
            'Manhã',
            'Tarde',
            'Noite'
        ],
        default='Ignorado'
    )
    return df

# =========================
# GRAVIDADE
# =========================


def classify_severity(df):
     df['gravidade'] = np.select(
        [
            df['mortos'] > 0,
            df['feridos_graves'] > 0,
            df['feridos_leves'] > 0
        ],
        [
            'Fatal',
            'Grave',
            'Leve'
        ],
        default='Sem vítimas'
    )
     return df

# ==========================
# DROP DE COLUNAS
# ==========================
drop_columns_list = [
    'fase_dia',
]

def drop_columns(df, columns):
    df = df.drop(columns=columns)
    return df


### fluxo completo
def transform_accidents(df):
    df = replace_comma(df, 'latitude')
    df = replace_comma(df, 'longitude')
    df = convert_to_numeric(df, 'latitude')
    df = convert_to_numeric(df, 'longitude')
    df = validate_coordinates(df)
    df = process_dates(df)
    df = process_time(df)
    df = classify_period(df)
    df = classify_severity(df)
    df = drop_columns(df, drop_columns_list)
    return df