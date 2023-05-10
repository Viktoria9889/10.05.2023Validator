const express = require('express');

const router = express.Router();
const fs = require('fs');
//підключаєм валідатор
const Ajv = require('ajv');
//підключаєм валідатор
const ajv = new Ajv();


router.get('/', (req,res) =>{
    res.render('page')
})

const arrData = [];


router.get('/item', (req,res) => {
    console.log(arrData);
    res.json(arrData)
})


//pattern: '^([0-9][0-9])$'

router.post('/infoUser', (req,res) => {

    const schema = {
        type: 'object',
        properties: {
            name: {type: 'string'},
            surname: {type: 'string'},
            birthday: {type: 'string',
            //pattern: '^([0-3]/d)[- /.]([0-1]/d)[- /.](19|20)/d/d$'// регулярка дн
            },
            years: {  type: 'number',
            minimum: 1,
            maximum: 99,
            }
        },
        additionalProperties: false,
        required: ['name', 'surname', 'birthday', 'years'],
    };
    //наступними двома рядками валідуємо наші дані
    const validate = ajv.compile(schema);
    const valid = validate(req.body);

    if (!valid) {
        res.json({ status: 'validate error', error: validate.errors })
        console.log('ERROR!!!!')
    } else if (valid) {
        arrData.push(req.body)
        console.log(arrData)
        res.json(arrData)
        console.log('CONFIRMED!!!')
    }

    //arrData.push({name:req.body.name, surname:req.body.surname, birthday:req.body.birthday})
    //arrData.push(req.body) можна написати коротше, всірівно виведе масив
    //res.json(arrData)
})




module.exports = router;