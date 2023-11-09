import fs from 'fs';
import path from 'path';
import type express from 'express';
import * as swaggerUi from 'swagger-ui-express';
import ILogger from '../../logging/ILogger';

export default function swagger(app: express.Express, logger: ILogger) {
  const swaggerDocumentPath = path.join(__dirname, 'swagger.json');

  // Do not enable swagger when document cannot be found.
  if (!fs.existsSync(swaggerDocumentPath)) {
    logger.logError(
      'Unable to find swagger document at this path: {0}',
      swaggerDocumentPath
    );
    return;
  }

  let swaggerDocument = {};
  try {
    swaggerDocument = JSON.parse(fs.readFileSync(swaggerDocumentPath, 'utf-8'));
  } catch (e) {
    const exception = e as unknown as Error;
    logger.logError(
      'Failed to read swagger document at path: {0}',
      swaggerDocumentPath
    );
    if (exception.stack) {
      logger.logError(exception.stack);
    }
  }

  app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}
