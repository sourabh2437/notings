(function ($) {
    /**
     * Auto-growing textareas; technique ripped from Facebook
     *
     * https://github.com/jaz303/jquery-grab-bag/tree/master/javascripts/jquery.autogrow-textarea.js
     */
    $.fn.autogrow = function (options) {
        return this.filter('textarea').each(function () {
            var self = this;
            var $self = $(self);
            var minHeight = $self.height();
            var noFlickerPad = $self.hasClass('autogrow-short') ? 0 : parseInt($self.css('lineHeight')) || 0;

            var shadow = $('<div></div>').css({
                position: 'absolute',
                top: -10000,
                left: -10000,
                width: $self.width(),
                fontSize: $self.css('fontSize'),
                fontFamily: $self.css('fontFamily'),
                fontWeight: $self.css('fontWeight'),
                lineHeight: $self.css('lineHeight'),
                resize: 'none',
                'word-wrap': 'break-word'
            }).appendTo(document.body);

            var update = function (event) {
                var times = function (string, number) {
                    for (var i = 0, r = ''; i < number; i++) r += string;
                    return r;
                };

                var val = self.value.replace(/</g, '&lt;')
                    .replace(/>/g, '&gt;')
                    .replace(/&/g, '&amp;')
                    .replace(/\n$/, '<br/>&nbsp;')
                    .replace(/\n/g, '<br/>')
                    .replace(/ {2,}/g, function (space) {
                        return times('&nbsp;', space.length - 1) + ' '
                    });

                // Did enter get pressed?  Resize in this keydown event so that the flicker doesn't occur.
                if (event && event.data && event.data.event === 'keydown' && event.keyCode === 13) {
                    val += '<br />';
                }

                shadow.css('width', $self.width());
                shadow.html(val + (noFlickerPad === 0 ? '...' : '')); // Append '...' to resize pre-emptively.
                $self.height(Math.max(shadow.height() + noFlickerPad, minHeight));
            }

            $self.change(update).keyup(update).keydown({
                event: 'keydown'
            }, update);
            $(window).resize(update);

            update();
        });
    };
})(jQuery);



//var aNotesData = [{
//    "notes_id": 1,
//    "notes_timestamp": "07 / 09 / 18",
//    "notes_title": "Discussion with P&G",
//    "notes_desc": ["dsadsasdasvc",
//        "safhahfoasf",
//        "sfsajfkasbf",
//        "safkasbfksafb"]
//}, {
//    "notes_id": 1,
//    "notes_timestamp": "06 / 09 / 18",
//    "notes_title": "Meeting with BMW",
//    "notes_desc": ["dsadsasdasvc",
//        "safhahfoasf",
//        "sfsajfkasbf",
//        "safkasbfksafb"]
//}];

function fnAddDataInDB(aNotes) {
    var oNotesCanvas = document.getElementById("note_canvas");
    var oNewObj = {
        "notes_id": 2321312,
        "notes_timestamp": "",
        "notes_title": "sadadasd",
        "notes_desc": aNotes
    }
    aNotesData.push(oNewObj);


}

function fnFillDataInNote(oEvent) {
    if (oEvent.srcElement.id === "card0" || oEvent.srcElement.id === "title0" || oEvent.srcElement.id === "time0") {
        window.location.href = 'pages/purchase_order.html';
    } else if (oEvent.srcElement.id === "card1" || oEvent.srcElement.id === "title1" || oEvent.srcElement.id === "time1") {
        window.location.href = 'pages/sales_order.html';
    }


}

function fnCreateNotePreviewTiles(oObj, index) {
    var oCard = document.createElement("div");
    var that = this;
    oCard.addEventListener("click", function (oEvent) {
        that.fnFillDataInNote(oEvent);
    });
    oCard.setAttribute("id", "card" + index);
    oCard.setAttribute("class", "custom");
    var oTitle = document.createElement("h2");
    var oEm = document.createElement("em");
    var oTime = document.createElement("div");
    oTime.setAttribute("class", "timeStamp");
    oTitle.setAttribute("id", "title" + index);
    oTime.setAttribute("id", "time" + index);
    oTitle.innerHTML = oObj.notes_title;
    oTime.innerHTML = "Last Changed on: " + oObj.notes_timestamp;

    //oLine.setAttribute("class","line");
    oCard.appendChild(oTitle);
    oCard.appendChild(oTime);

    return oCard;
}

