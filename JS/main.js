$(document).ready(function () {
    // 初期化
    let totalFavoriteCount = parseInt(localStorage.getItem('totalFavoriteCount')) || 0;
    $('.total').text(`♥ サイコー！ ${totalFavoriteCount}`);

    $('.slick').slick({
        infinite: true,
        slidesToShow: 1.9,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        dots: false,
        arrows: false,
        centerMode: false,
        responsive: [
            {
                breakpoint: 320,
                settings: {
                    slidesToShow: 1
                },
                breakpoint: 768,
                settings: {
                    slidesToShow: 1.5
                }
            }
        ]
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

    $(window).on('scroll', function () {
        const footerOffsetTop = $('footer').offset().top; // フッターの上端位置
        const footerOffsetBottom = footerOffsetTop + $('footer').outerHeight(); // フッターの下端位置
    
        // `.side` と `.site-title` に対して位置をチェック
        $('.side, .site-title').each(function () {
            const elementOffsetTop = $(this).offset().top; // ターゲット要素の上端位置を取得
            const elementHeight = $(this).outerHeight(); // ターゲット要素の高さを取得
            const elementOffsetBottom = elementOffsetTop + elementHeight; // ターゲット要素の下端位置を計算
    
            // 要素がフッターに重なっている間、色を白に変更
            if (elementOffsetBottom > footerOffsetTop && elementOffsetTop < footerOffsetBottom) {
                $(this).css('color', 'white');
            } else {
                $(this).css('color', ''); // 初期状態に戻す
            }
        });
    });
    
    

    // 初期のお気に入り数を取得
    // $.get('/api/getFavoriteCount', function (data) {
    //     $('.number').each(function () {
    //         $(this).text(data.count);
    //     });
    // }).fail(function (error) {
    //     console.error('Error fetching favorite count:', error);
    // });
});