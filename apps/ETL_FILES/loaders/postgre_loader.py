from sqlalchemy import create_engine

class PostgreLoader:
      def __init__(self, connection):
          self.connection = create_engine(connection)
  
      def load(self, df, table_name):
          df.to_sql(table_name, self.connection, if_exists='append', index=False)