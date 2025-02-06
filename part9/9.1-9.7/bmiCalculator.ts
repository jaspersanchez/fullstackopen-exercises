interface bmiValues {
  height: number;
  weight: number;  
}

export const calculateBmi = (heightCm: number, weightKg: number): string => {
  const heightM = heightCm / 100
  const bmi = weightKg / heightM ** 2

  if (bmi >= 30) {
    return 'Obese'
  } else if (bmi >= 25) {
    return 'Overweight'
  } else if (bmi >= 18.5) {
    return 'Normal weight'
  } else {
    return 'Underweight'
  }
}

const parseBmiArguments = (args: string[]): bmiValues => {
  if (args.length !== 4) throw new Error('Number of arguments is invalid.')
  if (isNaN(Number(args[2])) || isNaN(Number(args[2]))) throw new Error('Arguments should be of type number.')
  
  return {
    height: Number(args[2]),
    weight: Number(args[3]),
  }
}

if (require.main === module) {
  try {
   const { height, weight } = parseBmiArguments(process.argv) 
   const bmi = calculateBmi(height, weight)

   console.log(bmi)
  } catch (error: unknown) {
   let errorMessage = 'Something went wrong: ' 
   
   if (error instanceof Error) {
     errorMessage += error.message
   }
   console.log(errorMessage)
  }
} 