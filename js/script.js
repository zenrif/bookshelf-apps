document.addEventListener("DOMContentLoaded", function () {

    const formInput = document.getElementById("inputBook");

    formInput.addEventListener("submit", function (event) {
        event.preventDefault();
        addBook();

        document.getElementById("inputBookTitle").value = "";
        document.getElementById("inputBookAuthor").value = "";
        document.getElementById("inputBookYear").value = "";
        document.getElementById("inputBookIsComplete").checked = false;
    });

    if (typeof Storage === "undefined") {
        alert("browser anda tidak mendukung web storage!");
        return false;
    } else {
        fetchJson();
    }
});

document.addEventListener("onjsonfetched", function () {
    renderFromBooks();
});
