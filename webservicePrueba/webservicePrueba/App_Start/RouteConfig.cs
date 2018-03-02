using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace webservicePrueba
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            //*****************ENDPOINTS*************************************************************************
            //LOGIN ROUTE
            routes.MapRoute(
                "login",//ID 
                "login",//URL, esto es para poder acceder
                new
                {
                    controller = "Login",//controlador usado(PersonaController)
                    action = "Login"//metodo a realizar(Login()), está en el controller Login

                }
            );
            //GET DATA ROUTE
            routes.MapRoute(
                "ExtraerRegistro",//ID
                "ExtraerRegistros",//URL
                new
                {
                    controller = "Registros",//controlador
                    action = "Extraer_Registros"//metod
                }
            );
            //INSERT DATA ROUTE
            routes.MapRoute(
                "InsertarRegistros",//ID
                "InsertarRegistros",//URL
                new
                {
                    controller = "Registros",//controlador utilizado
                    action = "Insertar_Registro"//metodo
                }
            );
            //UPDATE DATA ROUTE
            routes.MapRoute(
                "ActualizarRegistros",//ID
                "ActualizarRegistros",//URL
                new
                {
                    controller = "Registros",//controlador utilizado
                    action = "Actualizar_Registro"//metodo
                }
            );
            //DELETE DATA ROUTE
            routes.MapRoute(
                "EliminarRegistro",//ID
                "EliminarRegistro",//URL
                new
                {
                    controller = "Registros",//controlador utilizado
                    action = "Borrar_Registro"//metodo
                }
            );

            //GET FRECUENCY
            routes.MapRoute(
                "Extraer_Frecuencia",//ID
                "ExtraerRegistros/Frecuencia",//URL
                new
                {
                    controller = "Registros",//controlador utilizado
                    action = "Extraer_Frecuencia"//metodo
                }
            );
            //GET DATE AMMOUNT
            routes.MapRoute(
                "Extraer_Cantidad_Citas",
                "ExtraerRegistros/Citas",
                new
                {
                    controller = "Registros",
                    action = "Extraer_Citas"
                }
            );
            //GET GENDER
            routes.MapRoute(
                "Extraer_Genero",
                "ExtraerRegistros/Genero",
                new
                {
                    controller = "Registros",
                    action = "Extraer_Genero"
                }
            );
            //GET CCSS
            routes.MapRoute(
                "Extraer_CCSS",
                "ExtraerRegistros/CCSS",
                new
                {
                    controller="Registros",
                    action = "Extraer_CCSS"
                }
            );

            //GET TEC
            routes.MapRoute(
                "Extraer_TEC",
                "ExtraerRegistros/TEC",
                new
                {
                    controller = "Registros",
                    action = "Extraer_TEC"
                }
            );
            
            //************************************************************************************************
            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}