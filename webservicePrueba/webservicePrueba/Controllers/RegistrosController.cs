using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using webservicePrueba.Models;

namespace webservicePrueba.Controllers
{
    public class RegistrosController : Controller
    {
        private RegistrosManager registroManager;

        public RegistrosController()
        {
            registroManager = new RegistrosManager();
        }


        /// <summary>
        /// Retorna los registros de la base de datos de una fecha
        /// </summary>
        /// <returns></returns>
        public JsonResult Extraer_Registros(DateTime fechaInicial, DateTime fechaFinal)
        {
            switch (Request.HttpMethod)
            {
                case "GET":
                    return Json(registroManager.Extraer_Registros(fechaInicial, fechaFinal), JsonRequestBehavior.AllowGet);
            }
            return Json(new { Error = true, Message = "Operación HTTP desconocida" });
        }
        /// <summary>
        /// Controller para insertar un registro
        /// Ejecuta al método Insertar_Registro localizado en RegistrosManager
        /// </summary>
        /// <param name="reg"></param>
        /// <returns></returns>
        public JsonResult Insertar_Registro(Registros reg)
        {
            switch (Request.HttpMethod)
            {
                case "POST":
                    return Json(registroManager.Insertar_Registro(reg));
            }
            return Json(new { Error = true, Message = "Operación HTTP desconocida" });
        }
        /// <summary>
        /// Controller para actualizar un registro
        /// Ejecuta el metodo Actualizar_Registro localizado en RegistrosManager
        /// </summary>
        /// <param name="reg"></param>
        /// <returns></returns>
        public JsonResult Actualizar_Registro(Registros reg)
        {
            switch (Request.HttpMethod)
            {
                case "POST":
                    return Json(registroManager.Actualizar_Registro(reg));
            }
            return Json(new { Error = true, Message = "Operación HTTP desconocida" });
        }
        /// <summary>
        /// Controller para eliminar un registro
        /// Ejecuta el método Borrar_Registro localizado en RegistrosManager
        /// </summary>
        /// <param name="ID"></param>
        /// <returns></returns>
        public JsonResult Borrar_Registro(int ID)
        {
            switch (Request.HttpMethod)
            {
                case "DELETE":
                    return Json(registroManager.Borrar_Registro(ID));
            }
            return Json(new { Error = true, Message = "Operación HTTP desconocida" });
        }
        /// <summary>
        /// Permite extraer registros relacionados con la frecuencia
        /// </summary>
        /// <returns></returns>
        public JsonResult Extraer_Frecuencia(DateTime fechaInicial,DateTime fechaFinal)
        {
            switch (Request.HttpMethod)
            {
                case "GET":
                    return Json(registroManager.Extraer_Frecuencia(fechaInicial,fechaFinal), JsonRequestBehavior.AllowGet);
            }
            return Json(new { Error = true, Message = "Operación HTTP desconocida" });
        }
        /// <summary>
        /// Permite extraer cantidad de citas realizadas
        /// </summary>
        /// <returns></returns>
        public JsonResult Extraer_Citas(DateTime fechaInicial, DateTime fechaFinal)
        {
            switch(Request.HttpMethod)
            {
                case "GET":
                    return Json(registroManager.Extraer_Citas(fechaInicial,fechaFinal), JsonRequestBehavior.AllowGet);
            }
            return Json(new { Error = true, Message = "Operación HTTP desconocida" });
        }
        /// <summary>
        /// Permite extraer los registros relacionados con el genero
        /// </summary>
        /// <returns></returns>
        public JsonResult Extraer_Genero(DateTime fechaInicial, DateTime fechaFinal)
        {
            switch(Request.HttpMethod)
            {
                case "GET":
                    return Json(registroManager.Extraer_Genero(fechaInicial,fechaFinal), JsonRequestBehavior.AllowGet);
            }
            return Json(new {Error = true, Message = "Operación HTTP desconocida" });
        }

        /// <summary>
        /// Permite extraer registros que serán utilizados para los reportes semestrales de la CCSS
        /// </summary>
        /// <param name="fechaInicial"></param>
        /// <param name="fechaFinal"></param>
        /// <returns></returns>
        public JsonResult Extraer_CCSS(DateTime fechaInicial,DateTime fechaFinal)
        {
            switch (Request.HttpMethod)
            {
                case "GET":
                    return Json(registroManager.Extraer_CCSS(fechaInicial,fechaFinal),JsonRequestBehavior.AllowGet);
            }
            return Json(new {Error=true,Message="Operación HTTP desconocida" });
        }

        /// <summary>
        /// Permite extraer todos los registros mensuales que serán utilizados para el reporte mensual del tec
        /// </summary>
        /// <returns></returns>
        public JsonResult Extraer_TEC(DateTime fechaInicial, DateTime fechaFinal)
        {
            switch (Request.HttpMethod)
            {
                case "GET":
                    return Json(registroManager.Extraer_TEC(fechaInicial, fechaFinal), JsonRequestBehavior.AllowGet);
            }
            return Json(new { Error = true, Message = "Operación HTTP desconocida" });
        }


    }
}
