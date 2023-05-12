const vehicle = document.getElementsByName('vehicle');
const resultBtn = document.querySelector('#result__btn');
const numKm = document.querySelector('#numKm');
const numTime = document.querySelector('#numTime');
const myModal = document.querySelector('.my__modal');
const billInner = document.querySelector('.modal__content');
const kmError = document.querySelector('.km__error');
const timeError = document.querySelector('.time__error');
const priceCar = [2000, 8000, 7500, 7000];
const priceSUV = [3000, 9000, 8500, 8000];
const priceBlack = [3500, 10000, 9500, 9000];

function checkInput() {
    if (isNaN(numKm.value) || numKm.value === '' || isNaN(numTime.value) || numTime.value === '') {
        return false;
    }
    else {
        return true;
    }
}

function showError() {
    if (isNaN(numKm.value) || numKm.value === '') {
        kmError.style.opacity = '1';
    }
    else {
        kmError.style.opacity = '0';
    }

    if (isNaN(numTime.value) || numTime.value === '') {
        timeError.style.opacity = '1';
    }
    else {
        timeError.style.opacity = '0';
    }
}

function GrabCheckout(numKm, numTime, arr) {
    let timeCost = 0;
    let firstKm = 0;
    let elseKm = 0;
    let tripsInfo = {
        row0: 0,
        row1: 0,
        row2: 0,
        row3: 0,
        row4: 0
    };

    if (numTime > 3) {
        timeCost = Math.floor(numTime / 3) * arr[0];
        tripsInfo.row3 = timeCost;
    }

    if (numKm < 1) {
        tripsInfo.row0 = numKm;
        tripsInfo.row1 = numKm;
        tripsInfo.row4 = timeCost + arr[1];
        return tripsInfo;
    }
    else if (numKm >= 1) {
        tripsInfo.row0 = 1;
        tripsInfo.row1 = 1;
        firstKm = arr[1];
    }

    if (numKm >= 1 && numKm <= 19) {
        tripsInfo.row2 = arr[2];
        elseKm = (numKm - 1) * arr[2];
    }
    else if (numKm > 19) {
        tripsInfo.row2 = arr[3];
        elseKm = (numKm - 1) * arr[3];
    }
    tripsInfo.row4 = timeCost + firstKm + elseKm;
    return tripsInfo;
}

function showBill(arr, obj) {
    billInner.innerHTML = `
        <div class="modal__close position-absolute">
            <i class="fa-solid fa-circle-xmark"></i>
        </div>
        <table class="text-center w-100 my__bill bg-success-subtle fw-semibold">
            <tr>
                <th colspan="4" class="fs-4 text-center">BẢNG GIÁ CƯỚC GRAB</th>
            </tr>
            <tr>
                <th>CHI TIẾT</th>
                <th>SỬ DỤNG</th>
                <th>ĐƠN GIÁ (1000Đ)</th>
                <th>THÀNH TIỀN (1000Đ)</th>
            </tr>
            <tr>
                <td>Km đầu tiên</td>
                <td>${obj.row0} km</td>
                <td>${arr[1]} đồng</td>
                <td>${arr[1]} đồng</td>
            </tr>
            <tr>
                <td>Từ ${obj.row1} km đến ${numKm.value} km</td>
                <td>${numKm.value - obj.row1} km</td>
                <td>${obj.row2} đồng</td>
                <td>${(numKm.value - 1) * obj.row2} đồng</td>
            </tr>
            <tr>
                <td>Thời gian chờ</td>
                <td>${numTime.value} phút</td>
                <td>${arr[0]} đồng</td>
                <td>${obj.row3} đồng</td>
            </tr>
            <tr>
                <td colspan="4" class="text-end fw-bold">TỔNG TIỀN: ${obj.row4} đồng</td>
            </tr>
        </table>
        `;
    const modalClose = document.querySelector('.modal__close');
    modalClose.addEventListener('click', function () {
        myModal.style.display = 'none';
    })
}

resultBtn.addEventListener('click', function (e) {
    e.preventDefault();
    // KIỂM TRA THÔNG TIN NHẬP 
    if (checkInput()) {
        //RESET THÔNG BÁO LỖI 
        kmError.style.opacity = '0';
        timeError.style.opacity = '0';
        
        // HIỆN HÓA ĐƠN 
        myModal.style.display = 'flex';

        // XỬ LÍ LOGIC 
        let selectedVehicle;
        let result = {};
        vehicle.forEach(function (item) {
            if (item.checked) {
                selectedVehicle = item.value;
            }
        })

        if (selectedVehicle === 'grabCar') {
            result = GrabCheckout(numKm.value, numTime.value, priceCar);
            showBill(priceCar, result);
        }
        else if (selectedVehicle === 'grabSUV') {
            result = GrabCheckout(numKm.value, numTime.value, priceSUV);
            showBill(priceSUV, result);
        }
        else {
            result = GrabCheckout(numKm.value, numTime.value, priceBlack);
            showBill(priceBlack, result);
        }
    }
    else {
        showError();
    }
})



