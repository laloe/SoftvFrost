'use strict';
angular.module('softvFrostApp')
//.controller('ReportesCtrl', ['$http','uiGridConstants', 'reportesFactory', function ( $http, uiGridConstants, reportesFactory)
.controller('Reportes_MovimientoCtrl', ['$http', 'reportesFactory','$timeout', 'ngNotify','$state', function ( $http, reportesFactory, $timeout, ngNotify, $state){
//function ReportesCtrl(reportesFactory) {
 
	var vm = this;
    vm.filename = "Reporte_de_movimientos";
    var reportHeaderPdf = "Reporte de Movimientos";
    var fechaInicioYMD;
    var fechaFinYMD; 
    var idAux = 1;  
    vm.csvUnoHide = true; //Button no mostrar
    vm.csvDosHide = true; //Button no mostrar
    var img = new Image();
    img.crossOrigin = "";  
//----------------------------------------------
    this.$onInit = function() {

        getImageDataURL();
        getReporteMovimientos(); //No se ha seleccionado una fecha, se muestran todos los datos   

    }

    function reloadRoute() {
        $state.reload(); // refresh page
    };


    vm.limpiarFiltros = limpiarFiltros;
    function limpiarFiltros(){
        vm.fechaInicio = null;
        vm.fechaFin = null;
        reloadRoute();
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

    var arrayMovi = [];   
    vm.getReporteMovimientos = getReporteMovimientos;
    function getReporteMovimientos()
    {                     
            getFechas();         

                if (vm.fechaInicio > vm.fechaFin){
                    ngNotify.set('La fecha de inicio debe ser anterior a la fecha fin', {
                        type: 'error'
                    });  
                } 

            reportesFactory.mostrarReporteMovimientos(idAux, fechaInicioYMD, fechaFinYMD).then(function(data) {
                
                arrayMovi = data.GetReporte_MovimientosListResult;
                vm.itemsByPage = 5; 
                vm.rowCollection4 = arrayMovi;  

            });
    }


    function getFechas(){
        if ( vm.fechaInicio == null ){
                fechaInicioYMD = null;
        }
        else {                
                var D1 = vm.fechaInicio; // no se usa porque tiene formato con zona horaria
                var month = D1.getUTCMonth() + 1; //months from 1-12
                var day = D1.getUTCDate();
                var year = D1.getUTCFullYear();
                fechaInicioYMD = year + "/" + month + "/" + day;
        }
        if ( vm.fechaFin == null ){
                fechaFinYMD = null;
        }else{
                var D2 = vm.fechaFin; // no se usa porque tiene formato con zona horaria
                var month = D2.getUTCMonth() + 1; //months from 1-12
                var day = D2.getUTCDate();
                var year = D2.getUTCFullYear();
                fechaFinYMD = year + "/" + month + "/" + day;
        }
    }

    vm.clearInicio = clearInicio;
    function clearInicio(){
        fechaInicioYMD = null;
        vm.fechaInicio = fechaInicioYMD;        
  
    }

    vm.clearFin = clearFin;
    function clearFin(){
        vm.fechaFin = null;
        fechaFinYMD = null; 
    }



    //CSV 
    vm.order = [ 'SAN', 'Cliente', 'Suscriptor', 'FechaMovim', 'ESN', 'Movimiento', 'Operacion', 'Usuario'];

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


// 'SAN', 'Cliente', 'Suscriptor', 'FechaMovim', 'ESN', 'Movimiento', 'Operacion', 'Usuario'];

    function initArray (){
      vm.arrayReporte = []; //array vacío   
         // Posición 0 del arrayReporte (ENCABEZADOS)
        vm.arrayReporte =     [{
                "SAN": "Site Id",
                "Cliente": "Cliente",
                "Suscriptor": "Suscriptor",
                "FechaMovim": "Fecha Movimiento",
                "ESN": "No. de Serie",
                "Movimiento": "Movimiento",
                "Operacion": "Operacion",                   
                "Usuario": "Usuario"
                }];
    } 


// Create TABLE PDF -- All / Visible 
vm.createPdfTodo = createPdfTodo;
function createPdfTodo(pdfAcrear){

    var rows = [ [0,0,0,0,0,0,0,0,0,0,0,0] ]; // no. column
    // rows 0
    var r = 1; //start from rows 1
    var c = 0; //start from col 5

    var ro = 0; // length array of objects
      if ( pdfAcrear =='todo')
        { ro = vm.rowCollection4.length; }
        else 
        { ro = vm.displayedCollection4.length; }


    var cols = 8; // column number
    var columns = ["SAN", "Cliente", "Suscriptor", "FechaMovim", "No. de Serie", "Movimiento", "Operacion", "Usuario"];

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
            rows[i][1] = vm.rowCollection4[i].Cliente;
            rows[i][2] = vm.rowCollection4[i].Suscriptor;
            rows[i][3] = vm.rowCollection4[i].FechaMovim;
            rows[i][4] = vm.rowCollection4[i].ESN;
            rows[i][5] = vm.rowCollection4[i].Movimiento;
            rows[i][6] = vm.rowCollection4[i].Operacion;
            rows[i][7] = vm.rowCollection4[i].Usuario;
        }else //VISIBLE DATA
        {                   
            rows[i][0] = vm.displayedCollection4[i].SAN;
            rows[i][1] = vm.displayedCollection4[i].Cliente;
            rows[i][2] = vm.displayedCollection4[i].Suscriptor;
            rows[i][3] = vm.displayedCollection4[i].FechaMovim;
            rows[i][4] = vm.displayedCollection4[i].ESN;
            rows[i][5] = vm.displayedCollection4[i].Movimiento;
            rows[i][6] = vm.displayedCollection4[i].Operacion;
            rows[i][7] = vm.displayedCollection4[i].Usuario;
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