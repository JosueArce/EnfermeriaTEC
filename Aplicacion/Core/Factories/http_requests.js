/**
 * Created by Josue on 11/12/2017.
 */
angular.module("http_Request",[])
    .factory("Factory_Http_Request",function ($http) {
        let factory = {
            getData : function (rango_fechas,callback) {
              $http({
                  method:"GET",
                  url: "http://localhost:56119/ExtraerRegistros",
                  params: rango_fechas
              }).then(function successCallback(response) {
                  callback(response.data);
              }).catch(function errorCallback(response){
                  callback(response.data);
              })
          },
            login: function (user,callback) {
              $http({
                  method:"GET",
                  url:"http://localhost:56119/login",
                  params: user
              }).then(function successCallback(response) {
                  callback(response.data)
              }).catch(function errorCallback(response){
                  callback(response.data)
              })
          },
            postData : function (registro,callback) {
              $http({
                  method:"POST",
                  url:"http://localhost:56119/InsertarRegistros",
                  params:registro
              }).then(function successCallback(response) {
                  callback(response.data);
              }).catch(function errorCallback(response) {
                  callback(response.data);
              })
          },
            alterData : function (registro,callback) {
                $http({
                    method:"POST",
                    url:"http://localhost:56119/ActualizarRegistros",
                    params:registro
                }).then(function successCallback(response) {
                    callback(response.data);
                }).catch(function errorCallback(response) {
                    callback(response.data);
                })
            },
            /*GRAFICAS*/
            get_frecuency_data : function (rango_fechas,callback) {
                $http({
                    method:"GET",
                    url: "http://localhost:56119/ExtraerRegistros/Frecuencia",
                    params:rango_fechas
                }).then(function successCallback(response) {
                    callback(response.data);
                }).catch(function errorCallback(response){
                    callback(response.data);
                })
            },
            get_dates_data : function (rango_fechas,callback) {
                $http({
                    method:"GET",
                    url: "http://localhost:56119/ExtraerRegistros/Citas",
                    params:rango_fechas
                }).then(function successCallback(response) {
                    callback(response.data);
                }).catch(function errorCallback(response){
                    callback(response.data);
                })
            },
            get_gender_data : function (rango_fechas,callback) {
                $http({
                    method:"GET",
                    url: "http://localhost:56119/ExtraerRegistros/Genero",
                    params:rango_fechas
                }).then(function successCallback(response) {
                    callback(response.data);
                }).catch(function errorCallback(response){
                    callback(response.data);
                })
            },
            /*REPORTES*/
            get_CCSS_data : function (rango_fechas,callback) {
                $http({
                    method:"GET",
                    url: "http://localhost:56119/ExtraerRegistros/CCSS",
                    params: rango_fechas
                }).then(function successCallback(response) {
                    callback(response.data);
                }).catch(function errorCallback(response){
                    callback(response.data);
                })
            },
            get_TEC_data : function (rango_fechas,callback) {
                $http({
                    method:"GET",
                    url: "http://localhost:56119/ExtraerRegistros/TEC",
                    params: rango_fechas
                }).then(function successCallback(response) {
                    callback(response.data);
                }).catch(function errorCallback(response){
                    callback(response.data);
                })
            },
        };
        return factory;
    })
;