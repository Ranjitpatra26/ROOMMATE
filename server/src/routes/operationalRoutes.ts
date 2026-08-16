import { Router } from 'express';
import {
  getFeatured,
  queryDiscover,
  calculateCompatibility,
  getActiveStay,
  getExpenses,
  getDestinations,
} from '../controllers/operationalControllers.js';
import { authenticate } from '../middleware/auth.js';

export const discoverRouter = Router();
discoverRouter.get('/featured', getFeatured);
discoverRouter.get('/', queryDiscover);

export const compatibilityRouter = Router();
compatibilityRouter.post('/calculate', authenticate, calculateCompatibility);

export const livingRouter = Router();
livingRouter.get('/stay', authenticate, getActiveStay);

export const expenseRouter = Router();
expenseRouter.get('/', authenticate, getExpenses);

export const travelRouter = Router();
travelRouter.get('/destinations', getDestinations);
