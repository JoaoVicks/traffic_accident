from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
RAW_DIR = BASE_DIR / "data" / "raw" 
EXTRACTED_DIR = BASE_DIR / "data" / "extracted" 

## FIlES
PRF_ACIDENT_FILE = RAW_DIR / "PRF" / "datatran2026.csv"
PRF_VICTIMS_FILE = RAW_DIR / "PRF" / "acidentes2026.csv"
OSM_EXTRACTED_RELATIONS_FILE = EXTRACTED_DIR / "centro-oeste-area" / "road_relations.jsonl"