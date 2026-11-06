from loaders.road_name_loader import RoadNameLoader
from loaders.postgre_loader import PostgreLoader
import traceback
import pandas as pd
from extractors.prf.prf_extractor import extractAccident, extractVictims
from pipelines.prf.accident_pipeline import run_accident_pipeline
from pipelines.prf.city_pipeline import run_city_pipeline
from pipelines.prf.road_pipeline import run_road_pipeline
from pipelines.prf.state_pipeline import run_state_pipeline
from pipelines.prf.vehicle_pipeline import run_vehicle_pipeline
from pipelines.prf.participant_pipeline import run_participant_pipeline
from extractors.osm.osm_reader import extractRoadRelations
from transformers.osm.relation_tranform import  transform_osm_road_names



postgre_loader = PostgreLoader("postgresql://postgres:postgres@localhost:5433/acidentes_db")
road_name_loader = RoadNameLoader(postgre_loader)


# df_PRF = extractAccident()
# df_PRFVitimas = extractVictims()

print("Analysing Road Relations from OSM...")

df = extractRoadRelations()

# Extract names and references for analysis
df["name"] = df["tags"].apply(lambda tags: tags.get("name"))
df["ref"] = df["tags"].apply(lambda tags: tags.get("ref"))

# Federal Relations without names
federal_without_name = df[
    df["ref"].str.contains(r"BR-\d+", na=False, regex=True) &
    (
        df["name"].isna() |
        df["name"].str.strip().eq("")
    )
]

# print(
#     f"Federal Relations without names: {len(federal_without_name)}"
# )

# print(
#     federal_without_name[
#         ["osm_id", "ref", "name"]
#     ].to_string(index=False)
# )


transformed_df = transform_osm_road_names(df)


# print(f"Total transformed records: {len(transformed_df)}")

# print(transformed_df.head(10).to_string(index=False))


road_name_loader.load(transformed_df)






# state_df, state_map = run_state_pipeline(df_PRF)
# city_df, city_map = run_city_pipeline(df_PRF,state_map)
# road_df, road_city_df, road_map = run_road_pipeline(df_PRF, city_map)
# accident_df, accident_map = run_accident_pipeline(df_PRF, road_map, city_map)
# vehicle_df, vehicle_map = run_vehicle_pipeline(df_PRFVitimas, accident_map)
# participant_df  = run_participant_pipeline(df_PRFVitimas,accident_map, vehicle_map)


# try:
#     postgreLoader.load(state_df, 'state')
#     print("State carregada")
# except Exception:
#     print("Erro ao carregar state")
#     traceback.print_exc()

# try:
#     postgreLoader.load(city_df, 'city')
#     print("City carregada")
# except Exception:
#     print("Erro ao carregar city")
#     traceback.print_exc()


# try:
#     postgreLoader.load(road_df, 'road')
#     print("Road carregada")
# except Exception:
#     print("Erro ao carregar road")
#     traceback.print_exc()

# try:
#     postgreLoader.load(road_city_df, 'road_cities_city')
#     print("Road Cities carregada")
# except Exception:
#     print("Erro ao carregar road_cities_city")
#     traceback.print_exc()

# try:
#     postgreLoader.load(accident_df, 'accident')
#     print("Accident carregada")
# except Exception:
#     print("Erro ao carregar accident")
#     traceback.print_exc()

# try:
#     postgreLoader.load(vehicle_df, 'vehicle')
#     print("Vehicle carregada")
# except Exception:
#     print("Erro ao carregar vehicle")
#     traceback.print_exc()

# try:
#     postgreLoader.load(participant_df, 'participant')
#     print("Participant carregada")
# except Exception: 
#     print("Erro ao carregar participant")
#     traceback.print_exc()



# print("ETL process completed successfully!")




