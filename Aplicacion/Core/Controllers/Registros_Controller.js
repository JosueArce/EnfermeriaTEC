/**
 * Created by Josue on 12/12/2017.
 */
angular.module("main_module")
    .controller("Registros_Controller",function ($scope,Factory_Http_Request) {
        $scope.lista_registros = [];
        $scope.lista_horas = [];
        $scope.ID_item_to_edit ="";

        //Para obtener los datos de la BD a partir de 2 fechas solicitadas
        function get_date()  {
            let current_date = new Date();
            let fecha_inicial = "";
            let fecha_final = "";

            fecha_inicial = current_date.getFullYear() + '-' + (current_date.getMonth()+1) + '-' + current_date.getDate();
            fecha_inicial+=" 05:00:00";

            fecha_final = current_date.getFullYear() + '-' + (current_date.getMonth()+1) + '-' + current_date.getDate();
            fecha_final+=" 23:00:00";

            let fecha ={
              fechaInicial: fecha_inicial,
              fechaFinal: fecha_final
            };
            return fecha;
        }

        //Cuando cargue la ventana se obtendrá la info de la bd
        $scope.load_data = function () {
            Factory_Http_Request.getData(get_date(),function (http_request_result) {
                lista_registros(http_request_result);
            });

            generar_lista_horas();
        };

        //Constructor para los datos
        let Registros_Factory = function (registro) {
            if(registro.estudiante)this.posicion="Estudiante";
            else if(registro.funcionario) this.posicion="Funcionario";
            else this.posicion="Ninguno";

            if(registro.primera_vez)this.frecuencia="Primera Vez";
            else if(registro.subsequente)this.frecuencia="Subsecuente";

            if(registro.familiar)this.relacion="Familiar";
            else if(registro.pensionado)this.relacion="Pensionado";
            else this.relacion="Ninguno";

            if(registro.referencia)this.referencia = "SI";
            else this.referencia="NO";

            if(registro.sexo)this.sexo="Masculino";
            else this.sexo="Femenino";

            this.hora = registro.hora;
            this.edad = registro.edad;
            this.ID= registro.ID;
        };

        function lista_registros(lista) {
            for(item in lista){
                $scope.lista_registros.push(new Registros_Factory(lista[item]));
            }
        }

        function generar_lista_horas() {
            $scope.lista_horas.push(
                "7:00","7:15","7:30","7:45","8:00","8:15","8:30","8:45","9:00","9:15","9:30","9:45","10:00","10:15","10:30","10:45",
                "11:00","11:15","11:30","12:30","12:45","1:00","1:15","1:30","1:45","2:00","2:15","2:30","2:45","3:00","3:15","3:30",
                "3:45","4:00"
            );
        }

        //Cuando se vaya a generar un nuevo registro se reciben todos los datos y se envia a la BD
        $scope.new_register = function (hora,edad,frecuencia,posicion,relacion,referencia,sexo) {
            let primera_vez  = false;let subsecuente = false;
            let estudiante = false; let funcionario = false;
            let familiar = false; let pensionado = false;
            let reference = false; let sex = false;

            if(frecuencia=="Primera Vez")primera_vez = true;
            else if(frecuencia == "Subsecuente") subsecuente = true;

            if(posicion == "Estudiante") estudiante = true;
            else if(posicion == "Funcionario") funcionario = true;
            else{estudiante=false;funcionario=false;}

            if(relacion == "Familiar") familiar = true;
            else if(relacion == "Pensionado") pensionado=true;
            else{familiar=false;pensionado=false;}

            if(referencia == "SI")reference = true;
            else reference = false;

            if(sexo == "Masculino") sex = true;
            else if(sexo == "Femenino") sex = false;

            let nuevo_registro ={
                edad : edad,
                primera_vez : primera_vez,
                subsequente : subsecuente,
                estudiante : estudiante,
                funcionario : funcionario,
                familiar : familiar,
                pensionado : pensionado,
                referencia : reference,
                sexo : sex,
                hora: hora
            };
            Factory_Http_Request.postData(nuevo_registro,function (http_request_result) {
                if(http_request_result){
                    $.notify("Se creó exitosamente!","success");
                    $("#modal_add_register").modal("hide");
                    reload();
                }
                else{
                    $.notify("Error al generar registro!","error");
                }
            });
        };

        //Validar que tod0 este correcto antes de proceder a la inserccion
        function validar_espacios(){
            if($("#input_hora_edit").val()!= "" && $("#input_edad_edit").val() != ""
                && $("#input_frecuencia_edit").val() != "" && $("#input_Posición_edit").val() != "" &&
                $("#input_relacion_edit").val() != "" && $("#input_referencia_edit").val() !="" && $("#input_sexo_edit").val()!=""){
                return true;
            }
            else return false
        }

        //Para abrir la ventana de modificar registro
        $scope.open_modal_edit = function (registro) {
            $("#modal_edit_register").modal("show");
            $("#input_edad_edit").val(registro.edad);
            $("#input_frecuencia_edit").val(registro.frecuencia);
            $("#input_Posición_edit").val(registro.posicion);
            $("#input_referencia_edit").val(registro.referencia);
            $("#input_sexo_edit").val(registro.sexo);
            $("#input_hora_edit").val(registro.hora);
            $("#input_relacion_edit").val(registro.relacion);
            $scope.ID_item_to_edit = registro.ID;
        };

        //Cuando se desea editar un registro ya insertado
        $scope.edit_information = function () {

            if($("#input_edad_edit").val() != "" && $("#input_frecuencia_edit").val() != "" && $("#input_Posición_edit").val() != "" && $("#input_hora_edit").val() != "" &&
                $("#input_relacion_edit").val() != "" && $("#input_referencia_edit").val() != "" && $("#input_sexo_edit").val() != ""){
                let primera_vez  = false;let subsecuente = false;
                let estudiante = false; let funcionario = false;
                let familiar = false; let pensionado = false;
                let reference = false; let sex = false;

                if($("#input_frecuencia_edit").val()=="Primera Vez")primera_vez = true;
                else if($("#input_frecuencia_edit").val() == "Subsecuente") subsecuente = true;

                debugger
                if($("#input_Posición_edit").val() == "Estudiante") estudiante = true;
                else if($("#input_Posición_edit").val() == "Funcionario") funcionario = true;
                else{estudiante=false;funcionario=false;}

                if($("#input_relacion_edit").val() == "Familiar") familiar = true;
                else if($("#input_relacion_edit").val() == "Pensionado") pensionado=true;
                else{familiar=false;pensionado=false;}

                if($("#input_referencia_edit").val() == "SI")reference = true;
                else reference = false;

                if($("#input_sexo_edit").val() == "Masculino") sex = true;
                else if($("#input_sexo_edit").val() == "Femenino") sex = false;

                let registro ={
                    ID :$scope.ID_item_to_edit,
                    edad : $("#input_edad_edit").val(),
                    primera_vez : primera_vez,
                    subsequente : subsecuente,
                    estudiante : estudiante,
                    funcionario : funcionario,
                    familiar : familiar,
                    pensionado : pensionado,
                    referencia : reference,
                    sexo : sex,
                    hora: $("#input_hora_edit").val()
                };
                swal({
                        title: "Alerta!",
                        text: "De verdad desea realizar esta modificación?!",
                        type: "warning",
                        confirmButtonClass:"btn-warning",
                        confirmButtonText : "Ok",
                        showCancelButton: true,
                        closeOnConfirm : true
                    },function (isconfirm) {
                        if(isconfirm){
                            Factory_Http_Request.alterData(registro,function (http_request_result) {
                                if(http_request_result){
                                    $.notify("Modificación realizada con éxito!","success");
                                    $("#modal_edit_register").modal("hide");
                                    reload();
                                }
                                else{
                                    $.notify("Error al modificar registro!","error");
                                }
                            });
                        }


                    }
                );
            }
            else{
                swal({
                        title: "Error!",
                        text: "Hay espacios en blanco!",
                        type: "error",
                        confirmButtonClass:"btn-danger",
                        confirmButtonText : "Ok",
                        closeOnConfirm : true
                    }
                );
            }
        };

        function reload() {
            $scope.lista_registros = [];
            Factory_Http_Request.getData(get_date(),function (http_request_result) {
                lista_registros(http_request_result);
            });
        }
    })
;
