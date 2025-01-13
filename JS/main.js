$(document).ready(function () {
    // 初期化
    let totalFavoriteCount = parseInt(localStorage.getItem('totalFavoriteCount')) || 0;
    $('.total').text(`♥ サイコー！ ${totalFavoriteCount}`);

    $('.slick').slick({
        infinite: true,
        slidesToShow: 1.5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        dots: false,
        arrows: false,
        centerMode: false
    });

    console.log($.fn.slick); // undefinedならロードされていない



    $('.number').text('0');

    $('.favorite').each(function () {
        $(this).on('click', function () {
            $(this).toggleClass('active');

            // お気に入り数を更新
            const numberElement = $(this).siblings('.number');
            let count = parseInt(numberElement.text());
            if ($(this).hasClass('active')) {
                count++;
                totalFavoriteCount++;
            } else {
                count = Math.max(0, count - 1);
                totalFavoriteCount = Math.max(0, totalFavoriteCount - 1);
            }
            numberElement.text(count);

            // ローカルストレージに保存
            localStorage.setItem('totalFavoriteCount', totalFavoriteCount);
            $('.total').text(`♥ サイコー！ ${totalFavoriteCount}`);
        });
    });

    // 初期のお気に入り数を取得
    $.get('/api/getFavoriteCount', function (data) {
        $('.number').each(function () {
            $(this).text(data.count);
        });
    }).fail(function (error) {
        console.error('Error fetching favorite count:', error);
    });
});