function fnCreateNoteTileCanvas() {

    var oCanvas = document.getElementById("note_tile_canvas");
    if (oCanvas !== null && (aNotesData !== undefined || aNotesData !== null)) {
        for (var i = 0; i < aNotesData.length; i++) {
            var oNewCard = this.fnCreateNotePreviewTiles(aNotesData[i], i);
            oCanvas.appendChild(oNewCard);
            var oLine = document.createElement("div");
            oLine.setAttribute("class", "line");
            oCanvas.appendChild(oLine);
        }
    }

}
$(document).ready(function () {
    var oAppDateStamp = document.getElementById("app_date");
    oAppDateStamp.innerHTML = "Last updated on " + new moment().format('ll');
    fnCreateNoteTileCanvas(); //.bind(this);
});
/*var noteTemp = '<div class="note" id="note">' +
    '<div class="note_cnt">' +
    '<textarea class="title" id="note_title" placeholder="Enter note title"></textarea>' +
    '<textarea class="cnt" id="note_desc" placeholder="Enter note description here"></textarea>' +
    '</div> ' +
    '<Button class="button" onclick="fnOnAnalyse()">Analyse</Button>' +
    '<Button class="button" onclick="fnOnSync()">Sync</Button>' +
    '</div>';*/
//var noteTemp =
/*var noteTemp = '<div id="note">' +
    '<div class="form-group">' +
    '<textarea class=" random" id="note_desc" rows="10" cols="150" placeholder="Enter note description here"></textarea>' +
    '</div> ' +
    '<div>' +
    '<Button type="button" class="btn btn-info btn_space" onclick="fnOnAnalyse()">Analyse</Button>' +
    '<Button type="button" id="syncBtn" disabled class="btn btn-primary" onclick="fnOnSync()">Sync</Button>' +
    '</div>'
'</div>';*/
/*
var noteTemp = '<div id="note">' +
    '<div class="form-group">' +
    '<input class="form-control z-depth-1" type="text" placeholder="Enter Notes title here">' +
    '<textarea class="form-control z-depth-1" id="note_desc" rows="10" cols="150" placeholder="Enter Notes description here"></textarea>' +
    '</div> ' +
    '<div>' +
    '<Button type="button" class="btn btn-info btn_space" onclick="fnOnAnalyse()">Analyse</Button>' +
    '<Button type="button" id="syncBtn" disabled class="btn btn-primary " onclick="fnOnSync()">Sync</Button>' +
    '</div>'
'</div>';
*/


var noteZindex = 1;

function deleteNote() {
    $(this).parent('.note').hide("puff", {
        percent: 133
    }, 250);
};

/*
function newNote() {
    $(noteTemp).hide().appendTo("#board").show("fade", 300).draggable().on('dragstart',
        function () {
            $(this).zIndex(++noteZindex);
        });

    $('.remove').click(deleteNote);
    $('textarea').autogrow();

    $('.note')
    return false;
};
*/



/*$(document).ready(function () {

    $("#board").height($(document).height());

    $("#add_new").click(newNote);

    $('.remove').click(deleteNote);
    newNote();

    return false;
});*/




var aResponse = [];
var aPurchaseOrder = [];
var aNewPurchaseOrder = [];
var modal = document.getElementById('myModal');
var span = document.getElementsByClassName("close")[0];


