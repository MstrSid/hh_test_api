//import fetch from "node-fetch";

const baseUrl = "https://api.hh.ru";
const div = document.createElement('div');

function getData(url) {
	return fetch(`${baseUrl}${url}`)
		.then(response => response.json())
		.then(data => Object.values(data));
}

async function showData() {
	const data = await getData('/vacancies?professional_role=96');
	//console.log(data[0][0]);
	data[0].forEach(item => {
		div.innerHTML += `
${item['name']}
<ul>Дата: ${item['published_at'].substring(0, 10)}</ul>
<ul>Город: ${item['address'] ? item['address']['city'] : 'нет данных'}</ul>
<ul>Работодатель: ${item['employer'] ? item['employer']['name'] : 'нет данных'}</ul>
<ul>Зарплата, от ${item['salary'] ?
			item['salary']['from'] + item['salary']['currency'] :
			'нет данных'} до ${item['salary'] ?
			item['salary']['to'] ?
				item['salary']['to'] + item['salary']['currency'] :
				'нет данных' :
			'нет данных'}</ul>


<br><br>`
	});
	document.querySelector('body').append(div);
}

showData().catch(e => console.error(e));
