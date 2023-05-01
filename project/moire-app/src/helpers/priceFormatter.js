// Функция для форматирования баланса
export default function priceFormatting(priceIn) {
  console.log(priceIn);
  let price = String(priceIn);
  if (price === '0') {
    return '0';
  }

  if (price.includes('.')) {
    const index = price.indexOf('.');
    price = price.slice(0, index);
  }
  price = price.split('').reverse();

  let formatted = [];
  for (let i = 0; i < price.length; i + 1) {
    formatted.push(price[i]);
    if (((i + 1) % 3 === 0) && (i !== 0) && (i !== (price.length))) {
      formatted.push(' ');
    }
  }
  formatted = formatted.reverse().join('');
  console.log(formatted);
  return formatted;
}