function fnOnNoteSectionDelete() {
    alert("bhiya delete ho re liya hai ye");
}
/* exisiting working onw
function fnOnAnalyse() {
    var oNote = document.getElementById("note_desc");
    oNote.setAttribute("disabled",true);
    aResponse = [];
    aPurchaseOrder = [];
    aNewPurchaseOrder = [];
    var oDesc = document.getElementById("note_desc");
    var aNotes = oDesc.value.split("\n");
    for (var i = 0; i < aNotes.length; i++) {
        if (aNotes[i] === "") {
            aNotes.splice(i, 1);
        }
    }
    this.fnCallRecastAPI(aNotes, 0, aNotes.length);
}
*/
//Quill - AutoSave
// Store accumulated changes
var Delta = Quill.import('delta');
var change = new Delta();
quill.on('text-change', function (delta) {
    change = change.compose(delta);
});

// Save periodically
setInterval(function () {
    if (change.length() > 0) {
        $.notify("Changes saved", "success");
        /*$("#deleteBtn").notify(
    "Changes saved", "success", [{
        arrowShow: false,
        globalPosition: 'top left',
                    }]
);*/
        //console.log('Saving changes', change);
        /* 
        Send partial changes
        $.post('/your-endpoint', { 
          partial: JSON.stringify(change) 
        });
    
        Send entire document
        $.post('/your-endpoint', { 
          doc: JSON.stringify(quill.getContents())
        });
        */
        change = new Delta();
    }
}, 7 * 1000);

// Check for unsaved data
window.onbeforeunload = function () {
    if (change.length() > 0) {
        return 'There are unsaved changes. Are you sure you want to leave?';
    }
}

//Quill - AutoSave

function fnOnAnalyse() {
    //var oNote = document.getElementById("note_desc");
    //oNote.setAttribute("disabled",true);
    //var aContent = quill.getContents();
    //aNotesData[0].notes_desc = quill.getContents();
    var aData = quill.getText();
    aResponse = [];
    aPurchaseOrder = [];
    aNewPurchaseOrder = [];
    //var oDesc = document.getElementById("note_desc");
    var aNotes = aData.split("\n");
    var sTitle = document.getElementById("note_title").value;
    var aFinalNotes = [];
    aFinalNotes.push(sTitle);
    for (var i = 0; i < aNotes.length; i++) {
        if (aNotes[i] !== "") {
            aFinalNotes.push(aNotes[i]);
        } else {

        }
    }
    //this.fnAddDataInDB(aFinalNotes);
    this.fnCallRecastAPI(aFinalNotes, 0, aFinalNotes.length);
}

