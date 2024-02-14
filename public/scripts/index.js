document.addEventListener('DOMContentLoaded',function(){
    const mainImage = document.getElementById('mainImage');

    mainImage.addEventListener('mouseover',function(){
        mainImage.src = '/image/play-button.png';
    });
    mainImage.addEventListener('mouseout', function(){
        mainImage.src = '/image/play.png';
    })
});

// 첫 접속 페이지('/') 에서 버튼 위에 마우스 올렸을 시 아이콘이 변화되도록 하는 이벤트 리스너
