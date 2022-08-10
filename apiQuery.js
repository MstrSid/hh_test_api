//import fetch from "node-fetch";

const baseUrl = "https://api.hh.ru";
const div = document.createElement('div');

fetch(`${baseUrl}/vacancies?professional_role=96`)
	.then(response => response.json())
	.then(data => Object.values(data))
	.then(res => {
		console.log(res[0][0]);
		res[0].forEach(item => {
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
	});
