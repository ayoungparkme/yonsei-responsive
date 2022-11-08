const container = document.querySelector("#map"); //지도를 담을 영역의 DOM 레퍼런스

const options = {
  //지도를 생성할 때 필요한 기본 옵션
  center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
  level: 3, //지도의 레벨(확대, 축소 정도)
};

const map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

// 주소-좌표 변환 객체를 생성합니다
const geocoder = new kakao.maps.services.Geocoder();

let overlay = null;

// 주소로 좌표를 검색합니다
geocoder.addressSearch("서울특별시 서대문구 연세로 50", function (result, status) {
  // 정상적으로 검색이 완료됐으면
  if (status === kakao.maps.services.Status.OK) {
    const coords = new kakao.maps.LatLng(result[0].y, result[0].x);

    // 결과값으로 받은 위치를 마커로 표시합니다
    const marker = new kakao.maps.Marker({
      map: map,
      position: coords,
    });

    // 커스텀 오버레이에 표시할 컨텐츠 입니다
    const content = `<div class="wrap"> 
                        <div class="info"> 
                            <div class="title">연세대학교 이과대학   
                                <div class="close" onclick="closeOverlay()" title="닫기"></div> 
                            </div>  
                            <div class="body"> 
                                <div class="img"> 
                                    <img src="../images/layout/logo.svg" width="73px" height="70"> 
                                </div> 
                                <div class="desc">
                                    <div class="ellipsis">
                                        서울특별시 서대문구 연세로 50 연세대학교 이과대학
                                    </div> 
                                    <div>
                                        <a href="http://science.yonsei.ac.kr/" target="_blank" class="link">홈페이지</a>
                                    </div> 
                                </div> 
                            </div> 
                        </div>    
                    </div>`;

    // 마커 위에 커스텀오버레이를 표시합니다
    // 마커를 중심으로 커스텀 오버레이를 표시하기위해 CSS를 이용해 위치를 설정했습니다
    overlay = new kakao.maps.CustomOverlay({
      content: content,
      map: map,
      position: marker.getPosition(),
    });

    // 마커를 클릭했을 때 커스텀 오버레이를 표시합니다
    kakao.maps.event.addListener(marker, "click", function () {
      overlay.setMap(map);
    });

    // 커스텀 오버레이를 닫기 위해 호출되는 함수입니다

    // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
    map.setCenter(coords);
  }
});
function closeOverlay() {
  overlay.setMap(null);
}
