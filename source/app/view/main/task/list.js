
Ext.define('SuperQuick.view.main.task.list', {
    extend          : 'Ext.window.Window',
    total_task:null,
    total_urgent:0,
    list_urgent:[],
    initComponent () {
        let me=this
        Ext.apply(this, {
            layout: 'fit',
            iconCls:'task',
            header:false,
            title:'Task',
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
                    Ext.getBody().on('change', function(e, t, o) {
                     let id=t.getAttribute('data-id')
                     let title=document.getElementById(`title-${id}`)
                     console.log(t)
                     if(t.checked){
                        title.style.textDecorationLine='line-through'
                        title.style.textDecorationColor='#4F4F4F'
                     }
                     else{
                        title.style.textDecorationLine=''

                     }
            
                    }, me, {delegate: `input.check-task`});
                }
            }
        })

        this.callParent(arguments);
    },
    createList(){
        let me=this;
        let task  = Ext.create('Ext.data.Store', {
            autoLoad : true,
            fields: ['id','name'],
            data     : [
                { id: "1", name: 'My Task' },
                { id: "2", name: 'Other' },
            ]
        });
        me.panelTask=Ext.create('Ext.panel.Panel',{
            width: 500,
            height:450,
            layout:{
                type:'vbox'
            },
            items:[
                {
                    xtype:'toolbar',
                    width:'100%',
                    layout:{
                        type:'hbox'
                    },
                    items:[
                        {
                            xtype:'combobox',
                            width:'30%',
                            valueField:'id',
                            store:task,
                            displayField:'name',
                            fieldStyle: {
                                color: '#4F4F4F'         // Text color for the input field
                            },
                            margin:8,
                            listeners:{
                                render(combo){
                                    combo.setValue('1')
                                }
                            }
                        },
                        '->',
                        {
                            xtype:'button',
                            text:`<span style="color:#FFFFFF;">New Task</span>`,
                            style:{
                                backgroundColor: '#2F80ED',
                                'background-image': 'none',
                                borderColor:'#2F80ED',
                            },
                            margin:8,
                            handler(obj){
                                me.total_task++
                                let task_panel=Ext.getCmp('container_list_task')
                                let value={
                                    id_text:`task_${me.total_task}`,
                                    title:'',
                                    date:null,
                                    message:''
                                }
                                task_panel.add(me.createPanel(value,''))
                                task_panel.scrollBy(0, 999999, true);

                            }
        
                        },
                    ]
                },                
            ]
        })
        return me.panelTask
    },
    dataMessage(){
        let me=this
        this.setLoading(true)
        console.log('halo')
        let data=[
            {
                id_text :'task_1',
                title   :'Product Application',
                date    :'08/11/2022',
                message :'Finish Product Management'
            },
            {
                id_text :'task_2',
                title   :'Feature Development',
                date    :'30/10/2022',
                message :'Meeting with user, for decide next step features'
            },
            {
                id_text :'task_3',
                title   :'Message Feature',
                date    :'20/10/2022',
                message :'Features Message to asset peoples'
            },
            {
                id_text :'task_4',
                title   :'Maintenance Asset',
                date    :'15/10/2022',
                message :'Features maintenance company asset '
            },
            {
                id_text :'task_5',
                title   :'Command Center',
                date    :'12/10/2022',
                message :'Insight based on Alarm '
            },
            {
                id_text :'task_6',
                title   :'Corrective Maintenance',
                date    :'10/10/2022',
                message :'Feature Draft List for Create Ticket'
            }
        ]
        me.total_task=data.length
        container=Ext.create('Ext.container.Container',{
            height:400,
            id:'container_list_task',
            width:'100%',
            autoScroll:true,
        })
        data.map((value)=>{
            let list=me.createPanel(value)
            container.add(list)
        })
        this.setLoading(false)
        me.panelTask.add(container)
    },
    createPanel(value, button='disabled') {
        let me = this;
        // if(value.date==null)
        // {
        //     value.date=''
        // }
        let id_but=Ext.id()
        let id__panel=Ext.id()
        me.containerMessage=Ext.create('Ext.panel.Panel',{
            width:'96%',
            id:id__panel,
            region:'center',
            title:`<span><input class="check-task" data-id=${id_but} type="checkbox"></span>
           <span><input id=title-${id_but} type="text" ${button} style="width:150px; border-style:none;color:#4F4F4F;font-weight:600;"></span>
           <div id=${id_but} style="display:inline-block;float:right;"></div>
           <div id=date-${value.id_text} style="display:inline-block;color:#4F4F4F;font-size:12px;right:0;margin-top:4px;margin-right:4px;float:right;font-weight:500;">${(value.date==null)?'':value.date}</div>
            `,
            cls:'colorPanel',
            collapsible: true,  // To allow collapse
            margin:'8 8 8 8',
            style:{
                'border-bottom': '1px solid #828282;',

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
                            layout:{
                                type:'vbox'
                            },
                            items:[
                                {
                                    xtype:'button',
                                    margin:'4 0 0 8',
                                    iconCls:'time',
                                    style:{
                                        backgroundColor: '#FFFFFF',
                                        'background-image': 'none',
                                        borderColor:'#FFFFFF',
                                        cursor:'auto',
                                    },
                                    handler(){
                                        return false
                                    }
                                   // html: '<img class="time" width="25" height="25" style="border-style:none;border:0px;border-color:#FFFFFF">'
                                },
                                {
                                    xtype:'button',
                                    margin:'4 0 0 8',
                                    iconCls:'editable',
                                    style:{
                                        
                                        backgroundColor: '#FFFFFF',
                                        'background-image': 'none',
                                        borderColor:'#FFFFFF',
                                    },
                                    handler(){
                                        Ext.getCmp(value.id_text).setDisabled(false)
                                    }
                                   // html: '<img class="time" width="25" height="25" style="border-style:none;border:0px;border-color:#FFFFFF">'
                                },
                                {
                                    xtype:'button',
                                    margin:'49 0 0 8',
                                    arrowVisible:false,
                                    iconCls:'copy',
                                    style:{
                                        backgroundColor: '#FFFFFF',
                                        'background-image': 'none',
                                        borderColor:'#FFFFFF',
                                        cursor:'auto',
                                        borderRadius:'3px',
                                    },
                                    menu: {
                                        minWidth:150,
                                        items: [
                                            {
                                                xtype:"button",
                                                text:'<span style="color: #4F4F4F;font-weight:550;justify-content:center;">Important ASAP</span>',
                                                type:'important_asap',
                                                style:{
                                                    backgroundColor:"#E5F1FF",
                                                    'background-image': 'none',
                                                    borderRadius:'3px',
                                                    borderColor:'#E5F1FF',

                                                },
                                                margin:8,
                                                name:'Important ASAP',
                                                handler(button){
                                                    me.createListUrgent(button,value.id_text,"#E5F1FF")
                                                }
                                            },
                                            {
                                                text:'<span style="color: #4F4F4F;font-weight:550;justify-content:center;">Virtual Meeting</span>',
                                                type:'virtual_meeting',
                                                name:'Virtual Meeting',
                                                style:{
                                                    backgroundColor:"#F9E9C3",
                                                    'background-image': 'none',
                                                    borderRadius:'3px',
                                                    borderColor:'#F9E9C3',

                                                },
                                                margin:8,
                                                handler(button){
                                                    me.createListUrgent(button,value.id_text,"#F9E9C3")
                                                }
                                            },
                                            {
                                                text:'<span style="color: #4F4F4F;font-weight:550;justify-content:center;">Offline Meeting</span>',
                                                type:'offline_meeting',
                                                style:{
                                                    backgroundColor:"#FDCFA4",
                                                    'background-image': 'none',
                                                    borderRadius:'3px',
                                                    borderColor:'#FDCFA4',

                                                },
                                                margin:8,
                                                name:'Offline Meeting',
                                                handler(button){
                                                    me.createListUrgent(button,value.id_text,"#FDCFA4")
                                                }
                                            },
                                            {
                                                text:'<span style="color: #4F4F4F;font-weight:550;justify-content:center;">ASAP</span>',
                                                type:'asap',
                                                style:{
                                                    backgroundColor:"#AFEBDB",
                                                    'background-image': 'none',
                                                    borderRadius:'3px',
                                                    borderColor:'#AFEBDB',

                                                },
                                                margin:8,
                                                name:'ASAP',
                                                handler(button){
                                                    me.createListUrgent(button,value.id_text,"#AFEBDB")
                                                }
                                            },
                                            {
                                                text:'<span style="color: #4F4F4F;font-weight:550;justify-content:center;">Client Related</span>',
                                                type:'client_related',
                                                style:{
                                                    backgroundColor:"#CBF1C2",
                                                    'background-image': 'none',
                                                    borderColor:'#CBF1C2',
                                                    borderRadius:'3px',

                                                },
                                                margin:8,
                                                name:'Client Related',
                                                handler(button){
                                                    me.createListUrgent(button,value.id_text,"#CBF1C2")
                                                }
                                            },
                                            {
                                                text:'<span style="color: #4F4F4F;font-weight:550;justify-content:center;">Self Task</span>',
                                                type:'self_task',
                                                style:{
                                                    backgroundColor:"#CFCEF9",
                                                    'background-image': 'none',
                                                    borderColor:'#CFCEF9',
                                                    borderRadius:'3px',
                                                },
                                                margin:8,
                                                name:'Self Task',
                                                handler(button){
                                                    me.createListUrgent(button,value.id_text,"#CFCEF9")
                                                }
                                            },
                                            {
                                                text:'<span style="color: #4F4F4F;font-weight:550;justify-content:center;">Appointments</span>',
                                                type:'appointment',
                                                style:{
                                                    backgroundColor:"#F9E0FD",
                                                    'background-image': 'none',
                                                    borderColor:'#F9E0FD',
                                                    borderRadius:'3px',
                                                },
                                                margin:8,
                                                name:'Appointments',
                                                handler(button){
                                                    me.createListUrgent(button,value.id_text,"#F9E0FD")
                                                }
                                            },
                                            {
                                                text:'<span style="color: #4F4F4F;font-weight:550;justify-content:center;">Court Related</span>',
                                                type:'court_related',
                                                style:{
                                                    backgroundColor:"#9DD0ED",
                                                    'background-image': 'none',
                                                    borderColor:'#9DD0ED',
                                                    borderRadius:'3px',

                                                },
                                                margin:8,
                                                name:'Court Related',
                                                handler(button){
                                                    me.createListUrgent(button,value.id_text,"#9DD0ED")
                                                }
                                            },
                                        ]
                                    }
                                  
                                   // html: '<img class="time" width="25" height="25" style="border-style:none;border:0px;border-color:#FFFFFF">'
                                },

                            ]
                        },
                        
                        {
                            xtype:'container',
                            padding:2,
                            width:'95%',
                            layout:{
                                type:'vbox'
                            },
                            items:[
                                {
                                    iconCls:'message',
                                    xtype:'datefield',
                                    name:'date_task',
                                    format:'d/m/Y',
                                    listeners:{
                                        afterrender: function(obj){
                                            let date=null
                                            if(value.date!=null)
                                            {
                                                date=value.date.split('/')
                                                function nextweek(){
                                                    var today = new Date();
                                                    var nextweek = new Date(date[2], date[1]-1, date[0]);
                                                    return nextweek;
                                                }
                                                console.log(nextweek())
                                                obj.setValue(nextweek());
                                            }
                                           
                                            obj.setMinValue(new Date())
                                        },
                                        change(obj,newValue,oldValue,eOpts){
                                            let date=`${newValue.getDate()}/${newValue.getMonth()+1}/${Ext.Date.format(newValue,'Y')}`
                                            document.getElementById(`date-${value.id_text}`).textContent=date
                                        }
                                    }
                                },
                                {
                                    xtype:'textarea',
                                    width:'90%',
                                    disabled:true,
                                    id:value.id_text,
                                    fieldStyle: {
                                        'background':'none',
                                        'color':'#4F4F4F'
                                    },
                                    style:{
                                        'border-style':'none'
                                    },
                                    value:value.message,
                                    emptyText: 'No Description',   
                                    listeners:{
                                        'render' : function(cmp) {
                                            cmp.getEl().on('keypress', function(e) {
                                                if (e.getKey() == e.ENTER) {
                                                    cmp.setDisabled(true)
                                                }
                                            });
                                            // cmp.getEl().on('click', function () {
                                            //     Ext.getCmp(value.id_text).setValue(true);
                                            // });
                                        }
                                    }
                                },
                                {
                                    xtype:'container',
                                    itemId:`list_urgent-${value.id_text}`,
                                    width:'90%',
                                    autoScroll:true,
                                    layout:{
                                        type:'hbox'
                                    },
                                }

                            ]
                        }
                    ]
               }
            ],
            listeners:{
               afterrender(obj){
                    setTimeout(function(){
                        document.getElementById(`title-${id_but}`).value=value.title
                        let btnDelete=Ext.create('Ext.button.Button',
                        {
                            iconCls:'ellipsis',
                            renderTo:id_but,
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
                                        style:{
                                            'background-image': 'none',
                                            'border-style':'none',
                                            backgroundColor:"#FFFFFF!important"
                                        },
                                        text:'<span style="color: #EB5757;font-weight:500;margin-left:-22px;">Delete</span>',
                                        handler(button){
                                            Ext.getCmp(id__panel).hide()
                                        }
                                    },
                                ]
                            }
                        }
                        )
                    },500)
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
    createListUrgent(data,idcontainer,color){
        let me=this,
            same=false;
        console.log(data.type)
        if(me.list_urgent!=0)
        {
            me.list_urgent.map((value)=>{
                if(value==`${data.type}-${idcontainer}`){
                    same=true
                }
            })
        }
   
        console.log(me.list_urgent)
        let button=Ext.create('Ext.button.Button',{
            iconCls:'close',
            margin:'2 0 0 2',
            height:15,
            itemId:`button-${data.type}-${idcontainer}`,
            style:{
                backgroundColor: color,
                'background-image': 'none',
                borderColor:color,
            },
            handler(button){
                //button.hide()
                function removeItem(arr, item){
                    return arr.filter(f => f !== item)
                }
                me.list_urgent = removeItem( me.list_urgent,`${data.type}-${idcontainer}`);
                console.log(me.list_urgent)
                button.hide();
                Ext.ComponentQuery.query(`#containurgent-${data.type}-${idcontainer}`)[0].hide()

            }
        })
        if(same==false){
            me.list_urgent.push(`${data.type}-${idcontainer}`)
            let container=Ext.create('Ext.container.Container',{
                margin:'8 8 8 4',
                height:22,
                itemId:`containurgent-${data.type}-${idcontainer}`,
                layout:{
                    type:'hbox'
                },
                style:{
                    'background-color': color,
                    color             :'#4F4F4F',
                    borderRadius      : '4px',
                },
                items:[
                    {
                        xtype:'label',
                        margin:'2 0 0 4',
                        html:`<span style="font-size:10px;font-weight:bold;">${data.name}</span>`
                    },button
                ]
            })
            Ext.ComponentQuery.query(`#list_urgent-${idcontainer}`)[0].add(container)
        }
    
    }
  
});