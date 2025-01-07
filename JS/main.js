$(document).ready(function() {
    $('.grid img').each(function() {
        const randomHeight = Math.floor(Math.random() * (300 - 150 + 1)) + 150; // 150pxから300pxの間でランダムな高さ
        $(this).css({
            'height': randomHeight + 'px',
            'object-fit': 'cover'
        });
    });

    $('.favorite').each(function() {
        $(this).on('click', function() {
            $(this).toggleClass('active');
            
            // お気に入り数を更新
            const numberElement = $(this).siblings('.number');
            let count = parseInt(numberElement.text());
            if ($(this).hasClass('active')) {
                count++;
            } else {
                count--;
            }
            numberElement.text(count);

            // サーバーに更新を送信
            updateFavoriteCountOnServer(count);
        });
    });

    // 初期のお気に入り数を取得
    $.get('/api/getFavoriteCount', function(data) {
        $('.number').each(function() {
            $(this).text(data.count);
        });
    }).fail(function(error) {
        console.error('Error fetching favorite count:', error);
    });
});

// サーバーにお気に入り数を更新する関数
function updateFavoriteCountOnServer(count) {
    $.ajax({
        url: '/api/updateFavoriteCount',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ count: count }),
        success: function(data) {
            console.log('Server response:', data);
        },
        error: function(error) {
            console.error('Error updating favorite count:', error);
        }
    });
}