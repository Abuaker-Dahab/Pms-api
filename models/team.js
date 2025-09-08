const mongoose = require("mongoose");
const Joi = require("joi");

const Schema = mongoose.Schema;

const teamSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    tools: {type: String},
    teamMembers: [ {type: Schema.Types.ObjectId, ref: "User"} ],
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

function validateTeam(team) {
  const schema = Joi.object({
    title: Joi.string().required(),
  });

  return schema.validate(team);
}
function validateUpdateTeam(team) {
  const schema = Joi.object({
    title: Joi.string(),
    teamMembers: Joi.array().items(Joi.string()),
  });

  return schema.validate(team);
}

module.exports.Team = mongoose.model("Team", teamSchema);
module.exports.validateTeam = validateTeam;
module.exports.validateUpdateTeam = validateUpdateTeam;
module.exports.teamSchema = teamSchema;
