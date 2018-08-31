export default function(data) {
return `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>Заказ</title>
	<style>
        .customer-info {
            border: 1px solid #d9d9d9;
            padding-bottom: 15px;
            margin-bottom: 30px;
        }
        h2 {
            font-size: 24px;
            color: #313C41;
            padding: 15px; 
            background: #d9d9d9; 
            margin-top: 0;
        }
        a {
            color: #5bc2e7;
        }
        .customer-info .row {
            padding: 0 15px;
        }
        .customer-info .row label {
            display: inline-block;
            font-size: 16px; 
            font-weight: normal;
            color: #888888; 
            width: 130px; 
            margin-bottom: 5px;
        }
        .customer-info .row span {
            font-size: 16px; 
            color: #313C41; 
            font-weight: bold;
        }
        .customer-info .row span a {
            color: #5bc2e7;
        }
        .ordered-items {
            border: 1px solid #d9d9d9;
        }
        .ordered-items h2 {
            margin-top: 0;
            margin-bottom: 0;
        }
        .ordered-items table {
            width: 100%;
            border-collapse: collapse;
        }
        .ordered-items table th, .ordered-items table td {
            font-size: 15px;
            text-align: center;
            font-weight: normal;
            padding: 15px;
        }
        .ordered-items table td {
            border-top: 1px solid #d9d9d9;
        }
        .ordered-items table td h5, .ordered-items table td h6 {
            font-size: 16px;
            margin: 10px 0;
        }
        .ordered-items table td span {
            font-weight: bold;
        }
    </style>
</head>
<body>
    <div class="customer-info">
        <h2>Клиент</h2>
        <div class="row">
            <label>Имя:</label>
            <span>${data.orderForm.name}</span>
        </div>
        <div class="row">
            <label>Телефон:</label>
            <span>${data.orderForm.phone}</span>
        </div>
        <div class="row">
            <label>Адрес доставки:</label>
            <span>${data.orderForm.address}</span>
        </div>
    </div>
    <div class="ordered-items">
        <h2>Заказанные продукты</h2>
        <table cellpadding="0" cellspacing="0">
            <thead>
                <tr>
					<th>Код отгрузки</th>
                    <th>Картинка</th>
                    <th>Название</th>
                    <th>Количество</th>
					<th>Стоимость</th>
                </tr>
            </thead>
            <tbody>
				${data.items.map(item => `
					<tr>
						<td>
							<span>${item.id}</span>
						</td>
						<td>
							<img src="${item.imageUrl}" width="100" />
						</td>
						<td>
							<h5>${item.title}</h5>
							<p>${data.shouldSubTitleShow(item) ? `(${item.weight} гр, ${item.temperatureState})` : ''}</p>
						</td>
						<td>
							<span>${item.count}</span>
						</td>
						<td>
							<span>${data.getItemFullPrice(item)}</span>
						</td>
					</tr>`).join('')}
            </tbody>
        </table>
    </div>
	<h2 class="total-price-text">Итоговая сумма к оплате: ${data.getTotalPrice()}</h2>
</body>
</html>`;
}