import { type ClientSchema, a, defineData } from '@aws-amplify/backend';
import { generateVideoHandler } from '../functions/generate-video/resource';

const schema = a.schema({
  generateVideo: a
    .query()
    .arguments({ prompt: a.string() })
    .returns(a.string())
    .authorization(allow => [allow.authenticated()])
    .handler(a.handler.function(generateVideoHandler)),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'apiKey',
    apiKeyAuthorizationMode: { expiresInDays: 30 },
  },
});