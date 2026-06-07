from sqlalchemy import create_engine

class PostgreLoader:
      def __init__(self, connection):
          self.engine = create_engine(connection)
  
      def load(self, df, table_name):
          df.to_sql(table_name, self.engine, if_exists='append', index=False, method='multi', chunksize=10)