function fnOnSync() {
    var bInitial = 0;
    var oGlobal = {};
    aPurchaseOrder = [];
    aNewPurchaseOrder = [];
    aNewQuotation = [];
    for (var i = 0; i < aResponse.length; i++) {
        if (aResponse[i].results.intents[0] !== undefined && aResponse[i].results.intents[0].slug === "update-purchase-order") {
            var oCurr = aResponse[i].results.entities;
            var oObj = this.fnCheckProperties(oCurr);
            if (oCurr.hasOwnProperty("purchase-order-number")) {
                if (bInitial === 0) {
                    bInitial = 1;
                    this.oCurrObj = {};
                    $.extend(this.oCurrObj, oObj);
                } else if (bInitial === 1) {
                    bInitial = 1;
                    aPurchaseOrder.push(this.oCurrObj);
                    this.oCurrObj = {};
                    $.extend(this.oCurrObj, oObj);
                }

            } else if (bInitial === 0) {
                $.extend(oGlobal, oObj);
            } else if (bInitial === 1) {
                $.extend(this.oCurrObj, oObj);
            }


        } else if (aResponse[i].results.intents[0] !== undefined && aResponse[i].results.intents[0].slug === "create-purchase-order") {
            var oCurr = aResponse[i].results.entities;
            var len = Object.keys(oCurr).length;
            this.oNewPOOrg = this.fnCreateNewPOObject(oCurr);
            aNewPurchaseOrder.push(this.oNewPOOrg);
        } else if (aResponse[i].results.intents[0] !== undefined && aResponse[i].results.intents[0].slug === "create-quotation") {
            var oCurr = aResponse[i].results.entities;
            var len = Object.keys(oCurr).length;
            this.oNewQtn = this.fnCreateNewQtnObject(oCurr);
            aNewQuotation.push(this.oNewQtn);
        }
    }
    if (this.oCurrObj !== undefined) {
        aPurchaseOrder.push(this.oCurrObj);
    }
    for (var i = 0; i < aPurchaseOrder.length; i++) {
        $.extend(aPurchaseOrder[i], oGlobal);
    }
    modal.style.display = "block";
    var oPopoverContent = document.getElementById("popover_body");
    while (oPopoverContent.hasChildNodes()) {
        oPopoverContent.removeChild(oPopoverContent.lastChild);
    }
    for (var x = 0; x < aPurchaseOrder.length; x++) {
        oPopoverContent.appendChild(this.fnCreateTable(x));
        for (var y = 0; y < Object.keys(aPurchaseOrder[x]).length; y++) {
            if (Object.keys(aPurchaseOrder[x])[y] === "PurchaseOrder") {
                var oTable = document.getElementById("po_table" + x);
                oTable.caption.innerHTML = "Update Purchase Order " + Object.values(aPurchaseOrder[x])[y];
            } else {
                this.fnAddPurchaseOrderRow("po_table" + x, Object.keys(aPurchaseOrder[x])[y], Object.values(aPurchaseOrder[x])[y], "old");
            }

        }
    }
    oPopoverContent.appendChild(document.createElement("hr"));
    for (var x = 0; x < aNewPurchaseOrder.length; x++) {
        oPopoverContent.appendChild(this.fnCreateTableNEWPO(x));
        var oTable = document.getElementById("new_po_table" + x);
        oTable.caption.innerHTML = "Create a New Purchase Order with following details - ";
        for (var y = 0; y < Object.keys(aNewPurchaseOrder[x]).length; y++) {
            if (Object.keys(aNewPurchaseOrder[x])[y] !== "Purchase-Order") {
                this.fnAddPurchaseOrderRow_NEWPO("new_po_table" + x, Object.keys(aNewPurchaseOrder[x])[y], Object.values(aNewPurchaseOrder[x])[y]);
            }

        }
    }

    for (var x = 0; x < aNewQuotation.length; x++) {
        oPopoverContent.appendChild(this.fnCreateTableNEWQuotation(x));
        var oTable = document.getElementById("new_qtn_table" + x);
        oTable.caption.innerHTML = "Create a New Sales order Quotation with following details - ";
        for (var y = 0; y < Object.keys(aNewQuotation[x]).length; y++) {
            if (Object.keys(aNewQuotation[x])[y] !== "quotation") {
                this.fnAddPurchaseOrderRow_NEWPO("new_qtn_table" + x, Object.keys(aNewQuotation[x])[y], Object.values(aNewQuotation[x])[y]);
            }

        }
        this.fnAddPurchaseOrderRow_NEWPO("new_qtn_table" + x, "Customer", oGlobal.Supplier);

    }
    /*if (aNewQuotation.length !== 0) {
        
    }*/


}

function fnCallRecastAPI(aNotes, index, length) {
    if (index >= length) {
        this.fnCreateNotification();
        return;
    } else {
        var xhttp = new XMLHttpRequest();
        var obj = {
            "text": aNotes[index],
            "language": "en"
        };
        xhttp.open("POST", "https://api.recast.ai/v2/request", true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.setRequestHeader("Authorization", "Token df06ae2b77ecb0f1f56da0059b7dd166");
        xhttp.setRequestHeader("Content-Language", "en-US");
        xhttp.send(JSON.stringify(obj));

        xhttp.addEventListener("readystatechange", processRequest, false);
        var that = this;

        function processRequest(e) {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                var response = JSON.parse(xhttp.responseText);
                aResponse.push(response);
                //$.notify("Note " + (index + 1) + " successfully analysed", "success");
                that.fnCallRecastAPI(aNotes, index + 1, length);
            }
        }
    }

}

