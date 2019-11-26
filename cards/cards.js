slog('.[background: lightgreen; color: black; font-size: 20px;]Cards.js.[background: lightgreen; color: black; font-weight: bold; font-size: 15px] Creator: JoeTheHobo  Version: 1')
let suits = ['Hearts','Spades','Clubs','Diamonds'];
let numbers = ['A','2','3','4','5','6','7','8','9','10','j','q','k'];
class container {
    constructor(amt) {
        this.type = 'container';
        this.play_space = false;
        this.decks = [];
        for (let i = 0; i < amt; i++) {
            this.decks.push(new deck('empty',false,i + 1));
        }
    }
    draw(deck,amt = 1,visible, visible2) {
        if (!isNaN(amt)) { //draw(main,2,true)
            for (let i = 0; i < this.decks.length; i++) {
                this.decks[i].draw(deck,amt,visible);
            }
        } else {
            if (typeof amt == 'object') { //draw(main,new deck(),1,true)
                this.decks.push(amt);
                if (this.play_space)this.decks[this.decks.length - 1].addSpace(this.play_space);
                this.decks[this.decks.length - 1].draw(deck,1,visible2);
            } else {
                this.decks[deck - 1].draw(deck,1,visible);
            }
        }
    }
    deck(which) {
        for (let i = 0; i < this.decks.length; i++) {
            if (this.decks[i].name == which) {
                return this.decks[i];
            }
        }
    }
    addSpace(playSpace) {
        this.play_space = playSpace;
        for (let i = 0; i < this.decks.length; i++) {
            this.decks[i].addSpace(playSpace);
        }
    }
    style(obj) {
        for (let i = 0; i < this.decks.length; i++) {
            this.decks[i].style(obj);
        }
    }
}
class card {
    constructor(number,suit,visible = false) {
        this.type = 'card';
        return {
            suit: suit,
            number: number,
            visible: visible,
        };
    }
}
class deck {
    constructor(obj = 'empty',visible = false,name = 'untitled') {
        this.name = name;
        this.onStyle = false;
        this.type = 'deck';
        this.topCard = false;
        this.play_space = false;
        this.deck = [];
        this.onClick = null;
        this.onDrag = false;
        this.drops = [];
        switch (obj) {
            case 'standard': 
                for (let i = 0; i < suits.length; i++) {
                    for (let j = 0; j < numbers.length; j++) {
                        this.deck.push(new card(numbers[j],suits[i],visible))
                    }
                }
                break;
            case 'standard+': 
                for (let i = 0; i < suits.length; i++) {
                    for (let j = 0; j < numbers.length; j++) {
                        this.deck.push(new card(numbers[j],suits[i]),visible)
                    }
                }
                this.deck.push(new card('Joker','Red'));
                this.deck.push(new card('Joker','Black'));
                break;
            case 'empty': 
                break;
        }
        this.length = this.deck.length;
        this.topCard = this.deck[this.length - 1];
    }
    shuffle() {
        this.deck.shuffle();
        this.topCard = this.deck[this.length - 1];
        if (this.play_space) this.play_space.update();
    }
    add(card) {
        this.deck.push(card);
        this.length = this.deck.length;
        this.topCard = this.deck[this.length - 1];
        if (this.play_space) this.play_space.update();
    }
    flip() {
        this.deck[this.deck.length - 1].visible = this.deck[this.deck.length - 1].visible == true ? false : true;
        if (this.play_space) this.play_space.update();
    }
    draw(deck,amt = 1,visible) {
        if (deck.length > 0) {
            for (let i = 0; i < amt; i++) {
                this.add(deck.deck[deck.deck.length - 1]);
                if (visible == true && this.deck[this.deck.length - 1].visible == false) {
                    this.flip();
                } else if (visible == false && this.deck[this.deck.length - 1].visible == true) {
                    this.flip();
                }
                deck.deck.pop();
            }
            this.length = this.deck.length;
            deck.length = deck.deck.length;
            this.topCard = this.deck[this.length - 1];
            if (this.play_space) this.play_space.update();
        }
    }
    drawUnder(deck,amt = 1,visible) {
        for (let i = 0; i < amt; i++) {
            this.add(deck.deck[0]);
            if (visible == true && this.deck[this.deck.length - 1].visible == false) {
                this.flip();
            } else if (visible == false && this.deck[this.deck.length - 1].visible == true) {
                this.flip();
            }
            deck.deck.shift();
        }
        this.length = this.deck.length;
        deck.length = deck.deck.length;
        this.topCard = this.deck[this.length - 1];
        if (this.play_space) this.play_space.update();
    }
    deal(arr,amt = (this.deck.length) / 2,visible) {
        let on = 0;
        for (let i = 0; i < amt * 2; i++) {
            arr[on].draw(this);
            if (visible) arr[on].flip();
            on++;
            if (on > arr.length - 1) on = 0;
        }
        this.length = this.deck.length;
        this.topCard = this.deck[this.length - 1];
        if (this.play_space) this.play_space.update();
    }
    pressed(func) {
        this.onClick = func;
        if (this.play_space) this.play_space.update();
    }
    addSpace(playSpace) {
        this.play_space = playSpace;
        if (this.play_space) this.play_space.update();
    }
    style(obj) {
        this.onStyle = obj;
    }
    drag(set) {
        this.onDrag = set;
    }
    drop(where,confirm) {
        this.drops.push({deck: where, confrim: confirm})
    }
}
class playSpace {
    constructor(map,where) {
        this.map = where ? map : false;
        this.area = where ? where : map;
        if (where) this.update();
    }
    set(map,update) {
        this.map = map;
        if (update) this.update();
    }
    update() {
        let top = 0;
        let left = 0;
        this.area.innerHTML = '';
        let b = this.area;
        for (let i = 0; i < this.map.length; i++) {
            top++;
            left = 0;
            for (let j = 0; j < this.map[i].length; j++) {
                left++;
                if (this.map[i][j].type == 'deck') {
                    let use = this.map[i][j];
                    this.createCard(b,use,left,top,0);
                } else if (this.map[i][j].type == 'container') {
                    for (let k = 0; k < this.map[i][j].decks.length; k++) {
                        let c = this.map[i][j].decks[k];
                        this.createCard(b,c,left,top,k);
                    }
                    left+=this.map[i][j].decks.length;
                }
            }
        }
    }
    createCard(b,use,left,top,k = 0, p = null,used = false) { //area, parent, left pos, top pos, 
        if (use.onStyle.expand && used == false) {
            for (let p = 0; p < use.length; p++) {
                this.createCard(b,use,left,top,k,p,true)
            }
        } else {
            let add = [0,0];
            if (use.onStyle.expand == 'down') add[1] = 20;
            if (use.onStyle.expand == 'up') add[1] = -20;
            if (use.onStyle.expand == 'left') add[0] = -20;
            if (use.onStyle.expand == 'right') add[0] = 20;

            let visible = p !== null ? p : use.deck.length - 1;
            if(p===null)p=0;

            let card = b.create('div').css({
                height: 120,
                width: 85,
                margin: 5,
                top: top * 125 + (p * add[1]),
                left: left * 90 + (k * 90) + (p * add[0]),
                position: 'absolute',
                cursor: 'pointer',
            });
            if (use.onClick !== null) {
                card.on('click',function() {
                    use.onClick();
                })
            }
            if (use.deck.length > 0) {
                let src = use.deck[visible].visible ? 'img/card face.png' : 'img/card back.png';
                card.create('img').SRC(src).css({
                    height: 120,
                });
                if (src === 'img/card face.png') {
                    card.css({
                        border: '1px solid black',
                        width: 86,
                        borderRadius: 3,
                    })
                    card.create('img').SRC(`img/${use.deck[use.deck.length - 1].number}.png`).css({
                        position: 'absolute',
                        height: 45,
                        marginLeft: -80,
                        marginTop: 70,
                    })
                    card.create('img').SRC(`img/${use.deck[use.deck.length - 1].suit}.png`).css({
                        position: 'absolute',
                        height: 45,
                        marginLeft: -60,
                        marginTop: 10,
                    })
                }
            }
        }
    }
}
function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
}



