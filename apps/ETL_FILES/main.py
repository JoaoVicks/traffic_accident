

from extracts.prf.prf_extractor import extractAccident, extractVictims

dfPRF = extractAccident()
dfPRFVitimas = extractVictims()


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



# =========================
# TRATAMENTO COORDENADAS
# =========================

# # replace
# dfPRF['latitude'] = dfPRF['latitude'].astype(str).str.replace(',', '.')
# dfPRF['longitude'] = dfPRF['longitude'].astype(str).str.replace(',', '.')

# dfPRFVitimas['latitude'] = dfPRFVitimas['latitude'].astype(str).str.replace(',', '.')
# dfPRFVitimas['longitude'] = dfPRFVitimas['longitude'].astype(str).str.replace(',', '.')

# # conversão
# dfPRF['latitude'] = pd.to_numeric(dfPRF['latitude'], errors='coerce')
# dfPRF['longitude'] = pd.to_numeric(dfPRF['longitude'], errors='coerce')

# dfPRFVitimas['latitude'] = pd.to_numeric(dfPRFVitimas['latitude'], errors='coerce')
# dfPRFVitimas['longitude'] = pd.to_numeric(dfPRFVitimas['longitude'], errors='coerce')

# # validação
# dfPRF['coord_valida'] = (
#     dfPRF['latitude'].between(-34, 5) &
#     dfPRF['longitude'].between(-74, -28)
# )

# dfPRFVitimas['coord_valida'] = (
#     dfPRFVitimas['latitude'].between(-34, 5) &
#     dfPRFVitimas['longitude'].between(-74, -28)
# )

# # =========================
# # TRATAMENTO DE DATAS
# # =========================

# dfPRF['data_inversa'] = pd.to_datetime(
#     dfPRF['data_inversa'],
#     errors='coerce'
# )

# # ano
# dfPRF['ano'] = dfPRF['data_inversa'].dt.year

# # mês
# dfPRF['mes'] = dfPRF['data_inversa'].dt.month

# # fim de semana
# dfPRF['fim_de_semana'] = dfPRF['dia_semana'].isin([
#     'sábado',
#     'domingo'
# ])

# # =========================
# # PERÍODO DO DIA
# # =========================

# # transforma horario em datetime
# dfPRF['horario'] = pd.to_datetime(
#     dfPRF['horario'],
#     format='%H:%M:%S',
#     errors='coerce'
# )

# # extrai hora
# dfPRF['hora'] = dfPRF['horario'].dt.hour

# # função classificação período
# dfPRF['periodo_dia'] = np.select(
#     [
#         dfPRF['hora'].between(0, 5),
#         dfPRF['hora'].between(6, 11),
#         dfPRF['hora'].between(12, 17),
#         dfPRF['hora'].between(18, 23)
#     ],
#     [
#         'Madrugada',
#         'Manhã',
#         'Tarde',
#         'Noite'
#     ],
#     default='Ignorado'
# )

# =========================
# GRAVIDADE
# =========================

# dfPRF['gravidade'] = np.select(
#     [
#         dfPRF['mortos'] > 0,
#         dfPRF['feridos_graves'] > 0,
#         dfPRF['feridos_leves'] > 0
#     ],
#     [
#         'Fatal',
#         'Grave',
#         'Leve'
#     ],
#     default='Sem vítimas'
# )

# =========================
# SCORE DE SEVERIDADE
# =========================

# dfPRF['score_severidade'] = (
#     (dfPRF['mortos'] * 10) +
#     (dfPRF['feridos_graves'] * 5) +
#     (dfPRF['feridos_leves'] * 1)
# )

# # =========================
# # RESULTADOS
# # =========================

# ### excluindo a coluna fase_dia para não possui dado duplicado
# dfPRF = dfPRF.drop(columns=['fase_dia'])


# print(dfPRF[
#     [
#         'data_inversa',
#         'ano',
#         'mes',
#         'periodo_dia',
#         'fim_de_semana',
#         'gravidade',
#         'score_severidade',
#         'coord_valida'
#     ]
# ].head())


print(dfPRFVitimas.keys())