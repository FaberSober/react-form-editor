/**
 * 生成唯一ID（a-z随机8位组合）
 */
export function generateId() {
  var str = '';
  for (var i=0; i<8; i++) {
    var code = Math.floor(Math.random()*26);
    str += String.fromCharCode('a'.charCodeAt(0) + code);
  }
  return str;
}
