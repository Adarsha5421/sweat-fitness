// Calculate daily calorie needs
exports.calculateCalories = (req, res) => {
  const { weight, height, age, gender, activityLevel } = req.query;

  if (!weight || !height || !age || !gender || !activityLevel) {
    return res.status(400).json({ error: "Missing required parameters" });
  }

  let bmr;
  if (gender === "male") {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  }

  const activityMultipliers = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    very_active: 1.9,
  };

  const calorieNeeds = bmr * (activityMultipliers[activityLevel] || 1.2);
  res.json({ caloriesNeeded: Math.round(calorieNeeds) });
};

// Calculate macro needs
exports.calculateMacros = (req, res) => {
  const { weight, goal } = req.query;

  if (!weight || !goal) {
    return res.status(400).json({ error: "Missing required parameters" });
  }

  let macros;
  if (goal === "bulk") {
    macros = { protein: weight * 2.2, carbs: weight * 3, fats: weight * 1 };
  } else if (goal === "cut") {
    macros = { protein: weight * 2.5, carbs: weight * 2, fats: weight * 0.8 };
  } else {
    macros = { protein: weight * 2, carbs: weight * 2.5, fats: weight * 0.9 };
  }

  res.json({ macros });
};

// Calculate One-Rep Max
exports.calculateOneRepMax = (req, res) => {
  const { weight, reps } = req.query;

  if (!weight || !reps) {
    return res.status(400).json({ error: "Missing required parameters" });
  }

  const oneRepMax = weight * (1 + reps / 30);
  res.json({ oneRepMax: Math.round(oneRepMax) });
};
