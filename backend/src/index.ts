import DotEnv from 'dotenv'

DotEnv.config();

import Server from './server';
const run = new Server()
run.startTheServer();
