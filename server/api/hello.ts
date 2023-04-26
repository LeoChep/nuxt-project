import fs from 'node:fs'
function writeFile() {
    console.log("写入开始。");
    // 同步读取
    var data = fs.writeFileSync('write1.txt', '我是被写入的内容1！');
    var writeData1 = fs.readFileSync('write1.txt', 'utf-8');
    console.log("同步读取写入的内容1: " + writeData1.toString());
    // 异步读取
    fs.writeFile('write2.txt', '我是被写入的内容2！', function (err) {
        if (err) {
            return console.error(err);
        }
        var writeData2 = fs.readFileSync('write2.txt', 'utf-8');
        console.log("同步读取写入的内容2: " + writeData2.toString());
    });
    console.log("写入结束。");
}

export default defineEventHandler((event) => {
    console.log("work")
    writeFile();
    return {
      api: 'works'
    }
  })