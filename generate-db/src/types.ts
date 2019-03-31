const TYPES = {
  Logger: Symbol.for('Logger'),
  ExtractService: Symbol.for('ExtractService'),
  Pipeline: Symbol.for('Pipeline'),
  Config: Symbol.for('Config'),
  SearchEngineParser: Symbol.for('SearchEngineParser'),
  JmdictEntryProcessor: Symbol.for('JmdictEntryProcessor'),
  DataStroage: Symbol.for('DataStorage'),
  ParseDatabaseJob: Symbol.for('ParseDatabaseJob'),
  AddMetadataJob: Symbol.for('AddMetadataJob'),
};

export { TYPES };
