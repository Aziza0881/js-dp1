import moment from "moment"
import { getData } from "./modules/http"
import { createHeader, reload, reloadTransactions, toaster } from "./modules/ui"
let user = JSON.parse(localStorage.getItem('user'))
import { toProcentages } from "./modules/funcs";

let body = document.querySelector('.header')
const tbody = document.querySelector('#latest_transactions_tbody')
createHeader(body)





let user_view = document.querySelector('#user')
let email_view = document.querySelector('.email')
let emailHeader_view = document.querySelector('.user_mail')
let rel = document.querySelector('.reload')

// reload(array, rel)

getData('/wallets?user_id=' + user.id)
.then(res => {
    if (res.status === 200 || res.status === 201) {
        reload(res.data.slice(0, 4), rel);
    }
})
getData('/transactions?user_id=' + user.id)
.then(res => {
    if (res.status === 200 || res.status === 201) {
        reloadTransactions(res.data, tbody, 'small');
    }
})




const dates = []
const totals = []

getData('/transactions?wallet_id=' + wallet_id)
    .then(res => {
        res.data.forEach(item => {
            let dateMin = item.created_at.split(',').at(0)
            const date = `${dateMin.slice(0, 4)}-${dateMin.slice(4, 6)}-${dateMin.slice(6)}`
            if (dates.length < 7) {
                dates.push(date)
            } else {
                dates.shift()
                dates.push(date)
            }

            if (totals.length < 7) {
                totals.push(item.total)
            } else {
                totals.shift()
                totals.push(item.total)
            }

        });

        transactionsChart(dates, totals)
    })


const ctx = document.getElementById('myChart');
function transactionsChart(labels, values) {

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: '# of Votes',
                data: values,
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}