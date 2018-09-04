export default {
	sendMail(subject, from, to, body, callback) {
		var formData = new FormData();
		formData.append('apikey', '7c848836-860e-4b4e-8909-a0c0fea20173'),
		formData.append('subject', subject),
		formData.append('from', from ||  'mailer@housefresh.by');
		formData.append('to', to);
		formData.append('bodyHtml', body);
		formData.append('isTransactional', 'true');
		
		var xhr = new XMLHttpRequest();		
		xhr.open("POST", 'https://api.elasticemail.com/v2/email/send', true);
		
		xhr.onreadystatechange = function() {
			if (xhr.readyState == XMLHttpRequest.DONE) callback();
		};
		
		xhr.send(formData); 
	}
}