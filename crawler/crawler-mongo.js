
//crawler함수
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
const Restaurant = require('../backend/models/Restaurant');

// MongoDB 연결 설정
mongoose.connect(
  process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
  seedData();
}).catch(err => {
  console.error('Error connecting to MongoDB:', err);
});



const seedData = () => {
  const filePath = path.join(__dirname, 'restaurant.json');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading JSON file:', err);
      return;
    }
    const restaurants = JSON.parse(data);

    Restaurant.insertMany(restaurants)
      .then(() => {
        console.log('Data inserted successfully');
        mongoose.disconnect();  // 완료 후 MongoDB 연결 종료
      })
      .catch(error => {
        console.error('Error inserting data:', error);
        mongoose.disconnect();  // 오류 발생 시 MongoDB 연결 종료
      });
  });
};