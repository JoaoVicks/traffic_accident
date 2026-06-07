import pandas as pd 
import numpy as np  

def replace_comma(df, column):
    df[column] = df[column].astype(str).str.replace(',', '.')
    return df


def transform_lane_configuration(df):
    df['tipo_pista'] = df['tipo_pista'].map({
        'Simples': 'SINGLE',
        'Dupla': 'DOUBLE',
        'Múltipla': 'MULTIPLE',
        'Não Informado': 'UNKNOWN',
        'Ignorado': 'IGNORED'
    })
    return df

def transform_road_direction(df):
    df['sentido_via'] = df['sentido_via'].map({
        'Crescente': 'INCREASING',
        'Decrescente': 'DECREASING',
        'Não Informado': 'UNKNOWN',
        'Ignorado': 'IGNORED'
    })
    return df

def convert_to_numeric(df, column):
    df[column] = pd.to_numeric(df[column], errors='coerce')
    return df



def validate_coordinates(df):
     df['coord_valida'] = (
        df['latitude'].between(-34, 5) &
        df['longitude'].between(-74, -28)
    )
     return df


def process_dates(df):
     df['data_inversa'] = pd.to_datetime(
        df['data_inversa'],
        errors='coerce'

    )
     return df


def process_time(df):
    df['horario'] = pd.to_datetime(
        df['horario'],
        format='%H:%M:%S',
        errors='coerce'
    )
    return df



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


def classify_severity(df):
     df['classificacao_acidente'] = np.select(
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


def rename_accident_columns(df: pd.DataFrame) -> pd.DataFrame:
    return df.rename(
        columns={
            "coord_valida": "coordenate_validity",
            "id": "source_accident_id",
            "horario":"time",
            "periodo_dia": "day_phase",
            "data_inversa": "date",
            "longitude": "long",
            "latitude": "lat",
            "sentido_via": "road_direction",
            "tipo_pista": "lane_configuration_type",
            "causa_acidente": "accident_cause",
            "tipo_acidente": "accident_type",
            "tracado_via": "road_geometry",
            "classificacao_acidente": "accident_classification",
            "mortos": "fatalities",
            "feridos_leves": "minor_injuries",
            "feridos_graves": "serious_injuries",
            "ilesos": "uninjured_people",
            "feridos": "total_injuries",
            "pessoas": "participants_count",
            "ignorados": "unknown_condition_count",
            "veiculos": "vehicle_count",
            "br": "road_code",
        }
    )

def drop_accident_columns(df: pd.DataFrame) -> pd.DataFrame:
    return df.drop(
        columns=[
            "dia_semana",
            "hora",
            "uf",
            "km",
            "municipio",
            "condicao_metereologica",
            "uso_solo",
            "regional",
            "delegacia",
            "fase_dia",
            "uop",
        ],
        errors="ignore",
    )



### fluxo completo
def transform_accidents(df):
    df = transform_lane_configuration(df)
    df = transform_road_direction(df)
    df = replace_comma(df, 'latitude')
    df = replace_comma(df, 'longitude')
    df = convert_to_numeric(df, 'latitude')
    df = convert_to_numeric(df, 'longitude')
    df = validate_coordinates(df)
    df = process_dates(df)
    df = process_time(df)
    df = classify_period(df)
    df = classify_severity(df)
    df = rename_accident_columns(df)
    df = drop_accident_columns(df)
    return df