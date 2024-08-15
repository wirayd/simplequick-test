
Ext.define('SuperQuick.view.main.windowMessage.listMessage', {
    extend          : 'Ext.window.Window',

    initComponent () {

        Ext.apply(this, {
            layout: 'fit',
            header:false,
            items: [
                this.createList()
            ],
            // bbar:[
            //     '->',
            //
            // ]
            listeners:{
                afterrender(){
                    this.dataMessage()
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
            layout:{
                type:'vbox'
            },
            items:[
                {
                    xtype:'container',
                    width:'100%',
                    margin:8,
                    style:{
                        borderStyle:'solid',
                        borderWidth:'1px',
                        borderRadius: '4px',
                        'border-color':'#95A5A6'
                    },
                    layout:{
                        type:'hbox'
                    },
                    items:[
                        {
                            xtype:'textfield',
                            width:'95%',
                            cls:'searchBorder',
                            margin:2,
                            style:{
                                'border-style':'none',
                                'border-width':'0px',
                            },
                            emptyText: 'Search',   
                        },
                        {
                            xtype:'button',
                            iconCls:'search',
                            style:
                            {
                                backgroundColor: '#FFFFFF',
                                'background-image': 'none',
                                borderColor:'#FFFFFF',
                             },
                            margin:2,
        
                        },
                    ]
                },                
            ]
        })
        return me.panelMessage
    },
    dataMessage(){
        let me=this
        this.setLoading(true)
        console.log('halo')
        let data=[
            {
                title   :'Naturalization',
                date    :'1 Januari 2021 19:20',
                name    :'Rakhmat,Budi',
                total   :'2 Participant',
                message :'please check out'
            },
            {
                title   :'Check Task',
                date    :'4 Januari 2021 20:20',
                name    :'Aldi,Subqi',
                total   :'2 Participant',
                message :'Your Task has been added'

            },
        ]
        let container=Ext.create('Ext.container.Container',{
            height:400,
            width:'100%',
            autoScroll:true,
        })
        data.map((value)=>{
            let list=me.createPanel(value)
            container.add(list)
        })
        this.setLoading(false)
        me.panelMessage.add(container)
    },
    createPanel(value) {
        let me = this;
        me.containerMessage=Ext.create('Ext.container.Container',{
            width:'96%',
            region:'center',
            margin:'8 8 8 8',
            style:{
                'border-bottom': '0.5px solid',
                borderColor:'#828282',
                cursor:'pointer',
            },
            items:[
               {
                    xtype:'container',
                    layout:{
                        type:'hbox'
                    },
                    items:[
                        {
                            xtype:'container',
                            margin:'12 8 8 8',
                            html: `<img class="contact" width="40" height="30"></img>`
                        },
                        {
                            xtype:'container',
                            padding:4,
                            type:name,
                            layout:{
                                type:'vbox'
                            },
                            items:[
                                {
                                    xtype:'label',
                                    html:`<span style="color:#2F80ED;font-size:15px;font-weight:600;">${value.title}</span><span style="margin-left: 8px;color:#4F4F4F">${value.date}</span>`,
                                },
                                {
                                    xtype:'label',
                                    html:`<span style="font-weight:600;color:#4F4F4F;font-size:12px;">${value.name}:</span>`
                                },
                                {
                                    xtype:'label',
                                    html:`<span style="font-weight:300;color:#4F4F4F;font-size:11px;">${value.message}:</span>`
                                },
                                {
                                    xtype:'label',
                                    hidden:true,
                                    type:value.name,
                                    text:value.total
                                },

                            ]
                        }
                    ],
               }
            ],
            listeners:{
                click(){
                    console.log("obj")
                },
                afterrender: function(el, layout, eOpts){
                    //console.log(el.down('container'));
                    let data=el.down('container').config.items[1].items[3]

                    //console.log(data)
                    el.getEl().on('click', function () {
                        // Your click event handling code here
                        let createView = Ext.create('SuperQuick.view.main.windowMessage.message', {
                            width:500,
                            buttonmain:me.buttonmain,
                            title:`
                            <span style="font-size:15px;margin-left:8px;color:#2F80ED;font-weight:550;">${data.type}</span><br>
                            <span style="font-size:10px;margin-left:8px;font-size:10px;color:#333333; font-weight:500;">${data.text}</span>

                            `,
                            height:500,
                        });
                        me.close()
                        console.log('tekan')
                        createView.show()
                    });
                    // $( "#" + el.id ).click(function() {
                    
                    // });
                }
            }
        })
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