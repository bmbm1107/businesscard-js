let allCard = document.querySelectorAll('.Nv2PK.THOPZb.CpccDe')
let listOfCards = Array.from(allCard)
let wait = 2500;
let result = []

for (let card of listOfCards) {

    card.firstChild.click()
    await new Promise((resolve) => setTimeout(resolve, wait));


    const BusinessCard = {
        businessName: card.firstChild.attributes[1].value,
        businessAdress: (() => {
            return document.querySelector("button[data-item-id='address']").ariaLabel
        })(),

        businessWebsite: (() => {
            if (document.querySelector("a[data-item-id='authority']")) { return document.querySelector("a[data-item-id='authority']").href }


        })(),

    }

    result.push(BusinessCard)
}

console.table(result)

let csvContent = "data:text/csv;charset=utf-8,"
    + Object.keys(result[0]).join(",") + "\n"
    + result.map(obj => Object.values(obj).map(val => `"${val}"`).join(",")).join("\n");

// Create a download link
let encodedUri = encodeURI(csvContent);
let link = document.createElement("a");
link.setAttribute("href", encodedUri);
link.setAttribute("download", "business_cards.csv");
document.body.appendChild(link);

// Trigger download
link.click();