const BloodInventory = require(
  "../models/BloodInventory"
);

exports.getInventory = async (
  req,
  res
) => {
  try {
    const inventory =
      await BloodInventory.find();

    res.json(inventory);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.addInventory = async (
  req,
  res
) => {
  try {
    const inventory =
      await BloodInventory.create(
        req.body
      );

    res.status(201).json(inventory);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.updateInventory = async (
  req,
  res
) => {
  try {
    const inventory =
      await BloodInventory.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );

    res.json(inventory);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.deleteInventory = async (
  req,
  res
) => {
  try {
    await BloodInventory.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message:
        "Inventory Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
