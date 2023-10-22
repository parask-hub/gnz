const express = require("express");
const router = express.Router();
const tutorController = require("../controllers/tutorController");

router.post("/", tutorController.createAccount);
router.get("/tutorget", tutorController.getAccounts);
router.put("/tutoredit/:id", tutorController.editTutor);
router.delete("/tutordelete/:id", tutorController.deleteTutor);
router.get("/tutorget/:tutorId", tutorController.getAccountById);

module.exports = router;
