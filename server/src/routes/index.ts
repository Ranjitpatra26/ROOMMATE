import { Router } from 'express';
import mongoose from 'mongoose';
import authRoutes from './authRoutes.js';
import profileRoutes from './profileRoutes.js';
import {
  discoverRouter,
  compatibilityRouter,
  livingRouter,
  expenseRouter,
  travelRouter,
} from './operationalRoutes.js';
import {
  getMatchById,
  getConversations,
  getConversationById,
  sendMessage,
  markConversationRead,
  getTrustProfile,
  getTrustHistory,
  getStayReviewEligibility,
  submitStayReview,
} from '../controllers/relationshipControllers.js';
import {
  getActiveStayDetails,
  getLivingAgreement,
  updateLivingAgreement,
  getSharedExpenses,
  createSharedExpense,
  submitSafetyReport,
} from '../controllers/livingControllers.js';

const apiRouter = Router();

apiRouter.use('/auth', authRoutes);
apiRouter.use('/profiles', profileRoutes);
apiRouter.use('/discover', discoverRouter);
apiRouter.use('/compatibility', compatibilityRouter);
apiRouter.use('/living-os', livingRouter);
apiRouter.use('/expenses', expenseRouter);
apiRouter.use('/travel', travelRouter);

// Match Domain
const matchesRouter = Router();
matchesRouter.get('/:id', getMatchById);
apiRouter.use('/matches', matchesRouter);

// Conversations Domain
const conversationRouter = Router();
conversationRouter.get('/', getConversations);
conversationRouter.get('/:id', getConversationById);
conversationRouter.post('/:id/messages', sendMessage);
conversationRouter.patch('/:id/read', markConversationRead);
apiRouter.use('/conversations', conversationRouter);

// Trust Domain
const trustRouter = Router();
trustRouter.get('/:userId', getTrustProfile);
trustRouter.get('/:userId/history', getTrustHistory);
apiRouter.use('/trust', trustRouter);

// Reviews Domain
const reviewRouter = Router();
reviewRouter.get('/stay/:stayId/eligibility', getStayReviewEligibility);
reviewRouter.post('/stay/:stayId', submitStayReview);
apiRouter.use('/reviews', reviewRouter);

// Stay & Living OS Domain
const stayRouter = Router();
stayRouter.get('/active', getActiveStayDetails);
stayRouter.get('/agreement', getLivingAgreement);
stayRouter.patch('/agreement', updateLivingAgreement);
stayRouter.get('/expenses', getSharedExpenses);
stayRouter.post('/expenses', createSharedExpense);
stayRouter.post('/safety/report', submitSafetyReport);
apiRouter.use('/stay', stayRouter);

// Spatial Live Location Domain (Phase 4)
const spatialRouter = Router();
spatialRouter.get('/live-locations', (_req, res) => {
  const activeLocations = LiveLocationService.getActiveLocations();
  res.status(200).json({
    success: true,
    data: activeLocations,
    count: activeLocations.length,
    timestamp: new Date().toISOString(),
  });
});
apiRouter.use('/spatial', spatialRouter);

// Health check endpoint
apiRouter.get('/health', (_req, res) => {
  const dbStateMap: Record<number, string> = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting',
  };
  const dbState = mongoose.connection.readyState;
  const dbStatus = dbStateMap[dbState] || 'unknown';
  const isDbConnected = dbState === 1;

  res.status(isDbConnected ? 200 : 503).json({
    status: isDbConnected ? 'healthy' : 'degraded',
    server: 'running',
    database: {
      status: dbStatus,
      connected: isDbConnected,
    },
    timestamp: new Date().toISOString(),
  });
});

export default apiRouter;
