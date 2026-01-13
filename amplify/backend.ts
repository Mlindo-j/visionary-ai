import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';
import { generateVideoHandler } from './functions/generate-video/resource';

defineBackend({
  auth,
  data,
  generateVideoHandler 
});