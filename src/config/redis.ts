import { REDIS_HOST, REDIS_PORT, REDIS_PASSWORD } from '../constant';
export default () => ({
  [REDIS_HOST]: process.env[REDIS_HOST],

  [REDIS_PORT]: process.env[REDIS_PORT],
  [REDIS_PASSWORD]: process.env[REDIS_PASSWORD],
});
