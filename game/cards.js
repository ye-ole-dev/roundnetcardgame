

// Game Stuff
// // Cards
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
const fwango = {
    title: 'Fwango',
    type: 'serve',
    action: false,
    descr: 'Tossing the ball to the wrong side, hitting it while reaching across the body.',
    atk: 8,
    def: 0,
    per: 35
};
const leftyServe = {
    title: 'Lefty',
    type: 'serve',
    action: false,
    descr: 'Hitting the ball with the `so called weak` hand.',
    atk: 6,
    def: 0,
    per: 40
};
const safeServe = {
    title: 'Safe Serve',
    type: 'serve',
    action: false,
    descr: 'Just hit the god damn net!',
    atk: 4,
    def: 0,
    per: 99
};
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
const tossFake = {
    title: 'Toss Fake',
    type: 'serve',
    action: true,
    descr: 'Pretending to toss the ball but holding on to it.',
    atk: 2,
    def: 0,
    per: 90
};

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




const gameInfo = {
    name: 'Test',
    cards: [
        // Serves
        cutServe, fwango, leftyServe, safeServe,
        // Recieves
        recieve, recieve, recieve, recieve, recieve,
        // Sets
        basic_set, basic_set, basic_set,
        // Attacks
        basic_hit, basic_hit, basic_hit, basic_hit,
        // Actions
        bodyFake, tossFake
    ]
};



module.exports = gameInfo;