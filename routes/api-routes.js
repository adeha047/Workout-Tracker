const router = require("express").Router();
const db = require("../models");

// router.get("/api/workouts", (req, res) => {
//   db.Workout.find({}).then(dbWorkout => {
//     res.json(dbWorkout);

//   })
//     .catch(err => {
//       res.status(400).json(err);
//     });
// });

router.post("/api/workouts", ({ body }, res) => {
  db.Workout.create(body)
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.get("/api/workouts", (req, res) => {
  db.Workout.aggregate(
    [
      {
        $addFields: {
          totalduration: { $sum: "$duration" }
        }
      }
    ]).then(dbWorkout => {
      console.log(JSON.stringify(dbWorkout, null, 2));
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

module.exports = router;

  // I want to be able to log multiple exercises in a workout on a given day. I should also be able to track the name, type, weight, sets, reps, and duration of exercise. If the exercise is a cardio exercise, I should be able to track my distance traveled.