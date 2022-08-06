const { Sequelize, DataTypes } = require('sequelize')

// ORM 식 접근
async function main() {
  const sequelize = new Sequelize({
    database: 'fc21',
    username: 'myuser',
    password: 'mypass',
    dialect: 'postgres',
    host: 'localhost',
  })

  const User = sequelize.define(
    'user',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    },
  )

  const City = sequelize.define('city', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    timestamps: false,
  })

  User.belongsTo(City) // 연관 관계 설정 (cityId 추가). many to one

  sequelize.sync({
    force: true, //항상 테이블을 떨구고 다시 만듬 (테스트용도!)
    alter: true, //싱크를 항상 맞춤 (스키마상 변화 적용)
  }) //동기화 필수


  const newCity = await City.build({
    name: 'Seoul'
  }).save()

  const newUser = User.build({
    name: 'Coco',
    age: 20, 
    cityId: newCity.getDataValue('id')
  })
  //INSERT
  await newUser.save()


  await sequelize.authenticate()
  await sequelize.close()
}

main()
