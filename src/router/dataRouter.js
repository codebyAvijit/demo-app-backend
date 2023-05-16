const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../schema/data");

//API CALL TO CREATE DATA
router.post("/create", async (req, res) => {
  try {
    const { password, Cpassword, ...data } = req.body;
    const securePass = await bcrypt.hash(password, 12);
    const upload = new User({
      ...data,
      password: securePass,
      Cpassword: securePass,
    });
    const saveData = await upload.save();
    if (saveData) {
      return res.status(200).send(saveData);
    }
  } catch (err) {
    return res.status(401).send({
      error: "Invalid Credentials",
    });
  }
});

//API CALL TO GET ALL DATA

router.get("/getall", async (req, res) => {
  try {
    const allData = await User.find();
    return res.status(200).send(allData);
  } catch (err) {
    console.log(err);
  }
});

//API CALL TO GET ALL DATA

router.get("/getById/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await User.findById({ _id: id });
    return res.status(200).send(data);
  } catch (err) {
    console.log(err);
  }
});

//API CALL TO UPDATE DATA

router.put("/update/:id", async (req, res) => {
  try {
    const updateData = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    if (updateData) {
      res.status(200).send(updateData);
    }
  } catch (err) {
    console.log(err);
  }
});

//API CALL TO DELETE DATA

router.delete("/remove/:id", async (req, res) => {
  try {
    const delelteData = await User.findByIdAndDelete(req.params.id);
    if (delelteData) {
      res.status(200).json({
        message: "Deleted Successfully",
      });
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
