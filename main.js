//products in json //
var result = '';

// function to display products //
<<<<<<< dev
function displayProducts() {
    product.forEach(function (e) {

        result += '<div id=" ' + e.id + '" class="text-center col-md-4 store-product ' + e.brand + ' ">' + '<img style="cursor:pointer" id=" ' + e.id + '" src="' + e.img + '">' + '<p id=" ' + e.id + '">' + e.name + '</p>' + e.price + "<br><br>" + '<p> Brand :' + e.brand + "</p>" + '<p>Quantity : <input style="width:20%" type="number" value="' + e.quantity + '"></p>' + '<button class="addProduct btn-primary">' + e.add + '</button>' + '</div>'

    });

=======
// function to display products //
function displayProducts() {
    product.forEach(function (e) {
        result += '<div id=" ' + e.id + 
        '" class="text-center col-md-4 store-product ' + e.brand + ' ">' +
         '<img src="' + e.img + '">' + '<p>' + e.name + '</p>' + e.price + 
         "<br><br>" + '<p> Brand :' + e.brand + "</p>" + 
         '<p>Quantity : <input style="width:20%" type="number" value="' + e.quantity + '"></p>'
          + '<button class="btn btn-primary">' + e.add + '</button>' + 
          '</div>'
        result += '<div id=" ' + e.id + '" class="text-center col-md-4 store-product ' + e.brand + ' ">' + '<img style="cursor:pointer" id=" ' + e.id + '" src="' + e.img + '">' + '<p id=" ' + e.id + '">' + e.name + '</p>' + e.price + "<br><br>" + '<p> Brand :' + e.brand + "</p>" + '<p>Quantity : <input style="width:20%" type="number" value="' + e.quantity + '"></p>' + '<button class="btn btn-primary">' + e.add + '</button>' + '</div>'
    });


>>>>>>> hagar
    document.getElementById("train").innerHTML = result;
}
displayProducts();

function detailedProduct(id) {
    // alert(id);
    // let v1 = document.getElementById('id');
    const url = "detail.html?id="+id;
    window.location.href = url;
}

document.querySelectorAll('img, p:first-of-type').forEach(function (el) {
    el.addEventListener('click', function () {
        detailedProduct(this.id);
    });
});
