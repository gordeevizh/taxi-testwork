import React, { useEffect, useState } from 'react';
import MapLegend from '../MapLegend';
import { IMapProps } from './Map.types';

import './Map.styles.pcss';

const cn = 'map'

const Map: React.FunctionComponent<IMapProps> = (props: IMapProps) => {

  const [ymap, setYmap] = useState(null);
  const [placemark, setPlacemark] = useState(null);

  useEffect(() => {
    window.ymaps.ready(initYMap);

    return removeYMap();
  }, [window.ymaps])


  const initYMap = () => {
    if (!ymap) {
      const ymap = new window.ymaps.Map('map', {
          center: [55.010251, 82.958437],
          zoom: 16
      });

      let placemark = null;
      // Слушаем клик на карте.
      ymap.events.add('click', function (e) {
          var coords = e.get('coords');

          // Если метка уже создана – просто передвигаем ее.
          if (placemark) {
            placemark.geometry.setCoordinates(coords);
          }
          // Если нет – создаем.
          else {
              placemark = createPlacemark(coords);
              ymap.geoObjects.add(placemark);
              // Слушаем событие окончания перетаскивания на метке.
              placemark.events.add('dragend', function () {
                  getAddress(placemark.geometry.getCoordinates());
              });
          }
          getAddress(coords);
      });

      // Создание метки.
      const createPlacemark = (coords) => {
          return new window.ymaps.Placemark(coords, {
              iconCaption: 'поиск...'
          }, {
              preset: 'islands#violetDotIconWithCaption',
              draggable: true
          });
      }

      // Определяем адрес по координатам (обратное геокодирование).
      const getAddress = (coords) => {
          placemark.properties.set('iconCaption', 'поиск...');
          window.ymaps.geocode(coords).then(function (res) {
              var firstGeoObject = res.geoObjects.get(0);

              placemark.properties
                  .set({
                      // Формируем строку с данными об объекте.
                      iconCaption: [
                        firstGeoObject.getPremiseNumber() ? firstGeoObject.getThoroughfare() : 'Адрес не найден',
                        firstGeoObject.getPremiseNumber()
                      ].filter(Boolean).join(', '),
                      // В качестве контента балуна задаем строку с адресом объекта.
                      balloonContent: firstGeoObject.getAddressLine()
                  });
          });
      };

      // Поиск координат центра Нижнего Новгорода.
    window.ymaps.geocode('Нижний Новгород', {
        /**
         * Опции запроса
         * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/geocode.xml
         */
        // Сортировка результатов от центра окна карты.
        // boundedBy: myMap.getBounds(),
        // strictBounds: true,
        // Вместе с опцией boundedBy будет искать строго внутри области, указанной в boundedBy.
        // Если нужен только один результат, экономим трафик пользователей.
        results: 1
    }).then(function (res) {
        // Выбираем первый результат геокодирования.
        var firstGeoObject = res.geoObjects.get(0),
            // Координаты геообъекта.
            coords = firstGeoObject.geometry.getCoordinates(),
            // Область видимости геообъекта.
            bounds = firstGeoObject.properties.get('boundedBy');

        firstGeoObject.options.set('preset', 'islands#darkBlueDotIconWithCaption');
        // Получаем строку с адресом и выводим в иконке геообъекта.
        firstGeoObject.properties.set('iconCaption', firstGeoObject.getAddressLine());

        // Добавляем первый найденный геообъект на карту.
        ymap.geoObjects.add(firstGeoObject);
        // Масштабируем карту на область видимости геообъекта.
        ymap.setBounds(bounds, {
            // Проверяем наличие тайлов на данном масштабе.
            checkZoomRange: true
        });

        /**
         * Все данные в виде javascript-объекта.
         */
        console.log('Все данные геообъекта: ', firstGeoObject.properties.getAll());
        /**
         * Метаданные запроса и ответа геокодера.
         * @see https://api.yandex.ru/maps/doc/geocoder/desc/reference/GeocoderResponseMetaData.xml
         */
        console.log('Метаданные ответа геокодера: ', res.metaData);
        /**
         * Метаданные геокодера, возвращаемые для найденного объекта.
         * @see https://api.yandex.ru/maps/doc/geocoder/desc/reference/GeocoderMetaData.xml
         */
        console.log('Метаданные геокодера: ', firstGeoObject.properties.get('metaDataProperty.GeocoderMetaData'));
        /**
         * Точность ответа (precision) возвращается только для домов.
         * @see https://api.yandex.ru/maps/doc/geocoder/desc/reference/precision.xml
         */
        console.log('precision', firstGeoObject.properties.get('metaDataProperty.GeocoderMetaData.precision'));
        /**
         * Тип найденного объекта (kind).
         * @see https://api.yandex.ru/maps/doc/geocoder/desc/reference/kind.xml
         */
        console.log('Тип геообъекта: %s', firstGeoObject.properties.get('metaDataProperty.GeocoderMetaData.kind'));
        console.log('Название объекта: %s', firstGeoObject.properties.get('name'));
        console.log('Описание объекта: %s', firstGeoObject.properties.get('description'));
        console.log('Полное описание объекта: %s', firstGeoObject.properties.get('text'));
        /**
        * Прямые методы для работы с результатами геокодирования.
        * @see https://tech.yandex.ru/maps/doc/jsapi/2.1/ref/reference/GeocodeResult-docpage/#getAddressLine
        */
        /**
         * Если нужно добавить по найденным геокодером координатам метку со своими стилями и контентом балуна, создаем новую метку по координатам найденной и добавляем ее на карту вместо найденной.
         */
         var myPlacemark = new window.ymaps.Placemark(coords, {
         iconContent: 'моя метка',
          balloonContent: 'Содержимое балуна <strong>моей метки</strong>'
          }, {
          preset: 'islands#violetStretchyIcon'
          });

          ymap.geoObjects.add(myPlacemark);
      });

      setYmap(ymap);
      setPlacemark(placemark);
    }
  }

  const removeYMap = () => {
    ymap && ymap.destroy();
  }

  return (
    <section className={ cn }>
      <div className={ `${cn}__yamap`} id='map' >

      </div>
      <MapLegend />
    </section>
  );
}

export default Map;