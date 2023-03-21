//Validate form
function validateForm() {
    let id = document.getElementById("id").value;
    let name = document.getElementById("name").value;
    let image = document.getElementById("imagename").innerHTML;
    let price = document.getElementById("price").value;
    let description = document.getElementById("description").value;
    let flag = true;
    let html = ""
    var newLine = "\r\n"
    let isNumber = function (num) {
        var pattern = /^\d+$/;
        return pattern.test(num);
    }
    if (id == "") {
        html += "Id is required";
        html += newLine;
        flag = false;
    }
    else if (!isNumber(id)) {
        html += "Please Enter Valid Id!";
        html += newLine;
        flag = false;
    }
    if (name == "") {
        html += "Product Name is required";
        html += newLine;
        flag = false;
    }
    if (image == "") {
        html += "Please Upload Image";
        html += newLine;
        flag = false;
    }
    else {
        var Extension = image.substring(image.lastIndexOf('.') + 1).toLowerCase();
        if (!(Extension == "png" || Extension == "jpeg" || Extension == "jpg")) {
            html += "upload only jpg,jpge and png file";
            html += newLine;
            flag = false;
        }
    }
    if (price == "") {
        html += "Price is Required";
        html += newLine;
        flag = false;
    }
    else if (!isNumber(price)) {
        html += "Please Enter valid price!";
        html += newLine;
        flag = false;
    }
    if (description == "") {
        html += "Description is required!";
        html += newLine;
        flag = false;
    }
    if (flag == false) {
        alert(html);
    }
    return flag;

}

//Show data in table
function showData() {
    let productList = JSON.parse(localStorage.getItem("productList"));
    let table = document.getElementById("table-body");
    let html = "";
    productList.forEach(function (element, index) {
        html += "<tr>";
        html += "<td>" + element.id + "</td>";
        html += "<td>" + element.name + "</td>";
        html += "<td><img src='images/" + element.image + "' width='30px' height='30px'/></td>";
        html += "<td>" + element.price + "</td>";
        html += "<td>" + element.description + "</td>";
        html += "<td><button type='button' class='btn btn-secondary' onclick='update(" + index + ")'>Edit</button><button type='button' class='btn btn-danger'onclick='remove(" + index + ")'>Delete</button></td>";
        html += "</tr>";

    });
    table.innerHTML = html;
}

document.onload = showData();

//Add Product Data
function addProduct() {
    if (validateForm() == true) {
        let id = document.getElementById("id").value;
        let name = document.getElementById("name").value;
        let image = document.getElementById("image").files[0].name;
        let price = document.getElementById("price").value;
        let description = document.getElementById("description").value;
        var productList;
        if (localStorage.getItem("productList") == null) {
            productList = [];
        }
        else {
            productList = JSON.parse(localStorage.getItem('productList'));
        }
        let DuplicatedIndex = productList.findIndex(product => product.id == id);



        if (DuplicatedIndex >= 0) {
            alert("Id Already exits.");
        }
        else {
            productList.push({
                id: id,
                name: name,
                image: image,
                price: price,
                description: description
            });
            localStorage.setItem("productList", JSON.stringify(productList));
            document.getElementById("id").value = "";
            document.getElementById("name").value = "";
            document.getElementById("imagename").innerHTML = "";
            document.getElementById("price").value = "";
            document.getElementById("description").value = "";
        }


        showData();

    }
}

//Edit Product Data
function update(index) {
    var row = JSON.parse(localStorage.getItem("productList"))[index];
    document.getElementById("id").value = row.id;
    document.getElementById("name").value = row.name;
    document.getElementById("imagename").innerHTML = row.image;
    document.getElementById("price").value = row.price;
    document.getElementById("description").value = row.description;
    document.getElementById("submit").style.display = "none";
    document.getElementById("update").style.display = "block";


    document.querySelector("#update").onclick = function () {
        if (validateForm() == true) {
            let id = document.getElementById("id").value;
            let name = document.getElementById("name").value;
            let img = document.getElementById("image");
            if (img.onchange == true && img.value != null) {
                pressed();
            }
            let image = document.getElementById("imagename").innerHTML;
            let price = document.getElementById("price").value;
            let description = document.getElementById("description").value;
            var productList = JSON.parse(localStorage.getItem('productList'));
            productList[index].id = id;
            productList[index].name = name;
            productList[index].image = image;
            productList[index].price = price;
            productList[index].description = description;
            localStorage.setItem("productList", JSON.stringify(productList));
            showData();
            document.getElementById("submit").style.display = "block";
            document.getElementById("update").style.display = "none";
            document.getElementById("id").value = "";
            document.getElementById("name").value = "";
            document.getElementById("imagename").innerHTML = "";
            document.getElementById("price").value = "";
            document.getElementById("description").value = "";
        }
    }

}

//Remove Product Data
function remove(index) {
    if (confirm("Are you want to delete?")) {
        var productList = JSON.parse(localStorage.getItem('productList'));
        productList.splice(index, 1);
        localStorage.setItem("productList", JSON.stringify(productList));
        showData();
        document.getElementById("submit").style.display = "block";
        document.getElementById("update").style.display = "none";
        document.getElementById("id").value = "";
        document.getElementById("name").value = "";
        document.getElementById("imagename").innerHTML = "";
        document.getElementById("price").value = "";
        document.getElementById("description").value = "";
    }

}
function pressed() {
    document.getElementById("imagename").innerHTML = document.getElementById("image").value.replace("C:\\fakepath\\", "");
}

//Filter By Id
function searchId() {
    let filter = document.getElementById("filterid").value;
    let table = document.getElementById("table-body");
    let row = table.getElementsByTagName("tr");
    for (let i = 0; i < row.length; i++) {
        let td = row[i].getElementsByTagName("td")[0];
        if (td) {
            let idvalue = td.textContent || td.innerHTML;
            if (idvalue.indexOf(filter) > -1) {
                row[i].style.display = "";
            }
            else {
                row[i].style.display = "none";
            }
        }
    }
}

//Sort our Data
var direction = false;
function sortColumnByName(columnName) {
    direction = !direction;
    var productList = JSON.parse(localStorage.getItem('productList'));
    productList = productList.sort(function (a, b) {
        if (direction) {
            if (a[columnName].toLowerCase() < b[columnName].toLowerCase()) {
                return -1;
            }
        }
        else {
            if (a[columnName].toLowerCase() > b[columnName].toLowerCase()) {
                return -1;
            }
        }
    });
    localStorage.setItem("productList", JSON.stringify(productList));
    showData();

}
function sortColumnByNum(columnName) {
    direction = !direction;
    var productList = JSON.parse(localStorage.getItem('productList'));

    if (direction) {
        productList = productList.sort(function (a, b) {
            return a[columnName] - b[columnName];
        });
    }
    else {
        productList = productList.sort(function (a, b) {
            return b[columnName] - a[columnName];
        });
    }
    localStorage.setItem("productList", JSON.stringify(productList));
    showData();

};

