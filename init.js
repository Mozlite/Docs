var fs = require('fs');
var yaml = require('js-yaml');
try {
  var doc = yaml.safeLoad(fs.readFileSync('articles/toc.yml', 'utf8'));
  make(doc);
} catch (e) {
  console.log(e);
}

function make(items) {
  items.forEach(item => {
    if (item.href) {
      if (fs.existsSync('articles/' + item.href))
        return;
      fs.writeFileSync('articles/' + item.href, `# ${item.name}

>[!warning]
>正在上传中，请耐心等待...`)
    }
    else if(item.items){
      make(item.items);
    }
  });
}