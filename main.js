const vehicle = document.getElementsByName('vehicle');
const resultBtn = document.querySelector('#result__btn');
const numKm = document.querySelector('#numKm');
const numTime = document.querySelector('#numTime');
const myModal = document.querySelector('.my__modal');
const modalClose = document.querySelector('.modal__close');
const billInner = document.querySelector('.modal__content');

function GrabCheckout(numKm, numTime, arr) {
    let timeCost = 0;
    let firstKm = 0;
    let elseKm = 0;

    if (numTime > 3) {
        timeCost = Math.floor((numTime - 3) / 3) * arr[0];
    }

    if (numKm < 1) {
        return arr[0];
    } 
    else if (numKm > 1) {
        firstKm = arr[1];
    }

    if (numKm >= 1 && numKm <= 19) {
        elseKm = (numKm - 1) * arr[2];
    }
    else if (numKm > 19) {
        elseKm = (numKm - 1) * arr[3];
    }
    console.log(timeCost);
    console.log(firstKm);
    console.log(elseKm);
    return timeCost + firstKm + elseKm;
}

resultBtn.addEventListener('click', function (e) {
    e.preventDefault();
    // HIỆN HÓA ĐƠN 
    myModal.classList.add('active');

    // XỬ LÍ LOGIC 
    let selectedVehicle;
    let result = 0;
    const priceCar = [2000, 8000, 7500, 7000];
    const priceSUV = [3000, 9000, 8500, 8000];
    const priceBlack = [3500, 1000, 9500, 9000];
    vehicle.forEach(function (item) {
        if (item.checked) {
            selectedVehicle = item.value;
        }
    })
    console.log(selectedVehicle);
    if (selectedVehicle === 'grabCar') {
        result = GrabCheckout(numKm.value, numTime.value, priceCar)
    }
    else if (selectedVehicle === 'grabSUV') {
        result = GrabCheckout(numKm.value, numTime.value, priceSUV)
    }
    else {
        result = GrabCheckout(numKm.value, numTime.value, priceBlack)
    }
})

modalClose.addEventListener('click', function (e) {
    myModal.classList.remove('active');
})



