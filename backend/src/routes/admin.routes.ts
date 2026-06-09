import { Router } from 'express';
import { 
  getDashboardStats, 
  getPendingOwners, 
  verifyOwner,
  getUsers,
  getKos,
  getFacilities,
  addFacility,
  deleteFacility,
  getReviews,
  getSavedKos
} from '../controllers/admin.controller';
import { requireAuth, requireRole } from '../middlewares/auth.middleware';

const router = Router();

// Semua rute admin butuh auth dan role ADMIN
router.use(requireAuth);
router.use(requireRole(['ADMIN']));

router.get('/stats', getDashboardStats);
router.get('/pending-owners', getPendingOwners);
router.put('/verify-owner/:id', verifyOwner);

router.get('/users', getUsers);
router.get('/kos', getKos);
router.get('/facilities', getFacilities);
router.post('/facilities', addFacility);
router.delete('/facilities/:id', deleteFacility);
router.get('/reviews', getReviews);
router.get('/saved-kos', getSavedKos);

export default router;
