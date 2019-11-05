let { cars: { marks, models, colors, names, abc } } = require('./constants')

function generateCar() {
  return {
    crew_id: getRandom(0, 1000),
    car_mark: marks[getRandom(0, 3)],
    car_model: models[getRandom(0, 3)],
    car_color: colors[getRandom(0, 3)],
    car_number: getCarNumber(),
    driver_name: names[getRandom(0, 3)],
    driver_phone:getRandom(1000, 9999),
    lat: parseFloat(`${getRandom(0, 100)}.${getRandom(100000, 999999)}`),
    lon: parseFloat(`${getRandom(0, 100)}.${getRandom(100000, 999999)}`),
    distance: getRandom(0, 1000)
  }
}

function getCarNumber() {
  const ABC1 = abc[getRandom(0, abc.length-1)];
  const N1 = getRandom(0, 9);
  const N2 = getRandom(0, 9);
  const N3 = getRandom(0, 9);
  const ABC2 = abc[getRandom(0, abc.length-1)];
  const ABC3 = abc[getRandom(0, abc.length-1)];

  return `${ABC1}${N1}${N2}${N3}${ABC2}${ABC3}`;
}

function getCrewsInfo() {
  const count = getRandom(1, 6);
  const crewsInfo = [];

  for (let i = 0; i < count; i += 1 ) {
    crewsInfo.push(
      generateCar()
    );
  }
  
  return crewsInfo;
}

function getRandom(min, max) {
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

const createOrder = () => {
  return {
    code: 0,
    descr: 'OK',
    data: {
      order_id: getRandom(10000, 99999),
    }
  };
}

module.exports.carSearch = carSearch;
module.exports.createOrder = createOrder;

