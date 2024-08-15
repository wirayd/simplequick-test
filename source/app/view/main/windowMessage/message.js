
Ext.define('SuperQuick.view.main.windowMessage.message', {
    extend          : 'Ext.window.Window',
    date_previous   :null,
    total_message:0,
    initComponent () {
        let me=this;
        Ext.apply(this, {
            layout: 'fit',
            cls:'headerWin',
            items: [
                this.createList()
            ],
            closable:true,
            header: 
            {
                xtype: 'header',
                titlePosition: 1,
              
                items: [
                    {
                        xtype: 'button',
                        iconCls:'back',
                        style:
                        {
                                backgroundColor: '#FFF',
                                'background-image': 'none',
                                borderColor:'#FFF',
                        },
                        handler(){
                            let createView = Ext.create('SuperQuick.view.main.windowMessage.listMessage', {
                                width:500,
                                height:500,
                                closable:true,
                            });
                            me.close()
                            console.log('tekan')
                            createView.show()
                        }
                    }
                ]
            },
            listeners:{
                afterrender(){
                    this.dataMessage()
                },
                beforeclose(){
                    me.buttonmain.setStyle({
                        background: '#FFF',  // Background color
                        borderColor: '#FFF',  // Border color
                    });
                    me.buttonmain.pressed=false
                    me.buttonmain.setIconCls('messageMain')
                }
            }
        })

        this.callParent(arguments);
    },
    createList(){
        let me=this;
        me.panelMessage=Ext.create('Ext.panel.Panel',{
            width: 500,
            height:450,
            autoScroll:true,
            layout:{
                type:'vbox'
            },
            items:[
                // {
                //     xtype:'container',
                //     width:'100%',
                //     layout:{
                //         type:'hbox'
                //     },
                //     items:[
                //         {
                //             xtype:'textfield',
                //             width:'85%',
                //             margin:8,
                //             emptyText: 'Search',   
                //         },
                //         {
                //             xtype:'button',
                //             text:'Search',
                //             margin:'8 8 8 4',
        
                //         },
                //     ]
                // },                
            ],
            bbar:[
                {
                    xtype:'textfield',
                    width:'87%',
                    itemId:'message',
                    emptyText:'Type a new message',
                    style:
                    {
                        borderRadius:'5px',
                        borderColor:'#828282',
                    },
                    listeners: {
                        specialkey: function (field, e) {
                          // Check if the pressed key is Enter (key code 13)
                          if (e.getKey() === Ext.EventObject.ENTER) {
                            // Your Enter key press handling code here
                            let date=`${new Date().getDate()}-${new Date().getMonth()+1}-${new Date().getFullYear()}`
                            let message=Ext.ComponentQuery.query('#message')[0]
                            if(message.getValue()==''){
                                return false
                            }
                            console.log(date)
                            console.log(me.convertDate(date))
                            me.total_message++;
                            let data=[{
                                id          : `message_${me.total_message}`,
                                sender_name :'You',
                                date        : me.convertDate(date),
                                message     : message.getValue(),
                                time        : `${new Date().getHours()}.${new Date().getMinutes()}`,
                            }]
                            console.log(data)
                            me.container_parent.add(me.createPanel(data[0]))
                            message.setValue(null)
                            me.panelMessage.add(me.container_parent)
                            me.panelMessage.scrollBy(0, 999999, true);
                          }
                        },
                        change: function (textarea, newValue, oldValue) {
                            // Calculate the number of lines in the textarea
                            var numLines = (newValue.match(/\n/g) || []).length + 1;
        
                            // Set a minimum height for the textarea
                            var minHeight = 24;
        
                            // Calculate the new height based on the number of lines
                            var newHeight = Math.max(numLines * 20, minHeight);
        
                            // Only update the height if it has actually changed to avoid an infinite loop
                            if (newHeight !== textarea.getHeight()) {
                                // Update the height of the textarea
                                textarea.setHeight(newHeight);
                                // if(newHeight>=textarea.getHeight()&&!textarea.dynamic)
                                // {
                                //     textarea.setHeight(newHeight);
                                //     textarea.dynamic=true
                                // }
                                // if(textarea.dynamic)
                                // {
                                //     textarea.setHeight(newHeight);
                                // }
                            }
                        },
                    }
                },
                {
                    xtype:'button',
                    text:`<span style="color:#FFFFFF;">Send</span>`,
                    style:
                    {
                            backgroundColor: '#2F80ED',
                            borderRadius:'5px',
                            'background-image': 'none',
                            borderColor:'#2F80ED',
                    },
                    width:'13%',
                    handler(button){
                        let date=`${new Date().getDate()}-${new Date().getMonth()+1}-${new Date().getFullYear()}`
                        let message=Ext.ComponentQuery.query('#message')[0]
                        if(message.getValue()==''){
                            return false
                        }
                        console.log(date)
                        console.log(me.convertDate(date))
                        me.total_message++;
                        let data=[{
                            id          : `message_${me.total_message}`,
                            sender_name :'You',
                            date        : me.convertDate(date),
                            message     : message.getValue(),
                            time        : `${new Date().getHours()}.${new Date().getMinutes()}`,
                        }]
                        console.log(data)
                        me.container_parent.add(me.createPanel(data[0]))
                        message.setValue(null)
                        me.panelMessage.add(me.container_parent)
                        me.panelMessage.scrollBy(0, 999999, true);

                    }
                }
            ]
        })
        return me.panelMessage
    },
    convertDate(date){
        let new_date=date.split('-')
        let name_month=['january','february','march','april','may','june','july','august','september','october','november','december']
        return `${new_date[0]} ${name_month[new_date[1]-1]} ${new_date[2]}` 
    },
    dataMessage(){
        let me=this
        this.setLoading(true)
        console.log('halo')
        let data=[
            {
                id            : 'message_1', 
                sender_name   :'Mary Hilda',
                date          :'9 Juni 2022',
                message       :`Hello Abdullah,i'm your advisor. Please Check your email`,
                time          :'19.32'
            },
            {
                id         : 'message_2', 
                sender_name:'Abdullah',
                date       :'9 Juni 2022',
                message    :`Okay,i'm abdullah your partner `,
                time       :'19.45'
            },
            {
                id         : 'message_3', 
                sender_name:'Mary Hilda',
                date       :'10 Juni 2022',
                message    :`Please check current task, Wira, i have added the new one`,
                time       :'08.20'
            },
            {
                id         : 'message_4', 
                sender_name:'You',
                date       :'10 Juni 2022',
                message    :`Noted, i will check this email as soon as possible`,
                time       :'08.20'
            },
        ]
        me.total_message=data.length
        me.createContainerMessage(data)
    },
    createContainerMessage(value){
        let me=this;
        me.container_parent=Ext.create('Ext.container.Container',{
            width:'100%',
        })
        value.map((value)=>{
            me.container_parent.add(me.createPanel(value))
        })
        me.panelMessage.add(me.container_parent)
        this.setLoading(false)

    },
    createPanel(value) {
        let me = this;
        let same=false
        if(value.date==me.date_previous)
        {
            same=true
        }
        me.date_previous=value.date
        if(value.sender_name=='You'){
            me.containerMessage=Ext.create('Ext.container.Container',{
                id:value.id,
                width:'96%',
                region:'center',
                margin:'8 8 8 8',
                layout:{
                    type:'vbox',
                },
                style:{
                    borderStyle: 'solid',
                    borderColor: '#FFFFFF',
                    borderRadius: '5px',
                },
                items:[
                    {
                        xtype:'label',
                        width:'100%',
                        hidden:same,
                        html:`<span class="hr-lines" style="display: flex;justify-content: center;color:#4F4F4F;font-weight:550;">${value.date}</span><br>`
                    },
                    {
                        xtype:'label',
                        width:'100%',
                        margin:'0 8 0 0',
                        html:`<div style="display: flex;justify-content: right;color:#9B51E0;font-weight:600;">${value.sender_name}</div>`
                    },
                    {
                        xtype:'toolbar',
                        width:'100%',
                        items:[
                            '->',
                            {
                                xtype:'button',
                                iconCls:'ellipsis',
                                arrowVisible:false,
                                style:{
                                    backgroundColor: '#FFFFFF',
                                    'background-image': 'none',
                                    borderColor:'#FFFFFF',
                                },
                                menu: {
                                    minWidth:20,
                                    items: [
                                        {
                                            text:'<span style="color: #2F80ED;font-weight:500;margin-left:-22px;">Edit</span>',
                                            style:{
                                                'border-bottom':'1px solid #BDBDBD',
                                            }
                                        },
                                        {
                                            text:'<span style="color: #EB5757;font-weight:500;margin-left:-22px;">Delete</span>',
                                            handler(button){
                                                console.log(value.id)
                                                Ext.getCmp(value.id).removeAll()
                                            }
                                        },
                                    ]
                                }
                            },
                            {
                                xtype:'container',
                                padding:8,
                                margin:4,
                                style:{
                                    backgroundColor:'#EEDCFF',
                                    borderColor:'#EEDCFF',
                                    color:'#4F4F4F',
                                    borderRadius: '5px',
                                    'display':'inline',
                                    'float':'right'
                                },
                                items:[
                                    {
                                        xtype:'label',
                                        width:'40%',
                                        html:`
                                        <span style="display:flex;justify-content: right">${value.message}</span>
                                        <span style="display:flex;justify-content: left;font-size:10px">${value.time}</span>
                                        `
                                    }
                                ]
                            }
                        ]
                    },
                    
                ],
                listeners:{
                  
                }
            })
        }
        else{
            me.containerMessage=Ext.create('Ext.container.Container',{
                width:'96%',
                id:value.id,
                region:'center',
                margin:'8 8 8 8',
                layout:{
                    type:'vbox',
                },
                style:{
                    borderStyle: 'solid',
                    borderColor: '#FFFFFF',
                    borderRadius: '5px',
                },
                items:[
                    {
                        xtype:'label',
                        width:'100%',
                        hidden:same,
                        html:`<span class="hr-lines" style="display: flex;justify-content: center;color:#4F4F4F;font-weight:550;">${value.date}</span><br>`
                    },
                    {
                        xtype:'label',
                        margin:'0 0 0 8',
                        html:`<span style="color:#E5A443;font-weight:600;">${value.sender_name}</span>`
                    },
                    {
                        xtype:'toolbar',
                        width:'100%',             
                        items:[
                            {
                                xtype:'container',
                                padding:8,
                                margin:4,
                                style:{
                                    backgroundColor:'#FCEED3',
                                    borderColor:'#FCEED3',
                                    color:'#4F4F4F',
                                    borderRadius: '5px',
                                    'display':'inline',
                                    'float':'right'
                                },
                                items:[
                                    {
                                        xtype:'label',
                                        width:'40%',
                                        html:`
                                        <span style="display:flex;justify-content: right">${value.message}</span>
                                        <span style="display:flex;justify-content: left;font-size:10px">${value.time}</span>
                                        `
                                    }
                                ]
                            },
                            {
                                xtype:'button',
                                iconCls:'ellipsis',
                                arrowVisible:false,
                                style:{
                                    backgroundColor: '#FFFFFF',
                                    'background-image': 'none',
                                    borderColor:'#FFFFFF',
                                },
                                // menu: {
                                //     width:50,
                                //     items: [
                                //         {
                                //             text:'<b style="color: #FF0000;">Delete</b>',
                                //             handler(button){
                                //                 console.log(value.id)
                                //                 Ext.getCmp(value.id).removeAll()
                                //             }
                                //         },
                                //         {
                                //             text:'Edit'
                                //         }
                                //     ]
                                // }
                            },
                        ]
                    },
                  
                ],
                listeners:{
                  
                }
            })
        }
       
        return me.containerMessage
        // return Ext.create('Ext.container.Container', {
        //     height : 65,
        //     html   : `
        //         <div id="x12" class="inm-joborder-box-info inm-joborder-box-wo" style="font-size: 8px;font-weight: normal;text-align: left;display: block;margin: 5px 5px 0px 5px;padding: 10px;">
        //             <table>
        //                 <tr>
        //                     <td width="24"><div class="inm-fiola-info-icon" style="float:left;width: 16px; height: 16px;display: inline-block;">&nbsp;</div></td>
        //                     <td>Untuk memasukkan Site ID yang lebih dari 1, dapat menggunakan tanda "," sebagai pemisah dan tanpa spasi. Contoh Inputan : MIT001,MIT002,MIT003,dst.</td>
        //                 </tr>
        //             </table>
        //         </div>`
        // });
    },
  
});