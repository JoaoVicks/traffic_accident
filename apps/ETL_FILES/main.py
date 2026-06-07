from loaders.postgre_loader import PostgreLoader
import traceback
from extracts.prf.prf_extractor import extractAccident, extractVictims
from pipelines.prf.accident_pipeline import run_accident_pipeline
from pipelines.prf.city_pipeline import run_city_pipeline
from pipelines.prf.road_pipeline import run_road_pipeline
from pipelines.prf.state_pipeline import run_state_pipeline
from pipelines.prf.vehicle_pipeline import run_vehicle_pipeline
from pipelines.prf.participant_pipeline import run_participant_pipeline

postgreLoader = PostgreLoader("postgresql://postgres:postgres@localhost:5433/acidentes_db")

df_PRF = extractAccident()
df_PRFVitimas = extractVictims()
  
state_df, state_map = run_state_pipeline(df_PRF)
city_df, city_map = run_city_pipeline(df_PRF,state_map)
road_df, road_city_df, road_map = run_road_pipeline(df_PRF, city_map)
accident_df, accident_map = run_accident_pipeline(df_PRF, road_map)
vehicle_df, vehicle_map = run_vehicle_pipeline(df_PRFVitimas, accident_map)
participant_df  = run_participant_pipeline(df_PRFVitimas,accident_map, vehicle_map)


postgreLoader.load(state_df, 'state')
postgreLoader.load(city_df, 'city')
postgreLoader.load(road_df, 'road')
postgreLoader.load(road_city_df, 'road_cities_city')
try:
    postgreLoader.load(accident_df, 'accident')
    print("Accident carregada")
except Exception:
    print("Erro ao carregar accident")
    traceback.print_exc()

try:
    postgreLoader.load(vehicle_df, 'vehicle')
    print("Vehicle carregada")
except Exception:
    print("Erro ao carregar vehicle")
    traceback.print_exc()

try:
    postgreLoader.load(participant_df, 'participant')
    print("Participant carregada")
except Exception:
    print("Erro ao carregar participant")
    traceback.print_exc()

print("ETL process completed successfully!")




