const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        default: 0,
    },

    phone: {
        type: String,
        required: true,
    },
    designation: {
        type: String,
        required: true,
        emnum: ['Developer', 'Designer']
    },
    isActive: {
        type: Boolean,
        default: true
    }

},
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Employees', employeeSchema);