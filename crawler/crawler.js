//네이버로 메뉴 크롤링 하는 js

const axios = require('axios');
const fs = require('fs');

const baseUrl = 'https://map.naver.com/p/api/search/allSearch?query=';
const rest = ["서브웨이","자연도소금빵","백다방","메가커피","맘모스커피","탐광","어니언","피자시즌","스케줄","투파인드파더","일심정","미각"];

async function fetchData(restaurant) {
  const url = `${baseUrl}${encodeURIComponent(restaurant)}+성수역&type=all&searchCoord=127.054066%3B37.539591&boundary=`;
  try {
    const response = await axios.get(url);
    const list = response.data.result.place.list;
    const topMenuItems = list[0].menuInfo

    
    if (list.length > 0) {
      return {
        "name": list[0].name,
        "category": '',//수기작성
        "menu": topMenuItems,
        "price":'',//수기작성
        "imglink": list[0].thumUrl,
        "location": list[0].roadAddress,
        "phonenumber": list[0].tel,
        "rate":0
      };
    }
  } catch (error) {
    console.error(`Error fetching data for ${restaurant}:`, error);
  }
  return null;
}

async function fetchAllData() {
  const promises = rest.map(fetchData);
  const results = await Promise.all(promises);
  const jsonData = results.filter(result => result !== null);
  
  // JSON 파일로 저장
  fs.writeFile('new.json', JSON.stringify(jsonData, null, 2), (err) => {
    if (err) {
      console.error('Error writing JSON file:', err);
    } else {
      console.log('JSON file has been saved.');
    }
  });
}

fetchAllData();
