const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({ 

    day: {
        type: Date,
        default:() => new Date()
      },
      notes: [
        {
          type: Schema.Types.ObjectId,
          ref: "Note"
        }
      ]



})

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;
