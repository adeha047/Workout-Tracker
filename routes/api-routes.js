const router = require("express").Router();
const db = require("../models");

//api route to get all added info from collection in mongoDB
router.post("/api/workouts", ({ body }, res) => {
  db.Workout.create(body)
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});
//this request takes in the total duration and adds it to the data field. 
router.get("/api/workouts", (req, res) => {
  db.Workout.aggregate(
    [
      {
        $addFields: {
          totalDuration: { $sum: "$exercises.duration" }
        }
      }
    ]).then(dbWorkout => {
      // console.log(JSON.stringify(dbWorkout, null, 2));
      // console.log(dbWorkout);
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.put("/api/workouts/:id", (req, res) => {
  db.Workout.findOneAndUpdate({ _id: req.params.id }, { $push: { exercises: req.body } })
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});

router.get("/api/workouts/range", (req, res) => {
db.Workout.aggregate(
  [
    {
      $addFields: {
        totalDuration: { $sum: "$exercises.duration" }
      }
    }
  ]).then(dbWorkout => {
    // console.log(JSON.stringify(dbWorkout, null, 2));
    // console.log(dbWorkout);
    res.json(dbWorkout);
  })
  .catch(err => {
    res.status(400).json(err);
  });
})

module.exports = router;

  // I want to be able to log multiple exercises in a workout on a given day. I should also be able to track the name, type, weight, sets, reps, and duration of exercise. If the exercise is a cardio exercise, I should be able to track my distance traveled.