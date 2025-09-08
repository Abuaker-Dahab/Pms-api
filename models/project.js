const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require('joi-objectid')(Joi);
const { taskSchema } = require("./task");

const Schema = mongoose.Schema;

const projectSchema = new Schema(
  {
    title: { type: String, required: true },
    status: { type: String, trim: true },
    projectManager: { type: Schema.Types.ObjectId, ref: "User" },
    projectTeam: [{ type: Schema.Types.ObjectId, ref: "User" }],
    description: { type: String },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    releaseDate: {
      type: Date,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    projectTasks: [
       { type: Schema.Types.ObjectId, ref: "Task" },
      ],
      default: [],
  },
  { timestamps: true }
);

projectSchema.pre("remove", function (next) {
  taskSchema.remove({ projectId: this._id }).exec();
  next();
});

function validateProject(project) {
  const schema = Joi.object({
    status: Joi.string(),
    startDate: Joi.date(),
    endDate: Joi.date(),
    projectManager: Joi.objectId(),
    releaseDate: Joi.date(),
    title: Joi.string().min(5).max(50).required(),
    description: Joi.string().min(5).max(50),
    projectTeam: Joi.array().items(Joi.string()),
  });

  return schema.validate(project);
}

function validateUpdateProject(project) {
  const schema = Joi.object({
    status: Joi.string(),
    startDate: Joi.date(),
    endDate: Joi.date(),
    projectManager: Joi.objectId(),
    releaseDate: Joi.date(),
    title: Joi.string().min(5).max(50),
    description: Joi.string().min(5).max(50),
    projectTeam: Joi.array().items(Joi.string()),
  });

  return schema.validate(project);
}

module.exports.Project = mongoose.model("Project", projectSchema);
module.exports.projectSchema = projectSchema;
exports.validateUpdateProject = validateUpdateProject;
exports.validateProject = validateProject;
