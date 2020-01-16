require('../src/db/mongoose');
const User = require('../src/models/user');

// User.findByIdAndUpdate("5e18a4eee148e321dc9f625b", { age: 0 }).then((user) => {
//     console.log(user);
//     return User.countDocuments({ age: 0 })
// }).then((count) => {
//     console.log(count)
// }).catch((error) => {
//     console.log(error);
// })

const updateandcount = async (id, age) => {
    let user = await User.findByIdAndUpdate(id, { age })
    let count = await User.countDocuments({ age })
    return count;
}

updateandcount('5e18a4eee148e321dc9f625b', 10).then((count) => {
    console.log(count);
}).catch((error) => {
    console.log(error)
})
