const child_process = require('child_process');
const express = require('express');
const path = require('path');

const ARGS_REGEX = /(?:[^\s']+|'[^']*')+/g;
const HEADERS = {
  'Content-Type': 'text/event-stream',
  'Connection': 'keep-alive'
};

module.exports = (options) => {
  options = options || {};

  let app = express();
  let commandRegex = options.commandRegex || /\S*/;
  let publicPath = path.resolve(options.publicPath || '.');

  app.use(express.static(publicPath));
  app.use(express.static(path.join(__dirname, 'static')));

  app.get('/reveal-run-in-terminal', (req, res) => {
    let errors = [];

    // if (!options.allowRemote && req.ip !== '::1' && req.ip !== '127.0.0.1') {
    //   errors.push(`command sent to reveal-run-in-terminal from non-localhost (IP was ${req.query.ip})`);
    // }

    let bin = req.query.bin;
    // if (!commandRegex.test(bin)) {
    //   errors.push(`command sent to reveal-run-in-terminal didn't match required format (was '${bin}')`);
    // }

    let src = path.join(publicPath, req.query.src);
    if (!src.startsWith(publicPath)) {
      errors.push(`command sent to reveal-run-in-terminal specified a file outside of the allowed public path (was '${req.query.src}'')`);
    }

    res.writeHead(200, HEADERS);

    if (errors.length !== 0) {
      let payload = JSON.stringify({messages: errors});
      errors.forEach(err => console.error(`ERROR: ${err}`));
      res.end(`event: error\ndata: ${payload}\n\n`);
      return;
    }

    let args = ((req.query.args || '').match(ARGS_REGEX) || []);
    args = args.map(a => a.replace(/^'(.*)'$/, '$1'));
    args.unshift(src);


    // console.log("da qui "+ src);

    let suffix = ""
    if (args.length > 1) {
      suffix = args[1]
    }
    bin = src + suffix + ".sh";

    // console.log("bin is "+bin);

    let ps = child_process.spawn(bin, args);

    ['stdout', 'stderr'].forEach(source => {
      ps[source].on('data', (data) => {
        // hack to clean up sbt output :-S
        let str = [];
        data = data.toString();
        for (let i = 0, n = data.length; i < n; ++i) {
          let x = data.charCodeAt(i);
          // console.log("char "+i+" -> "+data[i]+" -> "+x);
          if (x == 27) {
            // console.log("not this");
            i +=3;
          } else {
            str.push(x);
          }
        }

        // console.log("array is ->"+String.fromCharCode(...str));

        str = String.fromCharCode(...str);

        // console.log("going to write "+str.toString());
        res.write(`data: ${JSON.stringify(str)}\n\n`);
        // res.write(`data: ${str}\n\n`);
      });
    });

    ps.on('exit', exit => {
      if (options.log) {
        console.log(`${ps.pid}: ${ps.spawnargs.join(' ')} (${exit})`);
      }
      res.write(`event: done\ndata: ${exit}\n\n`);
      res.end();
    });
  });

  return app;
};
