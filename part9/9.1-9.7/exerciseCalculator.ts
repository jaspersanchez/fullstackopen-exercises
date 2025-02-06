interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

interface exerciseValues {
  targetAmount: number,
  dailyHours: number[]
}

export const calculateExercise = ( target_amount: number, daily_hours: number[]): Result => {
  const periodLength = daily_hours.length;
  const trainingDays = daily_hours.filter(hours => hours != 0).length;
  const target = target_amount;
  const average = daily_hours.reduce((total, num) => total + num) / periodLength;
  const success = average >= target;
  
  let rating: number;
  let ratingDescription: string;

  if (average >= target ) {
    rating = 3;    
    ratingDescription = 'superb! training average is above target.';
  } else if (average >= target * 0.75 ) {
    rating = 2;
    ratingDescription = 'not too bad but could be better.';
  } else {
    rating = 1;
    ratingDescription = 'push harder!';
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

const parseExerciseArguments = (args: string[]): exerciseValues => {
  if (args.length < 4) throw new Error('Number of arguments is invalid.');
 
  if (isNaN(Number(args[2])) || [...args.slice(3)].some(item => isNaN(Number(item)))) {
   throw new Error('Input should be of type number.');
  }
  
  return {
    targetAmount: Number(args[2]),
    dailyHours: [...args.slice(3)].map(item => Number(item))
  };
};

if (require.main === module) {
  try {
   const {targetAmount, dailyHours} = parseExerciseArguments(process.argv);
   
   const exerciseResult = calculateExercise(targetAmount, dailyHours);
   console.log(exerciseResult);
  } catch (error: unknown) {
   let errorMessage = 'Something went wrong: ';
   
   if (error instanceof Error) {
     errorMessage += error.message;
   }
   console.log(errorMessage);
  }
}