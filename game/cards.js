

// Game Stuff
// // Cards
const cards = []
// // // Services
const cutServe = {
    title: 'Cut Serve',
    type: 'serve',
    action: false,
    descr: 'A serve which alters direction when hitting the net.',
    atk: 10,
    def: 0,
    per: 25
};
cards.push(cutServe);
const fwango = {
    title: 'Fwango',
    type: 'serve',
    action: false,
    descr: 'Tossing the ball to the wrong side, hitting it while reaching across the body.',
    atk: 8,
    def: 0,
    per: 35
};
cards.push(fwango);
const leftyServe = {
    title: 'Lefty',
    type: 'serve',
    action: false,
    descr: 'Hitting the ball with the `so called weak` hand.',
    atk: 6,
    def: 0,
    per: 40
};
cards.push(leftyServe);
const safeServe = {
    title: 'Safe Serve',
    type: 'serve',
    action: false,
    descr: 'Just hit the god damn net!',
    atk: 4,
    def: 0,
    per: 99
};
cards.push(safeServe);
// // // Service Actions
const bodyFake = {
    title: 'Body Fake',
    type: 'serve',
    action: true,
    descr: 'Moving the body to fake out the opponent.',
    atk: 2,
    def: 0,
    per: 50
};
cards.push(bodyFake);
const tossFake = {
    title: 'Toss Fake',
    type: 'serve',
    action: true,
    descr: 'Pretending to toss the ball but holding on to it.',
    atk: 2,
    def: 0,
    per: 90
};
cards.push(tossFake);

// // // Recieves
const recieve = {
    title: 'Recieve',
    type: 'recieve',
    action: false,
    descr: 'Recieving a serve.',
    atk: 2,
    def: 7,
    per: 90
};
cards.push(recieve);

const bodyBlock = {
    title: 'Body Block',
    type: 'recieve',
    action: false,
    desrc: 'Blocking the ball with the body!',
    atk: 1,
    def: 6,
    per: 60
};
cards.push(bodyBlock);

const runForIt = {
    title: 'Run for it',
    type: 'recieve',
    action: false,
    descr: 'Chasing after the ball way off the net!',
    atk: 0,
    def: 5,
    per: 50
};
cards.push(runForIt);

const badTouch = {
    title: 'Bad Touch',
    type: 'recieve',
    action: false,
    descr: 'No words .. ',
    atk: 0,
    def: 1,
    per: 100
};
cards.push(badTouch);



// // // Sets
const basic_set = {
    title: 'Basic Set',
    type: 'set',
    action: false,
    descr: 'Setting the ball up for your teammate!',
    atk: 3,
    def: 3,
    per: 90
};
cards.push(basic_set);
const centeredSet = {
    title: 'Centered Set',
    type: 'set',
    action: false,
    descr: 'Your teammate just needs to hit the net now .. ',
    atk: 8,
    def: 4,
    per: 80
};
cards.push(centeredSet);
// // // Attacks 
const basic_hit = {
    title: 'Basic Hit',
    type: 'attack',
    action: false,
    descr: 'A basic hit on the net.',
    atk: 3,
    def: 0,
    per: 95
};
cards.push(basic_hit);



const gameInfo = {
    name: 'Test',
    cards: [
        // Serves
        cutServe, fwango, leftyServe, safeServe,
        // Recieves
        recieve, recieve, recieve, recieve, badTouch, runForIt, bodyBlock,
        // Sets
        basic_set, basic_set, basic_set, centeredSet,
        // Attacks
        basic_hit, basic_hit, basic_hit, basic_hit,
        // Actions
        bodyFake, tossFake
    ]
};


module.exports = cards;
module.exports = gameInfo;