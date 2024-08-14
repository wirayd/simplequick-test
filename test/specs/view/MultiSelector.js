describe("Ext.view.MultiSelector", function(){
    var Employee,
        multiSelector;

    var firstNames = ['Ben', 'Don', 'Evan', 'Kevin', 'Nige', 'Phil', 'Ross', 'Ryan'],
        lastNames = ['Toll', 'Griffin', 'Trimboli', 'Krohe', 'White', 'Guerrant', 'Gerbasi', 'Smith'],
        data = [],
        rand = 37,
        map, i, j, k, s,
        sequence = 0;

    var defaultStoreCfg = {
        model: 'spec.Employee',
        proxy: {
            asynchronousLoad: false,
            type: 'ajax',
            url: 'foo'
        }
    };

    var defaultSearchStoreCfg = {
        model: 'spec.Employee',
        autoLoad: true,
        proxy: {
            asynchronousLoad: false,
            type: 'ajax',
            url: 'bar'
        }
    };

    for (i = 0; i < lastNames.length; ++i) {
        map = {};
        data.push({
            id: ++sequence,
            forename: (s = firstNames[i]),
            surname: lastNames[i]
        });
        map[s] = 1;

        for (j = 0; j < 3; ++j) {
            do {
                k = rand % firstNames.length;
                rand = rand * 1664525 + 1013904223; // basic LCG but repeatable
                rand &= 0x7FFFFFFF;
            } while (map[s = firstNames[k]]);

            map[s] = 1;
            data.push({
                id: ++sequence,
                forename: s,
                surname: lastNames[i]
            });
        }
    }

    function makeSelector(storeCfg, searchStoreCfg) {
        storeCfg = storeCfg || defaultStoreCfg;
        searchStoreCfg = searchStoreCfg || defaultSearchStoreCfg;

        multiSelector = new Ext.view.MultiSelector({
            renderTo: Ext.getBody(),
            width: 400,
            height: 300,
            store: storeCfg,
            fieldName: 'name',

            viewConfig: {
               deferEmptyText: false,
               emptyText: 'No employees selected'
            },

            search: {
                field: 'name',
                store: searchStoreCfg
            }
        });
    }

    function completeRequest(responseData, status) {
        var responseText = Ext.encode(responseData || data);

        Ext.Ajax.mockComplete({
            status: status || 200,
            responseText: responseText
        });
    }

    beforeEach(function() {
        Employee = Ext.define('spec.Employee', {
            extend: 'Ext.data.Model',
            fields: [{
                name: 'id'
            }, {
                name: 'forename'
            }, {
                name: 'surname'
            }, {
                name: 'name',
                convert: function(v, rec) {
                    return rec.editing ? v : rec.get('forename') + ' ' + rec.get('surname');
                }
            }]
        });
    });

    afterEach(function() {
        Ext.undefine('spec.Employee');
        Ext.data.Model.schema.clear();
        multiSelector = Ext.destroy(multiSelector);
    });

    describe("search popup", function () {
        describe("alignment", function() {
            beforeEach(function() {
                MockAjaxManager.addMethods();
                makeSelector();
                jasmine.fireMouseEvent(multiSelector.down('tool').el, 'click');
            });

            it("should align to the top right", function() {
                waits(1);   // allow store to fire off its load request
                runs(function() {
                    completeRequest();
                    var popup = multiSelector.searchPopup;
                    expect(popup.el.getTop()).toBe(multiSelector.el.getTop());
                    expect(popup.el.getLeft()).toBe(multiSelector.el.getRight());
                });
            });

            it("should retain selection when moving", function() {
                waits(1);  // allow store to fire off its load request 
                runs(function() {
                    completeRequest();
                    var popup = multiSelector.searchPopup;

                    multiSelector.setWidth(600);

                    expect(popup.el.getTop()).toBe(multiSelector.el.getTop());
                    expect(popup.el.getLeft()).toBe(multiSelector.el.getRight());
                });
            });
        });

        describe("synchronizing selection", function () {
            describe("store with remote data", function () {
                beforeEach(function() {
                    MockAjaxManager.addMethods();
                    makeSelector();
                });

                afterEach(function() {
                    MockAjaxManager.removeMethods();
                });

                it("should select the records in the searcher which match by ID the records in the selector", function() {
                    var searchStore,
                        searchGrid;

                    // Load the multiSelector's store
                    multiSelector.store.load();
                    completeRequest(data[0]);   // foo  

                    multiSelector.onShowSearch();
                    
                    // Search grid's store is set to autoload, so wait for it to kick off a load
                    waitsFor(function() {
                        searchGrid = multiSelector.searchPopup.child('gridpanel');
                        searchStore = searchGrid.store;

                        return (searchStore instanceof Ext.data.Store) && searchStore.isLoading();
                    }, 'searchStore to kick off a load');                    
                    runs(function() {
                        completeRequest();
                    });
                    waitsFor(function() {
                        return !searchStore.loading;
                    });
                    runs(function() {
                        expect(searchGrid.selModel.getSelection()[0].get('name')).toBe(multiSelector.store.getAt(0).get('name'));
                    });
                });

                it("should visually highlight the rows in the searcher which match by ID the records in the selector", function () {
                    var searchStore,
                        searchGrid,
                        nodes;

                    // Load the multiSelector's store
                    multiSelector.store.load();
                    completeRequest(data[0]);

                    multiSelector.onShowSearch();

                    // Search grid's store is set to autoload, so wait for it to kick off a load
                    waitsFor(function() {
                        searchGrid = multiSelector.searchPopup.child('gridpanel');
                        searchStore = searchGrid.store;

                        return (searchStore instanceof Ext.data.Store) && searchStore.isLoading();
                    }, 'searchStore to kick off a load');                    
                    runs(function() {
                        completeRequest();

                        nodes = multiSelector.down('gridpanel').getView().getSelectedNodes();
                        expect(nodes[0]).toHaveCls('x-grid-item-selected');
                    });
                });
            });

            describe("store with inline data", function () {
                beforeEach(function () {
                    var storeCfg = {
                        model: 'spec.Employee',
                        data: [{
                            forename: 'Ben',
                            surname: 'Toll',
                            id: 1
                        }]
                    };

                    var searchStoreCfg = {
                        model: 'spec.Employee',
                        remoteSort: false,
                        remoteFilter: false,
                        autoLoad: false,
                        data: [{
                            forename: 'Ben',
                            surname: 'Toll',
                            id: 1
                        },{
                            forename: 'Don',
                            surname: 'Griffin',
                            id: 2
                        },{
                            forename: 'Evan',
                            surname: 'Trimboli',
                            id: 3
                        }]
                    };
                    
                    makeSelector(storeCfg, searchStoreCfg);
                });
                it("should select the records in the searcher which match by ID the records in the selector", function () {
                    multiSelector.onShowSearch();
                    
                    expect(multiSelector.down('gridpanel').selModel.getSelection()[0].get('name')).toBe(multiSelector.store.getAt(0).get('name'));
                });

                it("should visually highlight the rows in the searcher which match by ID the records in the selector", function () {
                    var nodes;

                    multiSelector.onShowSearch();

                    nodes = multiSelector.down('gridpanel').getView().getSelectedNodes();
                    expect(nodes[0]).toHaveCls('x-grid-item-selected');
                });
            });
        });

        describe("synchronizing deselection", function () {
            beforeEach(function () {
                var storeCfg = {
                    model: 'spec.Employee',
                    data: [{
                        forename: 'Ben',
                        surname: 'Toll',
                        id: 1
                    }]
                };

                var searchStoreCfg = {
                    model: 'spec.Employee',
                    remoteSort: false,
                    remoteFilter: false,
                    autoLoad: false,
                    data: [{
                        forename: 'Ben',
                        surname: 'Toll',
                        id: 1
                    },{
                        forename: 'Don',
                        surname: 'Griffin',
                        id: 2
                    },{
                        forename: 'Evan',
                        surname: 'Trimboli',
                        id: 3
                    }]
                };
                
                makeSelector(storeCfg, searchStoreCfg);
            });

            it("should deselect the records in the searcher which match by ID the records removed from the selector", function () {
                var store = multiSelector.getStore(),
                    record;

                multiSelector.onShowSearch();

                record = store.getAt(0);
                store.remove(record);

                multiSelector.searchPopup.deselectRecords(record);

                expect(multiSelector.down('gridpanel').selModel.getSelection().length).toBe(0);
            });

            it("should visually unhighlight the rows in the searcher which match by ID the records removed from the selector", function () {
                var store = multiSelector.getStore(),
                    record;

                multiSelector.onShowSearch();

                record = store.getAt(0);
                store.remove(record);

                multiSelector.searchPopup.deselectRecords(record);

                node = multiSelector.down('gridpanel').getView().getNode(0);

                expect(node).not.toHaveCls('x-grid-item-selected');
            });
        });
    });
});
