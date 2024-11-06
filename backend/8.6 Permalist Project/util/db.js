import { Sequelize } from 'sequelize'
import { SequelizeStorage, Umzug } from 'umzug'

export const sequelize = new Sequelize('postgres://postgres@localhost:5432/permalist')

const options = {
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize }),
  logger: console,
}

export const migrator = new Umzug({
  migrations: { glob: 'migrations/*.js' },
  ...options,
})

export const seeder = new Umzug({
  migrations: { glob: 'seeders/*.js' },
  ...options,
})

async function runMigrations() {
  const migrations = await migrator.up()
  console.log('Migrations up to date', {
    files: migrations.map(m => m.name),
  })
}

export async function connectToDatabase() {
  try {
    await sequelize.authenticate()
    await runMigrations()
    console.log('Connection has been established successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}

export async function rollbackMigration() {
  await sequelize.authenticate()
  await migrator.down()
}
