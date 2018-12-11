UE.registerUI('dialog',function(editor,uiName){
    //创建dialog
  var dialog = new UE.ui.Dialog({
        //指定弹出层中页面的路径，这里只能支持页面,因为跟addCustomizeDialog.js相同目录，所以无需加路径
        iframeUrl:'./components/custom/customizeDialogPage.html',
        //需要指定当前的编辑器实例
        editor:editor,
        //指定dialog的名字
        name:uiName,
        id:"testiframe",
        //dialog的标题
        title:"这是个测试浮层",

        //指定dialog的外围样式
        cssRules:"width:600px;height:300px;",

        //如果给出了buttons就代表dialog有确定和取消
        buttons:[
            {
                className:'edui-okbutton',
                label:'确定',
                onclick:function () {
                 var iframe=document.getElementById("testiframe_iframe").contentWindow;
                 var v=iframe.document.getElementsByClassName("test")[0].value;
                 var obj={
                     "test":v
                 };
                     UE.getEditor('editor').execCommand('insertHtml', testhtml(obj),true);
                    // editor.setDisabled();clearEmptyAttrs
                    //console.log(UE.dom.domUtils.remove)
                   // UE.dom.domUtils.remove(document.getElementsByClassName("dialog_click")[])
                    dialog.close(true);
                }
            },
            {
                className:'edui-cancelbutton',
                label:'取消',
                onclick:function () {
                    dialog.close(false);
                }
            }
        ]});

  editor.ui._dialogs.linkDialog.testDialog=dialog;

  function testhtml(obj) {

   var str='<div contenteditable="false" class="dialog_click" style="color: #00a2d4">'+obj.test+'<a style="cursor: pointer;color: #0000cc;margin-left: 10px;"  id="editTest" data-value="'+obj.test+'" onclick="editor.ui._dialogs.testDialog.open()">编辑</a><a style="cursor: pointer;color: #0000cc;margin-left: 10px;" onclick=""></a></div>';
   //editor.ui._dialogs.linkDialog.open();
    return str;
}
    editor.ui._dialogs.testDialog=dialog;
    //参考addCustomizeButton.js
    var btn = new UE.ui.Button({
        name:'dialogbutton' + uiName,
        title:'dialogbutton' + uiName,
        //需要添加的额外样式，指定icon图标，这里默认使用一个重复的icon
        cssRules :'background-position: -500px 0;',
        onclick:function () {
            //渲染dialog
            var name="clickBtn";
            dialog.render();
            dialog.open();
        }
    });

    return btn;
}/*index 指定添加到工具栏上的那个位置，默认时追加到最后,editorId 指定这个UI是那个编辑器实例上的，默认是页面上所有的编辑器都会添加这个按钮*/);