//Making solitaire
let game_solitaire = new playSpace($('playSpace'));
let main = new deck('standard');
main.shuffle();
let discard = new deck();
let feild = new container(7);
let hotSpot = new container(4);
for (let i = 0; i < feild.decks.length; i++) {
    feild.deck(i + 1).draw(main, i + 1, false);
    feild.deck(i + 1).flip();
}

main.addSpace(game_solitaire);
discard.addSpace(game_solitaire);
feild.addSpace(game_solitaire);
hotSpot.addSpace(game_solitaire)

feild.style({
    expand: 'down',
})

discard.drag(true);
discard.drop(main,function() {
    return true;
})

main.pressed(function() {
    discard.draw(main,1,true)
})

game_solitaire.set([
    [hotSpot,discard,main],
    [feild]
],true)


/*

//Blank Jack
let value = 0;

let game_blackjack = new playSpace($('playSpace'));
let main = new deck('standard');
main.shuffle();
let hand = new container(2);
hand.draw(main,1,true);

value = 0;
for (let i = 0; i < hand.length; i++) {
    value += numbers.indexOf(hand.deck[i].number);
}

main.addSpace(game_blackjack);
hand.addSpace(game_blackjack)

main.pressed(function() {
    hand.draw(main,new deck('empty',false,hand.decks.length + 1),1,true);
    value = 0;
    let includes = 0;
    for (let i = 0; i < hand.decks.length; i++) {
        value += numbers.indexOf(hand.deck(i + 1).deck[0].number) + 1;
        if (hand.deck(i + 1).deck[0].number == 'A') {
            value += 9;
            includes++;
        }
    }
    if (value > 21) {
        while (value > 21 && includes !== 0) {
            value -= 9;
            includes--;
        }
        if (value > 21) alert('you lose');
    }
})

game_blackjack.set([
    [main],
    [hand]
],true)

*/

/*

//Making game garbage
let game_garbage = new playSpace($('playSpace'));
let main,
    discard,
    player1,
    player1Hand;

let amt = 10;
let found = 0;
game();

function game() {

    main = new deck('standard');
    main.shuffle();
    discard = new deck();
    player1 = new container(amt);
    player1.draw(main,1,false);
    player1Hand = new deck();

    main.addSpace(game_garbage);
    discard.addSpace(game_garbage);
    player1.addSpace(game_garbage);
    player1Hand.addSpace(game_garbage);

    main.pressed(function() {
        if (player1Hand.length < 1) {
            player1Hand.draw(main,1,true);
        }
    })
    discard.pressed(function() {
        if (player1Hand.length > 0) {
            discard.draw(player1Hand,1,true);
        }
    })
    for (let i = 0; i < amt; i++) {
        player1.deck(i + 1).pressed(function() {
            if (player1Hand.length > 0 && player1Hand.topCard.number == numbers[i] && player1.deck(i + 1).topCard.visible == false) {
                player1Hand.draw(player1.deck(i + 1),1,true);
                player1.deck(i + 1).drawUnder(player1Hand,1,true)
                found++;
                if (found == amt) {
                    found = 0;
                    amt--;
                    game();
                }
            }
        })
    }

    game_garbage.set([
        [main,discard],
        [player1],
        [player1Hand],
    ],true)
}
*/