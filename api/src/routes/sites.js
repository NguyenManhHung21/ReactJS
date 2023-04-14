const express = require("express");
const router = express.Router();
const sitesController = require("../app/controllers/SitesController");

router.get("/check-email/:email", sitesController.validationEmailRegis);

//mỗi lần reload lại browser app sẽ dùng GET gửi đến cookie 1 yêu cầu để lấy về mã token mà mình đã đăng ký ở phần đăng nhập
router.get("/profile", sitesController.homePage);

router.post("/logout", sitesController.logout);

router.get("/user-places", sitesController.getPlaceOfUser);


module.exports = router;
