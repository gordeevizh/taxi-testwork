let { cars: { marks, models, colors, names, abc } } = require('./constants')

function generateCar() {
  return {
    crew_id: getRandom(1000),
    car_mark: marks[getRandom(3)],
    car_model: models[getRandom(3)],
    car_color: colors[getRandom(3)],
    car_number: getCarNumber(),
    driver_name: names[getRandom(3)],
    driver_phone:getRandom(1000, 9999),
    lat: parseFloat(`${getRandom(100)}.${getRandom(100000, 999999)}`),
    lon: parseFloat(`${getRandom(100)}.${getRandom(100000, 999999)}`),
    distance: getRandom(1000)
  }
}

function getCarNumber() {
  return `${abc[getRandom(abc.length-1)]}${getRandom(9)}${getRandom(9)}${getRandom(9)}${abc[getRandom(abc.length-1)]}${abc[getRandom(abc.length-1)]}`;
}

function getCrewsInfo() {
  const count = getRandom(1, 10);
  const crewsInfo = [];

  for (let i = 0; i < count; i += 1 ) {
    crewsInfo.push(
      generateCar()
    );
  }
  
  return crewsInfo;
}

function getRandom(max, min = 0) {
  return Math.floor(min + Math.random() * (max + 1 - min));
}

const carSearch = (address = '') => {
  return {
    code: 0,
    descr: 'OK',
    data: {
      crews_info: getCrewsInfo(),
    }
  };
}

module.exports.carSearch = carSearch;

