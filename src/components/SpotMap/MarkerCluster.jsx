import { useState, useEffect } from 'react';
import { Overlay, useMap, useNavermaps } from "react-naver-maps";
import { makeMarkerClustering } from '../../functions/common/MarkerClustering';

const MarkerCluster = ({markers, markerInfo}) => {
  
  const navermaps = useNavermaps();
  const map = useMap();

  const MarkerClustering = makeMarkerClustering(window.naver);

  const htmlMarker1 = {
    content:
      '<div style="cursor:pointer;width:40px;height:40px;line-height:42px;font-size:10px;color:white;text-align:center;font-weight:bold;background:url(https://navermaps.github.io/maps.js.ncp/docs/img/cluster-marker-1.png);background-size:contain;"></div>',
    size: navermaps.Size(40, 40),
    anchor: navermaps.Point(20, 20),
  }
  const htmlMarker2 = {
    content:
      '<div style="cursor:pointer;width:40px;height:40px;line-height:42px;font-size:10px;color:white;text-align:center;font-weight:bold;background:url(https://navermaps.github.io/maps.js.ncp/docs/img/cluster-marker-2.png);background-size:contain;"></div>',
    size: navermaps.Size(40, 40),
    anchor: navermaps.Point(20, 20),
  }
  const htmlMarker3 = {
    content:
      '<div style="cursor:pointer;width:40px;height:40px;line-height:42px;font-size:10px;color:white;text-align:center;font-weight:bold;background:url(https://navermaps.github.io/maps.js.ncp/docs/img/cluster-marker-3.png);background-size:contain;"></div>',
    size: navermaps.Size(40, 40),
    anchor: navermaps.Point(20, 20),
  }
  const htmlMarker4 = {
    content:
      '<div style="cursor:pointer;width:40px;height:40px;line-height:42px;font-size:10px;color:white;text-align:center;font-weight:bold;background:url(https://navermaps.github.io/maps.js.ncp/docs/img/cluster-marker-4.png);background-size:contain;"></div>',
    size: navermaps.Size(40, 40),
    anchor: navermaps.Point(20, 20),
  }
  const htmlMarker5 = {
    content:
      '<div style="cursor:pointer;width:40px;height:40px;line-height:42px;font-size:10px;color:white;text-align:center;font-weight:bold;background:url(https://navermaps.github.io/maps.js.ncp/docs/img/cluster-marker-5.png);background-size:contain;"></div>',
    size: navermaps.Size(40, 40),
    anchor: navermaps.Point(20, 20),
  }

  // https://github.com/zeakd/react-naver-maps/blob/main/website/src/samples/marker-cluster.js
  // const MarkerClustering = makeMarkerClustering(window.naver);

  const getCluster = () => {
    const markerList = markers.map((_marker) => {
      return _marker.current;
    });

    const cluster = new MarkerClustering({
      minClusterSize: 2,
      maxZoom: 14, // 조절하면 클러스터링이 되는 기준이 달라짐 (map zoom level)
      map: map,
      markers: markerList.filter((marker) => marker),
      disableClickZoom: false,
      gridSize: 120,
      icons: [htmlMarker1, htmlMarker2, htmlMarker3, htmlMarker4, htmlMarker5],
      indexGenerator: [10, 30, 50, 70, 90],
      stylingFunction: function (clusterMarker, count) {
        clusterMarker.getElement().querySelector('div:first-child').innerText =
          count;
      },
    });

    return cluster;
  }

  // Customize Overlay 참고
  // https://zeakd.github.io/react-naver-maps/guides/customize-overlays/
  const [cluster, setCluster] = useState(null);

  useEffect(() => {
    // 클러스트 객체 생성해서, 상태에 저장
    const newCluster = getCluster();
    setCluster(newCluster);
  }, [markerInfo]);
  return (
    <Overlay element={{ ...cluster, setMap: () => null, getMap: () => null }} />
    );
  }
export default MarkerCluster;