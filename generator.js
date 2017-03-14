// console.log('hello generator');

// https://habrahabr.ru/company/dataart/blog/312638/
// https://habrahabr.ru/post/305900/#15
// https://msdn.microsoft.com/ru-ru/library/dn858237(v=vs.94).aspx
// https://habrahabr.ru/post/264345/
// https://learn.javascript.ru/generator

// generators is new function type in ES6
// suspend their execution
// return intermediate result
// resume execution
// generators contains both protocols: iterator and iterable
// generator returns iterator object
/*

 Применение
 • Написание синхронного кода.
 • Написание приостанавливаемых функций.
 • Написание комплексных итераторов.
*/

// interface Iterable {
//     [Symbol.iterator]() : Iterator;
// }
// interface Iterator {
//     next() : IteratorResult;
// }
// interface IteratorResult {
//     value: any;
//     done: boolean;
// }


// function* idMaker() {
//     console.log('* idMaker');
//     let index = 0;
//     while (index < 3) {
//         yield index++;
//
//         console.log('nea');
//
//     }
// }
//
// let gen = idMaker();
//
// console.log(gen.next());
// console.log(gen.next());
// console.log(gen.next());
// console.log(gen.next());
// console.log(gen.next());
// console.log(gen.next());






//
// function* bornTeletubbie() {
//     // console.log('not shows on creation, but shows on .next()');
//     // console.log('Run!');
//     yield 'Tinky Winky';
//
//     // console.log('still alive');
//     yield 'Dipsy';
//
//     // console.log('another one born');
//
//     return 'freddy krueger';
//     yield 'Laa-Laa';
//     yield 'Po';
//
//     // console.log('to be continued');
// }
//
// let teleMaker = bornTeletubbie();
//
// // console.log(teleMaker.next());
// // console.log(teleMaker.next());
// // console.log(teleMaker.next());
// // console.log(teleMaker.next());
// // console.log(teleMaker.next());
// // console.log(teleMaker.next());
// // console.log(teleMaker.next());
// // console.log(teleMaker.next());
//
//
// // let rangeIterator = range[Symbol.iterator]();
// while(true) {
//     let result = teleMaker.next();
//     console.error(result.value);
//     if (result.done) break;
// }

//
// for (let name of bornTeletubbie()) {
//     console.info('welcome', name);
// }








// yield returns value;

// function* asyncGen() {
//
//     console.log('yield', yield 'first');
//     // let y2 = yield 'second';
//     // console.log('yield', y2);
//     // let y3 = yield 'third';
//     // console.log('yield', y3);
// }
//
// let gen = asyncGen();

// console.log(gen.next());
// console.log(gen.next('2'));
// console.log(gen.next('3'));
// console.log(gen.next('4'));



// // Композиция генераторов
// function* generateSequence(start, end) {
//     for (let i = start; i <= end; i++) yield i;
// }
// //
// function* generateAlphaNum() {
//     // 0..9
//     yield* generateSequence(48, 57);
//     // for (let i = 48; i <= 57; i++) yield i;
//
//     // A..Z
//     yield* generateSequence(65, 90);
//
//     // a..z
//     yield* generateSequence(97, 122);
// }

// let str = '';
//
// let iter = generateAlphaNum();
//
// console.log(iter.next());
// console.log(iter.next());
// console.log(iter.next());
// console.log(iter.next());
// console.log(iter.next());



// for(let code of generateAlphaNum()) {
//     str += String.fromCharCode(code);
//     // console.log(code);
// }
// //
// console.log(str); // 0..9A..Za..z
//
//


// function* gen() {
//     try {
//         // в этой строке возникнет ошибка
//         let result = yield "Сколько будет 2 + 2?"; // (**)
//
//         alert("выше будет исключение ^^^");
//     } catch(e) {
//         alert(e); // выведет ошибку
//     }
// }
//
// let generator = gen();
//
// let question = generator.next().value;
//
// generator.throw(new Error("ответ не найден в моей базе данных")); // (*)








// // генератор для получения и показа аватара
// // он yield'ит промисы
// function* showUserAvatar() {
//
//     let userFetch = yield fetch('user.json');
//     let userInfo = yield userFetch.json();
//
//     let githubFetch = yield fetch(`https://api.github.com/users/${userInfo.name}`);
//     let githubUserInfo = yield githubFetch.json();
//
//     let img = new Image();
//     img.src = githubUserInfo.avatar_url;
//     img.className = "promise-avatar-example";
//     document.body.appendChild(img);
//
//     yield new Promise(resolve => setTimeout(resolve, 3000));
//
//     img.remove();
//
//     return img.src;
// }
//
// // вспомогательная функция-чернорабочий
// // для выполнения промисов из generator
// function execute(generator, yieldValue) {
//
//     let next = generator.next(yieldValue);
//
//     if (!next.done) {
//         next.value.then(
//             result => execute(generator, result),
//             err => generator.throw(err)
//         );
//     } else {
//         // обработаем результат return из генератора
//         // обычно здесь вызов callback или что-то в этом духе
//         alert(next.value);
//     }
//
// }
//
// execute( showUserAvatar() );