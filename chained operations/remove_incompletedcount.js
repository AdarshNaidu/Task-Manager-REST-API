require('../src/db/mongoose')
const Task = require('../src/models/task');

// Task.deleteOne({ _id: '5e189dd158d57a0b340b780d'}).then((result) => {
//     console.log(result);
//     return Task.countDocuments({ completed: false })
// }).then((count) => {
//     console.log(count);
// }).catch((error) => {
//     console.log(error);
// })

const deleteTaskAndCount = async (id) => {
    await Task.findByIdAndDelete(id);
    const count = await Task.countDocuments({ completed: false })
    return count;
}

deleteTaskAndCount('5e18a864eca72e087c13db4f').then((count) => {
    console.log(count)
}).catch((error) => {
    console.log(error)
})