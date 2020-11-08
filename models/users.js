const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const UserSchema = new Schema(
    {
       firstname: String,
       lastname: String,
       email: String,
       dni: {
           type: Number,
           unique: true
       } ,
       rol: {
           type: String,
           enum: [
               'ADMIN', 'USER', 'SUPER'
           ],
           default: 'USER',
           set: v => v.toUpperCase()
       },
       password: {
           type: String,
           set: b => bcrypt.hashSync(b, 8),
           required: true
       } ,
       lastSession: Date
    },
    {
        timestamps: true, 
        toObject: {
            virtuals:true
        }
    }
)

UserSchema.method({
    checkPassword(pass){
     return bcrypt.compareSync(pass, this.password)
    },
    toJSON() {
        let obj = this.toObject()
        delete obj.password
        delete obj.__v
        return obj
    }
})

module.exports = UserSchema