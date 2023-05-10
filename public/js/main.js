const info = document.querySelector('.info');
const formEl = document.querySelector('form');
let name;
let surname;
let arrdata;
let li;
let birthday;

const item = async () => {
    const result = await axios.get('/item')
}
item()

const infoUser = async () => {
    arrdata = await axios.post('/infoUser', { name: name, surname: surname,  birthday: birthday, years: Number(years),})
    render();
}

formEl.addEventListener('submit', (ev) => {
    ev.preventDefault()
    const formData = new FormData(ev.target)
    name = formData.get('name')
    surname = formData.get('surname')
    birthday = formData.get('birthday')
    years = formData.get('years')
    console.log(name, surname, birthday, years);
    infoUser()
    
})



const render = () => {
    info.innerHTML = '';
    arrdata.data.forEach(item => {
        li = document.createElement('li');
        li.innerHTML = `<div class="div">
                            <li class="user_name">${item.name}</li>
                            <li class="user_surname">${item.surname}</li>
                            <li class="user_birthday">${item.birthday}</li>
                            <li class="user_years">${item.years}</li>
                        </div>
                        `
        info.appendChild(li)
    })
};
