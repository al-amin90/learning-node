// -------------------- Event driven architecture --------------------
const EventEmitter = require('events')
const myEmitter = new EventEmitter()

//listen
myEmitter.on('birthday', () => {
    console.log("happy birthday to you");
})

myEmitter.on('birthday', (gift) => {
    console.log(`i will sent you ${gift}`);
})

myEmitter.emit('birthday', 'bike')