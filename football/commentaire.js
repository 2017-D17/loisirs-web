function getwords() {
    localStorage.setItem("words", document.getElementById("words").value);
    document.getElementById("comments").innerHTML = localStorage.getItem("words");
}