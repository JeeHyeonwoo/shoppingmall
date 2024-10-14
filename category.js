const data = {
}

function displayCategoryDetails(categoryId, categoryName) {
    console.log("ID: " + categoryId + ", Name: " + categoryName);
    data['categoryId'] = categoryId;
    data['categoryName'] = categoryName;

    const name = document.getElementById('category-name');
    name.innerText = categoryName;

}
function handleCategoryAction(num) {
    const categoryDetail = document.getElementById('category-details');

    switch (num) {
        case 1:
            categoryDetail.innerHTML = `
                <div>
                    <h2>자식 카테고리 추가</h2>
                    <form>
                        <label for="child-category-name">이름:</label>
                        <input type="text" id="child-category-name" name="child-category-name" required>
                        <br>
                        <button type="button" class="category-action-button" onclick="submitAddCategory()">추가</button>
                    </form>
                </div>`;
            break;
        case 2:
            categoryDetail.innerHTML = `
                <div>
                    <h2>카테고리 수정</h2>
                    <form>
                        <label for="edit-category-name">새 이름:</label>
                        <input type="text" id="edit-category-name" name="edit-category-name" required>
                        <br>
                        <button type="button" class="category-action-button" onclick="submitEditCategory()">수정</button>
                    </form>
                </div>`;
            break;
        case 3:
            categoryDetail.innerHTML = `
                <div>
                    <h2>카테고리 삭제</h2>
                    <p>정말로 삭제하시겠습니까?</p>
                    <button type="button" class="category-action-button" onclick="submitDeleteCategory()">삭제</button>
                </div>`;
            break;
        default:
            categoryDetail.innerHTML = '<div>알 수 없는 작업</div>';
            break;
    }
}

function submitAddCategory() {
    const regex = /^\s*$/;
    const name = document.getElementById('child-category-name').value;
    const request = {

    }

    if(!regex.test(name)){
        if(data.hasOwnProperty('categoryId')) {
            request['parentId'] = data['categoryId'];
        }
        request['name'] = name;

        $.ajax({
            type: "POST",
            url: '/manager/category/create',
            contentType: 'application/json', // JSON 형식으로 요청을 보냄
            data: JSON.stringify(request), // 객체를 JSON 문자열로 변환
            success: function(result) {
                alert('성공');
                // 성공 후 추가 작업 수행 가능
            },
            error: function() {
                alert('실패');
                // 실패 처리 로직 추가 가능
            }
        });

    }else {
        alert('자식 카테고리의 이름을 입력해주세요')
    }
}

function submitEditCategory() {
    const newName = document.getElementById('edit-category-name').value;
    // 수정 로직 구현

    const request = {}
    if(data.hasOwnProperty('categoryId')) {
        request['id'] = data['categoryId'];
        request['name'] = newName;
        $.ajax({
            type: "POST",
            url: '/manager/category/update',
            contentType: 'application/json', // JSON 형식으로 요청을 보냄
            data: JSON.stringify(request), // 객체를 JSON 문자열로 변환
            success: function(result) {
                alert('성공');
                // 성공 후 추가 작업 수행 가능
            },
            error: function() {
                alert('실패');
                // 실패 처리 로직 추가 가능
            }
        });
    }else {
        alert("삭제할 카테고리를 설정해주세요");
    }
}

function submitDeleteCategory() {
    const request = {}
    if(data.hasOwnProperty('categoryId')) {
        request['id'] = data['categoryId'];
        $.ajax({
            type: "POST",
            url: '/manager/category/delete',
            contentType: 'application/json', // JSON 형식으로 요청을 보냄
            data: JSON.stringify(request), // 객체를 JSON 문자열로 변환
            success: function(result) {
                alert('성공');
                // 성공 후 추가 작업 수행 가능
            },
            error: function() {
                alert('실패');
                // 실패 처리 로직 추가 가능
            }
        });
    }else {
        alert("삭제할 카테고리를 설정해주세요");
    }

}