import 'dotenv/config';
import { get } from 'env-var';

export const envs = {
  API_URL: get('API_URL').required().asUrlString()
}



