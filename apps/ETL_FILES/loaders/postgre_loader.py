from sqlalchemy import create_engine
from sqlalchemy.dialects.postgresql import UUID

class PostgreLoader:
      def __init__(self, connection):
          self.engine = create_engine(connection)
  
      def load(self, df, table_name):
          uuid_columns = {
              column: UUID(as_uuid=True)
              for column in df.columns
              if column == "id" or column.endswith("_id")
          }
          df.to_sql(
              table_name,
              self.engine,
              if_exists='append',
              index=False,
              method='multi',
              chunksize=10000,
              dtype=uuid_columns,
          )