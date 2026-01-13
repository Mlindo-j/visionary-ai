import { defineFunction, secret } from '@aws-amplify/backend';

export const generateVideoHandler = defineFunction({
  name: 'generate-video',
  entry: './handler.ts',
  timeoutSeconds: 60,
  environment: {
    // This connects the AWS Secret to the code's environment variables
    GPU_SECRET: secret('GPU_SECRET') 
  }
});