import DepartmentModel from "../models/Department.js";

export const createDepartment = async (req, res) => {
  try {
    let depData = await DepartmentModel.create({
      name: req.body.name,
      image: req?.file?.filename,
      university: req.body.universityId,
    });
    if (depData) res.status(201).send({ message: "Department Created" });
    else res.status(404).send({ message: "Unable to create Department " });
  } catch (e) {
    res.status(404).send({ error: e?.message });
  }
};
export const updateDepartment = async (req, res) => {
  try {
    let depData = await DepartmentModel.findByIdAndUpdate(
      { _id: req.body.id },
      {
        name: req.body.name,
        image: req?.file?.filename,
        university: req.body.universityId,
      }
    );
    if (depData) res.status(200).send({ message: "Department Updated" });
    else res.status(404).send({ message: "Unable to update Department " });
  } catch (e) {
    res.status(404).send({ error: e?.message });
  }
};
export const deleteDepartment = async (req, res) => {
  try {
    let depData = await DepartmentModel.deleteOne({
      _id: req.body.id,
    });
    if (depData.deletedCount == 1)
      res.status(200).send({ message: "Department Deleted" });
    else res.status(404).send({ message: "Unable to delete Department " });
  } catch (e) {
    res.status(404).send({ error: e?.message });
  }
};

export const getDepartmentsByUniversityId = async (req, res) => {
  try {
    let depData = await DepartmentModel.find({
      university: req.query.universityId,
    }).populate("university");
    res.status(200).send({ depData });
  } catch (e) {
    res.status(404).send({ error: e?.message });
  }
};


