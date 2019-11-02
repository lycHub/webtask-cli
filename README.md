# webtask-cli
** webtask-cli是一个简单项目初始化工具，包含normal、typescript、es6+三个模板 **

## install
```
npm i webtask-cli -g
```


## usage
```
webtask -h  # 查看可用命令

webtask -V  # 查看版本

webtask --list  # 查看所有模板


#初始化项目模板
projectName：项目名称
templateName：模板名称，可选值 normal | esnext | tsnext
webtask create <projectName> <templateName>
```