function fnCreateNotification() {
    var x = document.getElementById("snackbar");
    x.className = "show";
    setTimeout(function () {
        x.className = x.className.replace("show", "");
    }, 2000);

    document.getElementById("syncBtn").disabled = false;
    //document.getElementById("note_desc").disabled = false;
}

function fnCheckProperties(oCurr) {
    if (oCurr.hasOwnProperty("payment-term")) {
        return {
            "PaymentTerms": oCurr["payment-term"][0].value
        }
    } else if (oCurr.hasOwnProperty("delivery-date")) {
        return {
            "DeliveryDate": oCurr["delivery-date"][0].value
        }
    } else if (oCurr.hasOwnProperty("purchase-order-number")) {
        return {
            "PurchaseOrder": oCurr["purchase-order-number"][0].value
        }
    } else if (oCurr.hasOwnProperty("supplier")) {
        return {
            "Supplier": oCurr["supplier"][0].value
        }
    } else if (oCurr.hasOwnProperty("purchasing-group")) {
        return {
            "PurchasingGroup": oCurr["purchasing-group"][0].value
        }
    } else if (oCurr.hasOwnProperty("purchasing-org")) {
        return {
            "PurchasingOrg": oCurr["purchasing-org"][0].value
        }
    } else if (oCurr.hasOwnProperty("material")) {
        return {
            "material": oCurr["material"][0].value
        }
    } else if (oCurr.hasOwnProperty("plant")) {
        return {
            "plant": oCurr["plant"][0].value
        }
    } else if (oCurr.hasOwnProperty("quantity")) {
        return {
            "quantity": oCurr["quantity"][0].value
        }
    }


}

function fnCreateNewPOObject(oCurr) {
    var oObj = {};
    if (oCurr.hasOwnProperty("purchasing-group")) {
        $.extend(oObj, {
            "PurchasingGroup": oCurr["purchasing-group"][0].value
        });
    }
    if (oCurr.hasOwnProperty("purchasing-org")) {
        $.extend(oObj, {
            "PurchasingOrg": oCurr["purchasing-org"][0].value
        });
    }
    if (oCurr.hasOwnProperty("material")) {
        $.extend(oObj, {
            "material": oCurr["material"][0].value
        });
    }
    if (oCurr.hasOwnProperty("plant")) {
        $.extend(oObj, {
            "plant": oCurr["plant"][0].value
        });
    }
    if (oCurr.hasOwnProperty("quantity")) {
        $.extend(oObj, {
            "quantity": oCurr["quantity"][0].value
        });
    }
    return oObj;



}

function fnCreateNewQtnObject(oCurr) {
    var oObj = {};
    if (oCurr.hasOwnProperty("material")) {
        $.extend(oObj, {
            "Material": oCurr["material"][0].value
        });
    }
    if (oCurr.hasOwnProperty("sales-area")) {
        $.extend(oObj, {
            "Sales Area": oCurr["sales-area"][0].value
        });
    }
    if (oCurr.hasOwnProperty("quantity")) {
        $.extend(oObj, {
            "Quantity": oCurr["quantity"][0].value
        });
    }
    if (oCurr.hasOwnProperty("validity")) {
        $.extend(oObj, {
            "Valid Upto": oCurr["validity"][0].value
        });
    }
    if (oCurr.hasOwnProperty("discount")) {
        $.extend(oObj, {
            "Discount": oCurr["discount"][0].value
        });
    }
    return oObj;



}

