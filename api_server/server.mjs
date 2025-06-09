import express from 'express'
import cors from 'cors'
import {readFileSync} from 'node:fs'

const app = express()

app.use(cors({
    origin: 'http://localhost:5173'
}))

let testItems = JSON.parse(readFileSync('items.json', {
    encoding: 'utf-8'
}))


function encodeIndexToLetters(index, letterCount = 3) {
    const letters = []
    let i = index
    while (i > 0) {
        letters.push(String.fromCharCode(97 + (i % 26)))
        i = Math.floor(i / 26)
    }
    i = letters.length
    while (i <= letterCount) {
        letters.push('a')
        i++
    }
    return letters.reverse().join('')
}

function generateListItem(index, letterCount = 3) {
    return {
        id: `item-${index}`,
        title: `Item ${encodeIndexToLetters(index, letterCount)} - ${index}`,
        description: `Description for item ${index}`
    }
}

app.get('/list', (req, res) => {
    const limit = parseInt(req.query.limit) || 10
    const offset = parseInt(req.query.offset) || 0
    const sleep = parseInt(req.query.sleep) || 0
    const search = req.query.search || ''
    const total = 34
    let items = []

    for (let i = 0; i < limit; i++) {
        if (i + offset < total) {
            items.push(generateListItem(i + offset))
        }
    }

    if (search) {
        items = items.filter(item => item.title.toLowerCase().includes(search.toLowerCase()))
    }

    setTimeout(() => {
        res.send({
            count: total,
            offset,
            limit,
            items
        })
    }, sleep)
})

app.get('/items', (req, res) => {
    const limit = parseInt(req.query.limit) || 10
    const offset = parseInt(req.query.offset) || 0
    const sleep = parseInt(req.query.sleep) || 0
    const search = req.query.search || ''
    let items = []

    const filtered = search ? testItems.filter(item => item.name.toLowerCase().includes(search.toLowerCase())) : testItems
    const total = filtered.length

    for (let i = 0; i < limit; i++) {
        if (i + offset < total) {
            items.push(filtered[i + offset])
        }
    }

    setTimeout(() => {
        res.send({
            count: total,
            offset,
            limit,
            items
        })
    }, sleep)
})

app.get('/item/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const item = testItems.find(item => item.id === id)
    if (!item) {
        return res.status(404).send('Item not found')
    }
    res.send(item)
})

app.listen(3000, () => {
    console.log('Example app listening on port 3000!')
})