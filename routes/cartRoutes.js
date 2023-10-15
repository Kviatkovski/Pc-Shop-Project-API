const express = require('express');
const {
  validateToken,
  validateTokenAndAdmin,
} = require('../middleware/validateTokenHandler');
const {
  getCarts,
  createCart,
  getUserCart,
  updateCart,
  deleteCart,
} = require('../controllers/cartController');

const router = express.Router();

router.use(validateToken);

//? add validateTokenAndAdmin later
router.route('/').get(getCarts).post(createCart);

router.route('/find/:userId').get(getUserCart);

router.route('/:id').put(updateCart).delete(deleteCart);

module.exports = router;
