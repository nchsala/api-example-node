const   sharp = require('sharp'),
        fs = require('fs'),
        path = require('path'),
        crypto = require('crypto'),
        getRand = c => c[ Math.round( Math.random() * (c.length - 1) ) ]

var colors = [ '#61BD6D', '#1ABC9C', '#54ACD2', '#2C82C9', '#9365B8', '#475577',
               '#553982', '#28324E', '#2969B0', '#E14938', '#B8312F', '#D14841', 
               '#F37934', '#FBA026', '#00A885', '#3D8EB9', '#41A85F', '#FAC51C' ]

/**
 * Genera imagen de color aleatoreo con iniciales del nombre
 * @param {String} firstname Nombre real del usuario
 * @param {String} lastname Apellido del usuario
 */
async function generate(firstname, lastname) {
    if ( typeof(lastname) == 'undefined' ) lastname = ''
    const   file = `${Date.now()}${crypto.randomBytes(32).toString('hex')}.webp`,
            filePath = path.join( __dirname, '../../../config/storage/private/profiles', file)
    await sharp({
        create: {
            width: 300,
            height: 300,
            channels: 4,
            background: getRand(colors)
        }
    })
    .composite([ 
        {
            input: Buffer.from( fs.readFileSync(__dirname+'/l.svg').toString().replace('{{l}}', `${firstname.charAt(0).toUpperCase()}${lastname.charAt(0).toUpperCase()}`), 'utf-8' ), 
            gravity: 'centre'
        } 
    ])
    .webp( { quality: 100 } )
    .toFile(filePath)
    return filePath
}


module.exports = { generate }