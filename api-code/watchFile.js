const chokidar = require('chokidar');
const execSh = require('exec-sh');
 

// 监听目录src的变化
chokidar.watch(['./visitRouter','./router']).on('all', (event, path) => {
    // console.log(event, path);
    // 文件修改了，自动执行eslint检测语法
    if (event === 'change') {
        // console.log(path)
        execSh("npx eslint --ext ./router/*  ./visitRouter/*  --fix", function (err) {
            if (err) {
                console.log("Exit code: ", err.code);
            }
        });
    }
});