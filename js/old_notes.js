function fnLoadDataInCards() {
    document.getElementById("note_title").value = "Discussion with P&G";
    var oData = {
        "ops": [{
                "insert": "update "
        }, {
                "attributes": {
                    "bold": true
                },
                "insert": "purchase order 4500002"
            },
            {
                "insert": "\n"
            },{
                "insert": "change "
        }, {
                "attributes": {
                    "bold": true
                },
                "insert": "Payment terms to 002"
            },
               ]
    }

    quill.setContents(oData);


}
window.fnLoadDataInCards();
