import React, { useEffect, useState } from 'react';
import MapLegend from '../MapLegend';
import { IMapProps } from './Map.types';

import './Map.styles.pcss';
import { MAP_BOUND_IZHEVSK, MAP_CENTER_IZHEVSK } from '../../constants/map';

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
          center: MAP_CENTER_IZHEVSK,
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

    window.ymaps.geocode('Россия, Удмуртская Республика, Ижевск, улица Кирова, 106', {
        /**
         * Опции запроса
         * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/geocode.xml
         */
        // Сортировка результатов от центра окна карты.
        boundedBy: MAP_BOUND_IZHEVSK,
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