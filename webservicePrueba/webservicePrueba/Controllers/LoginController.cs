using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using webservicePrueba.Models;

namespace webservicePrueba.Controllers
{
    public class LoginController : Controller
    {
        private LoginManager personaManager;

        public LoginController()
        {
            personaManager = new LoginManager();
        }

        /// <summary>
        /// llama al metodo comprobar usuario el cual retorna un booleano
        /// </summary>
        /// <param name="id">ID del usuario</param>
        /// <param name="password">contraseña del usuario</param>
        /// <returns></returns>
        public JsonResult Login(User newUser)
        {
            switch (Request.HttpMethod)
            {
                case "GET":
                    return Json(personaManager.comprobarUsuario(newUser),
                                JsonRequestBehavior.AllowGet);
            }

            return Json(new { Error = true, Message = "Operación HTTP desconocida" });
        }
    }
}
