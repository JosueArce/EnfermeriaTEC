/**
 * Created by Josue on 11/12/2017.
 */
angular.module("main_module")
    .controller("login_Controller",function ($scope,$location,Factory_Http_Request) {
        $scope.input_cedula = "";
        $scope.input_password = "";
        $scope.input_isChecked = false;

        //Para cargar los credenciales
        $scope.function_load_credentials = function () {
            if(sessionStorage.getItem("user_logged")!=null){
                $scope.input_cedula = JSON.parse(sessionStorage.getItem("user_logged")).ID;
                $scope.input_password = JSON.parse(sessionStorage.getItem("user_logged")).Password;
                $scope.input_isChecked = true;
            }
        };

        //Para guardar los credenciales
        $scope.function_remember_me = function () {
            if ($scope.input_isChecked) $scope.input_isChecked == true;
            else $scope.input_isChecked == false;
        };

        //Valida que los credenciales insertados cumplan antes de acceder
        $scope.function_login = function (cedula,password) {
            if($scope.input_cedula == "" || $scope.input_password == ""){
                $.notify("Complete los campos vacíos!","error");
            }
            else{
                Factory_Http_Request.login({Id: $scope.input_cedula, Password: $scope.input_password},function (http_request_result) {
                    if(http_request_result){
                        if($scope.input_isChecked){
                            let user_logged = {
                                ID: $scope.input_cedula,
                                Password: $scope.input_password
                            };
                            sessionStorage.setItem("user_logged",JSON.stringify(user_logged));
                        }
                        swal({
                                title: "Éxito!",
                                text: "Bienvenido!",
                                type: "success",
                                confirmButtonClass:"btn-primary",
                                confirmButtonText : "Ok",
                                closeOnConfirm : true
                            },function (isconfirm) {
                                window.location.href = "templates/main_page.html";
                            }
                        );
                    }
                    else{
                        swal({
                                title: "Error",
                                text: "Usuario no existe!",
                                type: "error",
                                confirmButtonClass:"btn-primary",
                                confirmButtonText : "Ok",
                                closeOnConfirm : true
                            }
                        );
                    }
                });
            }
        };
    })
;
