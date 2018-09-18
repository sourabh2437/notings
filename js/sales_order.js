function fnLoadDataInCards() {
    document.getElementById("note_title").value = "Sales Meeting with Nestlé";
    var oData = {
        "ops": [{
                "insert": "create a quotation for sales area 0001/01/01 material MAT_2 quantity 1000 valid upto 30/09/2018 and discount 10%"
        },
            {
                "insert": "\n"
            }, {
                "insert": "\n"
            }, {
                "insert": "create a quotation for sales area 0002/01/01 material MAT_1 quantity 500 valid upto 15/12/2018 and discount 15%"
        }
               ]
    }

    quill.setContents(oData);


}
window.fnLoadDataInCards();
