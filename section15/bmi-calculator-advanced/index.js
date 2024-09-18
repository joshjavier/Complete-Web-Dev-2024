function bmiCalculator (weight, height) {
  const bmi = weight / Math.pow(height, 2);

  let interpretation;

  if (bmi >= 35)
      interpretation = 'you are extremely obese';
  else if (bmi >= 30 )
      interpretation = 'you are obese';
  else if (bmi >= 25)
      interpretation = 'you are overweight';
  else if (bmi >= 18.5)
      interpretation = 'you have a normal weight';
  else if (bmi > 0)
      interpretation = 'you are underweight';

  interpretation = `Your BMI is ${bmi}, so ${interpretation}.`;

  return interpretation;
}