function fnFetchPurchaseOrdData() {
    var data = null;

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = false;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            console.log(this.responseText);
        }
    });

    //setting request method
    //API endpoint for API sandbox 
    xhr.open("GET", "https://sandbox.api.sap.com/s4hanacloud/sap/opu/odata/sap/API_PURCHASEORDER_PROCESS_SRV/A_PurchaseOrder('4500000058')");
    //API endpoint with optional query parameters
    //xhr.open("GET", "https://sandbox.api.sap.com/s4hanacloud/sap/opu/odata/sap/API_PURCHASEORDER_PROCESS_SRV/A_PurchaseOrder('{PurchaseOrder}')?$select=array&$expand=array");

    //Available API Endpoints -  efqoJehIrqXziPLAdVGVbvnokS9DAxEi
    //https://{host}:{port}/sap/opu/odata/sap/API_PURCHASEORDER_PROCESS_SRV

    //adding request headers
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Accept", "application/json");
    //API Key for API Sandbox
    xhr.setRequestHeader("APIKey", "df06ae2b77ecb0f1f56da0059b7dd166");

    //Available Security Schemes for productive API Endpoints
    //Basic Authentication

    //Basic Auth : provide username:password in Base64 encoded in Authorization header
    //xhr.setRequestHeader("Authorization", "Basic <Base64 encoded value>");

    //sending request
    xhr.send(data);
}

function fnCreateTable(x) {
    var oTable = document.createElement("table");
    oTableCaption = document.createElement("caption");
    oTable.appendChild(oTableCaption);
    oTable.setAttribute("id", "po_table" + x);
    oTable.setAttribute("class", "table table-bordered table-hover table-condensed");
    var oThead = document.createElement("thead");
    var oTBody = document.createElement("tbody");
    oThead.setAttribute("class", "thead-dark");
    var oTheadRow = document.createElement("tr");
    var oTheadCol1 = document.createElement("th");
    var oTheadCol2 = document.createElement("th");
    var oTheadCol3 = document.createElement("th");
    oTheadCol1.innerHTML = "Fields";
    oTheadCol2.innerHTML = "New Values";
    oTheadCol3.innerHTML = "Old Values";

    oTheadRow.appendChild(oTheadCol1);
    oTheadRow.appendChild(oTheadCol2);
    oTheadRow.appendChild(oTheadCol3);

    oThead.appendChild(oTheadRow);
    oTable.appendChild(oThead);
    oTable.appendChild(oTBody);
    return oTable;
}

function fnCreateTableNEWPO(x) {
    var oTable = document.createElement("table");
    oTableCaption = document.createElement("caption");
    oTable.appendChild(oTableCaption);
    oTable.setAttribute("id", "new_po_table" + x);
    oTable.setAttribute("class", "table table-bordered table-hover table-condensed");
    var oThead = document.createElement("thead");
    var oTBody = document.createElement("tbody");
    oThead.setAttribute("class", "thead-dark");
    var oTheadRow = document.createElement("tr");
    var oTheadCol1 = document.createElement("th");
    var oTheadCol2 = document.createElement("th");
    var oTheadCol3 = document.createElement("th");
    oTheadCol1.innerHTML = "Fields";
    oTheadCol2.innerHTML = "Values";
    oTheadRow.appendChild(oTheadCol1);
    oTheadRow.appendChild(oTheadCol2);

    oThead.appendChild(oTheadRow);
    oTable.appendChild(oThead);
    oTable.appendChild(oTBody);
    return oTable;
}

function fnCreateTableNEWQuotation(x) {
    var oTable = document.createElement("table");
    oTableCaption = document.createElement("caption");
    oTable.appendChild(oTableCaption);
    oTable.setAttribute("id", "new_qtn_table" + x);
    oTable.setAttribute("class", "table table-bordered table-hover table-condensed");
    var oThead = document.createElement("thead");
    var oTBody = document.createElement("tbody");
    oThead.setAttribute("class", "thead-dark");
    var oTheadRow = document.createElement("tr");
    var oTheadCol1 = document.createElement("th");
    var oTheadCol2 = document.createElement("th");
    var oTheadCol3 = document.createElement("th");
    oTheadCol1.innerHTML = "Fields";
    oTheadCol2.innerHTML = "Values";
    oTheadRow.appendChild(oTheadCol1);
    oTheadRow.appendChild(oTheadCol2);

    oThead.appendChild(oTheadRow);
    oTable.appendChild(oThead);
    oTable.appendChild(oTBody);
    return oTable;
}

