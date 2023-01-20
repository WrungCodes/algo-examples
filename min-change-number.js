const value = 6;
const nums = [1, 2, 4]

function calculateMinChangeNumber(value, denoms){
    const numOfChangeArray = Array(value + 1).fill(Number.MAX_SAFE_INTEGER)
    numOfChangeArray[0] = 0

    denoms.forEach(denom => {
        for (let amount = 0; amount < numOfChangeArray.length; amount++) {
            if(denom <= amount){
                numOfChangeArray[amount] = Math.min(numOfChangeArray[amount], 1 + numOfChangeArray[amount - denom])
            }
        }
    });

    return numOfChangeArray[value]
}

// console.log(calculateMinChangeNumber(6, [1, 2, 4]))

// Knapsack Problem

function knapsackProblem(items, maxCapacity){
    const values = Array.from(Array(items.length + 1).fill(0), () => new Array(maxCapacity + 1).fill(0))
    for (let item = 1; item < items.length + 1; item++) {
        const currentWeight = items[item - 1][1];
        const currentValue = items[item - 1][0];
        for (let capacity = 1; capacity < maxCapacity + 1; capacity++) {
            if (currentWeight > capacity) {
                values[item][capacity] = values[item - 1][capacity]
            }
            else
            {
                values[item][capacity] = Math.max(values[item - 1][capacity], values[item - 1][capacity - currentWeight] + currentValue)
            }
        }
    }

    // get knapsack items
    const sequence = []

    let item = values.length - 1
    let capacity = values[0].length - 1

    while (item > 0) {
        if(values[item][capacity] == values[item - 1][capacity]) {
            item -= 1
        }else {
            sequence.push(item - 1)
            capacity -= items[item - 1][1]
            item -= 1
        }

        if (capacity == 0) break
    }
    
    return [values[items.length][maxCapacity], sequence]
}

// console.log(knapsackProblem([[1,2], [4,3], [5,6], [6,7]], 10))

function KTransaction(prices, transactions){
    const profits = Array.from(Array(transactions + 1).fill(0), () => new Array(prices.length).fill(0))

    for (let t = 1; t < transactions + 1; t++) { // i is for day
        let max = Number.NEGATIVE_INFINITY
        for (let i = 1; i < prices.length ; i++) {
            max = Math.max( max, ( profits[t - 1][i - 1] - prices[i - 1] ) )
            profits[t][i] = Math.max(profits[t][i - 1], (prices[i] + max))   
        }
    }

    console.log(profits)

    return profits[transactions][prices.length - 1]
}

function calculateMaxProfit(profits, prices, t, i) {
    let largest = null
    for (let index = 0; index < i; index++) {
        const value = - prices[index] + profits[t - 1][index]

        if(largest == null || value > largest){
            largest = value
        }
    }
    return largest
}

// console.log(KTransaction([5, 11, 3, 50, 60, 90], 2))

function longestStringWithoutDuplication(string){
    const lastSeen = {}
    const longest = [0, 1]
    let startIndex = 0

    for(const [i, character] of  Object.entries(string)){

        if(lastSeen[character] == undefined )
        {
            startIndex = Math.max(startIndex, lastSeen[character] + 1)
        }

        if((longest[1] - longest[0]) < i + 1 - startIndex)
        {
            longest = [startIndex, i + 1]
        }

        lastSeen[character] = i
    }

    return string.substr(longest[0], longest[1] - longest[0])
}