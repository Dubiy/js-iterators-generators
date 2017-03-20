//promises
// fetch('https://api.github.com/users/dubiy/repos')
//     .then(function(response) {
//         response.json().then(function(json) {
//             console.log(json);
//         });
//     });

//fetch returns promise.
//.json() returns promise





//yield promise
// function* getRepos() {
//     let rawData = yield fetch('https://api.github.com/users/dubiy/repos');
//     return yield rawData.json();
// }
//
// function execute(generator, yieldValue) {
//     let next = generator.next(yieldValue);
//     if (!next.done) {
//         next.value.then(
//             result => execute(generator, result),
//             err => generator.throw(err)
//         );
//     } else {
//         console.log('generator', next.value);
//     }
//
// }
//
// execute(getRepos());


//get first repository of last follower

// co(function*() {
//     let rawData = yield fetch('https://api.github.com/users/Dubiy/followers');
//     let followers = yield rawData.json();
//     let lastFollower = followers.pop();
//
//     let followerRepos = yield fetch(`https://api.github.com/users/${lastFollower.login}/repos`);
//     let repos = yield followerRepos.json();
//     let firstRepo = repos.pop();
//
//     showRepoInfo(firstRepo);
//     return firstRepo;
// }).then(alert); // 1


// fetch('https://api.github.com/users/Dubiy/followers')
//     .then(function(response) {
//         response.json().then(function(followers) {
//             let lastFollower = followers.pop();
//             fetch(`https://api.github.com/users/${lastFollower.login}/repos`)
//                 .then(function(response) {
//                     response.json().then(function(repos) {
//                         showRepoInfo(repos.pop());
//                     });
//                 });
//         });
//     });

// co(function*() {
//     let followers = yield(yield fetch('https://api.github.com/users/Dubiy/followers')).json();
//     let repos = yield(yield fetch(`https://api.github.com/users/${followers.pop().login}/repos`)).json();
//     return showRepoInfo(repos.pop());
// }).then(alert); // 1

// (async function(request, response) {
//     try {
//         let followers = await (await fetch('https://api.github.com/users/Dubiy/followers')).json();
//         let repos = await (await fetch(`https://api.github.com/users/${followers.pop().login}/repos`)).json();
//         return showRepoInfo(repos.pop());
//     } catch(err) {
//         response.send(err);
//     }
// })();

function showRepoInfo(repo) {
    console.log("%c" + repo.name, "color: gray; font-family: sans-serif; font-size: 4.5em; font-weight: bolder; text-shadow: #000 1px 1px;");
    console.log("%c" + repo.description, "color: blue; font-family: sans-serif; font-size: 2.5em; font-weight: bolder; text-shadow: #000 1px 1px;");
    var image = new Image();
    image.onload = function() {
        var style = [
            'font-size: 1px;',
            'line-height: ' + this.height + 'px;',
            'padding: ' + this.height * .5 + 'px ' + this.width * .5 + 'px;',
            'background-size: ' + this.width + 'px ' + this.height + 'px;',
            'background: url('+ repo.owner.avatar_url +');'
        ].join(' ');
        console.log('%c', style);
    };
    image.src = repo.owner.avatar_url;
    return repo;
}



//async await

//The simplest explanation of how this works is that await takes a promise, waits for it's value to be available, and then returns that value.



// async function getData(request, response) {
//     try {
//         let json = await (await fetch('https://api.github.com/users/dubiy/repos')).json();
//         console.log(json);
//         return json;
//     } catch(err) {
//         response.send(err);
//     }
// }
//
// getData();



//example
// > create user
// < get user apikey
// > upload avatar
// < get avatar url


// > create event
// < get event id
// > create reminder for that event
// < get reminder uuid
