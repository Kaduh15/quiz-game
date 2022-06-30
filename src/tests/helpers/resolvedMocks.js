export const mockSucess = {
  response_code: 0,
    results: [{
      category: "History",
      correct_answer: "False",
      difficulty: "medium",
      incorrect_answers: ['True'],
      question: "The two atomic bombs dropped on Japan by the United States in August 1945 were named &#039;Little Man&#039; and &#039;Fat Boy&#039;.",
      type: "boolean"
      },
    {
      category: "Entertainment: Video Games",
      correct_answer: "True",
      difficulty: "medium",
      incorrect_answers: ['False'],
      question: "In Rocket League, you can play Basketball.",
      type: "boolean"
    },
    {
      category: "Science & Nature",
      correct_answer: "Sn",
      difficulty: "medium",
      incorrect_answers:  ['Ti', 'Ni', 'Na'],
      question: "On the periodic table of elements, what is the symbol for Tin?",
      type: "multiple",
    },
    {
      category: "Entertainment: Music",
      correct_answer: "1880",
      difficulty: "medium",
      incorrect_answers:['1812', '1790', '1840'],
      question: "In what year was Tchaikovsky&#039;s 1812 Overture composed?",
      type: "multiple",
    },
    {
      category: "Entertainment: Books",
      correct_answer: "False",
      difficulty: "easy",
      incorrect_answers: ['True'],
      question: "Shub-Niggurath is a creature that was created by \tJ. R. R. Tolkien in his novel &quot;The Lord of The Rings&quot;.",
      type: "boolean",
    }
  ]
}

export const mockFail = {
  response_code: 0,
  results: []
}
