const express = require('express');

const testRoutes = require('./server/test/test.route');
const puzzleRoutes = require('./server/puzzle/puzzle.route');
// const userRoutes = require('./server/user/user.route');
// const authRoutes = require('./server/auth/auth.route');
// const shopRoutes = require('./server/shop/shop.route');
// const goodsRoutes = require('./server/goods/goods.route');
// const searchRoutes = require('./server/search/search.route');
// const AddressRoutes = require('./server/address/address.route');
// const imgRoutes = require('./server/img/img.route');
const router = express.Router();

router.use('/test', testRoutes);
router.use('/puzzle', puzzleRoutes);
// router.use('/user', userRoutes);
// router.use('/auth', authRoutes);
// router.use('/shop', shopRoutes);
// router.use('/goods', goodsRoutes);
// router.use('/search', searchRoutes);
// router.use('/address', AddressRoutes);
// router.use('/img', imgRoutes);

module.exports = router;
