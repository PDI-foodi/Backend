//네이버로 메뉴 크롤링 하는 js

const axios = require('axios');
const fs = require('fs');

const baseUrl = 'https://map.naver.com/p/api/search/allSearch?query=';
const rest = ["제주국수", "르프리크", "풍조미역", "오한수 우육면가", "전통씨래기국밥", "팔각도", "맛닭꼬", "보끔당", "수육국밥 담미온", "산들김밥", "삼선회사랑", "롯데리아", "달래해장", "시골가마솥삼겹살", "조조칼국수", "교대 이층집", "박가객주", "성수갈비", "칼 성수점", "호랑이분식", "시골가마솥삼겹살", "풍년식당", "도죠", "엉터리생고기", "행운식당", "돼지노을", "명가닭한마리", "란칼국수", "대림국수", "까망", "호랑이초밥", "나이스두잉", "토끼와거북전", "멘츠루", "진도부대찌개", "홍콩반점", "하오마라", "해밀칼국수&김밥", "멘야마쯔리", "코끼리베이글", "핵밥", "서산식당", "텐동식당", "탕화쿵푸", "또와식당", "타논55", "나이스두잉", "성수 정찬", "유성돌솥찌개마을", "기소야", "그린한식뷔페", "밥풀러스", "어묵나라"];

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
  fs.writeFile('restaurant.json', JSON.stringify(jsonData, null, 2), (err) => {
    if (err) {
      console.error('Error writing JSON file:', err);
    } else {
      console.log('JSON file has been saved.');
    }
  });
}

fetchAllData();
