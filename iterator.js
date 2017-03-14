// console.log('hello iterator');

/**
 * Итератор — структура данных, которая «указывает» на некоторый элемент контейнера, и (для некоторых контейнеров) умеет переходить к предыдущему/следующему элементу.
 * Итерируемые или, иными словами, «перебираемые» объекты – это те, содержимое которых можно перебрать в цикле.
 * Например, перебираемым объектом является массив. Но не только он. В браузере существует множество объектов, которые не являются массивами, но содержимое которых можно перебрать (к примеру, список DOM-узлов).
 * Теперь все, что можно перебрать, – итерируемый объект (iterable).
 * Все, что не перебирается само по себе, — можно заставить с помощью своего Symbol.iterator.
 * Для перебора таких объектов добавлен новый синтаксис цикла: for..of.
 */
// Array.prototype.hello = 'Privet';

// Array.hello = 'privet';
// let list = [3, 5, 7];
// list.foo = 'bar';
//
// // console.dir(list);


//
// for (let key in list) {
//     console.log('for..in', key, list[key]);
// }
//
//
// // Possible iteration over unexpected (custom / inherited) members, probably missing hasOwnProperty check
// // Checks for any instances of unfiltered for-in loops in JavaScript. The use of this construct results in processing inherited or unexpected properties.
// // You need to filter own properties with hasOwnProperty() method. The validation works in JavaScript, html or jsp files.
//
// for (let key in list) {
//     if (list.hasOwnProperty(key)) {
//         console.log('for..in + hasOwnProperty', key, list[key]);
//     }
// }
//



//as iterable
// for (let value of list) {
//     console.log('for..of', value);
// }


//В отличие от массивов, «перебираемые» объекты могут не иметь «длины» length. Как мы увидим далее, итераторы дают возможность сделать «перебираемыми» любые объекты.




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



//Вбудовані ітератори


// let arr = [11,12,13];
// console.log(arr);
// //
// let itr = arr[Symbol.iterator]();
// console.log(itr);
//
// itr.next();
//
// for (let value of itr) {
//     console.log(value);
// }
//
// itr.next(); // { value: 11, done: false }
// itr.next(); // { value: 12, done: false }
// itr.next(); // { value: 13, done: false }
//
// itr.next(); // { value: undefined, done: true }




let myFn = (...args) => {
    console.log('myFn executes. args:', args);
    return args[Symbol.iterator]();

};
//
// for (let arg of myFn(1, 'hello', a => a*5, 10, 11, 12 )) {
//     console.log('arg', arg);
// }
// //
// let argIterator = myFn(1, 'hello', a => a*5, 10, 11, 12 );
// while (true) {
//     let iterator = argIterator.next();
//     if (iterator.done) {
//         break;
//     }
//
//     console.log('arg from iterator', iterator.value);
// }




// let itr = myFn(1, 'hello', a => a*5, 10, 11, 12 );
//
// itr.next();
// itr.next();
//
// showRemainingItems(itr);
//
// function showRemainingItems(iterator) {
//     for (arg of iterator) {
//         console.log('arg', arg);
//     }
// }
//







// let itr = "qwerty"[Symbol.iterator]();



// let str = "Hello";

// Делает то же, что и
// for (var letter of str) console.log(letter);


// let iterator = str[Symbol.iterator]();
//
// while(true) {
//     let result = iterator.next();
//     if (result.done) break;
//     console.log(result.value); // Выведет все буквы по очереди
// }



//Custom iterator
//for..of, .next()

//Для возможности использовать объект в for..of нужно создать в нём свойство с названием Symbol.iterator (системный символ).
//При вызове метода Symbol.iterator перебираемый объект должен возвращать другой объект («итератор»), который умеет осуществлять перебор.
//По стандарту у такого объекта должен быть метод next(), который при каждом вызове возвращает очередное значение и окончен ли перебор

let range = {
    from: 4,
    to: 9
};

range[Symbol.iterator] = function() {

    let current = this.from;
    let last = this.to;

//     // must return object with method next()
    return {
        next() {
            if (current <= last) {
                return {
                    done: false,
                    value: current++
                };
            } else {
                return {
                    done: true
                };
            }
        }
    }
};

// for (let num of range) {
//     console.log(num);
// }
//
// let rangeIterator = range[Symbol.iterator]();
// while(true) {
//     let result = rangeIterator.next();
//     if (result.done) break;
//     alert(result.value);
// }


//
// function makeIterator(array){
//     let nextIndex = 0;
//
//     return {
//         next: function(){
//             return nextIndex < array.length ?
//                 {value: array[nextIndex++], done: false} :
//                 {done: true};
//         }
//     }
// }
//
// let it = makeIterator(['yo', 'ya', '2222']);
// console.log(it.next().value); // 'yo'
// console.log(it.next().value); // 'ya'
// console.log(it.next().value); // 'ya'
// console.log(it.next().done);  // true


//endless iterator
let randmr = {
    from: 50,
    to: 60
};

randmr[Symbol.iterator] = function() {
    return {
        next: () => {
            return {
                done: false,
                value: parseInt(Math.random() * (this.to - this.from)  + this.from)
            };
        }
    }
};

let i = 0;
for (let rand of randmr) {
    console.log('rand', rand);
    if (i++ > 30) break;
}
