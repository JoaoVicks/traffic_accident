import pandas as pd

# dfTipoVeiculo = pd.read_csv(
#     "TipoVeiculo_DadosAbertos_20251012.csv",
#     sep=";",
#     nrows= 50000
# )

# dfAcidente = pd.read_csv(
#     "Acidentes_DadosAbertos_20251012.csv",
#     sep=";",
#     nrows= 50000
# )

# dfVitimas = pd.read_csv(
#     "Vitimas_DadosAbertos_20251012.csv",
#     sep=";",
#     nrows= 50000
# )

# dfLocalidade = pd.read_csv(
#     "Localidade_DadosAbertos_20251012.csv",
#     sep=";",
#     nrows= 50000
# )


# LatitudeFiltro = df['latitude_acidente'] > 0
# LongitudeFiltro = df['longitude_acidente'] > 0
# filtro = df[LatitudeFiltro & LongitudeFiltro]

# print(df["cond_pista"].value_counts())
# print(df.info())

# print (dfTipoVeiculo.info())
# print (dfAcidente.info())

# condicaoTipoVeiculo = dfTipoVeiculo["tipo_veiculo"] != "NAO INFORMADO"

# print (dfTipoVeiculo[condicaoTipoVeiculo])
# print (dfTipoVeiculo.head())
# print (dfVitimas.keys())
# print (dfAcidente.head())
# print (dfAcidente.keys())

# print(dfTipoVeiculo.keys())


# ----------------------------- prf---------------------


dfPRF = pd.read_csv(
    "PRF/datatran2026.csv",
    sep=";",
    encoding="latin1",
    nrows=50000
)
dfPRFVitimas = pd.read_csv(
    "PRF/acidentes2026.csv",
    sep=";",
    encoding="latin1",
    nrows=50000
)


# replace
dfPRF['latitude'] = dfPRF['latitude'].astype(str).str.replace(',', '.')
dfPRF['longitude'] = dfPRF['longitude'].astype(str).str.replace(',', '.')

dfPRFVitimas['latitude'] = dfPRFVitimas['latitude'].astype(str).str.replace(',', '.')
dfPRFVitimas['longitude'] = dfPRFVitimas['longitude'].astype(str).str.replace(',', '.')

# conversão
dfPRF['latitude'] = pd.to_numeric(dfPRF['latitude'], errors='coerce')
dfPRF['longitude'] = pd.to_numeric(dfPRF['longitude'], errors='coerce')

dfPRFVitimas['latitude'] = pd.to_numeric(dfPRFVitimas['latitude'], errors='coerce')
dfPRFVitimas['longitude'] = pd.to_numeric(dfPRFVitimas['longitude'], errors='coerce')



# validação
dfPRF['coord_valida'] = (
    dfPRF['latitude'].between(-34, 5) &
    dfPRF['longitude'].between(-74, -28)
)

dfPRFVitimas['coord_valida'] = (
    dfPRFVitimas['latitude'].between(-34, 5) &
    dfPRFVitimas['longitude'].between(-74, -28)
)


print(dfPRF.notnull())







