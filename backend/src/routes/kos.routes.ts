import { Router } from 'express';
import { createKos, getOwnerKos, deleteKos, updateKos, searchKos, getKosDetail, getOwnerReviews, getOwnerStats } from '../controllers/kos.controller';
import { requireAuth, requireRole, requireVerified } from '../middlewares/auth.middleware';
import { upload } from '../middlewares/upload.middleware';

const router = Router();

// Endpoint Publik
router.get('/search', searchKos);

// Endpoint untuk memuat daftar kos milik owner (GET /api/kos/owner)
// Tetap biarkan tanpa requireVerified agar Owner bisa melihat dasbor kosong
router.get('/owner', requireAuth, requireRole(['OWNER']), getOwnerKos);

router.get('/owner/stats', requireAuth, requireRole(['OWNER']), getOwnerStats);

router.get('/owner/reviews', requireAuth, requireRole(['OWNER']), getOwnerReviews);

router.get('/:id', getKosDetail);

// Endpoint untuk menambahkan kos baru (POST /api/kos)
router.post('/', requireAuth, requireRole(['OWNER']), requireVerified, upload.array('images', 5), createKos);

// Endpoint untuk mengedit kos (PUT /api/kos/:id)
router.put('/:id', requireAuth, requireRole(['OWNER']), requireVerified, updateKos);

// Endpoint untuk menghapus kos (DELETE /api/kos/:id)
router.delete('/:id', requireAuth, requireRole(['OWNER']), requireVerified, deleteKos);

export default router;
