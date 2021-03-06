import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as logger from 'morgan';
import * as path from 'path';

import HeroRouter from './routes/hero-router';

// Creates and configures an ExpressJS web server.
class Server {

	// ref to Express instance
	public express: express.Application;

	// Run configuration methods on the Express instance.
	constructor() {
		this.express = express();
		this.middleware();
		this.routes();
	}

	// Configure Express middleware.
	private middleware(): void {
		this.express.use(logger('dev'));
		this.express.use(bodyParser.json());
		this.express.use(bodyParser.urlencoded({ extended: false }));
	}

	// Configure API endpoints.
	private routes(): void {
		/* This is just to get up and running, and to make sure what we've got is
		 * working so far. This function will change when we start to add more
		 * API endpoints */
		let router = express.Router();
		// placeholder route handler
		router.get('/', (req, res, next) => {
			return res.json({
				message: 'Hello World!22'
			});
		});
		let publicPath = path.join(__dirname, 'public');
		console.log(`Serving static files from ${publicPath}`);

		this.express.use('/test', router);
		this.express.use('/api/v1/heroes', HeroRouter);
		this.express.use(express.static(publicPath));
	}
}

export default new Server().express;
