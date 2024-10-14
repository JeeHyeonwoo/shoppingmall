var fileNo = 0;
var filesArr = new Array();


function addFile(obj) {
    const files = obj.files;

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        // 첨부파일 검증
        if (fileValidation(file)) {
            const reader = new FileReader();
            reader.onload = (function (theFile) {
                return function (e) {
                    // FileReader가 파일을 읽은 후
                    filesArr.push(theFile);

                    // 목록 추가
                    let htmlData = '';
                    htmlData += '<div id="file' + fileNo + '" class="filebox">';
                    htmlData += '   <p class="name">' + theFile.name + '</p>';
                    htmlData += '   <a class="delete" onclick="deleteFile(' + fileNo + ');"><i class="far fa-minus-square"></i></a>';
                    htmlData += '</div>';
                    $('.file-list').append(htmlData);
                    fileNo++;
                };
            })(file);

            reader.readAsDataURL(file);
        }
    }

    // 초기화
    document.querySelector("input[type=file]").value = "";
}

/* 첨부파일 검증 */
function fileValidation(file){
    const fileTypes = ['image/gif', 'image/jpeg', 'image/png', 'image/bmp', 'image/tif'];
    if (file.name.length > 100) {
        alert("파일명이 100자 이상인 파일은 제외되었습니다.");
        return false;
    } else if (file.name.lastIndexOf('.') === -1) {
        alert("확장자가 없는 파일은 제외되었습니다.");
        return false;
    } else if (!fileTypes.includes(file.type)) {
        alert("이미지를 제외한 파일은 제외되었습니다.");
        return false;
    }
    return true;
}
/* 첨부파일 삭제 */
function deleteFile(num) {
    document.querySelector("#file" + num).remove();
    filesArr[num].is_delete = true;
}

/* 폼 전송 */
function submitForm() {
    // 폼데이터 담기
    var form = document.querySelector("form");
    var formData = new FormData(form);
    for (var i = 0; i < filesArr.length; i++) {
        // 삭제되지 않은 파일만 폼데이터에 담기
        if (!filesArr[i].is_delete) {
            formData.append("attach_file", filesArr[i]);
        }
    }

    $.ajax({
        method: 'POST',
        url: '/register',
        dataType: 'json',
        data: formData,
        async: true,
        timeout: 30000,
        cache: false,
        headers: {'cache-control': 'no-cache', 'pragma': 'no-cache'},
        success: function () {
            alert("파일업로드 성공");
        },
        error: function (xhr, desc, err) {
            alert('에러가 발생 하였습니다.');
            return;
        }
    })
}