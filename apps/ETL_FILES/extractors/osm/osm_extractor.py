
import osmium
import json
from pathlib import Path


INPUT_FILE = "data/raw/map_information/OSM/nordeste-261104.osm.pbf"
OUTPUT_DIR = Path("data/extracted/nordeste-area")   

OUTPUT_DIR.mkdir(parents=True, exist_ok=True)


class OSMRoadExtractor(osmium.SimpleHandler):

    def __init__(self):
        super().__init__()

        self.ways_file = open(
            OUTPUT_DIR / "road_ways.jsonl",
            "w",
            encoding="utf-8"
        )

        self.relations_file = open(
            OUTPUT_DIR / "road_relations.jsonl",
            "w",
            encoding="utf-8"
        )

        self.ways_count = 0
        self.relations_count = 0

    def way(self, way):

        tags = dict(way.tags)

        # Only process elements classified as roads
        if "highway" not in tags:
            return


        road_data = {
            "osm_id": way.id,
            "osm_type": "way",
            "highway": tags.get("highway"),
            "tags": tags,
        }

        self.ways_file.write(
            json.dumps(road_data, ensure_ascii=False) + "\n"
        )

        self.ways_count += 1

    def relation(self, relation):

        tags = dict(relation.tags)

        # Only process road route relations
        if tags.get("type") != "route":
            return

        if tags.get("route") != "road":
            return

        relation_data = {
            "osm_id": relation.id,
            "osm_type": "relation",
            "tags": tags,
            "members": [
                {
                    "type": member.type,
                    "ref": member.ref,
                    "role": member.role
                }
                for member in relation.members
            ]
        }

        self.relations_file.write(
            json.dumps(relation_data, ensure_ascii=False) + "\n"
        )

        self.relations_count += 1

    def close(self):
        self.ways_file.close()
        self.relations_file.close()


def main():

    extractor = OSMRoadExtractor()

    try:
        print("Starting OSM extraction...")

        extractor.apply_file(INPUT_FILE)

        print("\nExtraction completed!")

        print(f"Road ways extracted: {extractor.ways_count}")
        print(f"Road relations extracted: {extractor.relations_count}")

    finally:
        extractor.close()


if __name__ == "__main__":
    main()
