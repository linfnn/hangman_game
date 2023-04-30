/**
 * bắt đầu có 100*
 * chủ đề được chọn ở trang đầu: animals, birds, countries, fishs(10 rounds)
 * random, sắp xếp chuỗi câu hỏi + đáp án theo chủ đề
 * ẩn đáp án, chỉ hiện dấu gạch
 * hiện ngẫu nhiên số lượng ký tự sai và ký tự của đáp án trong 1 vùng
 * ấn đúng ký tự=> hiện đáp án trên dấu gạch, mất ký tự trong vùng
 * ấn sai ký tự=> hiệu ứng hangman tối đa 6 lần
 * trả lời đúng => hiện box qua màn + 50*
 * hint=> hiện box gợi ý - 30*
 * change => đổi câu hỏi(qua màn mới) - 30*
 * open character => hiện ký tự theo thứ tự trái sang phải - 15*
 * delete character => xóa 1 ký tự sai - 15*
 */
/**
 * answerElement lấy lần lượt ptu trong b, thay thế bằng '_'
 */

let newValue;
let corrected;
const words = {
    animals: [
    {
        id: 'elephant',
        name: 'elephant',
        hint: '',
    },
    {

    }]
}
var animals = ["elephant", "giraffe", "wolf", "penguin", "zebra", "kangaroo", "hamster", "badger", "cheetah", "panda"]
var fishes = ["jellyfish", "squid", "shark", "whale", "turtle", "dolphin", "seahorse", "salmon", "lobster", "mackerel"]
var birds = ['flamingo', 'peacock', 'swan', 'parrot', 'turkey', 'swallow', 'pigeon', 'eagle', 'hummingbird', 'pelican']
var b = [];
var round = 0;
var hiddenChar;
var type = 'animals';
var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
var answerElement = document.querySelector('.answer');
var characterElement = document.querySelector('.characters');
var answerPlace = document.querySelector('.answerPlace');
var popupElement = document.getElementById('popup')
var nextLevelElment = document.querySelector('.nextLevel')
const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
function opacities() {
    $('.head').style.opacity = 0
    $('.body').style.opacity = 0
    $('.left-arm').style.opacity = 0
    $('.right-arm').style.opacity = 0
    $('.left-leg').style.opacity = 0
    $('.right-leg').style.opacity = 0
}

function start() {
    getChar()
    replay()
    opacities()
}

fetch('./hangman.json')
.then(respone=>respone.json())
.then(data=>localStorage.setItem('animals',data[0].animals))

console.log(localStorage.getItem('animals').split(','))

function answer(a) {
    let newArr = a;
    for (let i = 0; i < a.length; i++) {
        const randomAnswer = newArr[Math.floor(Math.random() * newArr.length)]
        newArr = newArr.filter(element =>
            element != randomAnswer
        )
        b.push(randomAnswer);
    }
    return b;
}
const queryString = window.location.search;
const queryArr = queryString.replace('?b=', '')
switch (queryArr) {
    default:
        answer(animals);
        type = 'animals';
        break;
    case 'fishes':
        answer(fishes);
        type = 'fishes';
        break;
    case 'birds':
        answer(birds);
        type = 'birds'
        break;
}

hiddenChar = [...b[round]]
console.log(hiddenChar);
answerElement.innerHTML = hiddenChar.map(ele => ele = '_').join('')



for (let i = 0; i < alphabet.length; i++) {
    const para = document.createElement("button");
    para.innerText = alphabet[i];
    para.className = 'char'
    para.id = alphabet[i]
    para.style = 'width:50px; height:50px; font-size:25px; margin:8px; border: 1px solid transparent; background:linear-gradient(45deg, #94e0f5, #f98fc8)'
    const row = characterElement.querySelector(`.characters-row${Math.ceil((i + 1) / 9)}`)
    row.appendChild(para);
}

var char = document.querySelectorAll('.char')
var lives = 6;
function getChar() {
    return char.forEach(ele => ele.onclick = () => {
        var characterChosen = ele.innerText;
        newValue = [...answerElement.innerHTML].map((ch, i) => {
            if (ch == '_') {
                if (characterChosen == hiddenChar[i]) {
                    document.getElementById(`${characterChosen}`).style.visibility = 'hidden'
                    return characterChosen;
                }
                else return '_';
            } else return ch;
        }).join('')
        if (hiddenChar.includes(characterChosen) == false) {
            lives -= 1;
            console.log(lives);
            switch (lives) {
                case 5:
                    $('.head').style = 'opacity:1; transition: all 0.5s'
                    break;
                case 4:
                    $('.body').style = 'opacity:1; transition: all 0.5s'
                    break;
                case 3:
                    $('.left-arm').style = 'opacity:1; transition: all 0.5s'
                    break;
                case 2:
                    $('.right-arm').style = 'opacity:1; transition: all 0.5s'
                    break;
                case 1:
                    $('.left-leg').style = 'opacity:1; transition: all 0.5s'
                    break;
                case 0:
                    $('.right-leg').style = 'opacity:1; transition: all 0.5s'
                    $('.hangman').style.opacity = 0.3;
                    $('.content').style.opacity = 0.3;
                    $('.failedPopUp').style = 'display:block; transition: all 1s'
            }
        }
        answerElement.innerHTML = newValue;
        rule();
    })
}

function rule() {
    if (!newValue.includes('_')) {
        setImage(hiddenChar, type)
        popupElement.style = 'display:block'
        answerPlace.style = 'display:none'
        round += 1
        console.log(b[round]);
    }
    nextLevelElment.onclick = () => {
        win();
        console.log(b);
        nextLevel();
        document.querySelector('.question').innerText = `Question ${round + 1}:`
        popupElement.style = 'display:none'
        answerPlace.style = 'display:block'
        hiddenChar = b[round] ? [...b[round]] : "";
        answerElement.innerHTML = [...hiddenChar].map(ele => ele = '_').join('')
    }
}

function setImage(fileName, fillName) {
    const imgTag = document.createElement('img')
    imgTag.style = 'margin:auto; width:75%; height:75%'
    imgTag.src = `./assets/images/${fillName}/${fileName.join('')}.png`
    document.querySelector('.img').innerHTML = '';
    document.querySelector('.img').appendChild(imgTag)
}


function replay() {
    $('.tryAgain').onclick = () => {
        location.reload();
    }
}

function nextLevel() {
    lives = 6;
    opacities();
    $$('.char').forEach(ele => ele.style.visibility = 'visible')
}

function win() {
    if (round >= b.length) {
        alert('win');
    }
}

start()