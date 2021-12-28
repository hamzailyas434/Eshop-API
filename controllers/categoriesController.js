const Categories = require("../models/categoriesModel");

exports.createCategory = async (req, res) => {
  try {
    const addCategory = await Categories.create(req.body);
    res.status(200).json({
      status: "Success",
      data: {
        addCategory,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "Fail",
      message: err,
    });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const category = await Categories.findByIdAndRemove(req.params.id);
    res.status(204).json({
      status: "success",
      data: {
        category,
        message: "Category is deleted",
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: "Invalid Data !",
    });
  }
};

exports.getAllCategories = async (req, res) => {
  try {
    const categoryList = await Categories.find();
    res.status(200).json({
      status: "Success",
      results: categoryList.length,
      data: {
        categoryList,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "Fail",
      message: err,
    });
  }
};

exports.getCategory = async (req, res) => {
  try {
    const category = await Categories.findById(req.params.id);

    res.status(200).json({
      status: "success",
      data: {
        category,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "Fail",
      message: err,
    });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const updateCategory = await Categories.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        // runValidators: true,
      }
    );
    res.status(200).json({
      status: "success",
      data: {
        updateCategory,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: "Invalid Data Not Updated!",
    });
  }
};