function fnAddPurchaseOrderRow_NEWPO(sTableId, sField, sNewValue) {
    var oTable = document.getElementById(sTableId);
    var oTBody = oTable.getElementsByTagName("tbody")[0];
    var oNewRow = document.createElement("tr");

    var oNewCol1 = document.createElement("td");
    var oNewCol2 = document.createElement("td");
    //var oNewCol3 = document.createElement("td");

    oNewCol1.innerHTML = sField;
    oNewCol2.innerHTML = sNewValue;
    //oNewCol3.innerHTML = sOldValue;

    oNewRow.appendChild(oNewCol1);
    oNewRow.appendChild(oNewCol2);
    //oNewRow.appendChild(oNewCol3);

    oTBody.appendChild(oNewRow);
}

function fnAddPurchaseOrderRow(sTableId, sField, sNewValue, sOldValue) {
    var oTable = document.getElementById(sTableId);
    var oTBody = oTable.getElementsByTagName("tbody")[0];
    var oNewRow = document.createElement("tr");

    var oNewCol1 = document.createElement("td");
    var oNewCol2 = document.createElement("td");
    var oNewCol3 = document.createElement("td");

    oNewCol1.innerHTML = sField;
    oNewCol2.innerHTML = sNewValue;
    oNewCol3.innerHTML = sOldValue;

    oNewRow.appendChild(oNewCol1);
    oNewRow.appendChild(oNewCol2);
    oNewRow.appendChild(oNewCol3);

    oTBody.appendChild(oNewRow);
}



//for table popover
function fnOnPopupCancel() {
    modal.style.display = "none";
}
/*span.onclick = function () {
    modal.style.display = "none";
}*/
// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
//for table popover
// Quill Editor //
var aNoteSections = [];
aNoteSections.push(quill);
/*function fnQuilClick() {
    //var quil = document.getElementById("editor");
    var aContent = quill.getContents();
    var aText = quill.getText();
}*/


function fnAddNewSection() {
    var sNewScetionID = "editor" + aNoteSections.length;

    var oDiv = document.createElement("div");
    oDiv.setAttribute("id", sNewScetionID);
    oDiv.setAttribute("class", "editor");
    oDiv.setAttribute("style", "border:none;");
    var oTime = document.createElement("h2");

    var oSpan = document.createElement("span");

    oSpan.innerHTML = new moment().format('lll');
    oTime.setAttribute("class", "timeline");
    oSpan.setAttribute("class", "timeline-span");

    oTime.appendChild(oSpan);

    var oPar = document.createElement("p");

    oPar.innerHTML = "Enter notes desc....";

    oDiv.appendChild(oPar);
    var oCloseBtn = document.createElement("button");
    oCloseBtn.setAttribute("class", "close");
    oCloseBtn.setAttribute("onclick", "fnOnNoteSectionDelete()");
    oCloseBtn.innerHTML = "&times;"
    var oNoteCanvas = document.getElementById("note_canvas");
    //oNoteCanvas.appendChild(oCloseBtn);
    oNoteCanvas.appendChild(oTime);
    oNoteCanvas.appendChild(oDiv);

    var toolbarOptions = [
            'bold', 'italic', 'underline', 'strike', // toggled buttons
            'blockquote', 'code-block',
        {
            'header': 1
            }, {
            'header': 2
            }, // custom button values
        {
            'list': 'ordered'
            }, {
            'list': 'bullet'
            },

        {
            'indent': '-1'
            }, {
            'indent': '+1'
            }, // outdent/indent


        {
            'size': ['small', false, 'large', 'huge']
            }, // custom dropdown
            [{
            'header': [1, 2, 3, 4, 5, 6, false]
            }],
            'link', 'image', 'clean'
        ];
    var oNewSection = new Quill('#' + sNewScetionID, {
        theme: 'snow',
        modules: {
            toolbar: toolbarOptions
        },
    });

    aNoteSections.push(oNewSection);

    //oNoteCanvas.appendChild(oNewSection);


}
