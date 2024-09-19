const solveButton = document.querySelector('.button')

// Add event listener to the button
solveButton.addEventListener('click', () => {
  // Get all the input values
  const inputs = document.querySelectorAll('.number-input')
  const values = Array.from(inputs).map((input) => Number(input.value))

  // Log the values to the console
  console.log('Input values:', values)
})
