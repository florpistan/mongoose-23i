const  { Schema, model } = require('mongoose');

const userSchema = new Schema({
  username: {
    type: String,
    minlength: 2,
    maxlength: 45,
    required: [true, 'Por favor ingrese un nombre de usuario']
  },
  email: {
    type: String,
    required: [true, 'El mail es obligatorio'],
    unique: true,
    validate: {
      validator: function(email) {
        const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return emailRegex.test(email);
      },
      message: 'El valor {VALUE} no es un email válido'
    }
  },
  password: {
    type: String,
    required: [true, 'El password es obligatorio'],
    minlength: 8,
    maxlenght: 45
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Por favor confirme su contraseña'],
    validate: {
      validator: function(value) {
        return value === this.password;
      },
      message: 'Los passwords no coinciden'
    }
  },
  role: {
    type: String,
    enum: {
      values: ['user', 'admin', 'sales'],
      message: "El valor que ingresó no es correcto"
    },
    default: 'user'
  },
  passwordChangedAt: Date
})

const User = model('User', userSchema);

module.exports = User;