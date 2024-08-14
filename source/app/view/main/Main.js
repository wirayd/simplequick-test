/**
 * This class is the main view for the application. It is specified in app.js as the
 * "autoCreateViewport" property. That setting automatically applies the "viewport"
 * plugin to promote that instance of this class to the body element.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('SuperQuick.view.main.Main', {
    extend: 'Ext.container.Container',
    requires: [
        'SuperQuick.view.main.MainController',
        'SuperQuick.view.main.MainModel'
    ],

    xtype: 'app-main',

    controller: 'main',
    viewModel: {
        type: 'main'
    },

    layout: {
        type: 'border'
    },

    items: [{
        region: 'center',
        xtype: 'panel',
        items:[{
            xtype:'container',
            style:{
                backgroundColor:'#0F8C69',
                textAlign:'center',
                fontSize:'50px',
                color:'#FFFFFF',
                paddingTop:'45vh',
                fontWeight:'bold'
            },
            height:'93vh',
            html: '<span style="margin-top:50vh">Simple Quicks</span>'
        }, {
            xtype:'toolbar',
            style:{
                backgroundColor:'#0F8C69',
                borderColor:'#0F8C69',
            },
            height:'10vh',
            items:[
                '->',
                {
                    xtype:'button',
                    iconCls:'messageMain',
                    margin:'0 8 0 0',
                    height:40,
                    hidden:true,
                    id:'mesBTN',
                    width:40,
                    style:{
                        backgroundColor: '#FFF',
                        'background-image': 'none',
                        borderColor:'#FFF',
                        boxShadow: 'rgb(0 0 0 / 25%) 0px 0px 7px',
                        borderRadius:'20px',
                        opacity:0,
                    },
                    enableToggle: true,
                    listeners:{
                        toggle(button,pressed,e){
                            if(pressed){
                                let createView = Ext.create('SimpleQuicks.view.main.windowMessage.listMessage', {
                                    width:500,
                                    height:500,
                                    buttonmain:button,
                                    itemId:'taskdata',
                                    closable:true,
                                    listeners:{
                                    
                                    }
                                });
                                console.log('tekan')
                                button.setStyle({
                                    background: '#8785FF',  // Background color
                                    borderColor: '#8785FF',  // Border color
                                });
                                button.setIconCls('message_wh')
                                createView.show()
                            }
                            else{
                                console.log('lepas')
                                button.setStyle({
                                    background: '#FFF',  // Background color
                                    borderColor: '#FFF',  // Border color
                                });
                                button.setIconCls('messageMain')
                                console.log(Ext.ComponentQuery.query('#taskdata')[0])
                               Ext.ComponentQuery.query('#taskdata')[0].destroy()
                            }
                        }
                    },
                    // handler(button){
                    //     let createView = Ext.create('SuperQuicks.view.main.windowMessage.listMessage', {
                    //         width:500,
                    //         height:500,
                    //         closable:true,
                    //     });
                    //     createView.show()
                    // }
                },
                {
                    xtype:'button',
                    iconCls:'taskMain',
                    height:40,
                    id:'taskBTN',
                    hidden:true,
                    width:40,
                    style:{
                        backgroundColor: '#FFF',
                        'background-image': 'none',
                        borderColor:'#FFF',
                        boxShadow: 'rgb(0 0 0 / 25%) 0px 0px 7px',
                        borderRadius:'20px',
                        opacity:0,
                    },
                    enableToggle: true,
                    listeners:{
                        toggle(button, pressed, e) {
                            // console.log('button')
                           
                            if(pressed){
                                let createView = Ext.create('SimpleQuicks.view.main.task.list', {
                                    width:500,
                                    height:500,
                                    list_urgent:[],
                                    itemId:'taskdata',
                                    closable:true,
                                    listeners:{
                                        beforeclose(){
                                            button.pressed=false
                                            button.setStyle({
                                                background: '#FFF',  // Background color
                                                borderColor: '#FFF',  // Border color
                                            });
                                            button.setIconCls('taskMain')
                                        }
                                    }
                                });
                                console.log('tekan')
                                button.setStyle({
                                    background: '#F8B76B',  // Background color
                                    borderColor: '#F8B76B',  // Border color
                                  });
                                button.setIconCls('task_wh')
                                createView.show()
                            }
                            else{
                                console.log('lepas')
                                console.log(Ext.ComponentQuery.query('#taskdata')[0])
                                button.setStyle({
                                    background: '#FFF',  // Background color
                                    borderColor: '#FFF',  // Border color
                                });
                                button.setIconCls('taskMain')
                                Ext.ComponentQuery.query('#taskdata')[0].destroy()
                            }
                        },
                    },
                    // handler(button){
                    //     let createView = Ext.create('SuperQuicks.view.main.task.list', {
                    //         width:500,
                    //         height:500,
                    //         closable:true,
                    //     });
                    //     createView.show()
                    // }
                },
                {
                    xtype:'button',
                    height:40,
                    iconCls:'cloud',
                    width:40,
                    style:{
                        backgroundColor: '#2F80ED',
                        'background-image': 'none',
                        borderColor:'#2F80ED',
                        boxShadow: 'rgb(0 0 0 / 25%) 0px 0px 7px',
                        borderRadius:'20px',
                    },
                    enableToggle: true,
                    handler(btn){
                      

                    },
                    listeners:{
                        toggle(btn,pressed){
                            let btnTask=Ext.getCmp("taskBTN")
                            let btnMes=Ext.getCmp("mesBTN")
                            console.log(pressed)
                            if(pressed){
                                btnTask.animate({
                                        duration: 1000,
                                        from: {
                                            opacity:0
                                        },
                                        to: {
                                            opacity:1
                                        },
                                        listeners:{
                                            beforeanimate:  function() {
                                                // Execute my custom method before the animation

                                            },
                                            afteranimate: function() {
                                                // Execute my custom method after the animation
                                            },
                                        }
                                        
                                });
                                btnMes.animate({
                                    duration: 1000,
                                    from: {
                                        opacity:0
                                    },
                                    to: {
                                        opacity:1
                                    },
                                    listeners:{
                                        beforeanimate:  function() {
                                            // Execute my custom method before the animation

                                        },
                                        afteranimate: function() {
                                            // Execute my custom method after the animation
                                        },
                                    }
                                    
                                });
                                btnTask.show()
                                btnMes.show()
                            }
                            else{
                                btnTask.animate({
                                    duration: 1000,
                                    from: {
                                        opacity:1
                                    },
                                    to: {
                                        opacity:0
                                    },
                                    listeners:{
                                        beforeanimate:  function() {
                                            // Execute my custom method before the animation

                                        },
                                        afteranimate: function() {
                                            // Execute my custom method after the animation
                                        },
                                    }
                                    
                                });
                                btnMes.animate({
                                    duration: 1000,
                                    from: {
                                        opacity:1
                                    },
                                    to: {
                                        opacity:0
                                    },
                                    listeners:{
                                        beforeanimate:  function() {
                                            // Execute my custom method before the animation

                                        },
                                        afteranimate: function() {
                                            // Execute my custom method after the animation
                                        },
                                    }
                                    
                                });
                                btnTask.hide()
                                btnMes.hide()
                            }
                        }
                    }
                }
             
            ]
        }]
    }]
});
