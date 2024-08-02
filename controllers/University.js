import UniversityModel from "../models/University.js";

export const createUniversity = async (req, res) => {
  try {
    let univData = await UniversityModel.create({
      name: req.body.name,
      image: req?.file?.filename,
    });
    if (univData) res.status(201).send({ message: "University Created" });
    else res.status(404).send({ message: "Unable to create University" });
  } catch (e) {
    res.status(404).send({ error: e?.message });
  }
};

export const updateUniversity = async (req, res) => {
  try {
    let univData = await UniversityModel.findByIdAndUpdate(
      { _id: req.body.id },
      {
        name: req.body.name,
        image: req?.file?.filename,
      }
    );
    if (univData) res.status(200).send({ message: "University Updated" });
    else res.status(404).send({ message: "Unable to update University" });
  } catch (e) {
    res.status(404).send({ error: e?.message });
  }
};

export const deleteUniversity = async (req, res) => {
  try {
    let univData = await UniversityModel.deleteOne({ _id: req.body.id });
    if (univData.deletedCount == 1)
      res.status(200).send({ message: "University Deleted" });
    else res.status(404).send({ message: "Unable to delete University" });
  } catch (e) {
    res.status(404).send({ error: e?.message });
  }
};

export const getUniversities = async (req, res) => {
  try {
    let univData = await UniversityModel.find();
    res.status(200).send({ univData });
  } catch (e) {
    res.status(404).send({ error: e?.message });
  }
};
