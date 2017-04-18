'use strict';
angular.module('softvFrostApp')
//.controller('ReportesCtrl', ['$http','uiGridConstants', 'reportesFactory', function ( $http, uiGridConstants, reportesFactory)
.controller('Reportes_DetalleCtrl', ['$http', 'reportesFactory','$timeout', 'ngNotify','$state', function ( $http, reportesFactory, $timeout, ngNotify, $state){
//function ReportesCtrl(reportesFactory) {
 
	var vm = this;
    vm.filename = "Reporte_detalle_de_terminales";
    var reportHeaderPdf = "Reporte Detalle de Terminales";
    var idAux = 1;  	
    vm.csvUnoHide = true; //Button no mostrar
    vm.csvDosHide = true; //Button no mostrar
    vm.divExportar = true; // Div botones exportar no mostrar
    var img = new Image();
    img.crossOrigin = "";  
//----------------------------------------------
    this.$onInit = function() {

        getImageDataURL();
        getCliente();
        getBeam();
        getPlan(); 
        getEstado();  
    }


    function reloadRoute() {
        $state.reload(); // refresh page
    };


    function getCliente() {
        vm.listaCliente = [{"IdCliente":0, "Nombre":"Todos"},{"IdCliente": 1, "Nombre":"Cliente1"}, {"IdCliente": 2, "Nombre":"Cliente2"}];
        vm.cliente_input = vm.listaCliente[0]; // id seleccionado
    }

    function getBeam() {
        vm.listaBeam = [{"IdBeam":0, "Nombre":"Todos"},{"IdBeam": 1, "Nombre":"Beam1"}, {"IdBeam": 2, "Nombre":"Beam2"}];
        vm.beam_input = vm.listaBeam[0];
    }

    vm.getPlan = getPlan; // Select option PLAN
    function getPlan() 
    {            
        reportesFactory.mostrarPlan().then(function(data) {    
            vm.listaPlan = [{"IdServicio":0, "Nombre":"Todos"}];
            for (var i = 0; i < data.GetPlanByClienteBeam_reporteResult.length; i++)
                {
                    vm.listaPlan.push(data.GetPlanByClienteBeam_reporteResult[i]);
                }         
           vm.plan_input = vm.listaPlan[0];         
        });

    }

    function getEstado() {
            vm.listaEstado = [{"IdEstado":0, "Nombre":"Todos"},{"IdEstado": 1, "Nombre":"Activa"}, {"IdEstado": 2, "Nombre":"Cancelada"},
            {"IdEstado": 3, "Nombre":"Incompleta"},{"IdEstado": 4, "Nombre":"Pendiente"},{"IdEstado": 5, "Nombre":"Suspendida"} ];
            vm.estado_input = vm.listaEstado[0];
    }



    var arrayDetalle = [];
    vm.getReporteDetalleT = getReporteDetalleT; //
     function getReporteDetalleT() 
        {                   
            vm.divExportar = false; //Mostrar
            var cliente = vm.cliente_input.IdCliente; //int 
            var beam =  vm.beam_input.IdBeam;   //int
            var plan = vm.plan_input.IdServicio;  //int
            var estado = vm.estado_input.Nombre; //use NOMBRE  
            var noSerie = null; //int - puede 
            var idSus = null; //int 
            var siteId = null;  //int
      
            if (vm.san_input != null) //si tiene valor o es indefinido
            {
                noSerie = vm.san_input;
                if (vm.san_input == '' ) {
                noSerie = null;
                }
            }

            if (vm.idSuscriptor_input != null)
            {
                idSus = vm.idSuscriptor_input; //int 
                if (vm.idSuscriptor_input == '' ) {
                idSus = null;
                }
            }

            if (vm.siteId_input != null)
            {
                siteId = vm.siteId_input;
                if (vm.siteId_input == '' ) {
                    siteId = null;
                }
            }
           
            // noSerie, int? idSuscriptor, int? siteId

            reportesFactory.mostrarReporteDetTerminales( idAux, cliente, beam, plan, estado, noSerie, idSus, siteId ).then(function(data) {
                    arrayDetalle = data.GetReporte_DetalleTerminalListResult;
                    vm.itemsByPage = 5; 
                    vm.rowCollection4 = arrayDetalle;  
                 
            });
        }

    vm.limpiarFiltros = limpiarFiltros;
    function limpiarFiltros(){

        //console.log(' search '+vm.search1);
        vm.san_input = null;
        vm.idSuscriptor_input = null;
        vm.siteId_input = null;
        vm.cliente_input = vm.listaCliente[0]; 
        vm.beam_input = vm.listaBeam[0];
        vm.plan_input = vm.listaPlan[0];
        vm.estado_input = vm.listaEstado[0];
        reloadRoute();
       // vm.search1 = undefined; 
       // vm.searchIp = undefined;// los filtros se limpian, pero no vuelve a mostrar los datos, así que se llama a la función inicial

    }
    
    function getImageDataURL() // Obtiene la ruta de la imagen, convierte en url para usarla en pdf
    {             
        //var url = vm.src; 
        var url = document.getElementById("pdflogoimage").src;  
        var data, canvas, ctx;

        img.onload = function()
        {
            // Create the canvas element.
            canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            // Get '2d' context and draw the image.
            ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);
            // Get canvas data URL
            data = canvas.toDataURL();   
          
        }
            // Load image URL.    
        img.src = url;  
    }

//------------------------------

    //CSV -- nombre de las columnas (propiedades del arreglo)
    vm.order = [ 'SAN', 'Estado', 'Cliente', 'Beam', 'PlanServ', 'ESN', 'IdSuscriptor', 'EstadoFap', 'Ipv4', 'Ipv6', 'AssocTime', 'Latitud','Longitud', 'AvailTokens','TxBytes','RxBytes'];

    // CREAR CSV VISIBLE DATA -- filters
    vm.crearVisibleAsCsv = crearVisibleAsCsv;
    function crearVisibleAsCsv() {

        $timeout(function() {

        // Elimina las propiedades que no se usan
        for (var i = 0; i < vm.displayedCollection4.length; i++) //todos los distribuidores de la tabla
            { 
                delete vm.displayedCollection4[i].BaseIdUser;
                delete vm.displayedCollection4[i].BaseRemoteIp;
                delete vm.displayedCollection4[i].$$hashKey;
            } 

            initArray();
       
          for (var i = 0; i < vm.displayedCollection4.length; i++) 
            {   //copia cada objeto del array de la tabla en el arry del reporte
                vm.arrayReporte.push(vm.displayedCollection4[i]); // Copia array de tabla displayedCollection4  
            } 
           //FIN DE PROPIEDADES
        angular.element('#csvUno').triggerHandler('click'); //llama al botón para crear csv del arrayReporte
      });
    };


    // CREAR CSV ALL DATA 
    vm.crearTodoAsCsv = crearTodoAsCsv;
    function crearTodoAsCsv() {
      $timeout(function() {

        // Elimina las propiedades que no se usan
        for (var i = 0; i < vm.rowCollection4.length; i++) //table total
            { 
                delete vm.rowCollection4[i].BaseIdUser;
                delete vm.rowCollection4[i].BaseRemoteIp;
                delete vm.rowCollection4[i].$$hashKey;
            } 

            initArray();
       
          for (var i = 0; i < vm.rowCollection4.length; i++) 
            {   //copia cada objeto del array de la tabla en el arry del reporte
                vm.arrayReporte.push(vm.rowCollection4[i]); // Copia array de tabla displayedCollection4  
            } 
           //FIN DE PROPIEDADES
        angular.element('#csvDos').triggerHandler('click'); //llama al botón para crear csv del arrayReporte
      });
    };


    function initArray (){
      vm.arrayReporte = []; //array vacío   
         // Posición 0 del arrayReporte (ENCABEZADOS)
        vm.arrayReporte =     [{
            "SAN": "Site Id",
            "Estado": "Estado", // STATUS
            "Cliente": "Cliente",
            "Beam": "Beam",
            "PlanServ": "Plan de Servicio",
            "ESN": "Número de Serie",
            "IdSuscriptor": "Id Suscriptor",
            "EstadoFap": "Estado FAP",   
            "Ipv4": "IPV4",
            "Ipv6": "IPV6",               
            "AssocTime": "Assoc Time",          
            "Latitud": "Latitud",
            "Longitud": "Longitud", 
            "AvailTokens": "Avail Tokens",               
            "TxBytes": "TXBytes",
            "RxBytes": "RXBytes"
            }];
    } 


// Create TABLE PDF -- All / Visible 
vm.createPdfTodo = createPdfTodo;
function createPdfTodo(pdfAcrear){
  

    var rows = [ [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0] ]; // no. column
    // rows 0
    var r = 1; //start from rows 1
    var c = 0; //start from col 5

    var ro = 0; // length array of objects
      if ( pdfAcrear =='todo')
        { ro = vm.rowCollection4.length; }
        else 
        { ro = vm.displayedCollection4.length; }


    var cols = 16; // column number
    var columns = ["Site Id", "Estado", "Cliente", "Beam", "Plan de Servicio", "Número de Serie", "Id Suscriptor", "Estado FAP", "IPV4", "IPV6", 
                    "Assoc Time", "Latitud", "Longitud", "Avail Tokens", "TXBytes", "RXBytes"];

    // expand to have the correct amount or rows
    for( var i=r; i<ro; i++ ) {         
      rows.push( [] );
    }

    // expand all rows to have the correct amount of cols
    for (var i = 0; i < ro; i++)
    {    
        if ( pdfAcrear =='todo') // ALL DATA
        {   //replace row 0
            rows[i][0] = vm.rowCollection4[i].SAN;
            rows[i][1] = vm.rowCollection4[i].Estado;
            rows[i][2] = vm.rowCollection4[i].Cliente;
            rows[i][3] = vm.rowCollection4[i].Beam;
            rows[i][4] = vm.rowCollection4[i].PlanServ;
            rows[i][5] = vm.rowCollection4[i].ESN;
            rows[i][6] = vm.rowCollection4[i].IdSuscriptor;
            rows[i][7] = vm.rowCollection4[i].EstadoFap;
            rows[i][8] = vm.rowCollection4[i].Ipv4;
            rows[i][9] = vm.rowCollection4[i].Ipv6;
            rows[i][10] = vm.rowCollection4[i].AssocTime;
            rows[i][11] = vm.rowCollection4[i].Latitud;  
            rows[i][12] = vm.rowCollection4[i].Longitud;
            rows[i][13] = vm.rowCollection4[i].AvailTokens;
            rows[i][14] = vm.rowCollection4[i].TxBytes;
            rows[i][15] = vm.rowCollection4[i].RxBytes;  
        }else //VISIBLE DATA
        {           
            rows[i][0] = vm.displayedCollection4[i].SAN;
            rows[i][1] = vm.displayedCollection4[i].Estado;
            rows[i][2] = vm.displayedCollection4[i].Cliente;
            rows[i][3] = vm.displayedCollection4[i].Beam;
            rows[i][4] = vm.displayedCollection4[i].PlanServ;
            rows[i][5] = vm.displayedCollection4[i].ESN;
            rows[i][6] = vm.displayedCollection4[i].IdSuscriptor;
            rows[i][7] = vm.displayedCollection4[i].EstadoFap;
            rows[i][8] = vm.displayedCollection4[i].Ipv4;
            rows[i][9] = vm.displayedCollection4[i].Ipv6;
            rows[i][10] = vm.displayedCollection4[i].AssocTime;
            rows[i][11] = vm.displayedCollection4[i].Latitud;  
            rows[i][12] = vm.displayedCollection4[i].Longitud;
            rows[i][13] = vm.displayedCollection4[i].AvailTokens;
            rows[i][14] = vm.displayedCollection4[i].TxBytes;
            rows[i][15] = vm.displayedCollection4[i].RxBytes;    
        } 
    } 

        // Create document
        var doc = new jsPDF({
        orientation: 'landscape',
        format: 'A4'
        });

         //Page number 
        var totalPagesExp = "{total_pages_count_string}";
        var pageContent = function (data) {    
                // FOOTER
                var str = "Page " + data.pageCount;
                // Total page number plugin only available in jspdf v1.0+
                if (typeof doc.putTotalPages === 'function') {
                    str = str + " of " + totalPagesExp;
                }
                doc.setFontSize(9);
                //x , y 
                doc.text(doc.internal.pageSize.width - 28 , doc.internal.pageSize.height - 10, str); 
              //  doc.text(str, data.settings.margin.left, doc.internal.pageSize.height - 10);
            };
     

        // Añadir logo StarGo
        //   var img = reportesFactory.obtenerImagen();
        //  console.log( 'img'+img);
        //  doc.addImage(img, 'jpg', 5, 5, 40, 15); // x, y width, height   //37% 
        doc.addImage(img, 'jpeg', 5, 5, 40, 15); // x, y width, height   //37% 

        // Encabezado reporte CENTRADO
        doc.setFontSize(14); 
        doc.setFontType("bold");
        var fontSize = doc.internal.getFontSize(); // Get current font size
        var pageWidth = doc.internal.pageSize.width; // Get page width
        var txtWidth = doc.getStringUnitWidth(reportHeaderPdf) * fontSize / doc.internal.scaleFactor;
        var x = ( pageWidth - txtWidth ) / 2;    // Calculate text's x coordinate    
        doc.text(reportHeaderPdf, x, 14);   // Posición text at x,y

        // Fecha de hoy
        var laFechaHoy = reportesFactory.obtenerFechaHoy();
        doc.setFontSize(11);   
        doc.setFontType("normal");
        doc.text(doc.internal.pageSize.width - 45 , 20, laFechaHoy);   //  Posición  text at x,y
        
        doc.setPage(1); // importante


       // doc.setLineWidth(0.5);  doc.line(20, 25, 60, 25); //x1 y1, x2 y2

        // Custom table 
        jsPDF.autoTableSetDefaults({
            headerStyles: 
            {   
                fontSize: 7.3,       
            },
            bodyStyles: {        
                fontSize: 6.5 
            }
        });

        doc.autoTable( columns, rows, {
            startY:27, //draw table here     
            theme: 'plain',//'grid', //
         //   headerStyles:{lineWidth: 1, lineColor: [0, 0, 0]},
         //   bodyStyles: {lineColor: [0, 0, 0]},
            styles:{
                overflow: 'linebreak', // visible, hidden, ellipsize or linebreak  
            },
            columnStyles: { 
                  1: {columnWidth: 12} //width 
                ,17: {columnWidth: 14} //width 
            },
             margin: {top: 16, right: 5, bottom: 16, left: 5},
             addPageContent: pageContent //page number
        });
           // Total page number plugin only available in jspdf v1.0+
        if (typeof doc.putTotalPages === 'function') {
            doc.putTotalPages( totalPagesExp);
        }

        doc.save(vm.filename+'.pdf');    
      }

        //-------------------------------------------

    }

]);