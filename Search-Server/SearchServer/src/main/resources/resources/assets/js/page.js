!function(n){var r={};function e(t){if(r[t])return r[t].exports;var i=r[t]={i:t,l:!1,exports:{}};return n[t].call(i.exports,i,i.exports,e),i.l=!0,i.exports}e.m=n,e.c=r,e.d=function(n,r,t){e.o(n,r)||Object.defineProperty(n,r,{configurable:!1,enumerable:!0,get:t})},e.r=function(n){Object.defineProperty(n,"__esModule",{value:!0})},e.n=function(n){var r=n&&n.__esModule?function(){return n.default}:function(){return n};return e.d(r,"a",r),r},e.o=function(n,r){return Object.prototype.hasOwnProperty.call(n,r)},e.p="",e(e.s=0)}({"./src/FileTypeICon.js":
/*!*****************************!*\
  !*** ./src/FileTypeICon.js ***!
  \*****************************/
/*! no static exports found */function(module,exports){eval("/**\r\n * 文件类型对象\r\n * @constructor\r\n */\r\nvar FileTypeICon = function () {\r\n    var items = {\r\n        '': 'fa-file brown',\r\n        'jpg': 'fa-picture-o green',\r\n        'bmp': 'fa-picture-o green',\r\n        'gif': 'fa-picture-o green',\r\n\r\n        'mp3': 'fa-music blue',\r\n        'wav': 'fa-music blue',\r\n        'wmv': 'fa-music blue',\r\n\r\n        'mp4': 'fa-film blue',\r\n        'mkv': 'fa-film blue',\r\n        'rmvb': 'fa-film blue',\r\n        'rm': 'fa-film blue',\r\n        'avi': 'fa-film blue',\r\n\r\n        'txt': 'fa-file-text grey',\r\n        'html': 'fa-file-text grey',\r\n        'pdf': 'fa-file-text grey',\r\n        'doc': 'fa-file-text grey',\r\n        'docx': 'fa-file-text grey',\r\n        'xls': 'fa-file-text grey',\r\n        'xlsx': 'fa-file-text grey',\r\n        'ppt': 'fa-file-text grey',\r\n        'pptx': 'fa-file-text grey',\r\n\r\n        'zip': 'fa-archive brown',\r\n        '7z': 'fa-archive brown',\r\n        'rar': 'fa-archive brown',\r\n    };\r\n    /**\r\n     * 取出文件类型\r\n     * @param type\r\n     * @returns {string}\r\n     */\r\n    this.get = function (type) {\r\n        var val = items[type.toLowerCase()];\r\n        return val == null ? items[''] : val;\r\n    }\r\n}\r\n\r\nmodule.exports = FileTypeICon;\n\n//# sourceURL=webpack:///./src/FileTypeICon.js?")},"./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no static exports found */function(module,exports,__webpack_require__){eval("__webpack_require__(/*! ./seo.js */ \"./src/seo.js\");\r\n\r\nvar FileTypeICon = __webpack_require__(/*! ./FileTypeICon.js */ \"./src/FileTypeICon.js\");\r\n\r\n/**\r\n * 展示文件列表\r\n */\r\n$(function ($) {\r\n    var fileType = new FileTypeICon();\r\n    var setFileItems = function (item, name) {\r\n        var info = item[name];\r\n        //没有子文件\r\n        if (JSON.stringify(info) == '{}') {\r\n            var extAt = name.lastIndexOf('.');\r\n            var extName = extAt == -1 ? '' : name.substring(extAt + 1,\r\n                name.length);\r\n            info = {\r\n                text: '<i class=\"ace-icon fa ' + fileType.get(extName)\r\n                + '\"></i> ' + name,\r\n                type: 'item'\r\n            }\r\n            item[name] = info;\r\n        } else {\r\n            var itemNames = [];\r\n            for (var i in info) {\r\n                setFileItems(info, i);\r\n                itemNames.push(i);\r\n                // info['additionalParameters']['children'].push(info[i]);\r\n                // delete info[i]\r\n            }\r\n            info['additionalParameters'] = {\r\n                'children': []\r\n            };\r\n            info['text'] = name;\r\n            info['type'] = 'folder';\r\n            for (var i in itemNames) {\r\n                info['additionalParameters']['children']\r\n                    .push(info[itemNames[i]]);\r\n                delete info[itemNames[i]]\r\n            }\r\n        }\r\n    }\r\n\r\n    var fileManager = $('#fileManager');\r\n    fileManager\r\n        .ace_tree({\r\n            dataSource: initiateDemoData(fileManager),\r\n            loadingHTML: '<div class=\"tree-loading\"><i class=\"ace-icon fa fa-refresh fa-spin blue\"></i></div>',\r\n            'open-icon': 'ace-icon fa fa-folder-open',\r\n            'close-icon': 'ace-icon fa fa-folder',\r\n            'itemSelect': false,\r\n            'folderSelect': false,\r\n            'multiSelect': false,\r\n            'selected-icon': null,\r\n            'unselected-icon': null,\r\n            'folder-open-icon': 'ace-icon tree-plus',\r\n            'folder-close-icon': 'ace-icon tree-minus'\r\n        });\r\n\r\n    //默认展开一层\r\n    fileManager.tree('discloseVisible');\r\n\r\n    function initiateDemoData(element) {\r\n        // list转换字典对象\r\n        var files = {};\r\n        var lis = element.find('ul').children();\r\n        for (var i = 0; i < lis.size(); i++) {\r\n            //获取每一个文件名\r\n            var filePath = $(lis.get(i)).html();\r\n            //root级\r\n            var currentFiles = files;\r\n            //分割\r\n            var filePath = filePath.split(\"/\");\r\n            for (var index in filePath) {\r\n                var path = filePath[index];\r\n                if (path == '') {\r\n                    continue;\r\n                }\r\n                var item = currentFiles[path];\r\n                if (item == null) {\r\n                    item = {}\r\n                    currentFiles[path] = item;\r\n                }\r\n                currentFiles = item;\r\n            }\r\n        }\r\n        //构造为树形参数\r\n        for (var name in files) {\r\n            setFileItems(files, name);\r\n        }\r\n        var dataSource = function (options, callback) {\r\n            var $data = null\r\n            if (!(\"text\" in options) && !(\"type\" in options)) {\r\n                $data = files;//the root tree\r\n                callback({\r\n                    data: $data\r\n                });\r\n                return;\r\n            } else if (\"type\" in options && options.type == \"folder\") {\r\n                if (\"additionalParameters\" in options\r\n                    && \"children\" in options.additionalParameters)\r\n                    $data = options.additionalParameters.children || {};\r\n                else\r\n                    $data = {}//no data\r\n            }\r\n            if ($data != null) {\r\n                setTimeout(function () {\r\n                    callback({\r\n                        data: $data\r\n                    });\r\n                }, 0);\r\n            }\r\n        }\r\n        return dataSource\r\n    }\r\n});\r\n\r\n\r\n/**\r\n * 复制下载地址\r\n */\r\n$(function () {\r\n\r\n    //鼠标移动自动切换tab\r\n    $('#downLoadUrlDiv').find('.nav,.nav-tabs').find('a').mousemove(function () {\r\n        $(this).trigger('click');\r\n    });\r\n\r\n    //鼠标移动上自动选择\r\n    $('#downLoadUrlDiv').find('[type=\"text\"]').mousemove(function () {\r\n        $(this).select();\r\n    });\r\n    //点击复制\r\n    $('#downLoadUrlDiv').find('button').click(function () {\r\n        let currentBtn = $(this);\r\n        currentBtn.parent().parent().find(\"input\").select();\r\n        if (document.execCommand('copy')) {\r\n            currentBtn.find(\"span\").text(\"已复制\");\r\n        }\r\n    });\r\n});\r\n\r\n/**\r\n * 热搜与搜索\r\n */\r\n$(function () {\r\n    var colors = ['btn-info', 'btn-danger', 'btn-yellow', 'btn-pink',\r\n        'btn-purple', 'btn-inverse', 'btn-default', 'btn-grey',\r\n        'btn-light'];\r\n    var host = $('#hostServer').val();\r\n    $.ajax({\r\n        method: \"post\",\r\n        dataType: \"json\",\r\n        url: host + \"store/hotWords.json\",\r\n        data: {\r\n            count: 15\r\n        },\r\n        success: function (data) {\r\n            if (data.invokerResult.content == null) {\r\n                return false;\r\n            }\r\n            for (var i in data.invokerResult.content) {\r\n                var item = data.invokerResult.content[i];\r\n                $('#openLinkDiv').append(\r\n                    '<button type=\"button\" style=\"margin: 2px\" class=\"btn btn-white  '\r\n                    + colors[i % colors.length] + '\">'\r\n                    + item.name + '</button>');\r\n            }\r\n            //绑定事件\r\n            $('#openLinkDiv').find('button').click(function () {\r\n                var url = host + 'index.html#/s/' + $(this).html();\r\n                window.open(url);\r\n            });\r\n        }\r\n\r\n    });\r\n\r\n});\r\n\r\n// 右上角搜索功能\r\n$(function () {\r\n    var host = $('#hostServer').val();\r\n    $('#searchNewWord').keydown(\r\n        function (event) {\r\n            if (event.keyCode == \"13\") {\r\n                var url = host + 'index.html#/s/'\r\n                    + $('#searchNewWord').val();\r\n                window.open(url);\r\n            }\r\n        })\r\n});\r\n\r\n/**\r\n * 在线播放，暂不实现\r\n */\r\n$(function () {\r\n    let isShowPlayer = false;\r\n    let magnetUrl = $('#magnetUrlText').val();\r\n    //判断下载地址是否磁力连\r\n    if (magnetUrl.toLowerCase().indexOf(\"magnet:?xt=\") == 0) {\r\n        isShowPlayer = true;\r\n    }\r\n\r\n    //播放显示\r\n    if (isShowPlayer) {\r\n        // $('#vedioPlayerContent').show();\r\n    }\r\n\r\n    if (isShowPlayer) {\r\n\r\n    }\r\n\r\n\r\n});\n\n//# sourceURL=webpack:///./src/main.js?")},"./src/seo.js":
/*!********************!*\
  !*** ./src/seo.js ***!
  \********************/
/*! no static exports found */function(module,exports){eval("//百度\r\n(function () {\r\n    var bp = document.createElement('script');\r\n    var curProtocol = window.location.protocol.split(':')[0];\r\n    if (curProtocol === 'https') {\r\n        bp.src = 'https://zz.bdstatic.com/linksubmit/push.js';\r\n    }\r\n    else {\r\n        bp.src = 'http://push.zhanzhang.baidu.com/push.js';\r\n    }\r\n    var s = document.getElementsByTagName(\"script\")[0];\r\n    s.parentNode.insertBefore(bp, s);\r\n})();\r\n// 统计插件\r\n(function () {\r\n    // \x3c!--动态加载cnzz--\x3e\r\n    var oHead = document.getElementsByTagName('HEAD').item(0);\r\n    var oScript = document.createElement(\"script\");\r\n    oScript.type = \"text/javascript\";\r\n    oScript.src = \"http://s11.cnzz.com/z_stat.php?id=1273316267&web_id=1273316267\";\r\n    oHead.appendChild(oScript);\r\n})();\r\n\n\n//# sourceURL=webpack:///./src/seo.js?")},0:
/*!**************************************************************!*\
  !*** multi ./src/FileTypeICon.js ./src/main.js ./src/seo.js ***!
  \**************************************************************/
/*! no static exports found */function(module,exports,__webpack_require__){eval('__webpack_require__(/*! ./src/FileTypeICon.js */"./src/FileTypeICon.js");\n__webpack_require__(/*! ./src/main.js */"./src/main.js");\nmodule.exports = __webpack_require__(/*! ./src/seo.js */"./src/seo.js");\n\n\n//# sourceURL=webpack:///multi_./src/FileTypeICon.js_./src/main.js_./src/seo.js?')}});