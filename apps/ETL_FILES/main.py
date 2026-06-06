from loaders.postgre_loader import PostgreLoader
from extracts.prf.prf_extractor import extractAccident, extractVictims
from pipelines.prf.accident_pipeline import run_accident_pipeline
from pipelines.prf.city_pipeline import run_city_pipeline
from pipelines.prf.road_pipeline import run_road_pipeline
from pipelines.prf.state_pipeline import run_state_pipeline
from pipelines.prf.vehicle_pipeline import run_vehicle_pipeline
from pipelines.prf.participant_pipeline import run_participant_pipeline



dfPRF = extractAccident()
dfPRFVitimas = extractVictims()



print(dfPRFVitimas.keys())