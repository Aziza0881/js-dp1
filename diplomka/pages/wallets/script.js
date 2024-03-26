import { getData } from "../../modules/http"
import { createHeader, reload } from "../../modules/ui"
let user = JSON.parse(localStorage.getItem('user'))
import { reloadTransactions, toaster } from "../../modules/ui"

createHeader()

let wrap = document.querySelector('.reload')
let add = document.querySelector('.add')

getData('/wallets?user_id=' + user.id)
    .then(res => {
        if(res.status === 201 || res.status === 200) {
            reload(res.data, wrap)
            wrap_reload.append(add)
        }
    })

    const tbody = document.querySelector('#latest_transactions_tbody')

    getData('/transactions?user_id=' + user.id)
    .then(res => {
        if (res.status === 200 || res.status === 201) {
            reloadTransactions(res.data, tbody, 'small');
        }
    })
    


    
    export function toProcentages(arr) {
        let total = 0
        for (let item of arr) {
            total += item
        }
        return arr.map(function (x) {
            return parseFloat((x * 100 / total).toFixed(2))
        })
    }


    const empty_chart = document.querySelector('#empty_chart')

function emptyChart() {
    new Chart(empty_chart, {
        type: 'line',
        data: {
            labels: ['Nov 15', 'Nov 16', 'Nov 17', 'Nov 18', 'Nov 19', 'Nov 20', 'Nov 21', 'Nov 22'],
            datasets: [{
                label: 'total',
                data: [15000, 32000, 10000, 42000, 19000, 50000, 22000, 79000],
                fill: false,
                borderColor: '#0097E8',
                tension: 0.4
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

emptyChart()
    

