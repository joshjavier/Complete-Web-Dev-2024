export const up = async ({ context: queryInterface }) => {
  await queryInterface.bulkInsert('todos', [
    {
      title: 'Buy milk',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      title: 'Finish homework',
      created_at: new Date(),
      updated_at: new Date(),
    },
  ])
}

export const down = async ({ context: queryInterface }) => {
  await queryInterface.bulkDelete('todos', null, {})
}
