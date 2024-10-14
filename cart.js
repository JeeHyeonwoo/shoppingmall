/* 수량 업데이트 함수 */
function updateQuantity(itemId, change) {
    let url = /*[@{/cart/updateQuantity}]*/ '/cart/updateQuantity';
    fetch(url + '?itemId=' + itemId + '&change=' + change, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'}
    }).then(response => {
        if (response.ok) {
            location.reload(); // 페이지 리로드하여 업데이트된 장바구니를 다시 렌더링
        }
    }).catch(error => console.error('Error:', error));
}